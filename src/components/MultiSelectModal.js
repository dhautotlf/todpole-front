import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import CheckedIcon from '../assets/icons/checked_tick.svg';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { translations } from '../constants/translations';

const StyledModal = styled.Modal`
  z-index: 1100;
`;

const MultiSelectModalWrapper = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  margin-top: 50px;
`;

const MultiSelectModalContentWrapper = styled.View`
  flex: 1;
  margin:0 30px;
`;

const OptionWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-color: ${props => props.theme.colors.lightGray};
  border-bottom-width: 0.5px;
  border-style: solid;
`;

const StyledCheckedIcon = styled(CheckedIcon)`
  width: 17px;
  height: 17px;
`;

const StyledCheckBox = styled(CheckBox).attrs(({ theme }) => ({
  uncheckedCheckBoxColor: theme.colors.lightGray
}))`
  width: 17px;
  height: 17px;
  padding: 0px;
  margin: 13px 13px 13px 0px;
  background: ${props => props.theme.colors.lightGray};
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
`;

const Label = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
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
              <Title>Material</Title>
              {options.map((option) => (
                <OptionWrapper key={option.key}>
                  <StyledCheckBox
                    isChecked={!!selectedOptions[option.name]}
                    onClick={() =>
                      updateSelections(option, !!selectedOptions[option.name])
                    }
                    checkedImage={<StyledCheckedIcon />}
                  />
                  <Label>{option.label}</Label>
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
