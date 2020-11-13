import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import React from 'react';
import Navigator from './src/navigator';
import store from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Navigator />
    </Provider>
  );
}
