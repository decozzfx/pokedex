import { View, TextInput } from 'react-native';
import React from 'react';
import styles from './styles';
import Spacer from '@components-containers/spacer';
import { TextS, TextXS } from '@components-derivatives/text';
import { Colors } from '@configs/index';

const InputBorderWithText = (props: any) => {
  const {
    leftIcon,
    rightIcon,
    title,
    placeholder,
    value,
    onChangeText,
    error,
    ...restProps
  } = props;
  const renderLeftIcon = () => {
    if (leftIcon) {
      return leftIcon;
    }
    return null;
  };

  const renderRightIcon = () => {
    if (rightIcon) {
      return rightIcon;
    }
    return null;
  };

  const renderTitle = () => {
    if (title) {
      return (
        <>
          <TextS>{title}</TextS>
          <Spacer height={5} />
        </>
      );
    }
    return null;
  };

  const onSetText = (text: string) => {
    onChangeText(text);
  };
  const renderMain = () => {
    return (
      <>
        {renderTitle()}
        <View style={styles.inputContainer}>
          {renderLeftIcon()}
          <Spacer width={10} />
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onSetText}
            style={styles.input}
            backgroundColor={Colors.base.baseWhite}
            color={Colors.base.black}
            placeholderTextColor={Colors.base.black05}
            {...restProps}
          />
          {renderRightIcon()}
        </View>
        {error && (
          <>
            <Spacer height={5} />
            <TextXS color={Colors.main.bloodRed}>{error}</TextXS>
          </>
        )}
      </>
    );
  };
  return renderMain();
};

export default InputBorderWithText;
