import React, { useState } from 'react';
import styled from 'styled-components/native';
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
import StarRating from '../components/StarRating';
import BasicButton from '../components/BasicButton';
import { translations } from '../constants/translations';

const StyledModal = styled.Modal``;

const ReviewWrapper = styled.View`
  padding: 47px 27px 17px 27px;
  flex-direction: column;
  height: 250px;
  border-top-right-radius: 28px;
  border-top-left-radius: 28px;
  background: ${(props) => props.theme.colors.white};
  justify-content: space-between;
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
`;

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  background: ${(props) => props.theme.colors.grayOverlay};
  justify-content: flex-end;
`;

const AddReviewModal = ({ isOpen, closeModal }) => {
  const [rating, setRating] = useState({ ratings: 0, views: null });
  const [review, setReview] = useState('');
  const maxRating = 5;

  const onRateActivity = () => {
    const newRating = (rating.ratings + 1) % (maxRating + 1);
    const newObjRating = { ...rating, ratings: newRating };
    setRating(newObjRating);
  };

  return (
    <StyledModal animationType="slide" transparent={true} visible={isOpen}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <StyledKeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ReviewWrapper>
              <RatingArea onPress={onRateActivity}>
                <Title>{translations.activitydetail_topic_title3}</Title>
                <StarRating ratingObj={rating} hideViews />
              </RatingArea>
              <ReviewArea multiline={true} onChangeText={setReview} />
              <PublishButton>
                <BasicButton
                  label={translations.addReview_button}
                  selected={review !== ''}
                />
              </PublishButton>
            </ReviewWrapper>
          </TouchableWithoutFeedback>
        </StyledKeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </StyledModal>
  );
};

export default AddReviewModal;
