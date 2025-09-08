import { Ref } from 'react';
import type { VideoRef } from 'react-native-video';
import { GestureResponderEvent } from 'react-native/types_generated/index';

export interface CommentData {
  id: number;
  cmdTime: string;
  timestamp: string;
  command: string;
  drawing: DrawingData | null;
}

export interface AnchorComment {
  id: number;
  timeStamp: string;
  command: string;
  x: number;
  y: number;
  colorCode: string;
}

export interface AnchorCommentsData extends AnchorComment {
  enablePoint: boolean;
}

export interface DrawingData {
  id: number;
  colorCode: string;
  points: string[];
}

export interface PlayerControl {
  movement: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  isFullScreen: boolean;
  finish: boolean;
  totalDuration: number;
  currentTime: number;
  totaltimeStamp: { name: string; value: string }[];
  canDraw: boolean;
  canDisplay: boolean;
  anchorEnabled: boolean;
}

export interface PlayerProps {
  videoPlayer: Ref<VideoRef | null>;
  videoHeight: number;
  playerControl: PlayerControl;
  changeVideoHeight: (height: number) => void;
  managePlayerDurationHandler: (
    field: 'total' | 'current' | 'movement',
    value: number | boolean,
  ) => void;
  manageControlsHandler: (
    control:
      | 'play'
      | 'mute'
      | 'fullScreen'
      | 'finish'
      | 'anchorEnabled'
      | 'canDraw'
      | 'canDisplay',
    value: boolean,
  ) => void;
  drawingData: { path: string[]; tempPath: string[]; colorCode: string };
  changeDrawingData: (type: 'path' | 'temp', value: string[]) => void;
  moveVideoPosition: (commandId: number | null, position: number) => void;
  changeAnchorCmdHandler: (
    field:
      | 'timeStamp'
      | 'x'
      | 'y'
      | 'command'
      | 'colorCode'
      | 'enablePoint'
      | 'id',
    value: number | string | boolean,
  ) => void;
  anchorCommentsData: AnchorCommentsData;
  addNewAnchorComment: () => void;
  anchorCommentsList: AnchorComment[];
  commentBoxSize: { width: number; height: number };
  changeCommentBoxSize: (width: number, height: number) => void;
}

export interface CommentsListProps {
  moveVideoPosition: (commandId: number, position: number) => void;
  commentsList: CommentData[];
  deleteComment: (id: number) => void;
  manageControlsHandler: (control: 'anchorEnabled', value: boolean) => void;
  changeAnchorCmdHandler: (
    field: 'enablePoint' | 'id',
    value: number | string | boolean,
  ) => void;
}

export interface CommentInputProps {
  totaltimeStamp: { name: string; value: string }[];
  onChangeCommentHandler: (
    field: 'timestamp' | 'comment',
    value: string,
  ) => void;
  commentData: { timestamp: string; comment: string };
  addNewComment: () => void;
  drawingData: { path: string[]; tempPath: string[]; colorCode: string };
  manageControlsHandler: (
    control: 'canDraw' | 'canDisplay',
    value: boolean,
  ) => void;
  playerControl: PlayerControl;
  changeDrawingData: (type: 'color', value: string[] | string) => void;
}

export interface ArchorCommentProps {
  onTouchAnchorEnd: (event: GestureResponderEvent) => void;
  videoHeight: number;
  screenWidth: number;
  anchorCommentsData: AnchorCommentsData;
  commentBoxSize: { width: number; height: number };
  changeCommentBoxSize: (width: number, height: number) => void;
  changeAnchorCmdHandler: (
    field: 'timeStamp' | 'command',
    value: number | string | boolean,
  ) => void;
  playerControl: PlayerControl;
  addNewAnchorComment: () => void;
}
