import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import BasicButton from '../components/BasicButton';
import FieldForm from '../components/FieldForm';

const Form = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Footer = styled.View`
  align-items: center;
  margin: 28px auto;
`;

function ActivityForm({ submitButtonLabel, onCreateActivity, context }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState({});
  const [ages, setAges] = React.useState([6, 18]);
  const [timing, setTiming] = useState(0);
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [rating, setRating] = useState({ ratings: 0, views: null });
  const [review, setReview] = useState('');
  const [tags, setTags] = useState('');
  const [materials, setMaterials] = useState([]);

  const formBuilder = () => ({
    category: category.value,
    name,
    ageMin: ages[0],
    ageMax: ages[1],
    timing,
    description,
    url,
    review: { rating: rating.ratings, text: review },
    materials,
  });

  const submitForm = () => onCreateActivity(formBuilder());

  return (
    <Form>
      <FieldForm
        fields={{
          name,
          category,
          ages,
          timing,
          description,
          url,
          rating,
          review,
          tags,
          materials,
        }}
        onFieldChange={(props) => {
          const [[key, value]] = Object.entries(props);
          const setter = {
            name: setName,
            category: setCategory,
            ages: setAges,
            timing: setTiming,
            description: setDescription,
            url: setUrl,
            rating: setRating,
            review: setReview,
            tags: setTags,
            materials: setMaterials,
          }[key];
          setter && setter(value);
        }}
      />
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
