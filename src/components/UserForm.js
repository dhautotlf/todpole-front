import React, { useState, useContext } from 'react';
import { Button, Picker, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styled, { ThemeContext } from 'styled-components/native';
import PropTypes from 'prop-types';
import {translations} from '../constants/translations';

const Form = styled.View``;

const FieldView = styled.View`
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.black};
`;

const StyledTextInput = styled.TextInput`
  padding: 10px;
  width: 320px;
  height: 44px;
  border: 1px solid ${props => props.theme.colors.darkGray};
  border-radius: 8px;
  color: ${props => props.theme.colors.black};

`;

const StyledDateTimePicker = styled(DateTimePicker)`
  height: 60px;
`;

const GenderView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const GenderLabel = styled.Text`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: ${props => props.selected ? props.theme.colors.whiteSmoke : props.theme.colors.black};
`;

const GenderButton = styled.TouchableOpacity`
  padding: 10px;
  background: ${props => props.selected ? props.theme.colors.darkGray : props.theme.colors.whiteSmoke};
  border-radius: 8px;
`;

function UserForm({label, onPress}) {
  const [name, setName] = React.useState("");
  const [birthDate, setBirthDate] = useState(new Date(1598051730000));
  const [gender, setGender] = useState("");
  const themeContext = useContext(ThemeContext);

  const onDateChange = (event, selectedDate) => {
   const currentDate = selectedDate || birthDate;
   setBirthDate(currentDate);
 };

 const onGenderSelect = (selectedGender) => {
  const currentGender = selectedGender || gender;
  setGender(currentGender);
};

  return (
    <Form>
      <FieldView>
        <Label>{translations.createtoddler_name_title}:</Label>
        <StyledTextInput
          name="name"
          type="name"
          value={name}
          placeholder={translations.createtoddler_name_text}
          placeholderTextColor={themeContext.colors.silver}
          onChangeText={text => setName(text)}
          required />
      </FieldView>
      <FieldView>
        <Label>{translations.createtoddler_birthdate_title}:</Label>
        <StyledDateTimePicker
          value={birthDate}
          mode="date"
          is24Hour={true}
          display="compact"
          onChange={onDateChange}
          textColor={themeContext.colors.black}
        />
      </FieldView>
      <FieldView>
        <Label>{translations.createtoddler_gender_title}:</Label>
        <GenderView>
          <GenderButton
            onPress={() => onGenderSelect(translations.createtoddler_gender_text1)}
            selected={gender === translations.createtoddler_gender_text1}
          >
            <GenderLabel selected={gender === translations.createtoddler_gender_text1}>
              {translations.createtoddler_gender_text1}
            </GenderLabel>
          </GenderButton>
          <GenderButton
            onPress={() => onGenderSelect(translations.createtoddler_gender_text2)}
            selected={gender === translations.createtoddler_gender_text2}
          >
            <GenderLabel selected={gender === translations.createtoddler_gender_text2}>
              {translations.createtoddler_gender_text2}
            </GenderLabel>
          </GenderButton>
          <GenderButton
            onPress={() => onGenderSelect(translations.createtoddler_gender_text3)}
            selected={gender === translations.createtoddler_gender_text3}
          >
            <GenderLabel selected={gender === translations.createtoddler_gender_text3}>
              {translations.createtoddler_gender_text3}
            </GenderLabel>
          </GenderButton>
        </GenderView>
      </FieldView>
    </Form>
  );
}

UserForm.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func
};

UserForm.defaultProps = {
  label: "Default Category"
};

export default UserForm;
