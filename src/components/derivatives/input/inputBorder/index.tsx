import { View, TextInput } from 'react-native';
import React from 'react';
import Style from './style';
import { InputBorderProps } from './types';
import Spacer from '@components-containers/spacer';
import { TextXS } from '@components-derivatives/text';
import { Colors } from '@configs/index';

// eslint-disable-next-line react/function-component-definition
const InputBorder: React.FC<InputBorderProps> = (props) => {
  const {
    value,
    onChangeText,
    onEndEditing,
    placeholder,
    style,
    error,
    textAlignVertical,
    keyboardType,
    ...restProps
  } = props;
  const inputStyle = {
    textAlignVertical,
  };
  return (
    <>
      <View style={[Style.inputContainer, style]}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
          backgroundColor={Colors.base.baseWhite}
          color={Colors.base.black}
          placeholderTextColor={Colors.base.black05}
          style={inputStyle}
          keyboardType={keyboardType}
          {...restProps}
        />
      </View>
      {error !== '' && (
        <>
          <Spacer height={5} />
          <TextXS color={Colors.text.error}>{error}</TextXS>
        </>
      )}
    </>
  );
};

export default InputBorder;
