import React, { useState } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { postActivity } from '../reducers/activities';
import ActivityForm from '../components/ActivityForm';
import BasicButton from '../components/BasicButton';
import ImagePickerComponent from '../components/ImagePickerComponent';
import { useNavigation } from '@react-navigation/native';
import { translations } from '../constants/translations';

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${(props) => props.theme.colors.white};
`;

const ScreenWrapper = styled.ScrollView.attrs((props) => ({
  contentContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))`
  background: ${(props) => props.theme.colors.white};
  flex: 1;
  margin-top: 52px;
`;

const Header = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 12px;
`;

const Body = styled.View`
  flex: 1;
  align-items: center;
`;

const ImagePickerFlatList = styled.FlatList.attrs((props) => ({
  contentContainerStyle: {
    marginLeft: 25,
  },
}))``;

const ImagePickerActivityWrapper = styled.View`
  margin-right: 13px;
`;

function CreateActivity({ displayName }) {
  const { navigate } = useNavigation();
  const [errorMessage, setError] = useState('');

  const dispatch = useDispatch();
  const createActivity = async (activity) => {
    try {
      const a = await dispatch(postActivity(activity));
      navigate('ActivityDetail', { id: a.id });
    } catch (error) {
      setError(error);
    }
  };

  const dataImages = [
    {
      id: 1,
      onChange: () => {
        console.log(1);
      },
    },
    {
      id: 2,
      onChange: () => {
        console.log(2);
      },
    },
    {
      id: 3,
      onChange: () => {
        console.log(3);
      },
    },
  ];

  return (
    <StyledSafeAreaView>
      <ScreenWrapper>
        <Header>
          <ImagePickerFlatList
            horizontal
            data={dataImages}
            renderItem={({ item }) => (
              <ImagePickerActivityWrapper>
                <ImagePickerComponent
                  key={item.id}
                  onImageChange={item.onChange}
                />
              </ImagePickerActivityWrapper>
            )}
            keyExtractor={(item) => `IMAGE-ACTIVITY-${item.id}`}
          />
        </Header>
        <Body>
          <ActivityForm
            submitButtonLabel={translations.createactivity_footer_button}
            onCreateActivity={(t) => createActivity(t, goToActivityPdp)}
          />
          {errorMessage ? <Text>{errorMessage}</Text> : null}
        </Body>
        <Text>{displayName}</Text>
        <Text onPress={() => {}}>NEXT</Text>
      </ScreenWrapper>
    </StyledSafeAreaView>
  );
}

CreateActivity.propTypes = {
  displayName: PropTypes.string,
};

CreateActivity.defaultProps = {
  displayName: 'CreateActivity',
};

export default CreateActivity;
