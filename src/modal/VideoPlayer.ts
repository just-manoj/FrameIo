import { Ref } from 'react';
import type { VideoRef } from 'react-native-video';

export interface CommentData {
  id: number;
  cmdTime: string;
  timestamp: string;
  command: string;
  drawing: DrawingData | null;
}

export interface DrawingData {
  id: number;
  colorCode: string;
  points: string[];
}

export interface PlayerControl {
  isPlaying: boolean;
  isMuted: boolean;
  isFullScreen: boolean;
  finish: boolean;
  totalDuration: number;
  currentTime: number;
  totaltimeStamp: { name: string; value: string }[];
  canDraw: boolean;
  canDisplay: boolean;
}

export interface PlayerProps {
  videoPlayer: Ref<VideoRef | null>;
  videoHeight: number;
  playerControl: PlayerControl;
  changeVideoHeight: (height: number) => void;
  managePlayerDurationHandler: (
    field: 'total' | 'current',
    value: number,
  ) => void;
  manageControlsHandler: (
    control: 'play' | 'mute' | 'fullScreen' | 'finish',
    value: boolean,
  ) => void;
  drawingData: { path: string[]; tempPath: string[]; colorCode: string };
  changeDrawingData: (type: 'path' | 'temp', value: string[]) => void;
}

export interface CommentsListProps {
  moveVideoPosition: (commandId: number, position: number) => void;
  commentsList: CommentData[];
  deleteComment: (id: number) => void;
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
