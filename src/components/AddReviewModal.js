import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { ThemeContext } from 'styled-components/native';
import PropTypes from 'prop-types';
import {
  Modal,
  View,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from 'react-native';
import { postReview } from '../reducers/activities';
import BackButtonIcon from '../assets/icons/back-modal.svg';
import StarRating from '../components/StarRating';
import BasicButton from '../components/BasicButton';
import { translations } from '../constants/translations';

const StyledModal = styled.Modal``;

const ReviewWrapper = styled.View`
  padding: 9px 27px 17px 12px;
  flex-direction: column;
  height: 250px;
  border-top-right-radius: 28px;
  border-top-left-radius: 28px;
  background: ${(props) => props.theme.colors.white};
`;

const Header = styled.View``;

const BackButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
`;

const Body = styled.View`
  flex-direction: column;
  margin-top: 9px;
  padding-left: ${(props) => props.theme.spacing.small}px;
`;

const RatingArea = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const Title = styled.Text``;

const ReviewArea = styled.TextInput`
  height: 94px;
  border: 1px solid ${(props) => props.theme.colors.darkGray};
  border-radius: 8px;
`;

const PublishButton = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing.small}px;
`;

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  background: ${(props) => props.theme.colors.grayOverlay};
  justify-content: flex-end;
`;

const ErrorText = styled.Text`
  font-weight: bold;
  color: ${(props) => props.theme.colors.red};
`;

const AddReviewModal = ({ activityId, isOpen, closeModal, addReview }) => {
  const [rating, setRating] = useState({ ratings: 0, views: null });
  const [review, setReview] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const maxRating = 5;

  const createReview = async (reviewInput) =>
    await dispatch(postReview(reviewInput));

  const onRateActivity = () => {
    const newRating = (rating.ratings + 1) % (maxRating + 1);
    const newObjRating = { ...rating, ratings: newRating };
    setRating(newObjRating);
  };

  onPublish = async () => {
    const reviewInput = {
      activityId,
      rating: rating.ratings,
      text: review,
    };
    try {
      await createReview(reviewInput);
      closeModal();
    } catch (err) {
      setErrorMessage('There has been a problem here, please try again');
    }
  };

  return (
    <StyledModal animationType="slide" transparent={true} visible={isOpen}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <StyledKeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <ReviewWrapper>
              <Header>
                <BackButton onPress={closeModal}>
                  <BackButtonIcon
                    width={25}
                    height={25}
                    color={themeContext.colors.mediumGray}
                  />
                </BackButton>
              </Header>
              <Body>
                <RatingArea onPress={onRateActivity}>
                  <Title>{translations.activitydetail_topic_title3}</Title>
                  <StarRating ratingObj={rating} hideViews />
                </RatingArea>
                {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
                <ReviewArea
                  multiline={true}
                  onChangeText={setReview}
                  autoFocus
                />
                <PublishButton>
                  <BasicButton
                    label={translations.addReview_button}
                    selected={review !== ''}
                    onPress={onPublish}
                  />
                </PublishButton>
              </Body>
            </ReviewWrapper>
          </TouchableWithoutFeedback>
        </StyledKeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </StyledModal>
  );
};

export default AddReviewModal;
