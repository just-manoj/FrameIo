import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { screenNames } from '../const/ScreenNames';
import VideoPlayer from '../views/VideoPlayer';

const AppNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={screenNames.videoPlayer} component={VideoPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
