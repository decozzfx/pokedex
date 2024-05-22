import { Pressable, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { InputString } from '@components-derivatives/input/index';
import { Colors } from '@configs/index';
import { RadioPickerModal } from '@components-modals/index';

type IOptions = {
  name: string;
  value: string;
  obj: object;
};
interface IProps {
  onChangeText: (val: any) => void;
  options: IOptions[];
  value: any;
  label: string;
  modalTitle: string;
  modalSearchablePlaceholder?: string;
  backgroundColor: string;
}

const MainComponentInputRadioPicker: React.FC<IProps> = (props) => {
  const {
    onChangeText,
    value,
    options,
    label,
    modalTitle,
    modalSearchablePlaceholder,
    backgroundColor,
  } = props;
  const [isPickerModalVisible, setIsPickerModalVisible] = useState(false);
  const [val, setValue] = useState(value);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const updateValue = useCallback(
    (_value: string) => {
      setIsPickerModalVisible(false);

      setValue(_value);
      if (onChangeText) {
        onChangeText(_value);
      }
    },
    [onChangeText],
  );
  const RenderMain = useMemo(() => {
    return (
      <View>
        <Pressable onPress={() => setIsPickerModalVisible(true)}>
          <InputString
            {...props}
            value={val}
            pointerEvents="none"
            editable={false}
            rightIcon="down"
            rightIconColor={Colors.main.inactiveGray}
            onChangeText={(valuee: string) => updateValue(valuee)}
          />
          <RadioPickerModal
            isActive={isPickerModalVisible}
            onClosePress={() => setIsPickerModalVisible(false)}
            value={val}
            onShow={() => {}}
            onSubmit={(valueRadio) => updateValue(valueRadio)}
            options={options ?? []}
            title={modalTitle}
            submitLabel={label}
            searchablePlaceholder={modalSearchablePlaceholder}
            backgroundColor={backgroundColor}
            leftContentPosition={false}
          />
        </Pressable>
      </View>
    );
  }, [
    backgroundColor,
    isPickerModalVisible,
    label,
    modalSearchablePlaceholder,
    modalTitle,
    options,
    props,
    updateValue,
    val,
  ]);
  return RenderMain;
};

export default MainComponentInputRadioPicker;
