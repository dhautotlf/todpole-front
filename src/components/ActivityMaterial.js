import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const ActivityMaterialWrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-right: 10px;
  margin-bottom: 23px;
`;

function ActivityMaterial({ materials }) {
  return (
    <ActivityMaterialWrapper>
      {materials &&
        materials.map((material) => (
          <Text key={material.name}>・{material.name}</Text>
        ))}
    </ActivityMaterialWrapper>
  );
}

ActivityMaterial.propTypes = {
  materials: PropTypes.array,
};

ActivityMaterial.defaultProps = {
  materials: [],
};

export default ActivityMaterial;
