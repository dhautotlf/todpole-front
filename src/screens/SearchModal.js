import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import SearchBar from '../components/SearchBar';
import { get } from 'lodash';

function SearchModal(props) {
  return (
    <SafeAreaView>
      <SearchBar value={get(props, 'route.params.text')} />
      <Text>
        {Object.entries(props.route.params).map(
          ([key, val]) => `${key}:${val}`,
        )}
      </Text>
    </SafeAreaView>
  );
}

SearchModal.propTypes = {};

SearchModal.defaultProps = {};

export default SearchModal;
