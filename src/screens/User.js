import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components/native';
import RoundButton from '../components/RoundButton';
import { signOut } from '../reducers/session';
import { translations } from '../constants/translations';
import Account from '../assets/icons/user.svg';
import Toddler from '../assets/icons/toddler.svg';
import Question from '../assets/icons/question.svg';
import Info from '../assets/icons/info.svg';
import Bell from '../assets/icons/bell.svg';
import Lock from '../assets/icons/lock.svg';
import Logout from '../assets/icons/forward-arrow.svg';
import Delete from '../assets/icons/trash.svg';

const ScreenWrapper = styled.View`
  display: flex;
  flex: 1;
  padding-left: ${({ theme }) => theme.spacing.xlarge}px;
  padding-top: ${({ theme }) => theme.spacing.moderate}px;
  background: ${({ theme }) => theme.colors.white};
`;

const ItemWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.spacing.tiny}px;
`;

const LabelWrapper = styled.Text`
  text-transform: capitalize;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  color: #000000;
  margin-left: ${({ theme }) => theme.spacing.moderate}px;
`;

const IconStyle = (Icon) => styled(Icon).attrs(() => ({ color: 'white' }))``;

const {
  setting_option_account,
  setting_option_toddler,
  setting_option_help,
  setting_option_about,
  setting_option_notifications,
  setting_option_privacy,
  setting_option_logout,
  setting_option_delete,
} = translations;

function User() {
  const dispatch = useDispatch();
  const {
    colors: { green, yellow },
  } = useContext(ThemeContext);

  const logout = () => dispatch(signOut());

  const options = [
    [setting_option_account, green, Account],
    [setting_option_toddler, green, Toddler],
    [setting_option_help, green, Question],
    [setting_option_about, green, Info],
    [setting_option_notifications, yellow, Bell],
    [setting_option_privacy, yellow, Lock],
    [setting_option_logout, yellow, Logout, logout],
    [setting_option_delete, yellow, Delete],
  ];

  return (
    <ScreenWrapper>
      {options.map(([label, color, Icon, onPress]) => (
        <ItemWrapper disabled={!onPress} key={label} onPress={onPress}>
          <RoundButton
            onPress={onPress}
            Icon={IconStyle(Icon)}
            medium
            style={{ backgroundColor: color }}
          />
          <LabelWrapper>{label}</LabelWrapper>
        </ItemWrapper>
      ))}
    </ScreenWrapper>
  );
}

User.propTypes = {};

User.defaultProps = {};

export default User;
