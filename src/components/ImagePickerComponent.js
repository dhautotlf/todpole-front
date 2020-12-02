import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CameraIcon from '../assets/icons/photo-camera.svg';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const CameraButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 132px;
  height: 132px;
  border-radius: ${(props) => props.theme.spacing.tiny}px;
  background: ${(props) => props.theme.colors.lightGray};
`;

const PreviewImage = styled.Image`
  width: 132px;
  height: 132px;
  border-radius: ${(props) => props.theme.spacing.tiny}px;
`;

function ImagePickerComponent({ onImageChange }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.cancelled) {
      const imageUri = `data:image/jpg;base64,${result.base64}`;
      setImage(result.uri);
      onImageChange(result.uri);
    }
  };

  return (
    <View>
      {!image && (
        <CameraButton onPress={pickImage}>
          <CameraIcon width={53} height={43} />
        </CameraButton>
      )}
      {image && (
        <TouchableOpacity onPress={pickImage}>
          <PreviewImage
            source={{ uri: image }}
            style={{ width: 200, height: 200 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

ImagePickerComponent.propTypes = {
  onImageChange: PropTypes.func,
};

ImagePickerComponent.defaultProps = {
  onImageChange: () => {},
};

export default ImagePickerComponent;
