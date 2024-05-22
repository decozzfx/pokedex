import React, { useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Sizes } from '@configs/index';
import Button from '@components-generics/button';
import { TextBase } from '@components-derivatives/text';
import buttonProps from './types';
import { View, motify } from 'moti';
import { useTheme } from '@react-navigation/native';
import { PulseAnimatorContainer } from '@components-containers/index';
import Styles from './style';
import MainIcon from '@components-generics/icon';

const MotiIcon = motify(Icon)();

const ButtonFull: React.FC<buttonProps> = (props) => {
  const {
    ioniconIconName,
    children,
    borderColor = 'transparent',
    onPress,
    height,
    width,
    buttonLoading,
    padding,
    inverse,
    disabled,
    backgroundColor = Colors.base.background,
    borderRadius,
    localTextStyle,
    size,
    line,
    buttonStyle,
    iconSize,
    nextIcon,
    textColor,
    addIcon,
    iconType = '',
  } = props;
  const { colors } = useTheme();

  const RenderMain = useMemo(() => {
    const renderTextColor = () => {
      if (textColor) {
        return textColor;
      } else if (inverse) {
        return colors.textInverse;
      } else {
        return colors.text;
      }
    };
    return (
      <PulseAnimatorContainer>
        <Button
          {...props}
          borderColor={borderColor}
          onPress={onPress}
          height={height || 50}
          width={width}
          paddingHorizontal={padding || 16}
          inverse={inverse}
          backgroundColor={disabled ? colors.buttonDisabled : backgroundColor}
          borderRadius={borderRadius}
        >
          {buttonLoading ? (
            <ActivityIndicator
              color={colors.text}
              style={buttonStyle}
              size={iconSize || Sizes.text.xl.size}
            />
          ) : (
            <View style={Styles.btnContent}>
              {iconType !== '' && (
                <MainIcon
                  name={iconType}
                  size={iconSize || 20}
                  color={textColor || colors.text}
                  style={{ marginRight: 12 }}
                />
              )}
              {ioniconIconName ? (
                <Icon
                  name={ioniconIconName}
                  size={iconSize || 20}
                  color={textColor || colors.text}
                  style={{ marginRight: 12 }}
                />
              ) : null}
              <TextBase
                textStyle={localTextStyle}
                size={size || 18}
                line={line || 24}
                color={renderTextColor()}
              >
                {children}
              </TextBase>
            </View>
          )}
          {!buttonLoading && nextIcon ? (
            <MotiIcon
              name="md-arrow-forward"
              transition={{ type: 'timing', duration: 700, loop: true }}
              from={{
                opacity: 0,
                scale: 0.5,
                translateX: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1.2,
                translateY: 0,
              }}
              exit={{
                opacity: 0.2,
                translateX: 100,
                scale: 0.4,
              }}
              size={25}
              style={{
                color: colors.text,
                position: 'absolute',
                right: 12,
              }}
            />
          ) : null}
          {addIcon ? (
            <Icon
              name="md-add"
              style={{ position: 'absolute', right: 12 }}
              size={iconSize || Sizes.text.xl.size}
              color={textColor || colors.text}
            />
          ) : null}
        </Button>
      </PulseAnimatorContainer>
    );
  }, [
    ioniconIconName,
    addIcon,
    backgroundColor,
    borderColor,
    borderRadius,
    buttonLoading,
    buttonStyle,
    children,
    colors.buttonDisabled,
    colors.text,
    colors.textInverse,
    disabled,
    height,
    iconSize,
    iconType,
    inverse,
    line,
    localTextStyle,
    nextIcon,
    onPress,
    padding,
    props,
    size,
    textColor,
    width,
  ]);

  return RenderMain;
};

export default ButtonFull;
