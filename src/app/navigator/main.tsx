import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FC } from 'react';
import TabNavigator from './TabNavigators';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const MainStack = createNativeStackNavigator();

export const MainStackScreen: FC = () => {

  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
    <MainStack.Screen
      name="Tab"
      component={TabNavigator}
      options={{animation: 'slide_from_bottom'}}></MainStack.Screen>
    <MainStack.Screen
      name="Details"
      component={DetailScreen}
      options={{animation: 'slide_from_bottom'}}></MainStack.Screen>
    <MainStack.Screen
      name="Payment"
      component={FavoritesScreen}
      options={{animation: 'slide_from_bottom'}}></MainStack.Screen>
  </MainStack.Navigator>
  );
};
