import { View, Image, TextInput, Text } from 'react-native';
import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import Octicons from 'react-native-vector-icons/Octicons';

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
          style={{
            width: '100%',
          }}
        />
      </View>

      <View style={[styles.thirdContainer, { marginLeft: 10 }]}>
        <Dropdown
          data={totaltimeStamp}
          maxHeight={150}
          labelField="label"
          valueField="value"
          placeholder="00:01"
          value={commentData.timestamp}
          containerStyle={{ width: 120, marginBottom: 15 }}
          style={{
            width: 110,
            margin: 10,
            borderWidth: 1,
            borderColor: colors.gray9d,
            borderRadius: 5,
            padding: 5,
          }}
          dropdownPosition="top"
          renderItem={item => (
            <View
              style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}
            >
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
      </View>
    </View>
  );
};

export default CommentInput;
