import React from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {ScreenName, StackParamList} from 'views';
import MainScreen from 'views/Main';

export const navigationRef = createNavigationContainerRef<StackParamList>();

const Stack = createStackNavigator<StackParamList>();

const Navigation = (): React.ReactElement => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={ScreenName.MainScreen}>
        <Stack.Screen name={ScreenName.MainScreen} component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;