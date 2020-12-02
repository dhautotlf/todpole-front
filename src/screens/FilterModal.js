import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import FieldForm from '../components/FieldForm';
import { get, assign, cloneDeep } from 'lodash';

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
  ages: [0, 99],
  timing: 0,
};

function FilterModal({ route }) {
  const navigation = useNavigation();
  const [filters, setFilters] = useState(
    cloneDeep(get(route, 'params.filters', defaultFilters)),
  );

  return (
    <StyledSafeAreaView>
      <ScrollViewWrapper>
        <SearchArea>
          <SearchBar
            onChangeText={(text) => setFilters({ ...filters, text })}
            value={filters.text}
            onSearchPress={() =>
              navigation.navigate(route.params.backRoute, { filters })
            }
          />
        </SearchArea>
        <Body>
          <FieldForm
            context={'activityFilters'}
            fields={{ ...defaultFilters, ...filters }}
            onFieldChange={(field) => {
              const a = assign(filters, field);
              return setFilters({ ...a });
            }}
          />
        </Body>
      </ScrollViewWrapper>
    </StyledSafeAreaView>
  );
}

FilterModal.propTypes = {
  route: PropTypes.object,
};

FilterModal.defaultProps = {};

export default FilterModal;
