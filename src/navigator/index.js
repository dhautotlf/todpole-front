import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import ActivityDetail from '../screens/ActivityDetail';
import CreateActivity from '../screens/CreateActivity';
import CreateToddler from '../screens/CreateToddler';
import Discover from '../screens/Discover';
// import Saved from '../screens/Saved';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Welcome from '../screens/Welcome';
import User from '../screens/User';
import { isAuthenticated } from '../hooks';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const UnAuthenticatedStack = () => (
  <Stack.Navigator screenOptions={hideHeader}>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="CreateToddler" component={CreateToddler} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

const HomeTab = () => (
  <Tab.Navigator screenOptions={hideHeader}>
    <Tab.Screen name="Discover" component={Discover} />
    <Tab.Screen name="CreateActivity" component={CreateActivity} />
    <Tab.Screen name="User" component={User} />
  </Tab.Navigator>
);

const Navigator = () => {
  const { data: isSignedIn, isLoading } = isAuthenticated();
  console.log();
  if (isLoading) return <ActivityIndicator />;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={hideHeader}>
        {isSignedIn ? (
          <Stack.Screen name="HomeTab" component={HomeTab} />
        ) : (
          <Stack.Screen
            name="UnAuthenticatedStack"
            component={UnAuthenticatedStack}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const hideHeader = {
  header: () => {},
};

export default Navigator;
