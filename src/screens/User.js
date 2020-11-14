import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import BasicButton from '../components/BasicButton';
import { signOut } from '../reducers/session';

const ScreenWrapper = styled.View`
  display: flex;
  flex: 1;
`;

function User() {
  const dispatch = useDispatch();
  const logout = () => dispatch(signOut());

  return (
    <ScreenWrapper>
      <BasicButton label={'logout'} onPress={logout} />
    </ScreenWrapper>
  );
}

User.propTypes = {
  displayName: PropTypes.string,
};

User.defaultProps = {
  displayName: 'User to Jamrock',
};

export default User;
