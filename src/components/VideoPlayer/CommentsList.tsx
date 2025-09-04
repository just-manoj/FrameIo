import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { texts } from '../../const/Text';
import { timeHhMm, timeMmSs } from '../../util/Time';
import { colors } from '../../const/Colors';
import styles from '../../styles/VideoPlayerStyles';
import { CommentsListProps } from '../../modal/VideoPlayer';
import { images } from '../../const/images';

const CommentsList: React.FC<CommentsListProps> = ({
  moveVideoPosition,
  commentsList,
  deleteComment,
}) => {
  return (
    <View style={styles.commentsListContainer}>
      <View style={styles.commentsContainer}>
        <Text>{texts.comments}</Text>
        <View style={styles.lengthText}>
          <Text>{commentsList.length}</Text>
        </View>
      </View>
      <FlatList
        data={commentsList}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        style={{ height: '35%' }}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            {texts.noComments}
          </Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.commentBox}>
            <View style={styles.primaryNameContainer}>
              <View style={styles.secondaryNameContainer}>
                <Image source={images.testUser} style={styles.image} />
                <Text style={{ fontWeight: 'bold' }}>{texts.testUser}</Text>
                <Entypo name="dot-single" size={20} color={colors.gray} />
                <Text style={styles.cmdTime}>
                  {timeHhMm(item.cmdTime).toUpperCase()}
                </Text>
              </View>
              <TouchableOpacity onPress={() => deleteComment(item.id)}>
                <MaterialIcons
                  name="delete-outline"
                  size={22}
                  color={colors.gray}
                  style={{ padding: 5 }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.cmdContainer}>
              <TouchableOpacity
                onPress={() =>
                  moveVideoPosition(item.id, timeMmSs(item.timestamp))
                }
              >
                <Text style={styles.timeStamp}>{item.timestamp}</Text>
              </TouchableOpacity>
              {item.drawing && (
                <MaterialIcons name="draw" size={20} color={colors.gray} />
              )}
              <Text>{item.command}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CommentsList;
