import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ActivityDetail from '../screens/ActivityDetail';
import CreateActivity from '../screens/CreateActivity';
import CreateToddler from '../screens/CreateToddler';
import Discover from '../screens/Discover';
import Saved from '../screens/Saved';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Welcome from '../screens/Welcome';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Discover" component={Discover} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
