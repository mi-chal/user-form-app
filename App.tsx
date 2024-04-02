import React from 'react';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {ThemeProvider} from './src/theme/ThemeProvider';
import {AppContent} from './src/containers/app-content/AppContent';

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <KeyboardProvider>
          <AppContent />
        </KeyboardProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
