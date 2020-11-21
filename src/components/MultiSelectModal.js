import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { translations } from '../constants/translations';

const StyledModal = styled.Modal`
  z-index: 1100;
`;

const MultiSelectModalWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const MultiSelectModalContentWrapper = styled.View``;

const OptionWrapper = styled.View`
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  flex-direction: row;
`;

const StyledCheckBox = styled(CheckBox)`
  width: 30px;
  height: 30px;
`;

function MultiSelectModal({ onModalVisibleChange, modalVisible, options }) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isSelected, setSelection] = useState(false);

  const updateSelections = (option, selected) => {
    setSelectedOptions({
      ...selectedOptions,
      [option.name]: !selected,
    });
  };

  return (
    <StyledModal
      animationType={'slide'}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
      visible={modalVisible}
      transparent={false}
    >
      <TouchableWithoutFeedback onPress={() => onModalVisibleChange(false)}>
        <MultiSelectModalWrapper>
          <TouchableWithoutFeedback onPress={() => {}}>
            <MultiSelectModalContentWrapper>
              <Text>Material</Text>
              {options.map((option) => (
                <OptionWrapper key={option.key}>
                  <StyledCheckBox
                    isChecked={!!selectedOptions[option.name]}
                    onClick={() =>
                      updateSelections(option, !!selectedOptions[option.name])
                    }
                  />
                  <Text>{option.label}</Text>
                </OptionWrapper>
              ))}
            </MultiSelectModalContentWrapper>
          </TouchableWithoutFeedback>
        </MultiSelectModalWrapper>
      </TouchableWithoutFeedback>
    </StyledModal>
  );
}

MultiSelectModal.propTypes = {
  options: PropTypes.array,
  modalVisible: PropTypes.bool,
};

MultiSelectModal.defaultProps = {
  options: [
    {
      name: 'tape',
      key: 'tape',
      label: 'Tape',
    },
    {
      name: 'wood',
      key: 'wood',
      label: 'Pieces of wood',
    },
    {
      name: 'paper',
      key: 'paper',
      label: 'Paper',
    },
    {
      name: 'spoon',
      key: 'spoon',
      label: 'Tea spoon',
    },
  ],
  modalVisible: false,
};

export default MultiSelectModal;
