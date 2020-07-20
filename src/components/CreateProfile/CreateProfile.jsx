import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { createProfile } from 'api';

import { StyledForm } from 'components/StyledForm';

function CreateProfile({ user }) {
  const history = useHistory();

  const [step, setStep] = useState(1);
  const [addAnotherEducation, setAddAnotherEducation] = useState(true);
  const [addAnotherWork, setAddAnotherWork] = useState(true);
  const [pending, setPending] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({
    first_name: '',
    last_name: '',
    gender: 'Male',
    title: '',
    industry: '',
    location: '',
    skills: '',
    workexperience: [],
    education: [],
  });
  const [companyDetails, setCompanyDetails] = useState({
    company_name: '',
    website: '',
    location: '',
    company_size: 0,
    company_type: '',
    industry: '',
    overview: '',
  });

  const decStep = () => step !== 1 && setStep(step - 1);

  const incStep = () => step !== 3 && setStep(step + 1);

  const addEducation = () => {
    const institution = document.getElementsByName('institution')[0].value;
    const degree = document.getElementsByName('degree')[0].value;
    const start_date = document.getElementsByName('start_date')[0].value;
    const end_date = document.getElementsByName('end_date')[0].value;
    const edu = [
      ...employeeDetails.education,
      { institution, degree, start_date, end_date },
    ];
    setEmployeeDetails((state) => ({ ...state, education: edu }));
    setAddAnotherEducation(false);
  };

  const deleteEducation = (date) => {
    const edu = [...employeeDetails.education];
    const newEdu = edu.filter((e) => e.start_date !== date);
    if (edu.length === 1) setAddAnotherEducation(true);
    setEmployeeDetails((state) => ({ ...state, education: newEdu }));
  };

  const addWork = () => {
    const company = document.getElementsByName('company')[0].value;
    const position = document.getElementsByName('position')[0].value;
    const start_date = document.getElementsByName('work-start_date')[0].value;
    const end_date = document.getElementsByName('work-end_date')[0].value;
    const location = document.getElementsByName('work-location')[0].value;
    const work = [
      ...employeeDetails.workexperience,
      { company, position, start_date, end_date, location },
    ];
    setEmployeeDetails((state) => ({ ...state, workexperience: work }));
    setAddAnotherWork(false);
  };

  const deleteWork = (date) => {
    const work = [...employeeDetails.workexperience];
    const newWork = work.filter((e) => e.start_date !== date);
    if (work.length === 1) setAddAnotherWork(true);
    setEmployeeDetails((state) => ({ ...state, workexperience: newWork }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const dataObj =
      user.role === 'Employee'
        ? Object.assign({ user: user.username }, employeeDetails)
        : Object.assign({ user: user.username }, companyDetails);
    const data = await createProfile(dataObj, user.role);
    if (data.error) console.log(data.error);
    else history.push(`/profile/${user.username}`);
    setPending(false);
  };

  const handleEmployeeDetails = ({ target: { name, value } }) => {
    setEmployeeDetails((state) => ({ ...state, [name]: value }));
  };

  const handleCompanyDetails = ({ target: { name, value } }) => {
    setCompanyDetails((state) => ({ ...state, [name]: value }));
  };

  return (
    <div className="rounded-lg bg-white mx-auto my-8 sm:px-8">
      <StyledForm className="shadow-none">
        <h1>Complete your profile</h1>
        <form onSubmit={handleSubmit}>
          {user.role === 'Employee' ? (
            <>
              {step === 1 && (
                <>
                  <div className="flex flex-col sm:flex-row">
                    <div className="input-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        placeholder="Eg: John"
                        name="first_name"
                        value={employeeDetails.first_name}
                        onChange={(e) => handleEmployeeDetails(e)}
                      />
                    </div>
                    <div className="input-group sm:ml-2">
                      <label>Last Name</label>
                      <input
                        type="text"
                        placeholder="Eg: Doe"
                        name="last_name"
                        value={employeeDetails.last_name}
                        onChange={(e) => handleEmployeeDetails(e)}
                      />
                    </div>
                  </div>
                  <div className="input-group sm:w-full">
                    <label>Gender</label>
                    <select
                      className="sm:w-full"
                      name="gender"
                      onChange={(e) => handleEmployeeDetails(e)}
                      value={employeeDetails.gender}>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <div className="input-group">
                      <label>City of residence</label>
                      <input
                        type="text"
                        placeholder="Eg: Delhi"
                        name="location"
                        value={employeeDetails.location}
                        onChange={(e) => handleEmployeeDetails(e)}
                      />
                    </div>
                    <div className="input-group sm:ml-2">
                      <label>Designation</label>
                      <input
                        type="text"
                        placeholder="Eg: Product Manager"
                        name="title"
                        value={employeeDetails.title}
                        onChange={(e) => handleEmployeeDetails(e)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <div className="input-group">
                      <label>Industry</label>
                      <input
                        type="text"
                        placeholder="Eg: Telecom"
                        name="industry"
                        value={employeeDetails.industry}
                        onChange={(e) => handleEmployeeDetails(e)}
                      />
                    </div>
                    <div className="input-group sm:ml-2">
                      <label>Skills (comma seperated)</label>
                      <input
                        type="text"
                        placeholder="Eg: Designing, Communication"
                        name="skills"
                        value={employeeDetails.skills}
                        onChange={(e) => handleEmployeeDetails(e)}
                      />
                    </div>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div>
                    <p className="m-2 text-lg font-bold text-gray-600 text-center">
                      Educational Qualification
                    </p>
                    {employeeDetails.education.map((ed) => (
                      <div className="education" key={ed.start_date}>
                        <p>
                          {ed.institution} - {ed.degree}
                        </p>
                        <p>
                          {ed.start_date} - {ed.end_date}
                        </p>
                        <span
                          title="delete"
                          onClick={() => deleteEducation(ed.start_date)}>
                          X
                        </span>
                      </div>
                    ))}
                    {addAnotherEducation && (
                      <>
                        <div className="flex flex-col sm:flex-row">
                          <div className="input-group">
                            <label>Institute</label>
                            <input
                              type="text"
                              name="institution"
                              placeholder="Eg: IIT Delhi"
                            />
                          </div>
                          <div className="input-group sm:ml-2">
                            <label>Degree</label>
                            <input
                              type="text"
                              name="degree"
                              placeholder="Eg: B.Tech"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                          <div className="input-group">
                            <label>Start date</label>
                            <input type="date" name="start_date" />
                          </div>
                          <div className="input-group sm:ml-2">
                            <label>End date</label>
                            <input type="date" name="end_date" />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="flex justify-center">
                      {addAnotherEducation ? (
                        <button type="button" onClick={addEducation}>
                          Add Education
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setAddAnotherEducation(true)}>
                          Add Another Education
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <div>
                    <p className="m-2 text-lg font-bold text-gray-600 text-center">
                      Work Experience
                    </p>
                    {employeeDetails.workexperience.map((work) => (
                      <div className="work" key={work.start_date}>
                        <p>
                          {work.company}, {work.location} - {work.position}
                        </p>
                        <p>
                          {work.start_date} - {work.end_date}
                        </p>
                        <span
                          title="delete"
                          onClick={() => deleteWork(work.start_date)}>
                          X
                        </span>
                      </div>
                    ))}
                    {addAnotherWork && (
                      <>
                        <div className="flex flex-col sm:flex-row">
                          <div className="input-group">
                            <label>Company</label>
                            <input
                              type="text"
                              placeholder="Eg: IOCL"
                              name="company"
                            />
                          </div>
                          <div className="input-group sm:ml-2">
                            <label>Position</label>
                            <input
                              type="text"
                              placeholder="Eg: Manager"
                              name="position"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                          <div className="input-group">
                            <label>Start date</label>
                            <input type="date" name="work-start_date" />
                          </div>
                          <div className="input-group sm:ml-2">
                            <label>End date</label>
                            <input type="date" name="work-end_date" />
                          </div>
                        </div>
                        <div>
                          <div className="input-group">
                            <label>Location</label>
                            <input
                              type="text"
                              placeholder="Eg: Noida"
                              name="work-location"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="flex justify-center">
                      {addAnotherWork ? (
                        <button type="button" onClick={addWork}>
                          Add Work Experience
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setAddAnotherWork(true)}>
                          Add Another Work Experience
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
              <div className="buttons flex justify-between w-full">
                {step !== 1 && (
                  <button type="button" onClick={decStep} disabled={pending}>
                    Prev Step
                  </button>
                )}
                {step !== 3 && (
                  <button type="button" onClick={incStep}>
                    Next Step
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row">
                <div className="input-group">
                  <label>Company</label>
                  <input
                    type="text"
                    placeholder="Eg: IOCL"
                    name="company_name"
                    onChange={(e) => handleCompanyDetails(e)}
                  />
                </div>
                <div className="input-group sm:ml-2">
                  <label>Website</label>
                  <input
                    type="text"
                    placeholder="Eg: https://abc.com"
                    name="website"
                    onChange={(e) => handleCompanyDetails(e)}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="input-group">
                  <label>Location</label>
                  <input
                    type="text"
                    placeholder="Eg: Delhi"
                    name="location"
                    onChange={(e) => handleCompanyDetails(e)}
                  />
                </div>
                <div className="input-group sm:ml-2">
                  <label>Industry</label>
                  <input
                    type="text"
                    placeholder="Eg: IT sector"
                    name="industry"
                    onChange={(e) => handleCompanyDetails(e)}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="input-group">
                  <label>Company size</label>
                  <input
                    type="number"
                    placeholder="Eg: 200"
                    name="company_size"
                    onChange={(e) => handleCompanyDetails(e)}
                  />
                </div>
                <div className="input-group sm:ml-2">
                  <label>Company type</label>
                  <input
                    type="text"
                    placeholder="Eg: Central Government"
                    name="company_type"
                    onChange={(e) => handleCompanyDetails(e)}
                  />
                </div>
              </div>
              <div className="textarea input-group sm:w-full">
                <label>Description</label>
                <textarea
                  className="sm:w-full"
                  placeholder="Company description..."
                  name="overview"
                  onChange={(e) => handleCompanyDetails(e)}
                />
              </div>
            </>
          )}
          {(user.role === 'Employer' || step === 3) && (
            <button type="submit" disabled={pending}>
              {pending ? 'Submitting Details...' : 'Submit Details'}
            </button>
          )}
        </form>
      </StyledForm>
    </div>
  );
}

export default CreateProfile;
