import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import styles from '../../styles/VideoPlayerStyles';
import sample from '../../assets/video/Sample.mp4';
import { PlayerProps } from '../../modal/VideoPlayer';

const Player: React.FC<PlayerProps> = ({
  videoPlayer,
  playerControl,
  videoHeight,
  changeVideoHeight,
  managePlayerDurationHandler,
  manageControlsHandler,
}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{ alignItems: 'center', flex: 0 }}>
      <Video
        ref={videoPlayer}
        source={sample}
        style={[
          styles.videoPlayer,
          {
            height: videoHeight,
            width: screenWidth * 0.9,
          },
        ]}
        paused={!playerControl.isPlaying}
        muted={playerControl.isMuted}
        repeat={false}
        controls={false}
        resizeMode="cover"
        onLoad={data => {
          const { width, height } = data.naturalSize;
          if (width && height) {
            const ratio = height / width;
            changeVideoHeight(screenWidth * ratio);
          }
          managePlayerDurationHandler('total', data.duration);
        }}
        onError={e => {
          console.log('Video error:', e);
        }}
        onProgress={data => {
          managePlayerDurationHandler('current', data.currentTime);
        }}
        onEnd={() => manageControlsHandler('finish', true)}
      />
      <View
        style={{
          height: 5,
          width: screenWidth * 0.9,
        }}
      >
        <View
          style={[
            {
              width:
                (playerControl.currentTime / playerControl.totalDuration) *
                screenWidth *
                0.9,
            },
            styles.player,
          ]}
        />
      </View>
      <View style={[styles.controlsContainer, { width: screenWidth * 0.9 }]}>
        <View style={styles.secondaryControls}>
          <TouchableOpacity
            onPress={() =>
              manageControlsHandler('play', !playerControl.isPlaying)
            }
          >
            <Ionicons
              name={playerControl.isPlaying ? 'pause' : 'play'}
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              manageControlsHandler('mute', !playerControl.isMuted)
            }
          >
            <Fontisto
              name={playerControl.isMuted ? 'volume-mute' : 'volume-down'}
              size={27}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            manageControlsHandler('fullScreen', !playerControl.isFullScreen)
          }
        >
          <MaterialIcons
            name={
              playerControl.isFullScreen ? 'close-fullscreen' : 'open-in-full'
            }
            size={27}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Player;
