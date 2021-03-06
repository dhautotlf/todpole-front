import * as React from 'react';
import { ActivityIndicator } from 'react-native';
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
import User from '../screens/User';
import FilterModal from '../screens/FilterModal';
import StepIndicator from '../components/StepIndicator';
import Material from '../screens/MaterialsModal';
import { isAuthenticated } from '../hooks';

import CreateIcon from '../assets/icons/create.svg';
import HomeIcon from '../assets/icons/home.svg';
import BookmarkIcon from '../assets/icons/bookmarked.svg';
import BackButtonIcon from '../assets/icons/back.svg';
import { ThemeContext } from 'styled-components/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const sharedHeader = () => {
  const { colors } = React.useContext(ThemeContext);
  return {
    headerBackImage: () => <BackButtonIcon color={colors.mediumGray} />,
    headerBackTitle: ' ', //cant be null or empty
    headerTitle: null,
    headerStyle: {
      shadowOpacity: 0,
    },
  };
};

const UnAuthenticatedHeaderOptions = (index) => () => {
  return {
    ...sharedHeader(),
    headerTitle: () => <StepIndicator count={3} selectedIndex={index} />,
  };
};

const UnAuthenticatedStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={Welcome}
      options={UnAuthenticatedHeaderOptions(0)}
    />
    <Stack.Screen
      name="CreateToddler"
      component={CreateToddler}
      options={UnAuthenticatedHeaderOptions(1)}
    />
    <Stack.Screen
      name="SignIn"
      component={SignIn}
      options={UnAuthenticatedHeaderOptions(2)}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={UnAuthenticatedHeaderOptions(2)}
    />
  </Stack.Navigator>
);

const DiscoverStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Discover" component={Discover} options={hideHeader} />
    <Stack.Screen
      name="ActivityDetail"
      component={ActivityDetail}
      options={{ ...sharedHeader(), headerTransparent: true }}
    />
  </Stack.Navigator>
);

const HomeTab = () => {
  const themeContext = React.useContext(ThemeContext);

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: themeContext.colors.black,
        inactiveTintColor: themeContext.colors.mediumGray,
      }}
      screenOptions={hideHeader}
    >
      <Tab.Screen
        name="DiscoverStack"
        component={DiscoverStack}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="CreateActivity"
        component={CreateActivity}
        options={{
          tabBarIcon: CreateIcon,
        }}
      />
      <Tab.Screen
        name="Saved"
        component={Saved}
        options={{
          // eslint-disable-next-line react/display-name, react/prop-types
          tabBarIcon: ({ size, color }) => {
            return (
              <BookmarkIcon
                width={size}
                height={size}
                style={{ color: color }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const ModalStack = createStackNavigator();
const HomeTabWithSearch = () => (
  <ModalStack.Navigator mode="modal">
    <ModalStack.Screen
      name="HomeStack"
      component={HomeTab}
      options={{ headerShown: false }}
    />
    <ModalStack.Screen
      name="FilterModal"
      component={FilterModal}
      options={sharedHeader()}
    />
    <ModalStack.Screen name="User" component={User} options={sharedHeader()} />
    <ModalStack.Screen
      name="Material"
      component={Material}
      options={sharedHeader()}
    />
  </ModalStack.Navigator>
);

const Navigator = () => {
  const { data: isSignedIn, isRestoring } = isAuthenticated();
  if (isRestoring) return <ActivityIndicator />;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={hideHeader}>
        {isSignedIn && (
          <Stack.Screen name="HomeTab" component={HomeTabWithSearch} />
        )}
        {!isSignedIn && (
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
