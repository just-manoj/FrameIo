import { View, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import styles from '../../styles/VideoPlayerStyles';
import { texts } from '../../const/Text';
import { colors } from '../../const/Colors';
import { CommentInputProps } from '../../modal/VideoPlayer';

const CommentInput: React.FC<CommentInputProps> = ({
  commentData,
  onChangeCommentHandler,
  totaltimeStamp,
}) => {
  return (
    <View style={styles.commentInputContainer}>
      <View style={styles.thirdContainer}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/85.jpg' }}
          style={styles.image}
        />
        <TextInput
          placeholder={texts.writeComment}
          placeholderTextColor={colors.gray}
          style={styles.commentInput}
        />
      </View>

      <View style={styles.secondaryInputContainer}>
        <View style={[styles.thirdContainer, styles.subThirdContainer]}>
          <Dropdown
            data={totaltimeStamp}
            maxHeight={150}
            labelField="label"
            valueField="value"
            placeholder="00:01"
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
            <FontAwesome6
              name="pencil"
              size={25}
              color={colors.gray}
              style={{ marginRight: 5 }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: colors.black,
                width: 25,
                height: 25,
              }}
            />
          </View>
          <TouchableOpacity onPress={() => {}} style={styles.btnContainer}>
            <Text style={{ color: colors.white }}>{texts.comment}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommentInput;
