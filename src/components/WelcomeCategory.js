import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const CategoryWrapper = styled.View`
  display: flex;
  flex-direction: column;
  margin-bottom: 23px;
`;

const TextWrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: 80px;
`;

const Title = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  letter-spacing: 0.15px;
  color: ${(props) => props.theme.colors.black};
`;

const ThumbnailImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 80px;
  margin-right: 22px;
  margin-bottom: 12px;
`;

function WelcomeCategory({ title }) {
  return (
    <CategoryWrapper>
      <ThumbnailImage
        source={{
          uri:
            'https://www.theladders.com/wp-content/uploads/Lion_030818-800x450.jpg',
        }}
      ></ThumbnailImage>
      <TextWrapper>
        <Title>{title}</Title>
      </TextWrapper>
    </CategoryWrapper>
  );
}

WelcomeCategory.propTypes = {
  title: PropTypes.string,
};

WelcomeCategory.defaultProps = {
  title: 'Default Category',
};

export default WelcomeCategory;
