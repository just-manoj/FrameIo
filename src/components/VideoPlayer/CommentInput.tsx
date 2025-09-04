import { View, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import styles from '../../styles/VideoPlayerStyles';
import { texts } from '../../const/Text';
import { colors } from '../../const/Colors';
import { CommentInputProps } from '../../modal/VideoPlayer';
import { images } from '../../const/images';

const CommentInput: React.FC<CommentInputProps> = ({
  commentData,
  onChangeCommentHandler,
  totaltimeStamp,
  addNewComment,
  drawingData,
  manageControlsHandler,
  playerControl,
  changeDrawingData,
}) => {
  return (
    <View style={styles.commentInputContainer}>
      <View style={styles.thirdContainer}>
        <Image source={images.testUser} style={styles.image} />
        <TextInput
          placeholder={texts.writeComment}
          placeholderTextColor={colors.gray}
          style={styles.commentInput}
          value={commentData.comment}
          onChangeText={text => onChangeCommentHandler('comment', text)}
        />
      </View>
      <View style={styles.secondaryInputContainer}>
        <View style={[styles.thirdContainer, styles.subThirdContainer]}>
          <Dropdown
            data={totaltimeStamp}
            maxHeight={150}
            labelField="label"
            valueField="value"
            placeholder="00:00"
            value={commentData.timestamp}
            containerStyle={styles.dropDownContainer}
            style={styles.dropDown}
            dropdownPosition="top"
            renderItem={item => (
              <View style={styles.renderingContainer}>
                <Octicons
                  name="clock"
                  size={20}
                  color={colors.gray}
                  style={{ marginRight: 5 }}
                />
                <Text style={{ color: 'black' }}>{item.label}</Text>
              </View>
            )}
            renderLeftIcon={() => (
              <Octicons
                name="clock"
                size={20}
                color={colors.gray}
                style={{ marginRight: 5 }}
              />
            )}
            onChange={item => {
              onChangeCommentHandler('timestamp', item.value);
            }}
          />
          <View style={[styles.thirdContainer, { marginTop: 0 }]}>
            <TouchableOpacity
              onPress={() => {
                manageControlsHandler('canDraw', !playerControl.canDraw);
              }}
            >
              {
                <FontAwesome6
                  name="pencil"
                  size={25}
                  color={playerControl.canDraw ? colors.black : colors.gray}
                  style={{ marginRight: 5 }}
                />
              }
            </TouchableOpacity>
            {playerControl.canDraw && (
              <View style={{ gap: 5 }}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
                >
                  <TouchableOpacity
                    style={[
                      styles.colorBox,
                      {
                        backgroundColor: colors.red,
                        borderWidth:
                          drawingData.colorCode === colors.red ? 2 : 0,
                      },
                    ]}
                    onPress={() => changeDrawingData('color', colors.red)}
                  />
                  <TouchableOpacity
                    style={[
                      styles.colorBox,
                      {
                        backgroundColor: colors.green,
                        borderWidth:
                          drawingData.colorCode === colors.green ? 2 : 0,
                      },
                    ]}
                    onPress={() => changeDrawingData('color', colors.green)}
                  />
                  <TouchableOpacity
                    style={[
                      styles.colorBox,
                      {
                        backgroundColor: colors.black,
                        borderWidth:
                          drawingData.colorCode === colors.black ? 2 : 0,
                        borderColor: colors.white,
                      },
                    ]}
                    onPress={() => changeDrawingData('color', colors.black)}
                  />
                </View>

                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
                >
                  <TouchableOpacity
                    style={[
                      styles.colorBox,
                      {
                        backgroundColor: colors.blue,
                        borderWidth:
                          drawingData.colorCode === colors.blue ? 2 : 0,
                      },
                    ]}
                    onPress={() => changeDrawingData('color', colors.blue)}
                  />
                  <TouchableOpacity
                    style={[
                      styles.colorBox,
                      {
                        backgroundColor: colors.white,
                        borderWidth:
                          drawingData.colorCode === colors.white ? 2 : 0,
                      },
                    ]}
                    onPress={() => changeDrawingData('color', colors.white)}
                  />
                  <TouchableOpacity
                    style={[
                      styles.colorBox,
                      {
                        backgroundColor: colors.darkYellow,
                        borderWidth:
                          drawingData.colorCode === colors.darkYellow ? 2 : 0,
                      },
                    ]}
                    onPress={() =>
                      changeDrawingData('color', colors.darkYellow)
                    }
                  />
                </View>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={addNewComment} style={styles.btnContainer}>
            <Text style={{ color: colors.white }}>{texts.comment}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommentInput;
