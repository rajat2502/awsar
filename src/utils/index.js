export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeDuplicate = (arr) =>
  arr.reduce(function (a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []);

export const getDomains = () => [
  'Medical',
  'Engineering',
  'Law',
  'Sales',
  'Hotel Management',
  'Nurse',
  'Pharmacy',
  'Health Care Services',
  'Transport',
  'Dental',
  'Aviation',
  'IT',
  'Teacher Training',
  'Administrative',
  'Finance',
  'Sports Quota',
  'Architecture',
  'ITI / Diploma',
  'Arts',
  'Agriculture',
  'Naval',
  'Human Resources and Development',
  'Marketing',
  'Accounts',
  'Telecom',
  'Communication',
  'Travel and Tourism',
  'Bank',
  'Other',
];

export const getQualifications = () => [
  '8th',
  '10th',
  'Intermediate (10+2)',
  'B.Sc',
  'B.Pharm',
  'Diploma',
  'BDS',
  'B.Ed',
  'DMLT',
  'BUMS',
  'B.V.Sc',
  'GNM',
  'ITI',
  'M.Tech',
  'B.Tech',
  'M.Sc',
  'MBA',
  'MS / MD',
  'PGDM',
  'MCA',
  'B.A',
  'M.A',
  'GATE',
  'ANM',
];
