import { StyleSheet } from 'react-native';
import { colors } from '../const/Colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  videoPlayer: {
    marginTop: 50,
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  player: {
    height: '100%',
    backgroundColor: colors.green,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  secondaryControls: { flexDirection: 'row', alignItems: 'center', gap: 25 },
  commentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    margin: 20,
    marginTop: 30,
  },
  lengthText: {
    borderColor: 'lightgray',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 50,
    borderWidth: 0.3,
  },
  commentBox: {
    marginVertical: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.lightYellow,
  },
  primaryNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  cmdTime: { color: colors.gray, fontSize: 12 },
  cmdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  timeStamp: { fontWeight: '600', color: colors.green },
  thirdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 15,
  },
  commentInputContainer: {
    alignItems: 'flex-start',
    padding: 10,
    marginTop: 10,
    backgroundColor: colors.whity,
    justifyContent: 'flex-start',
    flex: 0.4,
  },
});
