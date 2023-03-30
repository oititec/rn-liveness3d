import * as React from 'react';
import InstructionsView from './screens/InstructionsView';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack: any = createNativeStackNavigator();

import {
  startLiveness3d,
  StartLiveness3dCustomView,
} from '@oiti/rn-liveness3d';
import { StyleSheet, View, Text, Button } from 'react-native';
/* <Stack.Navigator
        initialRouteName="InstructionsView"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="InstructionsView" component={InstructionsView} />
      </Stack.Navigator> */
export default function App() {
  return <StartLiveness3dCustomView instructionView={<InstructionsView />} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
