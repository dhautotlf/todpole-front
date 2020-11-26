import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import PropTypes from 'prop-types';
import FieldView from '../components/FieldView';
import StarRating from '../components/StarRating';
import RoundButton from '../components/RoundButton';
import Slider from '@react-native-community/slider';
import PlusIcon from '../assets/icons/create.svg';
import { translations } from '../constants/translations';
import { omit, get } from 'lodash';

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

function FieldForm({ context, onFieldChange, fields }) {
  const themeContext = useContext(ThemeContext);
  const { navigate } = useNavigation();

  const maxRating = 5;

  const ActivityNameInput = (
    <FieldView
      key={'ActivityNameInput'}
      title={translations.createactivity_field1_title}
    >
      <StyledTextInput
        name="name"
        type="name"
        value={fields.name}
        placeholder={translations.createactivity_field1_text}
        placeholderTextColor={themeContext.colors.silver}
        onChangeText={(text) => onFieldChange({ name: text })}
        required
      />
    </FieldView>
  );

  console.log('FieldForm', fields);
  const CategoryField = (
    <FieldView
      key={'CategoryField'}
      title={translations.createactivity_field2_title}
    >
      <CategoryButtonView>
        {categoryEnum.map((category) => (
          <CategoryButton
            onPress={() => {
              onFieldChange({ category });
            }}
            selected={fields.category === category}
            key={category.value}
          >
            <CategoryLabel
              selected={get(fields, 'category.value') === category.value}
            >
              {category.name}
            </CategoryLabel>
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
        {`Between ${get(fields, 'ages[0]')} and ${get(fields, 'ages[1]')}`}:
      </Label>
      <AgeMultiSlider
        values={fields.ages}
        onValuesChange={(ages) => onFieldChange({ ages })}
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
      <Label>{fields.timing}</Label>
      <TimeSlider
        minimumValue={0}
        maximumValue={120}
        minimumTrackTintColor={themeContext.colors.silver}
        maximumTrackTintColor={themeContext.colors.anotherGray}
        step={5}
        onValueChange={(timing) => onFieldChange({ timing })}
      />
    </FieldView>
  );

  const MaterialField = (
    <FieldView
      key={'MaterialField'}
      title={translations.activitydetail_topic_title1}
    >
      <CategoryButtonView>
        {Object.entries(get(fields, 'materials', {}))
          .filter(([_, v]) => v)
          .map(([k, v]) => (
            <CategoryButton
              onPress={() =>
                onFieldChange({ materials: omit(fields.materials, k) })
              }
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
              selectedOptions: fields.materials,
              onChangeMaterials: (materials) => onFieldChange({ materials }),
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
        value={fields.description}
        placeholder={translations.createactivity_field6_text}
        placeholderTextColor={themeContext.colors.silver}
        onChangeText={(description) => onFieldChange({ description })}
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
        value={fields.url}
        placeholder={translations.createactivity_field7_text}
        placeholderTextColor={themeContext.colors.silver}
        onChangeText={(url) => onFieldChange({ url })}
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
        <RatingArea
          onPress={() => {
            const newRating = (fields.rating.ratings + 1) % (maxRating + 1);
            const newObjRating = { ...fields.rating, ratings: newRating };
            onFieldChange({
              rating: newObjRating,
            });
          }}
        >
          <StarRating ratingObj={fields.rating} hideViews />
        </RatingArea>
      }
    >
      <StyledTextInput
        name="review"
        type="review"
        value={fields.review}
        placeholder={translations.createactivity_field8_text}
        placeholderTextColor={themeContext.colors.silver}
        onChangeText={(review) => onFieldChange({ review })}
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
        value={fields.tags}
        placeholder={translations.createactivity_field9_text}
        placeholderTextColor={themeContext.colors.silver}
        onChangeText={(tags) => onFieldChange({ tags })}
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
    </Form>
  );
}

FieldForm.propTypes = {
  fields: PropTypes.object,
  onFieldChange: PropTypes.func,
  context: PropTypes.string,
};

FieldForm.defaultProps = {
  fields: {},
  onFieldChange: () => {},
  context: 'activityCreation',
};

export default FieldForm;
