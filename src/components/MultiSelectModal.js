import React, { useState } from 'react';
import CheckBox from 'react-native-check-box';
import CheckedIcon from '../assets/icons/checked_tick.svg';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const MultiSelectModalWrapper = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  background: ${(props) => props.theme.colors.white};
`;

const MultiSelectModalContentWrapper = styled.View`
  flex: 1;
  margin: 0 30px;
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
  margin: 13px 13px 13px 0px;
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

function MultiSelectModal({ route, options }) {
  const [selectedOptions, setSelectedOptions] = useState(
    route.params.materials,
  );

  const updateSelections = (option, selected) => {
    const newSelection = {
      ...selectedOptions,
      [option.name]: !selected,
    };
    route.params.onChangeMaterials(newSelection);
    setSelectedOptions(newSelection);
  };

  return (
    <MultiSelectModalWrapper>
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
    </MultiSelectModalWrapper>
  );
}

MultiSelectModal.propTypes = {
  route: PropTypes.any,
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
