import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import Video from 'react-native-video';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Svg, Path } from 'react-native-svg';
import { GestureResponderEvent } from 'react-native';
import { runOnJS } from 'react-native-reanimated';

import styles from '../../styles/VideoPlayerStyles';
import Sample from '../../assets/video/Sample.mp4';
import { PlayerProps } from '../../modal/VideoPlayer';
import { colors } from '../../const/Colors';
import { timeMmSs } from '../../util/Time';
import ArchorComment from './ArchorComment';

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
  changeAnchorCmdHandler,
  anchorCommentsData,
  addNewAnchorComment,
  anchorCommentsList,
  changeCommentBoxSize,
  commentBoxSize,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const tempPathRef = useRef<string[]>([]);

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

  const onTouchAnchorEnd = (event: GestureResponderEvent) => {
    if (anchorCommentsData.x > -1 || anchorCommentsData.y > -1) {
      return;
    }
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    changeAnchorCmdHandler('enablePoint', false);
    changeAnchorCmdHandler('x', locationX);
    changeAnchorCmdHandler('y', locationY);
    managePlayerDurationHandler('movement', false);
  };

  const pan = Gesture.Pan()
    .onStart(event => {
      if (!playerControl.canDraw) return;
      const { x, y } = event;
      const newPoint = `${
        tempPathRef.current.length <= 0 ? 'M' : ''
      }${x.toFixed(0)},${y.toFixed(0)}`;
      tempPathRef.current.push(newPoint);
      runOnJS(changeDrawingData)('temp', [...tempPathRef.current]);
    })
    .onUpdate(event => {
      if (!playerControl.canDraw) return;
      const { x, y } = event;
      const newPoint = `${
        tempPathRef.current.length <= 0 ? 'M' : ''
      }${x.toFixed(0)},${y.toFixed(0)}`;
      tempPathRef.current.push(newPoint);
      runOnJS(changeDrawingData)('temp', [...tempPathRef.current]);
    })
    .onEnd(() => {
      if (!playerControl.canDraw) return;
      runOnJS(changeDrawingData)('path', [...tempPathRef.current]);
      tempPathRef.current = [];
      runOnJS(changeDrawingData)('temp', []);
    });

  return (
    <View style={styles.playerContainer}>
      {/* drawing */}
      {((!playerControl.isPlaying && playerControl.canDisplay) ||
        playerControl.canDraw) && (
        <View
          style={[
            styles.videoPlayer,
            styles.drawerContainer,
            {
              height: videoHeight,
              width: screenWidth * 0.9,
            },
          ]}
        >
          <GestureDetector gesture={pan}>
            <Svg height={videoHeight} width={screenWidth * 0.9}>
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
          </GestureDetector>
        </View>
      )}
      {/* finger movement */}
      {!playerControl.canDraw && (
        <View
          onTouchMove={onTouchMovement}
          onTouchEnd={onTouchMovementEnd}
          style={[
            styles.videoPlayer,
            styles.drawerContainer,
            styles.fingerMovementContainer,
            { height: videoHeight, width: screenWidth * 0.9 },
          ]}
        />
      )}
      {/* anchor comments */}
      {!playerControl.canDraw &&
        !playerControl.isPlaying &&
        playerControl.anchorEnabled && (
          <ArchorComment
            onTouchAnchorEnd={onTouchAnchorEnd}
            screenWidth={screenWidth}
            videoHeight={videoHeight}
            anchorCommentsData={anchorCommentsData}
            commentBoxSize={commentBoxSize}
            changeCommentBoxSize={changeCommentBoxSize}
            changeAnchorCmdHandler={changeAnchorCmdHandler}
            playerControl={playerControl}
            addNewAnchorComment={addNewAnchorComment}
          />
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
      <View
        style={[
          styles.anchorIconContainer,
          {
            width: screenWidth * 0.9,
          },
        ]}
      >
        {anchorCommentsList.map((cmd, index) => {
          const sec = timeMmSs(cmd.timeStamp);
          const barWidth = screenWidth * 0.9;
          let left = (sec / playerControl.totalDuration) * barWidth - 17 / 2;
          if (left > barWidth) {
            left = barWidth;
          }

          return (
            <TouchableOpacity
              onPress={() => {
                manageControlsHandler('canDraw', false);
                manageControlsHandler('canDisplay', false);
                moveVideoPosition(null, sec);
                changeAnchorCmdHandler('enablePoint', false);
                changeAnchorCmdHandler('x', cmd.x);
                changeAnchorCmdHandler('y', cmd.y);
                changeAnchorCmdHandler('colorCode', cmd.colorCode);
                changeAnchorCmdHandler('id', cmd.id);
                changeAnchorCmdHandler('command', cmd.command);
                changeAnchorCmdHandler('timeStamp', cmd.timeStamp);
                managePlayerDurationHandler('movement', false);
                manageControlsHandler('anchorEnabled', true);
              }}
              key={index}
              style={{
                position: 'absolute',
                left,
              }}
            >
              <Ionicons
                name={
                  anchorCommentsData.id === cmd.id
                    ? 'location'
                    : 'location-outline'
                }
                size={17}
                color="white"
              />
            </TouchableOpacity>
          );
        })}
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
        <Text style={styles.timerText}>
          {`${String(Math.floor(playerControl.currentTime / 60)).padStart(
            2,
            '0',
          )}:${String(Math.floor(playerControl.currentTime % 60)).padStart(
            2,
            '0',
          )} / ${String(Math.floor(playerControl.totalDuration / 60)).padStart(
            2,
            '0',
          )}:${String(Math.floor(playerControl.totalDuration % 60)).padStart(
            2,
            '0',
          )}`}
        </Text>
        <View style={styles.anchorFullScreenContainer}>
          <TouchableOpacity
            onPress={() => {
              manageControlsHandler('play', false);
              manageControlsHandler(
                'anchorEnabled',
                !playerControl.anchorEnabled,
              );
              changeAnchorCmdHandler('enablePoint', true);
              changeAnchorCmdHandler('x', -1);
              changeAnchorCmdHandler('y', -1);
              changeAnchorCmdHandler('id', -1);
              changeAnchorCmdHandler('colorCode', colors.yellow);
              changeAnchorCmdHandler('command', '');
              manageControlsHandler('canDraw', false);
              manageControlsHandler('canDisplay', false);
            }}
          >
            <Ionicons
              name={
                playerControl.anchorEnabled ? 'location' : 'location-outline'
              }
              size={27}
              color="white"
            />
          </TouchableOpacity>
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
    </View>
  );
};

export default Player;
