import { StyleSheet } from 'react-native';

import { Colors, Sizes } from '@configs/index';

const Style = StyleSheet.create({
  main: {
    flex: -1,
    fontSize: 16,
    fontFamily: Sizes.fontFamily.regular,
    lineHeight: 24,
    letterSpacing: 0,
    color: Colors.main.fontGray,
    padding: 0,
    width: '100%',
  },
});

export default Style;
