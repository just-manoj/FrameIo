import React, { useRef, useState } from 'react';
import type { VideoRef } from 'react-native-video';

import { PlayerControl } from '../modal/VideoPlayer';
import { generateTimeStamp, secToMin } from '../util/Time';

const VideoPlayerViewModal = () => {
  const videoPlayer = useRef<VideoRef | null>(null);

  const [playerControl, setPlayerControl] = useState<PlayerControl>({
    isPlaying: false,
    isMuted: false,
    isFullScreen: false,
    finish: false,
    totalDuration: 0,
    currentTime: 0,
    totaltimeStamp: [],
  });
  const [videoHeight, setVideoHeight] = useState(200);
  const [commentData, setCommentData] = useState<{
    timestamp: string;
    comment: string;
  }>({ timestamp: '', comment: '' });

  const changeVideoHeight = (height: number) => {
    setVideoHeight(height);
  };

  const manageControlsHandler = (
    control: 'play' | 'mute' | 'fullScreen' | 'finish',
    value: boolean,
  ) => {
    setPlayerControl(prevState => {
      switch (control) {
        case 'play':
          if (prevState.finish) {
            moveVideoPosition(0);
          }
          if (!value) {
            onChangeCommentHandler(
              'timestamp',
              secToMin(+playerControl.currentTime.toFixed(0)),
            );
          }
          return {
            ...prevState,
            isPlaying: value,
            finish: prevState.finish ? false : prevState.finish,
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
        default:
          return prevState;
      }
    });
  };

  const managePlayerDurationHandler = (
    field: 'total' | 'current',
    value: number,
  ) => {
    setPlayerControl(prevState => {
      switch (field) {
        case 'total':
          const totaltimeStamp = generateTimeStamp(Math.round(value));
          return {
            ...prevState,
            totalDuration: value,
            totaltimeStamp: totaltimeStamp,
          };

        case 'current':
          return { ...prevState, currentTime: value };
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
          return { ...prevState, timestamp: value };
        case 'comment':
          return { ...prevState, comment: value };
        default:
          return prevState;
      }
    });
  };

  const moveVideoPosition = (position: number) => {
    if (videoPlayer.current) {
      videoPlayer.current.seek(position);
      managePlayerDurationHandler('current', position);
      onChangeCommentHandler('timestamp', secToMin(position));
      if (playerControl.finish) {
        setPlayerControl(prevState => ({ ...prevState, finish: false }));
      }
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
  };
};

export default VideoPlayerViewModal;
