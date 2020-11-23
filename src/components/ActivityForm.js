import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import PropTypes from 'prop-types';
import BasicButton from '../components/BasicButton';
import MultiSelectModal from '../components/MultiSelectModal';
import StarRating from '../components/StarRating';
import Slider from '@react-native-community/slider';
import { translations } from '../constants/translations';

const Form = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0px 27px;
`;

const FieldsContainer = styled.View``;

const FieldView = styled.View`
  margin-bottom: 15px;
`;

const Label = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.black};
`;

const StyledTextInput = styled.TextInput`
  padding: 10px;
  height: 44px;
  border: 1px solid ${(props) => props.theme.colors.darkGray};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.black};
`;

const CategoryWrapper = styled.View``;

const CategoryButtonView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const CategoryLabel = styled.Text`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) =>
    props.selected ? props.theme.colors.whiteSmoke : props.theme.colors.black};
`;

const CategoryButton = styled.TouchableOpacity`
  padding: 10px;
  margin: 9px 14px 0px 0px;
  background: ${(props) =>
    props.selected
      ? props.theme.colors.darkGray
      : props.theme.colors.whiteSmoke};
  border-radius: 8px;
`;

const ReviewHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const RatingArea = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
`;

const TimeSlider = styled(Slider)``;

const AgeMultiSlider = styled(MultiSlider)``;

const Footer = styled.View`
  align-items: center;
  margin: 28px auto;
