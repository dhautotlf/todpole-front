import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import theme from './src/style/theme';
import Navigator from './src/navigator';
import store from './src/store';

// mecessary for react native debugger inspect network inspect
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
global.FormData = global.originalFormData || global.FormData;
if (window.FETCH_SUPPORT) {
  window.FETCH_SUPPORT.blob = false;
} else {
  global.Blob = global.originalBlob || global.Blob;
  global.FileReader = global.originalFileReader || global.FileReader;
}
// end

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;
export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StyledSafeAreaView>
          <StatusBar style="dark" />
          <Navigator />
        </StyledSafeAreaView>
      </ThemeProvider>
    </Provider>
  );
}
