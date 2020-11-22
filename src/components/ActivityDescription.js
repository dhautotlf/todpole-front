import React from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const ActivityDescriptionWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  margin-right: 10px;
  margin-bottom: 23px;
`;

const DescriptionText = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
`;

function ActivityDescription({ description }) {
  return (
    <ActivityDescriptionWrapper>
      <DescriptionText>{description}</DescriptionText>
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
