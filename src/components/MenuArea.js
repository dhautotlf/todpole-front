import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import {
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BasicButton from '../components/BasicButton';
import PropTypes from 'prop-types';
import { translations } from '../constants/translations';

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const DiscoverButton = styled.View`
    margin-right: 13px;
`;

const SavedButton = styled.View``;

function MenuArea() {
  const [selectedButton, setSelectedButton] = useState('discover');
  const navigation = useNavigation();

  useCallback(() => {
      setValue(v => !v);
    }, []);

  const onDiscoverClicked = useCallback(() => {
    setSelectedButton('discover');
    navigation.navigate('Discover');
  }, []);

  const onSavedClicked = useCallback(() => {
    setSelectedButton('saved');
    navigation.navigate('Saved')
  }, []);

  return (
    <Wrapper>
      <DiscoverButton>
        <BasicButton
          label={translations.saved_header_title1}
          onPress={onDiscoverClicked}
          selected={selectedButton === "discover"}
        />
      </DiscoverButton>
      <SavedButton>
        <BasicButton
          label={translations.saved_header_title2}
          onPress={onSavedClicked}
          selected={selectedButton === "saved"}
        />
      </SavedButton>
    </Wrapper>
  );
}

MenuArea.propTypes = {};

MenuArea.defaultProps = {};

export default MenuArea;
