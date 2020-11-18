import axios from 'axios';

const uploadPreset = 'tjsj3nii'
const resourceType = 'image';

const client = axios.create({
    baseURL: `https://api.cloudinary.com/v1_1/dobowykzt/${resourceType}`,
    headers: {
      'content-type': 'application/json'
    }
})

const uploadImage = async data => {
    try {
        const result = await client.post('/upload', {
            file: data,
            upload_preset: uploadPreset
        });

        return result.data.secure_url;
    } catch (error) {
        console.log(error)
        throw error
    }
};

export { uploadImage };
