import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BlurView} from '@react-native-community/blur';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OrderScreen from '../screens/OrderScreen';
import {ShoppingCart, Heart, Home} from 'iconsax-react-native';
import { Badge } from 'react-native-elements';
import { useAppSelector } from '../hooks/useStoreDispatch';
import theme from '../theme';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {productsWithCounts}=useAppSelector(state=>state.productCart)
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView
            overlayColor=""
            blurAmount={15}
            style={styles.BlurViewStyles}
          />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Home
              variant="Bold"
              size={25}
              color={
                focused ? theme.PRIMARY_ORANGE : theme.PRIMARYDARKGREY
              }
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Favorite"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Heart
              variant="Bold"
              size={25}
              color={
                focused ? theme.PRIMARY_ORANGE: theme.PRIMARYDARKGREY
              }
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="History"
        component={OrderScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View>
              <ShoppingCart
                variant="Bold"
                size={25}
                color={
                  focused ? theme.PRIMARY_ORANGE : theme.PRIMARYDARKGREY
                }
              />
              {productsWithCounts.length > 0 && (
                <Badge
                  value={productsWithCounts.length.toString()}
                  status="error"
                  containerStyle={{position: 'absolute', top: -4, right: -4}}
                />
              )}
            </View>
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: theme.PRIMARYBLACKRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TabNavigator;
