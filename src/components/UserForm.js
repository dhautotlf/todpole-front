import React, { useState, useContext, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import styled, { ThemeContext } from 'styled-components/native';
import PropTypes from 'prop-types';
import { translations } from '../constants/translations';

const Form = styled.View``;

const FieldView = styled.View`
  margin-bottom: 20px;
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
  width: 320px;
  height: 44px;
  border: 1px solid ${(props) => props.theme.colors.darkGray};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.black};
`;

const StyledDateTimePicker = styled(DateTimePicker)`
  height: 60px;
  width: 100%;
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
  color: ${(props) =>
    props.selected ? props.theme.colors.whiteSmoke : props.theme.colors.black};
`;

const GenderButton = styled.TouchableOpacity`
  padding: 10px;
  background: ${(props) =>
    props.selected
      ? props.theme.colors.darkGray
      : props.theme.colors.whiteSmoke};
  border-radius: 8px;
`;

const genderEnum = [
  {
    translation: translations.createtoddler_gender_text1,
    value: 'FEMALE',
  },
  {
    translation: translations.createtoddler_gender_text2,
    value: 'MALE',
  },
  {
    translation: translations.createtoddler_gender_text3,
    value: 'UNSPECIFIED',
  },
];

function UserForm({ onChange }) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date(1598051730000));
  const [gender, setGender] = useState('FEMALE');
  const themeContext = useContext(ThemeContext);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setBirthDate(currentDate);
  };

  const onGenderSelect = (selectedGender) => {
    const currentGender = selectedGender || gender;
    setGender(currentGender);
  };

  useEffect(
    () =>
      onChange({
        name,
        birthDate,
        gender,
        type: 'TODDLER',
      }),
    [name, birthDate, gender],
  );

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
          onChangeText={(text) => setName(text)}
          required
        />
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
          {genderEnum.map((g, i) => (
            <GenderButton
              onPress={() => onGenderSelect(g.value)}
              selected={gender === g.value}
              key={i}
            >
              <GenderLabel selected={gender === g.value}>
                {g.translation}
              </GenderLabel>
            </GenderButton>
          ))}
        </GenderView>
      </FieldView>
    </Form>
  );
}

UserForm.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  onChange: PropTypes.func,
};

UserForm.defaultProps = {
  label: 'Default Category',
  onChange: () => {},
};

export default UserForm;
