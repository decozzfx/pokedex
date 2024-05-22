import { Colors } from '@configs/index';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  inputContainer: {
    backgroundColor: Colors.main.baseWhite,
    height: 46,
    borderRadius: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
});
