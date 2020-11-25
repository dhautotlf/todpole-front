import React, { useState } from 'react';
import { FlatList } from 'react-native';
import CheckBox from 'react-native-check-box';
import CheckedIcon from '../assets/icons/checked_tick.svg';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { isNil, omit } from 'lodash';

const MultiSelectModalWrapper = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  background: ${(props) => props.theme.colors.white};
`;

const MultiSelectModalContentWrapper = styled.FlatList`
  flex: 1;
`;

const OptionWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-color: ${(props) => props.theme.colors.lightGray};
  border-bottom-width: 0.5px;
  border-style: solid;
`;

const StyledCheckedIcon = styled(CheckedIcon)`
  width: 17px;
  height: 17px;
`;

const StyledCheckBox = styled(CheckBox).attrs(({ theme }) => ({
  uncheckedCheckBoxColor: theme.colors.lightGray,
}))`
  width: 17px;
  height: 17px;
  padding: 0px;
  margin: 13px 13px 13px 13px;
  background: ${(props) => props.theme.colors.lightGray};
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

const MaterialItem = ({ option, onPress }) => (
  <OptionWrapper key={option.id}>
    <StyledCheckBox
      isChecked={option.selected}
      onClick={() => onPress(option, !option.selected)}
      checkedImage={<StyledCheckedIcon />}
    />
    <Label>{option.name}</Label>
  </OptionWrapper>
);

function MultiSelectModal({ options, onSelectedOptionChanged }) {
  return (
    <MultiSelectModalContentWrapper
      data={options}
      renderItem={({ item }) => (
        <MaterialItem option={item} onPress={onSelectedOptionChanged} />
      )}
      keyExtractor={({ id }) => id}
    ></MultiSelectModalContentWrapper>
  );
}

MultiSelectModal.propTypes = {
  options: PropTypes.array,
  modalVisible: PropTypes.bool,
};

MultiSelectModal.defaultProps = {
  options: [
    {
      id: 2,
      name: 'Tape',
      selected: true,
    },
    {
      id: 12,
      name: 'Tape',
      selected: false,
    },
  ],
};

export default MultiSelectModal;
