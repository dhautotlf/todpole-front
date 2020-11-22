import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { translations } from '../constants/translations';
import FilterIcon from '../assets/icons/filter.svg';
import SettingsIcon from '../assets/icons/settings.svg';
import SearchIcon from '../assets/icons/search.svg';

const SearchBarContainer = styled.View`
  flex-direction: row;
`;

const SearchInputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.small}px;
  padding-horizontal: ${({ theme }) => theme.spacing.small}px;
  margin-right: ${({ theme }) => theme.spacing.tiny}px;
  background: ${({ theme }) => theme.colors.lightGray};
`;

const StyledTextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholder: translations.discover_header_bar,
  placeholderTextColor: theme.colors.darkGray,
}))`
  flex: 1;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const Touchable = styled.TouchableOpacity`
  align-self: center;
`;

const FilterButton = styled(FilterIcon)`
  margin-horizontal: ${({ theme }) => theme.spacing.tiny}px;
`;

const SearchButton = styled(SearchIcon)`
  align-self: center;
  margin-right: ${({ theme }) => theme.spacing.tiny}px;
`;

function SearchBar(props) {
  return (
    <SearchBarContainer>
      <SearchInputContainer>
        <SearchButton />
        <StyledTextInput {...props} />
      </SearchInputContainer>
      {props.onFilterPress && (
        <Touchable onPress={props.onFilterPress}>
          <FilterButton />
        </Touchable>
      )}
      {props.onSettingsPress && (
        <Touchable onPress={props.onSettingsPress}>
          <SettingsIcon />
        </Touchable>
      )}
    </SearchBarContainer>
  );
}

SearchBar.propTypes = {
  onFilterPress: PropTypes.func,
  onSettingsPress: PropTypes.func,
};

SearchBar.defaultProps = {};

export default SearchBar;
