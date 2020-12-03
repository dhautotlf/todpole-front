import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const StyledButton = styled.TouchableOpacity`
  max-width: 160px;
  flex-direction: row;
  border-radius: ${({ theme }) => theme.radius.small}px;
  padding: 10px 30px;
  background: ${({ selected, theme }) =>
    selected ? theme.colors.green : theme.colors.lightGray};
  opacity: ${({ loading }) => (loading ? 0 : 1)};
`;

const Loading = styled.ActivityIndicator.attrs(({ theme, selected }) => ({
  color: selected ? theme.colors.white : theme.colors.darkGray,
}))`
  margin-left: ${({ theme }) => theme.spacing.small}px;
`;

const Label = styled.Text`
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${(props) =>
    props.selected ? props.theme.colors.white : props.theme.colors.green};
`;

function BasicButton({ label, onPress, selected, loading }) {
  return (
    <StyledButton disabled={loading} onPress={onPress} selected={selected}>
      <Label loading={loading} selected={selected}>
        {label}
      </Label>
      {loading && <Loading selected={selected} />}
    </StyledButton>
  );
}

BasicButton.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
  loading: PropTypes.bool,
};

BasicButton.defaultProps = {
  label: 'Default Category',
  selected: false,
  loading: false,
};

BasicButton.StyledButton = StyledButton;

export default BasicButton;
