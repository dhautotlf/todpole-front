import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

function ActivityDetail({ route }) {
  const { id } = route.params;

  return (
    <View>
      <Text onPress={() => {}}>NEXT</Text>
    </View>
  );
}

ActivityDetail.propTypes = {};

ActivityDetail.defaultProps = {};

export default ActivityDetail;
