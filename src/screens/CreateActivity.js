import React, { useState } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { postActivity } from '../reducers/activities';
import ActivityForm from '../components/ActivityForm';
import ImagePickerComponent from '../components/ImagePickerComponent';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
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
  margin-horizontal: ${({ theme }) => theme.spacing.moderate}px;
`;

const ImagePickerFlatList = styled.FlatList.attrs((props) => ({
  contentContainerStyle: {
    marginLeft: 25,
  },
}))``;

const ImagePickerActivityWrapper = styled.View`
  margin-right: 13px;
`;

function CreateActivity() {
  const navigation = useNavigation();
  const [errorMessage, setError] = useState('');
  const [photos, updatePhotos] = useState([]);

  const dispatch = useDispatch();

  const createActivity = async (activity) => {
    const activityInputs = { ...activity, activityImageList: photos };
    console.log('activityInputs', activityInputs);
    try {
      const a = await dispatch(postActivity(activityInputs));

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Discover',
            },
          ],
        }),
      );
      navigation.navigate('ActivityDetail', { id: a.id });
    } catch (error) {
      console.log({ error });
      setError(error);
    }
  };

  const updateImageList = (url, index) => {
    const isMain = !index;
    const photoArray = [...photos, { url, isMain }];
    updatePhotos(photoArray);
  };

  const dataImages = [
    {
      id: 0,
      onChange: (url) => {
        updateImageList(url, 0);
      },
    },
    {
      id: 1,
      onChange: (url) => {
        updateImageList(url, 1);
      },
    },
    {
      id: 2,
      onChange: (url) => {
        updateImageList(url, 2);
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
            onCreateActivity={createActivity}
          />
          {errorMessage ? <Text>{errorMessage}</Text> : null}
        </Body>
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
