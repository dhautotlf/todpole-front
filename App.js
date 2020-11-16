import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import theme from './src/style/theme';
import Navigator from './src/navigator';
import store from './src/store';

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;
export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StyledSafeAreaView>
          <StatusBar style="auto" />
          <Navigator />
        </StyledSafeAreaView>
      </ThemeProvider>
    </Provider>
  );
}
