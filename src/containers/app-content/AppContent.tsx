import React from 'react';

import {useTheme} from 'react-native-paper';
import {UserForm} from '../../screens/user-form';
import {ThemeSwitch} from '../../components/theme-switch';
import {SafeAreaView} from 'react-native-safe-area-context';

export const AppContent = () => {
  const {colors} = useTheme();

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
        paddingHorizontal: 16,
      }}>
      <ThemeSwitch />
      <UserForm />
    </SafeAreaView>
  );
};
