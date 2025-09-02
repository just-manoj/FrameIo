import React, { useRef, useState } from 'react';
import Video from 'react-native-video';
import type { VideoRef } from 'react-native-video';

const VideoPlayerViewModal = () => {
  const videoPlayer = useRef<VideoRef | null>(null);

  const [playerControl, setPlayerControl] = useState({
    isPlaying: true,
    isMuted: false,
    isFullScreen: false,
  });
  const [videoHeight, setVideoHeight] = useState(200);

  const changeVideoHeight = (height: number) => {
    setVideoHeight(height);
  };

  const manageControlsHandler = (control: 'play' | 'mute' | 'fullScreen') => {
    setPlayerControl(prevState => {
      switch (control) {
        case 'play':
          return { ...prevState, isPlaying: !prevState.isPlaying };
        case 'mute':
          return { ...prevState, isMuted: !prevState.isMuted };
        case 'fullScreen':
          if (videoPlayer.current && !prevState.isFullScreen) {
            videoPlayer.current.presentFullscreenPlayer();
          }
          return { ...prevState, isFullScreen: !prevState.isFullScreen };
        default:
          return prevState;
      }
    });
  };

  return {
    playerControl,
    videoHeight,
    changeVideoHeight,
    manageControlsHandler,
    videoPlayer,
  };
};

export default VideoPlayerViewModal;
