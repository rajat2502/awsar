import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { uploadImage } from 'api';

import { StyledForm } from 'components/StyledForm';

function CreateJob() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('Choose a Document');
  const [uploading, setUploading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [img, setImg] = useState(null);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setFile(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);
    const imageData = await uploadImage(formData);
    return imageData.image.url;
  };

  const showExtractStart = (e) => {
    e.preventDefault();
    setExtracting(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      setError(true);
      setUploading(true);
      const image = await handleImageUpload();
      setImg(image);
      setStep(2);
      setUploading(false);
    } else setError('Please choose a document!');
  };

  if (!localStorage.getItem('token')) return <Redirect to="/login" />;

  return (
    <StyledForm className="w-5/6 sm:w-1/3 px-8">
      {step === 1 && (
        <>
          <h1>Upload Job Document</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group sm:w-full">
              <p className="ml-1 text-gray-600">
                Please upload the document from which job description has to be
                read (format can be image or .pdf or .docx)
              </p>
              <label className="file-upload" htmlFor="file-upload">
                {`${
                  fileName !== 'Choose a Document' ? 'File: ' : ''
                }${fileName}`}
              </label>
              <input
                id="file-upload"
                name="image"
                type="file"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </div>
            <button type="submit" disabled={uploading}>
              {!uploading ? 'Upload Document' : 'Uploading Document...'}
            </button>
            {error && <p className="error">{error}</p>}
          </form>
        </>
      )}
      {step === 2 && (
        <>
          <h1>Document Uploaded</h1>
          <p className="mx-1 flex flex-wrap text-gray-700">
            <span className="text-black font-bold">Document Name: </span>
            &nbsp;{fileName}
          </p>
          <form className="mt-2" onSubmit={showExtractStart}>
            <p className="mx-1 text-lg text-gray-700">
              Please click the button below to Extract Job Description from the
              uploaded document.
            </p>
            <button type="submit" disabled={extracting}>
              {!extracting
                ? 'Extract Job Description'
                : 'Extracting Job Description...'}
            </button>
          </form>
        </>
      )}
    </StyledForm>
  );
}

export default CreateJob;
