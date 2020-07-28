import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
const algorithmiaApiKey = process.env.REACT_APP_ALGORITHMIA_KEY;

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

export const createJob = async (jobData) => {
  try {
    const { data } = await axios.post(`${baseUrl}/jobs/create-job/`, jobData);
    return data;
  } catch (err) {
    console.log(err.response);
  }
};

export const getAllJobs = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/jobs/jobs/`);
    return data;
  } catch (err) {
    console.log(err.response);
  }
};

export const getJob = async (id) => {
  try {
    const { data } = await axios.get(`${baseUrl}/jobs/update/${id}`);
    return data;
  } catch (err) {
    console.log(err.response);
  }
};

export const updateJob = async (id, dataObj) => {
  try {
    console.log(dataObj);
    const { data } = await axios.put(`${baseUrl}/jobs/update/${id}/`, dataObj);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err.response);
  }
};

export const applyJob = async (obj) => {
  try {
    const data = await axios.post(`${baseUrl}/jobs/apply-job/${obj.job}`, obj);
    return data;
  } catch (err) {
    console.log(err.response);
  }
};

export const getOrgJobs = async (username) => {
  try {
    const { data } = await axios.get(`${baseUrl}/jobs/employer/${username}`);
    return data;
  } catch (err) {
    console.log(err.response);
  }
};

export const getEmployeeJobs = async (username) => {
  try {
    const { data } = await axios.get(`${baseUrl}/jobs/applied/${username}`);
    return data;
  } catch (err) {
    console.log(err.response);
  }
};

export const getJobApplicants = async (id) => {
  try {
    const { data } = await axios.get(`${baseUrl}/jobs/applicants/${id}`);
    return data;
  } catch (err) {
    console.log(err.response);
  }
};

export const updateApplicationStatus = async (id, dataObj) => {
  try {
    await axios.patch(`${baseUrl}/jobs/status/${id}`, dataObj);
  } catch (err) {
    console.log(err.response);
  }
};

// external APIs
export const extractText = async (image, language = 'eng') => {
  const input = {
    image,
    language,
  };
  const {
    result: { prediction },
  } = await window.Algorithmia.client(algorithmiaApiKey)
    .algo('character_recognition/tesseract/0.3.0?timeout=300')
    .pipe(input);
  return prediction;
};

export const summarizeText = async (input) => {
  const { result } = await window.Algorithmia.client(algorithmiaApiKey)
    .algo('nlp/Summarizer/0.1.8?timeout=300')
    .pipe(input);
  return result;
};

export const summarizeTextFromImage = async (image, language) => {
  const text = await extractText(image, language);
  const summarizedText = await summarizeText(text);
  return { text, summarizedText };
};

// export const sendEmail = async () => {
//   window.Email.send({
//     SecureToken: '00b62de4-c992-467c-8efc-3cfd3d8b207c',
//     To: 'rajatverma@jssaten.ac.in',
//     From: 'rajatverma5885045@gmail.com',
//     Subject: 'This is the subject',
//     Body: 'And this is the body',
//   }).then((message) => console.log(message));
// };
