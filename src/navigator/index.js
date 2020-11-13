import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ActivityDetail from '../screens/ActivityDetail';
import CreateActivity from '../screens/CreateActivity';
import CreateToddler from '../screens/CreateToddler';
import Discover from '../screens/Discover';
import Saved from '../screens/Saved';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Welcome from '../screens/Welcome';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const UnAuthenticatedStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="CreateToddler" component={CreateToddler} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

const HomeTab = () => (
  <Tab.Navigator>
    <Tab.Screen name="Discover" component={Discover} />
    <Tab.Screen name="CreateActivity" component={CreateActivity} />
  </Tab.Navigator>
);

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="UnAuthenticatedStack"
          component={UnAuthenticatedStack}
        />
        <Stack.Screen name="HomeTab" component={HomeTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;