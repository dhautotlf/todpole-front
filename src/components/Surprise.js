import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Modal, Image, TouchableWithoutFeedback, View } from 'react-native';
import ShakeEventExpo from '../components/ShakeEventExpo';
import PropTypes from 'prop-types';

const StyledModal = styled.Modal`
  z-index: 1100;
`;

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  backgroundColor: '#rgba(0, 0, 0, 0.7)',
  z-index: 1000;
`;

const StyledImage = styled.Image`
  height: 300px;
  width: 300px;
`;

function Surprise({ onClose }) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    ShakeEventExpo.addListener(() => {
      setModalVisible(true);
    });
    return () => ShakeEventExpo.removeListener();
  }, []);

  return (
    <StyledModal
      animationType={'slide'}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
      visible={modalVisible}
      transparent={true}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          setModalVisible(false);
        }}
      >
        <StyledView>
          <TouchableWithoutFeedback onPress={() => {}}>
            <StyledImage
              source={require('../assets/images/shake.gif')}
              resizeMode="contain"
              resizeMethod="resize"
            />
          </TouchableWithoutFeedback>
        </StyledView>
      </TouchableWithoutFeedback>
    </StyledModal>
  );
}

export default Surprise;
