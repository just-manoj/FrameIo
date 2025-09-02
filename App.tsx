import { View, Text } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView>
      <View>
        <Text>App</Text>
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
