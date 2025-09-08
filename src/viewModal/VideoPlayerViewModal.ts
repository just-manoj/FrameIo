import React, { useRef, useState } from 'react';
import type { VideoRef } from 'react-native-video';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

import {
  AnchorComment,
  AnchorCommentsData,
  CommentData,
  PlayerControl,
} from '../modal/VideoPlayer';
import { generateTimeStamp, secToMin, timeMmSs } from '../util/Time';
import {
  addAnchorCommand,
  addCommand,
  connectToDatabase,
  createTables,
  deleteCommentDb,
  geAllAnchorCommentsDb,
  geAllCommentsDb,
} from '../util/Database';
import { colors } from '../const/Colors';
import { Alert } from 'react-native';
import { texts } from '../const/Text';

const VideoPlayerViewModal = () => {
  const videoPlayer = useRef<VideoRef | null>(null);
  const dbConnection = useRef<SQLiteDatabase | null>(null);

  const [playerControl, setPlayerControl] = useState<PlayerControl>({
    movement: false,
    isPlaying: false,
    isMuted: false,
    isFullScreen: false,
    finish: false,
    totalDuration: 0,
    currentTime: 0,
    totaltimeStamp: [],
    canDraw: false,
    canDisplay: true,
    anchorEnabled: false,
  });
  const [videoHeight, setVideoHeight] = useState(200);
  const [commentData, setCommentData] = useState<{
    timestamp: string;
    comment: string;
  }>({ timestamp: '00:00', comment: '' });
  const [drawingData, setDrawingData] = useState<{
    path: string[];
    tempPath: string[];
    colorCode: string;
  }>({
    path: [],
    tempPath: [],
    colorCode: colors.white,
  });
  const [commentsList, setCommentsList] = useState<CommentData[]>([]);
  const [anchorCommentsList, setAnchorCommentsList] = useState<AnchorComment[]>(
    [],
  );
  const [anchorCommentsData, setAnchorCommentsData] =
    useState<AnchorCommentsData>({
      id: -1,
      timeStamp: '00:00',
      x: -1,
      y: -1,
      command: '',
      colorCode: colors.yellow,
      enablePoint: false,
    });
  const [commentBoxSize, setCommentBoxSize] = useState({
    width: 0,
    height: 0,
  });

  const changeCommentBoxSize = (width: number, height: number) => {
    setCommentBoxSize(() => ({
      height: height,
      width: width,
    }));
  };

  const changeVideoHeight = (height: number) => {
    setVideoHeight(height);
  };

  const manageControlsHandler = (
    control:
      | 'play'
      | 'mute'
      | 'fullScreen'
      | 'finish'
      | 'canDraw'
      | 'canDisplay'
      | 'anchorEnabled',
    value: boolean,
  ) => {
    setPlayerControl(prevState => {
      switch (control) {
        case 'play':
          if (prevState.finish) {
            moveVideoPosition(null, 0);
          }
          changeAnchorCmdHandler('enablePoint', false);
          if (!value) {
            onChangeCommentHandler(
              'timestamp',
              secToMin(+playerControl.currentTime.toFixed(0)),
            );
          } else {
            changeDrawingData('color', colors.black);
          }
          setDrawingData(prev => ({ ...prev, path: [], tempPath: [] }));
          changeAnchorCmdHandler('enablePoint', false);
          return {
            ...prevState,
            isPlaying: value,
            finish: prevState.finish ? false : prevState.finish,
            canDisplay: !value,
            canDraw: value === true ? false : prevState.canDraw,
            anchorEnabled: false,
          };
        case 'mute':
          return { ...prevState, isMuted: value };
        case 'fullScreen':
          if (videoPlayer.current && value) {
            videoPlayer.current.presentFullscreenPlayer();
          }
          return { ...prevState, isFullScreen: value };
        case 'finish':
          return { ...prevState, finish: value, isPlaying: false };
        case 'canDraw':
          if (value) {
            setDrawingData(prev => ({ ...prev, path: [] }));
          }
          return { ...prevState, canDraw: value };
        case 'canDisplay':
          return { ...prevState, canDisplay: value };
        case 'anchorEnabled':
          return { ...prevState, anchorEnabled: value, isPlaying: false };
        default:
          return prevState;
      }
    });
  };

  const managePlayerDurationHandler = (
    field: 'total' | 'current' | 'movement',
    value: number | boolean,
  ) => {
    setPlayerControl(prevState => {
      switch (field) {
        case 'total':
          if (typeof value !== 'number') {
            return prevState;
          }
          const totaltimeStamp = generateTimeStamp(Math.round(value));
          return {
            ...prevState,
            totalDuration: value,
            totaltimeStamp: totaltimeStamp,
          };
        case 'current':
          return { ...prevState, currentTime: value };
        case 'movement':
          setDrawingData({
            path: [],
            tempPath: [],
            colorCode: drawingData.colorCode,
          });
          return { ...prevState, movement: value };
        default:
          return prevState;
      }
    });
  };

  const onChangeCommentHandler = (
    field: 'timestamp' | 'comment',
    value: string,
  ) => {
    setCommentData(prevState => {
      switch (field) {
        case 'timestamp':
          if (videoPlayer.current) {
            videoPlayer.current.seek(timeMmSs(value));
            // setDrawingData(prev => ({ ...prev, path: [], tempPath: [] }));
          }
          return { ...prevState, timestamp: value };
        case 'comment':
          return { ...prevState, comment: value };
        default:
          return prevState;
      }
    });
  };

  const moveVideoPosition = (cmdId: number | null, position: number) => {
    if (videoPlayer.current) {
      videoPlayer.current.seek(position);
      managePlayerDurationHandler('current', position);
      onChangeCommentHandler('timestamp', secToMin(position));
      if (playerControl.finish) {
        setPlayerControl(prevState => ({ ...prevState, finish: false }));
      }
    }
    if (cmdId) {
      const selectedCmd = commentsList.find(cmd => cmd.id === cmdId);
      if (selectedCmd && selectedCmd.drawing !== null) {
        setDrawingData(prev => ({
          ...prev,
          path: selectedCmd.drawing!.points,
        }));
        changeDrawingData('color', selectedCmd.drawing.colorCode);
        manageControlsHandler('canDisplay', true);
      } else {
        setDrawingData(prev => ({ ...prev, path: [] }));
        changeDrawingData('color', colors.black);
        manageControlsHandler('canDisplay', false);
      }
    } else {
      setDrawingData(prev => ({ ...prev, path: [] }));
      changeDrawingData('color', colors.black);
      manageControlsHandler('canDisplay', false);
    }
  };

  const changeDrawingData = (
    type: 'path' | 'temp' | 'color',
    value: string[] | string,
  ) => {
    setDrawingData(prevState => {
      switch (type) {
        case 'path':
          return value
            ? { ...prevState, path: [...prevState.path, ...value] }
            : prevState;
        case 'temp':
          return {
            ...prevState,
            tempPath: [...value],
          };
        case 'color':
          return {
            ...prevState,
            colorCode: value,
          };
        default:
          return prevState;
      }
    });
  };

  const connectToTable = async () => {
    try {
      const db = await connectToDatabase();
      dbConnection.current = db;
      await createTables(db);
      getAllCommentsData(db);
      getAllAnchorCommentsData(db);
    } catch (error) {
      console.error(error);
    }
  };

  const addNewComment = async () => {
    if (commentData.comment === '' && drawingData.path.length <= 0) {
      return Alert.alert(texts.validation, texts.validationMsg);
    }
    if (!dbConnection.current) {
      console.error('Database connection is not established.');
      return;
    }
    const result = await addCommand(dbConnection.current, {
      id: -1,
      cmdTime: new Date().toISOString(),
      timestamp: commentData.timestamp,
      command: commentData.comment,
      drawing: {
        id: -1,
        colorCode: drawingData.colorCode,
        points: drawingData.path,
      },
    });
    if (result[0].insertId) {
      getAllCommentsData(dbConnection.current);
      setCommentData(() => ({
        comment: '',
        timestamp: '00:01',
      }));
      setDrawingData({
        path: [],
        tempPath: [],
        colorCode: drawingData.colorCode,
      });
    }
  };

  const deleteComment = async (id: number) => {
    if (!dbConnection.current) {
      console.error('Database connection is not established.');
      return;
    }

    await deleteCommentDb(dbConnection.current, id);
    getAllCommentsData(dbConnection.current);
  };

  const getAllCommentsData = async (db: SQLiteDatabase | null) => {
    if (!db) {
      console.error('Database connection is not established.');
      return;
    }
    const res = await geAllCommentsDb(db);
    setCommentsList(() => res);
  };

  const changeAnchorCmdHandler = (
    field:
      | 'timeStamp'
      | 'x'
      | 'y'
      | 'command'
      | 'colorCode'
      | 'enablePoint'
      | 'id',
    value: number | string | boolean,
  ) => {
    setAnchorCommentsData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (field === 'enablePoint' && value) {
      changeAnchorCmdHandler(
        'timeStamp',
        secToMin(+playerControl.currentTime.toFixed(0)),
      );
    }
  };

  const getAllAnchorCommentsData = async (db: SQLiteDatabase | null) => {
    if (!db) {
      console.error('Database connection is not established.');
      return;
    }
    const res = await geAllAnchorCommentsDb(db);
    setAnchorCommentsList(() => res);
  };

  const addNewAnchorComment = async () => {
    if (
      anchorCommentsData.command === '' ||
      anchorCommentsData.x <= 0 ||
      anchorCommentsData.y <= 0
    ) {
      return Alert.alert(texts.validation, texts.validationMsg);
    }
    if (!dbConnection.current) {
      console.error('Database connection is not established.');
      return;
    }
    const result = await addAnchorCommand(dbConnection.current, {
      id: -1,
      timeStamp: anchorCommentsData.timeStamp,
      command: anchorCommentsData.command,
      colorCode: anchorCommentsData.colorCode,
      x: anchorCommentsData.x,
      y: anchorCommentsData.y,
    });
    if (result[0].insertId) {
      getAllAnchorCommentsData(dbConnection.current);
      setAnchorCommentsData(() => ({
        colorCode: colors.green,
        command: '',
        enablePoint: false,
        id: -1,
        timeStamp: '00:01',
        x: -1,
        y: -1,
      }));
      manageControlsHandler('anchorEnabled', false);
    }
  };

  return {
    playerControl,
    videoHeight,
    changeVideoHeight,
    manageControlsHandler,
    videoPlayer,
    managePlayerDurationHandler,
    onChangeCommentHandler,
    commentData,
    moveVideoPosition,
    changeDrawingData,
    drawingData,
    connectToTable,
    addNewComment,
    commentsList,
    deleteComment,
    changeAnchorCmdHandler,
    anchorCommentsData,
    getAllAnchorCommentsData,
    addNewAnchorComment,
    anchorCommentsList,
    commentBoxSize,
    changeCommentBoxSize,
  };
};

export default VideoPlayerViewModal;
