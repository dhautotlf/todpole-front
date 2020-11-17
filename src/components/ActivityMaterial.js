import React from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const ActivityMaterialWrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-right: 10px;
  margin-bottom: 23px;
`;

function ActivityMaterial({ material }) {
  return (
    <ActivityMaterialWrapper>
      <Text>{material}</Text>
    </ActivityMaterialWrapper>
  );
}

ActivityMaterial.propTypes = {
  material: PropTypes.string,
};

ActivityMaterial.defaultProps = {
  material: 'Default Material',
};

export default ActivityMaterial;
