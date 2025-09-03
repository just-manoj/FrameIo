import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';

import { texts } from '../../const/Text';
import { commentsData } from '../../const/Data';
import { timeHhMm, timeMmSs } from '../../util/Time';
import { colors } from '../../const/Colors';
import styles from '../../styles/VideoPlayerStyles';
import { CommentsListProps } from '../../modal/VideoPlayer';

const CommentsList: React.FC<CommentsListProps> = ({ moveVideoPosition }) => {
  return (
    <View style={{ flex: 0.9, width: '100%' }}>
      <View style={styles.commentsContainer}>
        <Text>{texts.comments}</Text>
        <View style={styles.lengthText}>
          <Text>{commentsData.length}</Text>
        </View>
      </View>
      <FlatList
        data={commentsData}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        style={{ height: '35%' }}
        renderItem={({ item }) => (
          <View style={styles.commentBox}>
            <View style={styles.primaryNameContainer}>
              <View style={styles.secondaryNameContainer}>
                <Image source={{ uri: item.profileUrl }} style={styles.image} />
                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                <Entypo name="dot-single" size={20} color={colors.gray} />
                <Text style={styles.cmdTime}>
                  {timeHhMm(item.cmdTime).toUpperCase()}
                </Text>
              </View>
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={colors.gray}
              />
            </View>
            <View style={styles.cmdContainer}>
              <TouchableOpacity
                onPress={() => moveVideoPosition(timeMmSs(item.timestamp))}
              >
                <Text style={styles.timeStamp}>{item.timestamp}</Text>
              </TouchableOpacity>
              <Text>{item.comment}</Text>
            </View>
            <View style={styles.thirdContainer}>
              <Entypo name="emoji-happy" size={20} color={colors.gray} />
              <Text style={{ color: colors.green }}>{texts.reply}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CommentsList;
