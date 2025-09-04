import { View, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect } from 'react';

import styles from '../styles/VideoPlayerStyles';
import VideoPlayerViewModal from '../viewModal/VideoPlayerViewModal';
import Player from '../components/VideoPlayer/Player';
import CommentsList from '../components/VideoPlayer/CommentsList';
import CommentInput from '../components/VideoPlayer/CommentInput';
import { SafeAreaView } from 'react-native-safe-area-context';

const VideoPlayer = () => {
  const views = VideoPlayerViewModal();

  useEffect(() => {
    views.connectToTable();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <StatusBar barStyle="dark-content" />
      <Player {...views} />
      <CommentsList
        moveVideoPosition={views.moveVideoPosition}
        commentsList={views.commentsList}
        deleteComment={views.deleteComment}
      />
      <CommentInput
        totaltimeStamp={views.playerControl.totaltimeStamp}
        commentData={views.commentData}
        onChangeCommentHandler={views.onChangeCommentHandler}
        addNewComment={views.addNewComment}
        drawingData={views.drawingData}
        manageControlsHandler={views.manageControlsHandler}
        playerControl={views.playerControl}
        changeDrawingData={views.changeDrawingData}
      />
    </KeyboardAvoidingView>
  );
};

export default VideoPlayer;
