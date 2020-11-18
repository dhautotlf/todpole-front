import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { postActivity } from '../reducers/activities';
import { getSession } from '../hooks';
import BasicButton from '../components/BasicButton';
import { useNavigation } from '@react-navigation/native';

const ScreenWrapper = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: ${(props) => props.theme.colors.white};
`;

const Header = styled.View`
  flex-direction: column;
  align-items: center;
`;

const Description = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  margin-top: 25px;
`;

const Body = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 44px;
`;

function CreateActivity({ displayName }) {
  const dispatch = useDispatch();
  const { errorMessage, isLoading } = getSession();
  const { navigate } = useNavigation();
  const goToActivityPdp = (id, url) => {
    navigate('ActivityDetail', { id, url });
  };

  const createActivity = (activity, goToActivityPdp) => {
    // Mock - to be replaced by activity parameter
    dispatch(
      postActivity({
        category: 'PHYSICAL',
        name: 'test name variable',
        ageMin: 1,
        ageMax: 2,
        timingMin: 20,
        timingMax: 10,
        description: 'This is a description',
        url: 'This is an URL',
        activityImageList: [
          {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyezISI3nJQy6yoyXrTELnHL9i-mfuXQONTQ&usqp=CAU',
          },
          {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROtCNC9x1c1OT-jueYQqgYosRHNOh3WOa7zg&usqp=CAU',
          },
        ],
      }, goToActivityPdp),
    );
  };

  const submitButtonLabel = 'SUBMIT';

  return (
    <ScreenWrapper>
      <Header>
        <Description>{displayName}</Description>
      </Header>
      <Body>
        {errorMessage ? <Text>{errorMessage}</Text> : null}
        <BasicButton label={submitButtonLabel} onPress={(t) => createActivity(t, goToActivityPdp)} />
      </Body>
      <Text>{displayName}</Text>
      <Text onPress={() => {}}>NEXT</Text>
    </ScreenWrapper>
  );
}

CreateActivity.propTypes = {
  displayName: PropTypes.string,
};

CreateActivity.defaultProps = {
  displayName: 'CreateActivity',
};

export default CreateActivity;
