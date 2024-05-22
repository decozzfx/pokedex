import { ViewStyle, TextInputProps, StyleProp } from 'react-native';

export interface InputBorderProps {
  value: string;
  placeholder: string;
  onChangeText?(text: string): void;
  onEndEditing?: () => void;
  editable?: boolean;
  restProps?: TextInputProps;
  style?: StyleProp<ViewStyle>;
  error?: string;
  backgroundColor?: string;
  color?: string;
  multiline?: boolean;
  autoCapitalize?: any;
  textAlignVertical?: string;
  keyboardType?: string | undefined;
}
