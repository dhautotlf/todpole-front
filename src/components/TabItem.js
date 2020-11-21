import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import MenuArea from '../components/MenuArea';
import BasicButton from '../components/BasicButton';
import SearchBar from '../components/SearchBar';
import { translations } from '../constants/translations';
import { signOut } from '../reducers/session';
import BoxIcon from '../assets/icons/box.svg';

const Tab = styled.Text`
  flex-direction: column;
  color: ${(props) => props.theme.colors.black};
  padding-vertical: 5px;
  font-weight: 700;
  font-size: 14px;
`;

const SelectedIndicator = styled.View`
  height: 2px;
  background: ${(props) => props.theme.colors.yellow};
`;

const UnselectedIndicator = styled.View`
  height: 2px;
`;

function TabItem({ label, selected, onPress }) {
  return (
    <View>
      <Tab onPress={onPress}>{label}</Tab>
      {selected ? <SelectedIndicator /> : <UnselectedIndicator />}
    </View>
  );
}

TabItem.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

TabItem.defaultProps = {};

export default TabItem;
