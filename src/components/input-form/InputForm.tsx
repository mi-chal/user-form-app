import React from 'react';
import {FieldValues, UseControllerProps, useController} from 'react-hook-form';
import {TextInput, TextInputProps} from 'react-native-paper';

type InputFormProps<T extends FieldValues> = UseControllerProps<T> &
  TextInputProps;

export const InputForm = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  ...props
}: InputFormProps<T>) => {
  const {field, fieldState} = useController({control, name, defaultValue});

  return (
    <TextInput
      {...props}
      autoCapitalize="none"
      autoCorrect={false}
      mode="outlined"
      value={field.value}
      onChangeText={field.onChange}
      error={!!fieldState.error}
    />
  );
};
