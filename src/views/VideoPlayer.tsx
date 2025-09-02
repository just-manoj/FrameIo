import { View, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import styles from '../styles/VideoPlayerStyles';

import sample from '../assets/video/Sample.mp4';
import VideoPlayerViewModal from '../viewModal/VideoPlayerViewModal';

const VideoPlayer = () => {
  const screenWidth = Dimensions.get('window').width;

  const views = VideoPlayerViewModal();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Video
        ref={views.videoPlayer}
        source={sample}
        style={[
          styles.videoPlayer,
          {
            height: views.videoHeight,
            width: screenWidth * 0.9,
          },
        ]}
        paused={!views.playerControl.isPlaying}
        muted={views.playerControl.isMuted}
        repeat={false}
        controls={false}
        resizeMode="cover"
        onLoad={data => {
          const { width, height } = data.naturalSize;
          if (width && height) {
            const ratio = height / width;
            views.changeVideoHeight(screenWidth * ratio);
          }
        }}
        onError={e => {
          console.log('Video error:', e);
        }}
      />
      <View style={{ height: 5 }} />
      <View style={[styles.controlsContainer, { width: screenWidth * 0.9 }]}>
        <View style={styles.secondaryControls}>
          <TouchableOpacity onPress={() => views.manageControlsHandler('play')}>
            <Ionicons
              name={views.playerControl.isPlaying ? 'pause' : 'play'}
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => views.manageControlsHandler('mute')}>
            <Fontisto
              name={views.playerControl.isMuted ? 'volume-down' : 'volume-mute'}
              size={27}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => views.manageControlsHandler('fullScreen')}
        >
          <MaterialIcons
            name={
              views.playerControl.isFullScreen
                ? 'close-fullscreen'
                : 'open-in-full'
            }
            size={27}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoPlayer;
