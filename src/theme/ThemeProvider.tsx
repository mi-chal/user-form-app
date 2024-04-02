import React, {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext({
  toggleTheme: () => {},
  isThemeDark: false,
});

export const ThemeProvider = ({children}: ThemeProviderProps) => {
  const [isThemeDark, setIsThemeDark] = useState(false);

  const theme = isThemeDark ? MD3DarkTheme : MD3LightTheme;

  const toggleTheme = useCallback(() => {
    setIsThemeDark(prevTheme => !prevTheme);
  }, []);

  const themeProviderValue = useMemo(
    () => ({
      isThemeDark,
      toggleTheme,
    }),
    [isThemeDark, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={themeProviderValue}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
