import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {TouchableRipple, Button, Modal, Portal, Text} from 'react-native-paper';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, useWatch} from 'react-hook-form';
import {InputForm} from '../../components/input-form';
import {UserFormDataType, userFormSchema} from './schema';
import WheelPicker from 'react-native-wheely';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ACCOUNT_TYPE_OPTIONS = ['Advanced', 'Manual'];

export const UserForm = () => {
  const [isAccountTypeModalVisible, setIsAccountTypeModalVisible] =
    useState(false);
  const {control, handleSubmit, setValue} = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      accountType: 'Advanced',
      userName: '',
      password: '',
      serverAddress: '',
      serverPath: '',
      port: undefined,
      useSSL: true,
    },
  });

  const {bottom} = useSafeAreaInsets();

  const isSSLChecked = useWatch({control, name: 'useSSL'});
  const accountType = useWatch({control, name: 'accountType'});

  const onAccountTypePress = () => {
    setIsAccountTypeModalVisible(prevState => !prevState);
  };

  const toggleUseSSL = () => {
    setValue('useSSL', !isSSLChecked);
  };

  const hideAccountTypeModal = () => {
    setIsAccountTypeModalVisible(false);
  };

  const onSubmitForm = handleSubmit((formValues: UserFormDataType) => {
    console.log({formValues});
    Alert.alert('User Form', JSON.stringify(formValues));
  });

  return (
    <>
      <View style={styles.container}>
        <InputForm
          control={control}
          name="accountType"
          label="Account Type"
          editable={false}
          onPressIn={onAccountTypePress}
        />
        <InputForm
          control={control}
          name="userName"
          label="User Name"
          placeholder="name@example.com"
        />
        <InputForm
          control={control}
          name="password"
          label="Password"
          secureTextEntry
        />
        <InputForm
          control={control}
          name="serverAddress"
          label="Server Address"
        />
        {accountType === 'Advanced' && (
          <View style={styles.advancedAccountTypeFields}>
            <InputForm
              control={control}
              name="serverPath"
              label="Server Path"
            />
            <View style={styles.row}>
              <InputForm
                control={control}
                name="port"
                label="Port"
                keyboardType="numeric"
                style={styles.portField}
              />
              <TouchableRipple onPress={toggleUseSSL}>
                <View style={styles.row}>
                  <View
                    style={[
                      styles.checkbox,
                      // eslint-disable-next-line react-native/no-inline-styles
                      {backgroundColor: isSSLChecked ? '#6750A4' : 'white'},
                    ]}
                  />
                  <Text>Use SSL</Text>
                </View>
              </TouchableRipple>
            </View>
          </View>
        )}

        <Button mode="contained" onPress={onSubmitForm}>
          Submit
        </Button>
      </View>
      <Portal>
        <Modal
          visible={isAccountTypeModalVisible}
          onDismiss={hideAccountTypeModal}
          contentContainerStyle={[
            styles.accountTypeBottomSheet,
            {marginBottom: -bottom},
          ]}>
          <WheelPicker
            selectedIndex={ACCOUNT_TYPE_OPTIONS.findIndex(
              option => option === accountType,
            )}
            options={ACCOUNT_TYPE_OPTIONS}
            onChange={index =>
              setValue('accountType', ACCOUNT_TYPE_OPTIONS[index])
            }
          />
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  advancedAccountTypeFields: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    gap: 16,
  },
  portField: {
    width: '100%',
  },
  checkbox: {
    width: 35,
    height: 35,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6750A4',
  },
  accountTypeBottomSheet: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 'auto',
    borderRadius: 20,
  },
});
