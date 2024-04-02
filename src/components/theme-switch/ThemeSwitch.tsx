import React, {useContext} from 'react';
import {ThemeContext} from '../../theme/ThemeProvider';
import {Switch} from 'react-native-paper';

export const ThemeSwitch = () => {
  const {toggleTheme, isThemeDark} = useContext(ThemeContext);

  return <Switch value={isThemeDark} onValueChange={toggleTheme} />;
};
