import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './src/reducers';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/style/theme';
import Navigator from './src/navigator';

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
          <StatusBar style="auto" />
          <Navigator />
      </ThemeProvider>
    </Provider>
  );
}
