import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import FieldForm from '../components/FieldForm';
import BasicButton from '../components/BasicButton';
import { get, assign } from 'lodash';

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

const defaultFilters = {
  text: null,
  category: {},
  materials: {},
  ages: {},
  timing: 0,
};

function FilterModal({ route }) {
  const navigation = useNavigation();
  const [filters, setFilters] = useState(
    get(route, 'params.filters', defaultFilters),
  );

  console.log('FilterModal', { filters });
  return (
    <StyledSafeAreaView>
      <ScrollViewWrapper>
        <SearchArea>
          <SearchBar
            onChangeText={(text) => setFilters({ ...filters, text })}
            value={filters.text}
            onSearchPress={() => {
              navigation.navigate(route.params.backRoute, { filters });
            }}
          />
        </SearchArea>
        <Body>
          <FieldForm
            context={'activityFilters'}
            fields={filters}
            onFieldChange={(field) => {
              const a = assign(filters, field);

              console.log('onFieldChange', { field }, { a });
              return setFilters({ ...a });
            }}
          />
        </Body>
      </ScrollViewWrapper>
    </StyledSafeAreaView>
  );
}

FilterModal.propTypes = {};

FilterModal.defaultProps = {};

export default FilterModal;
