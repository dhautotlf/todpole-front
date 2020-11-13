import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/style/theme';
import Navigator from './src/navigator';
import store from './src/store';

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
