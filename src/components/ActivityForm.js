import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import PropTypes from 'prop-types';
import BasicButton from '../components/BasicButton';
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

const Footer = styled.View`
  align-items: center;
  margin: 28px auto;
`;

const categoryEnum = [
  {
    name: translations.createactivity_field2_text1,
    value: 'physical',
  },
  {
    name: translations.createactivity_field2_text2,
    value: 'cognitive',
  },
  {
    name: translations.createactivity_field2_text3,
    value: 'speech',
  },
  {
    name: translations.createactivity_field2_text4,
    value: 'socialEmotional',
  },
  {
    name: translations.createactivity_field2_text5,
    value: 'selfCare',
  },
];

function ActivityForm({ submitButtonLabel, onCreateActivity }) {
  const [name, onChangeName] = useState('');
  const [category, setCategory] = useState('');
  const [description, onChangeDescription] = useState('');
  const [url, onChangeUrl] = useState('');
  const [review, onChangeReview] = useState('');
  const [tags, onChangeTags] = useState('');
  const themeContext = useContext(ThemeContext);

  const submitForm = () => {
    const activityDetails = {
      category,
      name,
      ageMin: 1,
      ageMax: 2,
      timing: 10,
      description,
      url,
      activityImageList: [
        {
          url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyezISI3nJQy6yoyXrTELnHL9i-mfuXQONTQ&usqp=CAU',
        },
        {
          url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROtCNC9x1c1OT-jueYQqgYosRHNOh3WOa7zg&usqp=CAU',
        },
      ],
    };
    onCreateActivity(activityDetails);
  };

  const onCategorySelect = (selectedCategory) => {
    const currentCategory = selectedCategory || category;
    setCategory(currentCategory);
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
          <Label>{translations.createactivity_field8_title}:</Label>
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
