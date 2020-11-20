import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { translations } from '../constants/translations';
import FilterIcon from '../assets/icons/filter.svg';
import SearchIcon from '../assets/icons/search.svg';

const SearchBarContainer = styled.View`
  padding-vertical: 10px;
  flex-direction: row;
`;

const SearchInputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  height: 32px;
  border-radius: 8px;
  padding-horizontal: 14px;
  margin-right: 10px;
  background: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.black};
`;

const StyledTextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholder: translations.discover_header_bar,
  placeholderTextColor: theme.colors.darkGray,
}))`
  flex: 1;
  color: ${({ theme }) => theme.colors.black};
`;

const FilterButton = styled(FilterIcon)`
  align-self: center;
  margin-horizontal: 10px;
`;

const SearchButton = styled(SearchIcon)`
  align-self: center;
  margin-right: 10px;
`;

function SearchBar(props) {
  return (
    <SearchBarContainer>
      <SearchInputContainer>
        <SearchButton style={{ alignSelf: 'center' }} />
        <StyledTextInput {...props} />
      </SearchInputContainer>
      {props.onFilterPress && (
        <FilterButton
          style={{ alignSelf: 'center' }}
          onPress={props.onFilterPress}
        />
      )}
    </SearchBarContainer>
  );
}

SearchBar.propTypes = {
  onFilterPress: PropTypes.func,
};

SearchBar.defaultProps = {};

export default SearchBar;
