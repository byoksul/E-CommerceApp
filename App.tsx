/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createRef} from 'react';
import { MainStackScreen } from './src/app/navigator/main';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/app/store';

export const navigationRef = createNavigationContainerRef();
export const isMountedRef = createRef();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
    <PersistGate loading={''} persistor={persistor}>
      <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <MainStackScreen />
          </NavigationContainer>
      </SafeAreaProvider>
    </PersistGate>
  </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
