import React, { useState, useContext } from 'react';
import { Dimensions } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import PropTypes from 'prop-types';
import BasicButton from '../components/BasicButton';
import FieldView from '../components/FieldView';
import StarRating from '../components/StarRating';
import RoundButton from '../components/RoundButton';
import Slider from '@react-native-community/slider';
import PlusIcon from '../assets/icons/create.svg';
import { translations } from '../constants/translations';
import { omit } from 'lodash';

const Form = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
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
  color: ${({ selected, theme }) =>
    selected ? theme.colors.whiteSmoke : theme.colors.black};
`;

const CategoryButton = styled.TouchableOpacity`
  padding: 10px;
  margin: 9px 14px 0px 0px;
  background: ${({ theme, selected }) =>
    selected ? theme.colors.darkGray : theme.colors.whiteSmoke};
  border-radius: 8px;
`;

const RatingArea = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
`;

const TimeSlider = styled(Slider)``;

const AgeMultiSlider = styled(MultiSlider)``;

const AddMaterialButton = styled(RoundButton)`
  marginTop: 9px
  background: ${({ theme }) => theme.colors.whiteSmoke};
`;

const AddMaterialIcon = styled(PlusIcon).attrs(({ theme }) => ({
  color: theme.colors.black,
}))``;

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

function ActivityForm({
  submitButtonLabel,
  onCreateActivity,
  context,
  onFormChanged,
}) {
  const { navigate } = useNavigation();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [ageSliderValues, setAgeSliderValues] = React.useState([6, 18]);
  const [timing, setTiming] = useState(0);
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [rating, setRating] = useState({ ratings: 0, views: null });
  const [review, setReview] = useState('');
  const [tags, setTags] = useState('');
  const [materials, setMaterials] = useState([]);
  const themeContext = useContext(ThemeContext);
  const maxRating = 5;
  const minRating = 0;

  const changeForm = (value, setter) => {
    setter(value);
    onFormChanged(formBuilder());
  };

  const formBuilder = () => ({
    category,
    name,
    ageMin: ageSliderValues[0],
    ageMax: ageSliderValues[1],
    timing,
    description,
    url,
    review: { rating: rating.ratings, text: review },
  });

  const submitForm = () => onCreateActivity(formBuilder());

  const onRateActivity = () => {
    const newRating = (rating.ratings + 1) % (maxRating + 1);
    const newObjRating = { ...rating, ratings: newRating };
    changeForm(newObjRating, setRating);
  };

  const ActivityNameInput = (
    <FieldView
      key={'ActivityNameInput'}
      title={translations.createactivity_field1_title}
    >
      <StyledTextInput
        name="name"
        type="name"
        value={name}
        placeholder={translations.createactivity_field1_text}
        placeholderTextColor={themeContext.colors.silver}
        onChangeText={(text) => changeForm(text, setName)}
        required
      />
    </FieldView>
  );

  const CategoryField = (
    <FieldView
      key={'CategoryField'}
      title={translations.createactivity_field2_title}
    >
      <CategoryButtonView>
        {categoryEnum.map(({ name, value }) => (
          <CategoryButton
            onPress={() => changeForm(value, setCategory)}
            selected={category === value}
            key={value}
          >
            <CategoryLabel selected={category === value}>{name}</CategoryLabel>
          </CategoryButton>
        ))}
      </CategoryButtonView>
    </FieldView>
  );

  const AgeField = (
    <FieldView
      key={'AgeField'}
      title={translations.createactivity_field3_title}
      subtitle={translations.createactivity_field3_subtitle}
    >
      <Label>
        {`Between ${ageSliderValues[0]} and ${ageSliderValues[1]}`}:
      </Label>
      <AgeMultiSlider
        values={ageSliderValues}
        onValuesChange={(values) => setAgeSliderValues(values)}
        min={0}
        max={72}
        step={1}
        sliderLength={
          Dimensions.get('window').width - 2 * themeContext.spacing.moderate
        }
        allowOverlap
        snapped
      />
    </FieldView>
  );

  const TimingField = (
    <FieldView
      key={'TimingField'}
      title={translations.createactivity_field4_title}
      subtitle={translations.createactivity_field4_subtitle}
    >
      <Label>{timing}</Label>
      <TimeSlider
        minimumValue={0}
        maximumValue={120}
        minimumTrackTintColor={themeContext.colors.silver}
        maximumTrackTintColor={themeContext.colors.anotherGray}
        step={5}
        onValueChange={(value) => changeForm(value, setTiming)}
      />
    </FieldView>
  );

  const MaterialField = (
    <FieldView
      key={'MaterialField'}
      title={translations.activitydetail_topic_title1}
    >
      <CategoryButtonView>
        {Object.entries(materials)
          .filter(([_, v]) => v)
          .map(([k, v]) => (
            <CategoryButton
              onPress={() => changeForm(omit(materials, k), setMaterials)}
              selected
              key={k}
            >
              <CategoryLabel selected>{v.name}</CategoryLabel>
            </CategoryButton>
          ))}
        <AddMaterialButton
          medium
          Icon={AddMaterialIcon}
          onPress={() =>
            navigate('Material', {
              selectedOptions: materials,
              onChangeMaterials: (value) => changeForm(value, setMaterials),
            })
          }
        />
      </CategoryButtonView>
    </FieldView>
  );

  const DescriptionInput = (
    <FieldView
      key={'DescriptionInput'}
      title={translations.createactivity_field6_title}
    >
      <StyledTextInput
        name="description"
        type="description"
        value={description}
        placeholder={translations.createactivity_field6_text}
        placeholderTextColor={themeContext.colors.silver}
        onChangeText={(text) => changeForm(text, setDescription)}
        required
      />
    </FieldView>
  );

  const UrlInput = (
    <FieldView
      key={'UrlInput'}
      title={translations.createactivity_field7_title}
      subtitle={translations.createactivity_field_optional}
    >
      <StyledTextInput
        name="url"
        type="url"
        value={url}
        placeholder={translations.createactivity_field7_text}
        placeholderTextColor={themeContext.colors.silver}
        onChangeText={(text) => changeForm(text, setUrl)}
        required
      />
    </FieldView>
  );

  const ReviewInput = (
    <FieldView
      key={'ReviewInput'}
      title={translations.createactivity_field8_title}
      subtitle={translations.createactivity_field_optional}
      rightComponent={
        <RatingArea onPress={onRateActivity}>
          <StarRating ratingObj={rating} hideViews />
        </RatingArea>
      }
    >
      <StyledTextInput
        name="review"
        type="review"
        value={review}
        placeholder={translations.createactivity_field8_text}
        placeholderTextColor={themeContext.colors.silver}
        onChangeText={(text) => changeForm(text, setReview)}
        required
      />
    </FieldView>
  );

  const TagInput = (
    <FieldView
      key={'TagInput'}
      title={translations.createactivity_field9_title}
      subtitle={translations.createactivity_field_optional}
    >
      <StyledTextInput
        name="tags"
        type="tags"
        value={tags}
        placeholder={translations.createactivity_field9_text}
        placeholderTextColor={themeContext.colors.silver}
        onChangeText={(text) => changeForm(text, setTags)}
        required
      />
    </FieldView>
  );

  return (
    <Form>
      {
        {
          activityCreation: [
            ActivityNameInput,
            CategoryField,
            AgeField,
            TimingField,
            MaterialField,
            DescriptionInput,
            UrlInput,
            ReviewInput,
            TagInput,
          ],
          activityFilters: [
            CategoryField,
            AgeField,
            TimingField,
            MaterialField,
          ],
        }[context]
      }
      {'activityCreation' === context && (
        <Footer>
          <BasicButton
            label={submitButtonLabel}
            onPress={submitForm}
            selected
          />
        </Footer>
      )}
    </Form>
  );
}

ActivityForm.propTypes = {
  label: PropTypes.string,
  onCreateActivity: PropTypes.func,
  onFormChanged: PropTypes.func,
  submitButtonLabel: PropTypes.string,
  context: PropTypes.string,
};

ActivityForm.defaultProps = {
  label: 'CreateActivity',
  onCreateActivity: () => {},
  onFormChanged: () => {},
  submitButtonLabel: 'Create',
  context: 'activityCreation',
};

export default ActivityForm;
