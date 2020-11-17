import React from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const ActivityDescriptionWrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-right: 10px;
  margin-bottom: 23px;
`;

function ActivityDescription({ description }) {
  return (
    <ActivityDescriptionWrapper>
      <Text>{description}</Text>
    </ActivityDescriptionWrapper>
  );
}

ActivityDescription.propTypes = {
  description: PropTypes.string,
};

ActivityDescription.defaultProps = {
  description: 'Default description',
};

export default ActivityDescription;
