import React, {useState} from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Form = styled.View``;

const Label = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: ${props => props.theme.colors.black};
`;

const StyledTextInput = styled.TextInput`
  padding: 10px;
  width: 320px;
  height: 44px;
  border: 1px solid ${props => props.theme.colors.darkGray};
  border-radius: 8px;
  color: ${props => props.theme.colors.silver};
`;

function UserForm({label, onPress}) {
  const [name, setName] = React.useState("");
  const [birthDate, setBirthDate] = useState(new Date(1598051730000));

  const onDateChange = (event, selectedDate) => {
   const currentDate = selectedDate || birthDate;
   setBirthDate(currentDate);
 };

  return (
    <Form>
      <View>
        <Label>Name:</Label>
        <StyledTextInput
          name="name"
          type="name"
          value={name}
          onChangeText={e => setName(e.target.value)}
          required />
      </View>
      <View>
        <Label>Date:</Label>
        <DateTimePicker
          testID="dateTimePicker"
          value={birthDate}
          mode="date"
          is24Hour={true}
          display="compact"
          onChange={onDateChange}
        />
      </View>
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
