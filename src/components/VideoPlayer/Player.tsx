import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Svg, Path } from 'react-native-svg';

import styles from '../../styles/VideoPlayerStyles';
import Sample from '../../assets/video/Sample.mp4';
import { PlayerProps } from '../../modal/VideoPlayer';
import { GestureResponderEvent } from 'react-native/types_generated/index';

const Player: React.FC<PlayerProps> = ({
  videoPlayer,
  playerControl,
  videoHeight,
  changeVideoHeight,
  managePlayerDurationHandler,
  manageControlsHandler,
  changeDrawingData,
  drawingData,
  moveVideoPosition,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const onTouchMove = (event: GestureResponderEvent) => {
    if (!playerControl.canDraw) {
      return;
    }
    const currentPath = [...drawingData.tempPath];
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const newPoint = `${currentPath.length <= 0 ? 'M' : ''}${locationX.toFixed(
      0,
    )},${locationY.toFixed(0)}`;
    currentPath.push(newPoint);
    changeDrawingData('temp', currentPath);
  };

  const onTouchEnd = () => {
    if (!playerControl.canDraw) {
      return;
    }
    changeDrawingData('path', drawingData.tempPath);
    changeDrawingData('temp', []);
  };

  const onTouchMovement = (event: GestureResponderEvent) => {
    if (playerControl.canDraw) {
      return;
    }
    if (!playerControl.movement) {
      managePlayerDurationHandler('movement', true);
    }
    const barWidth = screenWidth * 0.9;
    const { locationX } = event.nativeEvent;
    const posX = Math.max(0, Math.min(barWidth, locationX));
    const percentage = posX / barWidth;
    const newTime = percentage * playerControl.totalDuration;
    moveVideoPosition(null, +newTime.toFixed(1));
  };

  const onTouchMovementEnd = () => {
    managePlayerDurationHandler('movement', false);
  };

  return (
    <View style={styles.playerContainer}>
      {!playerControl.isPlaying && playerControl.canDisplay && (
        <View
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={[
            styles.videoPlayer,
            styles.drawerContainer,
            {
              height: videoHeight,
              width: screenWidth * 0.9,
            },
          ]}
        >
          <Svg>
            <Path
              d={drawingData.path.join(' ')}
              stroke={drawingData.colorCode}
              fill={'transparent'}
              strokeWidth={1.5}
              strokeLinejoin="round"
              strokeLinecap="round"
            ></Path>
            <Path
              key={'temp'}
              d={drawingData.tempPath.join(' ')}
              stroke={drawingData.colorCode}
              fill={'transparent'}
              strokeWidth={1.5}
              strokeLinejoin="round"
              strokeLinecap="round"
            ></Path>
          </Svg>
        </View>
      )}
      {!playerControl.canDraw && (
        <View
          onTouchMove={onTouchMovement}
          onTouchEnd={onTouchMovementEnd}
          style={[
            styles.videoPlayer,
            styles.drawerContainer,
            {
              height: videoHeight,
              width: screenWidth * 0.9,
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 20,
            },
          ]}
        >
          {playerControl.movement && (
            <Text style={{ color: 'white', fontSize: 40, elevation: 2 }}>{`${
              playerControl.currentTime
            } / ${playerControl.totalDuration.toFixed(1)}`}</Text>
          )}
        </View>
      )}
      <Video
        ref={videoPlayer}
        source={Sample}
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
        progressUpdateInterval={5}
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
          if (!playerControl.movement) {
            managePlayerDurationHandler('current', data.currentTime);
          }
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
