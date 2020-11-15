import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const ActivityWrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-right: 10px;
  margin-bottom: 23px;
`;

const Caption = styled.View`
  display: flex;
  justify-content: center;
  min-height: 37px;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  margin-top: -10px;
`;

const Title = styled.Text`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: ${(props) => props.theme.colors.black};
`;

const ThumbnailImage = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 8px;
`;

function Activity({ img, title }) {
  return (
    <ActivityWrapper>
      <ThumbnailImage
        source={{
          uri: img.url
        }}
      ></ThumbnailImage>
      <Caption>
        <Title>{title}</Title>
      </Caption>
    </ActivityWrapper>
  );
}

Activity.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

Activity.defaultProps = {
  title: 'Default Activity',
  description: 'default text Activity',
};

export default Activity;