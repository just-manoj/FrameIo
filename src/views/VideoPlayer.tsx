import { View, StatusBar } from 'react-native';
import React from 'react';

import styles from '../styles/VideoPlayerStyles';
import VideoPlayerViewModal from '../viewModal/VideoPlayerViewModal';
import Player from '../components/VideoPlayer/Player';
import CommentsList from '../components/VideoPlayer/CommentsList';
import CommentInput from '../components/VideoPlayer/CommentInput';

const VideoPlayer = () => {
  const views = VideoPlayerViewModal();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Player {...views} />
      <CommentsList moveVideoPosition={views.moveVideoPosition} />
      <CommentInput
        totaltimeStamp={views.playerControl.totaltimeStamp}
        commentData={views.commentData}
        onChangeCommentHandler={views.onChangeCommentHandler}
      />
    </View>
  );
};

export default VideoPlayer;
