import { StyleSheet } from 'react-native';
import { colors } from '../const/Colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, alignItems: 'center' },
  videoPlayer: {
    marginTop: 50,
    backgroundColor: colors.white,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  secondaryControls: { flexDirection: 'row', alignItems: 'center', gap: 25 },
});