`;

const categoryEnum = [
  {
    name: translations.createactivity_field2_text1,
    value: 'PHYSICAL',
  },
  {
    name: translations.createactivity_field2_text2,
    value: 'COGNITIVE',
  },
  {
    name: translations.createactivity_field2_text3,
    value: 'SPEECH',
  },
  {
    name: translations.createactivity_field2_text4,
    value: 'SOCIAL_EMOTION',
  },
  {
    name: translations.createactivity_field2_text5,
    value: 'SELF_CARE',
  },
];

function ActivityForm({ submitButtonLabel, onCreateActivity }) {
  const { navigate } = useNavigation();
  const [name, onChangeName] = useState('');
  const [category, setCategory] = useState('');
  const [ageSliderValues, setAgeSliderValues] = React.useState([6, 18]);
  const [timing, setTiming] = useState(0);
  const [description, onChangeDescription] = useState('');
  const [url, onChangeUrl] = useState('');
  const [rating, onChangeRating] = useState({ ratings: 0, views: null });
  const [review, onChangeReview] = useState('');
  const [tags, onChangeTags] = useState('');
  const [materials, onChangeMaterials] = useState([]);
  const themeContext = useContext(ThemeContext);
  const maxRating = 5;
  const minRating = 0;

  const submitForm = () => {
    const review = { rating: rating.ratings, text: review };
    const activityDetails = {
      category,
      name,
      ageMin: ageSliderValues[0],
      ageMax: ageSliderValues[1],
      timing,
      description,
      url,
      review,
    };
    onCreateActivity(activityDetails);
  };

  const onCategorySelect = (selectedCategory) => {
    const currentCategory = selectedCategory || category;
    setCategory(currentCategory);
  };

  const onRateActivity = () => {
    const currentRating = rating.ratings;
    const newRating = currentRating === maxRating ? 0 : currentRating + 1;
    const newObjRating = { ...rating, ratings: newRating };
    onChangeRating(newObjRating);
  };

  const renderCategories = () => {
    return (
      <CategoryWrapper>
        <Label>{translations.createactivity_field2_title}:</Label>
        <CategoryButtonView>
          {categoryEnum.map((c, i) => (
            <CategoryButton
              onPress={() => onCategorySelect(c.value)}
              selected={category === c.value}
              key={i}
            >
              <CategoryLabel selected={category === c.value}>
                {c.name}
              </CategoryLabel>
            </CategoryButton>
          ))}
        </CategoryButtonView>
      </CategoryWrapper>
    );
  };

  const renderAgeRange = () => {
    return (
      <>
        <Label>{translations.createactivity_field3_title}:</Label>
        <Label>
          {`Between ${ageSliderValues[0]} and ${ageSliderValues[1]}`}:
        </Label>
        <AgeMultiSlider
          values={[ageSliderValues[0], ageSliderValues[1]]}
          onValuesChange={(values) => setAgeSliderValues(values)}
          min={0}
          max={72}
          step={1}
          sliderLength={350}
          allowOverlap
          snapped
        />
      </>
    );
  };

  const renderTiming = () => {
    return (
      <>
        <Label>{translations.createactivity_field4_title}:</Label>
        <Label>{timing}</Label>
        <TimeSlider
          minimumValue={0}
          maximumValue={120}
          minimumTrackTintColor={themeContext.colors.silver}
          maximumTrackTintColor={themeContext.colors.anotherGray}
          step={5}
          onValueChange={(value) => setTiming(value)}
        />
      </>
    );
  };

  const renderMaterial = () => {
    console.log(materials);
    return (
      <>
        <TouchableOpacity
          onPress={() => navigate('Material', { materials, onChangeMaterials })}
        >
          <Label>{translations.activitydetail_topic_title1}:</Label>
          {Object.entries(materials)
            .filter(([_, v]) => v)
            .map(([k]) => (
              <Text key={k}>{k}</Text>
            ))}
          <StyledTextInput
            editable={false}
            pointerEvents="none"
            placeholder={translations.createactivity_field5_title}
            placeholderTextColor={themeContext.colors.silver}
          />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <Form>
      <FieldsContainer>
        <FieldView>
          <Label>{translations.createactivity_field1_title}:</Label>
          <StyledTextInput
            name="name"
            type="name"
            value={name}
            placeholder={translations.createactivity_field1_text}
            placeholderTextColor={themeContext.colors.silver}
            onChangeText={onChangeName}
            required
          />
        </FieldView>
        <FieldView>{renderCategories()}</FieldView>
        <FieldView>{renderAgeRange()}</FieldView>
        <FieldView>{renderTiming()}</FieldView>
        <FieldView>{renderMaterial()}</FieldView>
        <FieldView>
          <Label>{translations.createactivity_field6_title}:</Label>
          <StyledTextInput
            name="description"
            type="description"
            value={description}
            placeholder={translations.createactivity_field6_text}
            placeholderTextColor={themeContext.colors.silver}
            onChangeText={onChangeDescription}
            required
          />
        </FieldView>
        <FieldView>
          <Label>{translations.createactivity_field7_title}:</Label>
          <StyledTextInput
            name="url"
            type="url"
            value={url}
            placeholder={translations.createactivity_field7_text}
            placeholderTextColor={themeContext.colors.silver}
            onChangeText={onChangeUrl}
            required
          />
        </FieldView>
        <FieldView>
          <ReviewHeader>
            <Label>{translations.createactivity_field8_title}:</Label>
            <RatingArea onPress={onRateActivity}>
              <StarRating ratingObj={rating} hideViews />
            </RatingArea>
          </ReviewHeader>
          <StyledTextInput
            name="review"
            type="review"
            value={review}
            placeholder={translations.createactivity_field8_text}
            placeholderTextColor={themeContext.colors.silver}
            onChangeText={onChangeReview}
            required
          />
        </FieldView>
        <FieldView>
          <Label>{translations.createactivity_field9_title}:</Label>
          <StyledTextInput
            name="tags"
            type="tags"
            value={tags}
            placeholder={translations.createactivity_field9_text}
            placeholderTextColor={themeContext.colors.silver}
            onChangeText={onChangeTags}
            required
          />
        </FieldView>
      </FieldsContainer>
      <Footer>
        <BasicButton label={submitButtonLabel} onPress={submitForm} selected />
      </Footer>
    </Form>
  );
}

ActivityForm.propTypes = {
  label: PropTypes.string,
  onCreateActivity: PropTypes.func,
  submitButtonLabel: PropTypes.string,
};

ActivityForm.defaultProps = {
  label: 'CreateActivity',
  onCreateActivity: () => {},
  submitButtonLabel: 'Create',
};

export default ActivityForm;
