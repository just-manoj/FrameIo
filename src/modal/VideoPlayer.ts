import { Ref } from 'react';
import type { VideoRef } from 'react-native-video';

export interface PlayerControl {
  isPlaying: boolean;
  isMuted: boolean;
  isFullScreen: boolean;
  finish: boolean;
  totalDuration: number;
  currentTime: number;
  totaltimeStamp: { name: string; value: string }[];
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
}

export interface CommentsListProps {
  moveVideoPosition: (position: number) => void;
}

export interface CommentInputProps {
    totaltimeStamp: { name: string; value: string }[];
  onChangeCommentHandler: (
    field: 'timestamp' | 'comment',
    value: string,
  ) => void;
  commentData: { timestamp: string; comment: string };
}
