import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const FieldWrapper = styled.View`
  flex-direction: column;
  margin-vertical: ${(props) => props.theme.spacing.tiny}px;
`;

const SectionTitleWrapper = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.black};
  text-transform: capitalize;
`;

const Subtitle = styled.Text`
  color: ${(props) => props.theme.colors.mediumGray};
  text-transform: lowercase;
`;

const View = styled.View``;

const FieldView = ({ style, title, subtitle, children, rightComponent }) => (
  <FieldWrapper style={style}>
    <SectionTitleWrapper>
      <Title>
        {title} {subtitle && <Subtitle>{`(${subtitle})`}</Subtitle>}
      </Title>
      {rightComponent}
    </SectionTitleWrapper>
    <View>{children}</View>
  </FieldWrapper>
);

FieldView.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.any,
  rightComponent: PropTypes.any,
  style: PropTypes.any,
};

FieldView.defaultProps = {
  title: '',
};

export default FieldView;
