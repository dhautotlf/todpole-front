import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const CategoryWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 23px;
`;

const TextWrapper = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 2px;
  color: ${(props) => props.theme.colors.black};
`;

const Description = styled.Text`
  flex: 1;
  flex-wrap: wrap;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => props.theme.colors.black};
`;

const ThumbnailImage = styled.Image`
  width: 61px;
  height: 61px;
  borderradius: 61px;
  margin-right: 22px;
`;

function Category({ title, description }) {
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
        <Description>{description}</Description>
      </TextWrapper>
    </CategoryWrapper>
  );
}

Category.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

Category.defaultProps = {
  title: 'Default Category',
  description: 'default text category',
};

export default Category;
