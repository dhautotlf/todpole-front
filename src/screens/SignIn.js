import React from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { authenticate } from '../reducers/session';
import PropTypes from 'prop-types';

function SignIn({ displayName }) {
  const dispatch = useDispatch();

  const signIn = () =>
    dispatch(authenticate({ login: 'email@email.com', password: 'password' }));

  return (
    <View>
      <Text>{displayName}</Text>
      <Text onPress={() => {}}>NEXT</Text>
      <Text onPress={signIn}>Login</Text>
    </View>
  );
}

SignIn.propTypes = {
  displayName: PropTypes.string,
};

SignIn.defaultProps = {
  displayName: 'SignIn',
};

export default SignIn;
