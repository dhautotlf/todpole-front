import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './src/reducers';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const store = createStore(
  rootReducer
);

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
