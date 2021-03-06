import React, { useState } from 'react';
import CheckBox from 'react-native-check-box';
import CheckedIcon from '../assets/icons/checked_tick.svg';
import styled from 'styled-components/native';
import SearchBar from './SearchBar';
import PropTypes from 'prop-types';
import shallowFilter from '../utils/shallowStringFilter';

const MultiSelectModalWrapper = styled.View`
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.spacing.small}px;
  background: ${({ theme }) => theme.colors.white};
`;

const MultiSelectModalContentWrapper = styled.FlatList`
  margin-top: ${({ theme }) => theme.spacing.tiny}px;
  flex: 1;
`;

const OptionWrapper = styled.TouchableOpacity`
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

const Label = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
`;

const MaterialItem = ({ option, onPress }) => (
  <OptionWrapper
    key={option.id}
    onPress={() => onPress(option, !option.selected)}
  >
    <StyledCheckBox
      isChecked={option.selected}
      onClick={() => onPress(option, !option.selected)}
      checkedImage={<StyledCheckedIcon />}
    />
    <Label>{option.name}</Label>
  </OptionWrapper>
);

MaterialItem.propTypes = {
  option: PropTypes.object,
  onPress: PropTypes.func,
};

MaterialItem.defaultProps = {
  onPress: () => {},
};

const SEARCH_TRIGGER_CHAR_COUNT = 2;
function MultiSelectModal({ options, onSelectedOptionChanged }) {
  const [filterParam, onSearchParamChange] = useState({});
  const filterResults = (data) =>
    shallowFilter(data, filterParam.text, SEARCH_TRIGGER_CHAR_COUNT);

  return (
    <MultiSelectModalWrapper>
      <SearchBar
        value={filterParam.text}
        onChangeText={(text) => onSearchParamChange({ ...filterParam, text })}
      />
      <MultiSelectModalContentWrapper
        data={filterResults(options)}
        renderItem={({ item }) => (
          <MaterialItem option={item} onPress={onSelectedOptionChanged} />
        )}
        keyExtractor={({ id }) => id}
      />
    </MultiSelectModalWrapper>
  );
}

MultiSelectModal.propTypes = {
  options: PropTypes.array,
  onSelectedOptionChanged: PropTypes.func,
};

MultiSelectModal.defaultProps = {
  options: [],
  onSelectedOptionChanged: () => {},
};

export default MultiSelectModal;
