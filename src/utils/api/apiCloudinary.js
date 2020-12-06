import axios from 'axios';
import getLocalFile from '../fileSystem/getLocalFile';

const uploadPreset = 'tjsj3nii';
const resourceType = 'image';

const client = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/dobowykzt/${resourceType}`,
  headers: {
    'content-type': 'application/json',
  },
});

const uploadImageFromLocalFile = async (path) => {
  try {
    const base64File = await getLocalFile(path);
    const secureUrl = await uploadImage(base64File);

    return secureUrl;
  } catch (e) {
    throw e;
  }
};

const uploadImage = async (data) => {
  try {
    const result = await client.post('/upload', {
      file: data,
      upload_preset: uploadPreset,
    });
    const url = result.data.secure_url;
    let urlArr = url.split('/');
    urlArr[urlArr.length - 2] = 'q_auto';

    return urlArr.join('/');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { uploadImage, uploadImageFromLocalFile };
