import axios from 'axios';
import Algorithmia from 'algorithmia';

const baseUrl = process.env.REACT_APP_BASE_URL;
const algorithmiaApiKey = process.env.REACT_APP_ALGORITHMIA_KEY;

export const login = async (dataObj) => {
  try {
    const {
      data: { data },
    } = await axios.post(`${baseUrl}/accounts/login/`, dataObj);
    localStorage.setItem('token', data.token);
    return data;
  } catch (err) {
    return err.response.data;
  }
};

export const signUp = async (dataObj, role) => {
  try {
    const reqUrl =
      role === 'Employee'
        ? '/accounts/employeeregister/'
        : '/accounts/employerregister/';
    const { data } = await axios.post(`${baseUrl}${reqUrl}`, dataObj);
    localStorage.setItem('token', data.token);
    return data;
  } catch (err) {
    return { error: 'Something went wrong!' };
  }
};

export const createProfile = async (dataObj, role) => {
  try {
    const reqUrl =
      role === 'Employee'
        ? '/profile/create-employee-profile/'
        : '/profile/create-employer-profile/';
    const { data } = await axios.post(`${baseUrl}${reqUrl}`, dataObj);
    return data;
  } catch (err) {
    console.log(err.response);
    return { error: 'Something went wrong!' };
  }
};

export const uploadImage = async (formData) => {
  try {
    const token = process.env.REACT_APP_IMGBB_API_KEY;
    const url = `${process.env.REACT_APP_IMAGEBB_URL}?key=${token}`;
    const options = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const {
      data: { data },
    } = await axios.post(url, formData, options);
    return data;
  } catch (err) {
    return { err: err.response.data.error.message };
  }
};

export const getProfile = async (username, role) => {
  try {
    const reqUrl =
      role === 'Employee' ? '/employeeprofile/' : '/employerprofile/';
    const { data } = await axios.get(`${baseUrl}/profile${reqUrl}${username}`);
    return data;
  } catch (err) {
    return { error: err.response.data };
  }
};

// external APIs
export const extractText = async (image, language = 'eng') => {
  const input = {
    image,
    language,
  };
  const text = await Algorithmia.client(algorithmiaApiKey)
    .algo('character_recognition/tesseract/0.3.0?timeout=300')
    .pipe(input);
  // .then((response) => response.get());
  return text.get();
};

export const summarizeText = async (input) => {
  const text = await Algorithmia.client(algorithmiaApiKey)
    .algo('nlp/Summarizer/0.1.8?timeout=300')
    .pipe(input);
  // .then((response) => response.get());
  return text.get();
};

export const summarizeTextFromImage = async (image, language) => {
  const text = await extractText(image, language);
  console.log(text);
  const summarizedText = await summarizeText(text);
  console.log(summarizedText);
};
