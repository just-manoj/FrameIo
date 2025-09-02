import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import AppNavigation from './src/navigation/AppNavigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <AppNavigation />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
