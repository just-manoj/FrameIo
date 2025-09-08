import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import { Dropdown } from 'react-native-element-dropdown';

import { ArchorCommentProps } from '../../modal/VideoPlayer';
import styles from '../../styles/VideoPlayerStyles.ts';
import { images } from '../../const/images.ts';
import { texts } from '../../const/Text.ts';
import { colors } from '../../const/Colors.ts';

const ArchorComment: React.FC<ArchorCommentProps> = ({
  onTouchAnchorEnd,
  screenWidth,
  videoHeight,
  anchorCommentsData,
  commentBoxSize,
  changeCommentBoxSize,
  changeAnchorCmdHandler,
  addNewAnchorComment,
  playerControl,
}) => {
  return (
    <View
      onTouchEnd={onTouchAnchorEnd}
      style={[
        styles.videoPlayer,
        styles.drawerContainer,
        {
          height: videoHeight,
          width: screenWidth * 0.9,
        },
      ]}
    >
      <View>
        {!anchorCommentsData.enablePoint && (
          <>
            <View
              style={[
                styles.dotCircle,
                {
                  backgroundColor: anchorCommentsData.colorCode,
                  top: anchorCommentsData.y,
                  left: anchorCommentsData.x,
                },
              ]}
            />
            <View
              style={[
                styles.anchorCommand,
                {
                  marginTop:
                    anchorCommentsData.y > commentBoxSize.height ? -15 : 15,
                  marginLeft:
                    anchorCommentsData.x > commentBoxSize.width - 75 ? 0 : 15,
                  borderRadius: 5,
                  padding: 5,
                  top:
                    anchorCommentsData.y > commentBoxSize.height
                      ? anchorCommentsData.y - commentBoxSize.height
                      : anchorCommentsData.y,
                  left:
                    anchorCommentsData.x > commentBoxSize.width - 50
                      ? anchorCommentsData.x - commentBoxSize.width < 0
                        ? -(anchorCommentsData.x - commentBoxSize.width)
                        : anchorCommentsData.x - commentBoxSize.width
                      : anchorCommentsData.x > commentBoxSize.width / 2.5
                      ? commentBoxSize.width - 135
                      : anchorCommentsData.x,
                },
              ]}
              onLayout={event => {
                changeCommentBoxSize(
                  event.nativeEvent.layout.width,
                  event.nativeEvent.layout.height,
                );
              }}
            >
              <View style={[styles.thirdContainer, { gap: 0 }]}>
                <Image source={images.testUser} style={styles.image} />
                <TextInput
                  placeholder={texts.writeComment}
                  placeholderTextColor={colors.gray}
                  style={[styles.commentInput, { fontSize: 14 }]}
                  value={anchorCommentsData.command}
                  onChangeText={text => changeAnchorCmdHandler('command', text)}
                />
              </View>
              <View style={styles.secondaryInputContainer}>
                <View style={[styles.thirdContainer, styles.subThirdContainer]}>
                  <Dropdown
                    data={playerControl.totaltimeStamp}
                    maxHeight={150}
                    labelField="label"
                    valueField="value"
                    placeholder="00:00"
                    value={anchorCommentsData.timeStamp}
                    containerStyle={[
                      styles.dropDownContainer,
                      styles.dropDownContainer2,
                    ]}
                    style={[styles.dropDown, styles.dropDownContainer2]}
                    dropdownPosition="top"
                    renderItem={item => (
                      <View style={styles.renderingContainer}>
                        <Octicons
                          name="clock"
                          size={15}
                          color={colors.gray}
                          style={{ marginRight: 5 }}
                        />
                        <Text style={{ color: 'black', fontSize: 12.5 }}>
                          {item.label}
                        </Text>
                      </View>
                    )}
                    renderLeftIcon={() => (
                      <Octicons
                        name="clock"
                        size={15}
                        color={colors.gray}
                        style={{ marginRight: 5 }}
                      />
                    )}
                    onChange={item => {
                      changeAnchorCmdHandler('timeStamp', item.value);
                    }}
                    placeholderStyle={{ fontSize: 12.5 }}
                    selectedTextStyle={{ fontSize: 12.5 }}
                    disable={anchorCommentsData.id > 0}
                  />
                  {anchorCommentsData.id < 0 && (
                    <TouchableOpacity
                      onPress={addNewAnchorComment}
                      style={styles.btnContainer}
                    >
                      <Text style={{ color: colors.white }}>
                        {texts.comment}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default ArchorComment;
