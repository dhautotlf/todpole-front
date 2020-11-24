import React from 'react';
import styled from 'styled-components/native';
import SearchBar from '../components/SearchBar';
import ActivityForm from '../components/ActivityForm';
import { get } from 'lodash';

const ScrollViewWrapper = styled.ScrollView``;

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.colors.white};
`;

const Body = styled.View`
  margin-horizontal: ${({ theme }) => theme.spacing.moderate}px;
`;

const SearchArea = styled.View`
  margin-horizontal: ${({ theme }) => theme.spacing.small}px;
`;

function SearchModal(props) {
  return (
    <StyledSafeAreaView>
      <ScrollViewWrapper>
        <SearchArea>
          <SearchBar value={get(props, 'route.params.text')} />
        </SearchArea>
        <Body>
          <ActivityForm context={'activityFilters'} />
        </Body>
      </ScrollViewWrapper>
    </StyledSafeAreaView>
  );
}

SearchModal.propTypes = {};

SearchModal.defaultProps = {};

export default SearchModal;
