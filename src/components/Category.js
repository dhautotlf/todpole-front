import React from 'react';
import { Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';

function Category({title, description}) {
  return (
    <View>
      <Image>IMAGE</Image>
      <Text>{title}</Text>
      <Text>{description}</Text>
    </View>
  );
}

Category.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

Category.defaultProps = {
  title: "Default Category",
  description: "default text category"
};

export default Category;
