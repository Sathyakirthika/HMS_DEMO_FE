import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import '../../Styles/registration.css';
import config from '../../config.js';
import _ from 'lodash';
import Barcode from 'react-barcode';

const LoadingSpinner = () => (
  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex items-center bg-blue-500 p-2 rounded-lg shadow-lg">
    <div className="animate-spin rounded-full border-t-4 bg-violet-950 border-opacity-50 h-8 w-8 mx-2"></div>
    <div className="text-white font-bold">Loading...</div>
  </div>
);



const CheckboxApp = ({uhid }) => {

  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [fatherName, setFatherName] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [ageUnit, setAgeUnit] = useState("years");


  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState('');
  const [occupation, setOccupation] = useState('');

  const [language, setLanguage] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [religion, setReligion] = useState('');

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [mobileNumber, setMobileNumber] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');


  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [cityVillage,setCityVillage] = useState('');

 
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState(''); 

  const [nextOfKinName, setNextOfKinName] = useState("");
  const [nextOfKinRelation, setNextOfKinRelation] = useState(''); 
  const [nextOfKinMobileNumber, setNextOfKinMobileNumber] = useState(''); 
  const [nextOfKinCity, setNextOfKinCity] = useState("");
  const [nextOfKinCountry, setNextOfKinCountry] = useState("");
  const [nextOfKinAddress, setNextOfKinAddress] = useState("");

  const [payer, setPayer] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [insuranceType, setInsuranceType] = useState('');
  const [registrationFees, setRegistrationFees] = useState(100);
  const [registrationDate, setRegistrationDate] =useState(getCurrentDate());

  const [uhidInput, setUhidInput] = useState('');
  const [mobileNumberInput, setMobileNumberInput] = useState('');

  const [submittedData, setSubmittedData] = useState(null);
  const[editupdate,setEditUpdate]=useState(null);

  const [isFirstTimeRegistration, setIsFirstTimeRegistration] = useState(true);
  const [editedData, setEditedData] = useState({});

  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showRedBorders, setShowRedBorders] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const videoRef = useRef(null);
  const [showSubmit,setShowSubmit]=useState(true);
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showUpdateSuccessMessage, setShowUpdateSuccessMessage] = useState(false);

  const [isallare,setIsAllAre ] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isUpdating, setUpdating] = useState(false);

  const [idCardData, setIdCardData] = useState(null);
  const [showIdCard, setShowIdCard] = useState(false);
  const printRef = useRef();
  const [patientData, setPatientData] = useState({});
  const [showPatientsTable, setShowPatientsTable] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [multiplePatients, setMultiplePatients] = useState(null);
  const[tablehide,setTablehide]=useState(false);


function getCurrentDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); 
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}


const payerOptions = ['Private Cash','NHIS','Private/CompanyInsured','Insurance',];
const paymentMethodOptions = ['Cash', 'Credit Card','Debit Card', 'Others'];
const insuranceTypeOptions = [' starHealth Insurance', 'TATA AIA Insurance', 'Adithya Birla Insurance', 'Others'];

const allDistricts = {
  'Tamil Nadu': [
    'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri',
    'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri',
    'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai',
    'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi',
    'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Vellore',
    'Viluppuram', 'Virudhunagar'
  ],
  'Kerala': [
    'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode',
    'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'
  ],
  'Maharashtra': [
    'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana',
    'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur',
    'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad',
    'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur',
    'Thane', 'Wardha', 'Washim', 'Yavatmal'
  ],
  'Andhra Pradesh': [
    'Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Prakasam', 'Srikakulam',
    'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'
  ],

};



  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const currentDate = new Date();
  
      switch (ageUnit) {
        case "days":
          const ageDifferenceInDays = Math.floor((currentDate - birthDate) / (1000 * 60 * 60 * 24));
          setAge(ageDifferenceInDays);
          break;
        case "months":
          const ageDifferenceInMonths = (currentDate.getMonth() - birthDate.getMonth()) +
            12 * (currentDate.getFullYear() - birthDate.getFullYear());
          setAge(ageDifferenceInMonths);
          break;
        case "years":
        default:
          const ageDifferenceInYears = currentDate.getFullYear() - birthDate.getFullYear();
          setAge(ageDifferenceInYears);
          break;
      }
    }
  }, [dob, ageUnit]);


  useEffect(() => {
 const currentDate = getCurrentDate();
    setRegistrationDate(currentDate);
  }, []);

  
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;

    if (isFirstTimeRegistration) {
      setTitle(newTitle);
    } else {
      setEditedData({ title: newTitle });
    }
  };


  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value.replace(/[^A-Za-z ]/g, ''));
  };
  
  const handleLastNameChange = (event) => {
     setLastName(event.target.value.replace(/[^A-Za-z ]/g, ''));
  };
  
  const handleFatherNameChange = (event) => {
    setFatherName(event.target.value.replace(/[^A-Za-z ]/g, '').trim());
  };

  const handleDobChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();


    if (selectedDate > currentDate) {
    
      setDob(0);
      setAgeUnit('years')
      setAge(0);
    } else {
     
      setDob(event.target.value);
    }
  };


  
  const handleStreet1Change = (event) => {
    setStreet1(event.target.value);
  };

  const handleStreet2Change = (event) => {
    const value = event.target.value.replace(/[^A-Za-z ]/g, '');
    setStreet2(value);
  };

 
  const handleCityVillageChange = (event) => {
   setCityVillage(event.target.value);
  };
  
  
  const handleAgeChange = (event) => {
    const inputAge = parseInt(event.target.value, 10); 
    const currentDate = new Date();
  

    if (!isNaN(inputAge) && inputAge >= 0) {
    
      setAge(inputAge);
    } else {
     
      setAge(0);
    }
  };
  
  
  const handleAgeUnitChange = (event) => {
    const selectedAgeUnit = event.target.value;
    setAgeUnit(selectedAgeUnit);
  
  
    if (dob) {
      const birthDate = new Date(dob);
      const currentDate = new Date();
  
      switch (selectedAgeUnit) {
        case "days":
          const ageDifferenceInDays = Math.floor((currentDate - birthDate) / (1000 * 60 * 60 * 24));
          setAge(ageDifferenceInDays);
          break;
        case "months":
          const ageDifferenceInMonths = (currentDate.getMonth() - birthDate.getMonth()) +
            12 * (currentDate.getFullYear() - birthDate.getFullYear());
          setAge(ageDifferenceInMonths);
          break;
        case "years":
        default:
          const ageDifferenceInYears = currentDate.getFullYear() - birthDate.getFullYear();
          setAge(ageDifferenceInYears);
          break;
      }
    }
  };
  


  const handleRegistrationFeesChange = (event) => {
    setRegistrationFees(event.target.value);
  };

  const handleGenderChange = (event) => {
   setGender(event.target.value);
  };
  
  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };
  const districtsOptions = allDistricts[state] || [];

  const handleStateChange = (event) => {
    setState(event.target.value);
    setDistrict('');
  };
  
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };


  const displayAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
      setAlertMessage('');
    }, 2000);
  };

  const resetFormFields = () => {
    setUhidInput('')
    setMobileNumberInput('')
    setTitle('');
    setFirstName('');
    setLastName('');
    setFatherName('');
    setDob('');
    setAge('');
    setAgeUnit('years');
    setGender('');
    setMaritalStatus('');
    setOccupation('');
    setLanguage('');
    setEducationLevel('');
    setReligion('');
    setEmail('');
    setStreet1('');
    setStreet2('');
    setCityVillage('');
    setMobileNumber('');
    setDistrict('');
    setState('');
    setCountry('');
    setAadhaarNumber('');
    setRegistrationFees(100);
    setNextOfKinName('');
    setNextOfKinRelation('');
    setNextOfKinMobileNumber('');
    setNextOfKinCity('');
    setNextOfKinCountry('');
    setNextOfKinAddress('');
    setPayer('');
    setPaymentMethod('');
    setInsuranceType('');
    setIsAllAre(false);
    setShowUpdateSuccessMessage(false);
  };
  const handleClose = () => {
    // Handle closing of the ID card and show the registration page
    setShowIdCard(false);
    // You may also include additional logic to navigate to the registration page
  };


  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>ID Card</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printRef.current.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
   
  };


  const handleSubmit = () => {
   

    
    if ( !title || !firstName.trim() || !lastName.trim() ||  !fatherName.trim() || !age || !gender || !aadhaarNumber || !street1.trim() || !street2.trim() || !cityVillage.trim() || !district.trim() || !state.trim() || !country.trim() || !mobileNumber.trim()  || !payer.trim() || !paymentMethod.trim()) {

  setShowRedBorders(true);


  setTimeout(() => {
    setShowRedBorders(false);
  }, 2000);

  return;
}
if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      
  setShowAlert(true);
  setAlertMessage('Please enter a valid mobileNumber');

  setTimeout(() => {
    setShowAlert(false);
    setSubmitDisabled(false);
  }, 2000); 


return;
}


if (aadhaarNumber.length !== 12) {
  setAlertMessage('Aadhar number must be 12 digits');
  setShowRedBorders(true);
  setShowAlert(true);

  setTimeout(() => {
    setShowAlert(false);
    setShowRedBorders(false);
    setSubmitDisabled(false);
  }, 2000);

  return;
}

 // Validate email format only if it is provided
 if (email) {
  const emailRegex = /^[A-Z0-9._%+-]+@gmail\.com$/i;
  const isValidEmail = emailRegex.test(email);

  setIsValidEmail(isValidEmail);

  if (!isValidEmail) {
    setAlertMessage('Please enter a valid email address');
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setSubmitDisabled(false);
    }, 2000);

    return;
  } else {
    setAlertMessage('');
  }
}


  
setSubmitDisabled(true);



    const formData = {
      Title:title,
      first_Name:firstName,
      last_Name:lastName,
      father_name: fatherName,
      date_of_birth: dob || null,
      age:age,
      age_Unit:ageUnit,
      gender:gender,
      marital_status:maritalStatus,
      occupation:occupation,
      language:language,
      education_level:educationLevel,
      religion:religion,
      email:email,
      Mobile_number: mobileNumber,
      aadhar_number: aadhaarNumber,
      street1:street1,
      street2:street2,
      city_village:cityVillage,
      district:district,
      state:state,
      country:country,
      next_of_kin_name: nextOfKinName, 
      next_of_kin_relation: nextOfKinRelation, 
      next_of_kin_Mobile_number: nextOfKinMobileNumber, 
      next_of_kin_city:nextOfKinCity,  
      next_of_kin_country:nextOfKinCountry,
      next_of_kin_address: nextOfKinAddress,
      payer: payer, 
      payment_method: paymentMethod,
      insurance_type: insuranceType,
      registration_fees:registrationFees,
      registration_date: registrationDate,
     
      
    };

 
    
    fetch(`${config.apiUrl}/registration/patient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const { uhid } = data; 
   
        if (uhid) {
          const receivedUHID = uhid;
          console.log("id", receivedUHID);
   
          const idCard = {
            uhid: receivedUHID,
            name: `${title} ${firstName} ${lastName}`,
            age: `${age} ${ageUnit}`,
            district: `${district}`,
            mobileNumber: `${mobileNumber}`,
          };
   
          setIdCardData(idCard);
          console.log("id card",idCard)
         
 
          // Handle the successful submission
          const submittedData = {
            uhid: uhid,
            dateTime: new Date().toLocaleString(),
            ...formData,
          };
 
          setSubmittedData(submittedData);
          setSubmitting(true);
          setTimeout(() => {
          setShowSuccessMessage(true);
        }, 2000);
   
          setTimeout(() => {
            resetFormFields();
            setSubmitDisabled(false);
            setShowSuccessMessage(false);
            setSubmitting(false);
            setShowIdCard(true);
          }, 4000);
         
         

        }
       
      })
      .catch(error => {
        console.error('Error:', error);
      
        if (error instanceof Error) {
          // Log the detailed error message received from the server
          console.error('Server response:', error.message);
          setAlertMessage(error.message);
        } else {
          setAlertMessage('Unknown error occurred');
        }
      
        setShowAlert(true);
        setSubmitDisabled(true);
      
        setTimeout(() => {
          setSubmitDisabled(false);
          setShowAlert(false);
        }, 2000);
      });
      
};



const handleSaveChanges = async () => {
  try {
    if (
      !title ||
      !firstName.trim() ||
      !lastName.trim() ||
      !fatherName.trim() ||
      !age ||
      !gender ||
      !aadhaarNumber ||
      !street1.trim() ||
      !street2.trim() ||
      !cityVillage.trim() ||
      !district.trim() ||
      !state.trim() ||
      !country.trim() ||
      !mobileNumber.trim() ||
      !payer.trim() ||
      !paymentMethod.trim()
    ) {
      setShowRedBorders(true);

      setTimeout(() => {
        setShowRedBorders(false);
      }, 2000);

      return;
    }

    setSubmitDisabled(true);

    if (!uhidInput && !mobileNumberInput) {
      console.error('Either UHID or Mobile Number is required for saving changes');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      
        setShowAlert(true);
        setAlertMessage('Please enter a valid mobileNumber');
    
        setTimeout(() => {
          setShowAlert(false);
          setSubmitDisabled(false);
        }, 2000); 
     
    
      return;
    }

    if (email.trim() !== '') {
      const emailRegex = /^[A-Z0-9._%+-]+@gmail\.com$/i;
      const isValidEmail = emailRegex.test(email);

      if (!isValidEmail) {
        setAlertMessage('Please enter a valid email address');
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
          setSubmitDisabled(false);
        }, 2000);

        return;
      } else {
        setAlertMessage('');
      }
    }

  

    const isDataChanged =
      title !== patientData.Title ||
      firstName !== patientData.first_Name ||
      lastName !== patientData.last_Name ||
      fatherName !== patientData.father_name ||
      dob !==
        (patientData.date_of_birth
          ? format(new Date(patientData.date_of_birth), 'yyyy-MM-dd')
          : null) ||
      age !== patientData.age ||
      ageUnit !== patientData.age_Unit ||
      gender !== patientData.gender ||
      maritalStatus !== patientData.marital_status ||
      occupation !== patientData.occupation ||
      language !== patientData.language ||
      educationLevel !== patientData.education_level ||
      religion !== patientData.religion ||
      email !== patientData.email ||
      mobileNumber !== patientData.Mobile_number ||
      aadhaarNumber !== patientData.aadhar_number ||
      street1 !== patientData.street1 ||
      street2 !== patientData.street2 ||
      cityVillage !== patientData.city_village ||
      district !== patientData.district ||
      state !== patientData.state ||
      country !== patientData.country ||
      nextOfKinName !== patientData.next_of_kin_name ||
      nextOfKinRelation !== patientData.next_of_kin_relation ||
      nextOfKinMobileNumber !== patientData.next_of_kin_Mobile_number ||
      nextOfKinCity !== patientData.next_of_kin_city ||
      nextOfKinCountry !== patientData.next_of_kin_country ||
      nextOfKinAddress !== patientData.next_of_kin_address ||
      payer !== patientData.payer ||
      paymentMethod !== patientData.payment_method ||
      insuranceType !== patientData.insurance_type ||
      registrationFees !== patientData.registration_fees ||
      registrationDate !==
        (patientData.registration_date
          ? format(new Date(patientData.registration_date), 'yyyy-MM-dd')
          : '');

    const identifier = uhidInput || mobileNumberInput;

    const updatedData = {
      Title: title || (selectedPatient && selectedPatient.Title) || '',
      first_Name: firstName || (selectedPatient && selectedPatient.first_Name) || '',
      last_Name: lastName || (selectedPatient && selectedPatient.last_Name) || '',
      father_name: fatherName || (selectedPatient && selectedPatient.father_name) || '',
      date_of_birth: dob || (selectedPatient && selectedPatient.date_of_birth) || null,
      age: age || (selectedPatient && selectedPatient.age) || '',
      age_Unit: ageUnit || (selectedPatient && selectedPatient.age_Unit) || '',
      gender: gender || (selectedPatient && selectedPatient.gender) || '',
      marital_status: maritalStatus || (selectedPatient && selectedPatient.marital_status) || '',
      occupation: occupation || (selectedPatient && selectedPatient.occupation) || '',
      language: language || (selectedPatient && selectedPatient.language) || '',
      education_level: educationLevel || (selectedPatient && selectedPatient.education_level) || '',
      religion: religion || (selectedPatient && selectedPatient.religion) || '',
      email: email || (selectedPatient && selectedPatient.email) || '',
      Mobile_number: mobileNumber || (selectedPatient && selectedPatient.Mobile_number) || '',
      aadhar_number: aadhaarNumber || (selectedPatient && selectedPatient.aadhar_number) || '',
      street1: street1 || (selectedPatient && selectedPatient.street1) || '',
      street2: street2 || (selectedPatient && selectedPatient.street2) || '',
      city_village: cityVillage || (selectedPatient && selectedPatient.city_village) || '',
      district: district || (selectedPatient && selectedPatient.district) || '',
      state: state || (selectedPatient && selectedPatient.state) || '',
      country: country || (selectedPatient && selectedPatient.country) || '',
      next_of_kin_name: nextOfKinName || (selectedPatient && selectedPatient.next_of_kin_name) || '',
      next_of_kin_relation: nextOfKinRelation || (selectedPatient && selectedPatient.next_of_kin_relation) || '',
      next_of_kin_Mobile_number: nextOfKinMobileNumber || (selectedPatient && selectedPatient.next_of_kin_Mobile_number) || '',
      next_of_kin_city: nextOfKinCity || (selectedPatient && selectedPatient.next_of_kin_city) || '',
      next_of_kin_country: nextOfKinCountry || (selectedPatient && selectedPatient.next_of_kin_country) || '',
      next_of_kin_address: nextOfKinAddress || (selectedPatient && selectedPatient.next_of_kin_address) || '',
      payer: payer || (selectedPatient && selectedPatient.payer) || '',
      payment_method: paymentMethod || (selectedPatient && selectedPatient.payment_method) || '',
      insurance_type: insuranceType || (selectedPatient && selectedPatient.insurance_type) || '',
      registration_fees: registrationFees || (selectedPatient && selectedPatient.registration_fees) || '',
    };
    
console.log(updatedData);

    if (isDataChanged) {
      // Values are not equal, proceed with the update
      const response = await fetch(
        `${config.apiUrl}/registration/patient/${identifier}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Failed to update patient data:', errorMessage);
        throw new Error('Failed to update patient data');
      }

      setUpdating(true);

      setTimeout(() => {
        setShowUpdateSuccessMessage(true);
      }, 2000);

      setTimeout(() => {
        resetFormFields();
        setSubmitDisabled(false);
        setShowUpdateSuccessMessage(false);
        setUpdating(false);
      }, 4000);
    } else {
      console.log('Values are equal. Update not allowed.');
      setShowAlert(true);
      setAlertMessage('No changes detected. Update not allowed.');
     setTimeout(() => {
        setShowAlert(false);
        setSubmitDisabled(false);
      }, 2000);
    }
    
  } catch (error) {
    console.error('Error saving changes:', error.message);
    setUpdating(false);

    setTimeout(() => {
        setSubmitDisabled(false);
      }, 2000);
   
  }
};

const handleSearchClick = async () => {
  try {
    const searchQuery = uhidInput || mobileNumberInput;

    if (!searchQuery) {
      setShowAlert(true);
      setAlertMessage('Please enter UHID or Mobile Number.');

      setTimeout(() => {
        setShowAlert(false);
        setAlertMessage('');
      }, 2000);

      return;
    }

    const response = await axios.get(
      `${config.apiUrl}/registration/patient/search`,
      {
        params: {
          uhidOrPhoneNumber: searchQuery,
        },
      }
    );

    const data = response.data;
    setEditUpdate(data);
    setPatientData(data);
    
    if (Array.isArray(data) && data.length > 1) {
      // Multiple patients found for the same mobile number

      // Set the list of patients with the same mobile number
      setMultiplePatients(data);
      setTablehide(false); // Show the table
      console.log('Multiple Patients:', data);
      return;
    }
    else if (data && data.uhid) {
      setIsAllAre(true);
      const patientData = data;

      setTitle(patientData.Title || '');
      setFirstName(patientData.first_Name || '');
      setLastName(patientData.last_Name || '');
      setFatherName(patientData.father_name || '');

      const dateOfBirthString = patientData.date_of_birth;
      setDob(
        dateOfBirthString
          ? format(new Date(dateOfBirthString), 'yyyy-MM-dd')
          : null
      );

      setAge(patientData.age || '');
      setAgeUnit(patientData.age_Unit || '');
      setGender(patientData.gender || '');
      setMaritalStatus(patientData.marital_status || '');
      setOccupation(patientData.occupation || '');
      setLanguage(patientData.language || '');
      setEducationLevel(patientData.education_level || '');
      setReligion(patientData.religion || '');
      setEmail(patientData.email || '');
      setMobileNumber(patientData.Mobile_number || '');
      setAadhaarNumber(patientData.aadhar_number || '');
      setStreet1(patientData.street1 || '');
      setStreet2(patientData.street2 || '');
      setCityVillage(patientData.city_village || '');
      setDistrict(patientData.district || '');
      setState(patientData.state || '');
      setCountry(patientData.country || '');
      setNextOfKinName(patientData.next_of_kin_name || '');
      setNextOfKinRelation(patientData.next_of_kin_relation || '');
      setNextOfKinMobileNumber(patientData.next_of_kin_Mobile_number || '');
      setNextOfKinCity(patientData.next_of_kin_city || '');
      setNextOfKinCountry(patientData.next_of_kin_country || '');
      setNextOfKinAddress(patientData.next_of_kin_address || '');
      setPayer(patientData.payer || '');
      setPaymentMethod(patientData.payment_method || '');
      setInsuranceType(patientData.insurance_type || '');
      setRegistrationFees(patientData.registration_fees || '');

      const registrationDateString = patientData.registration_date;
      setRegistrationDate(
        registrationDateString
          ? format(new Date(registrationDateString), 'yyyy-MM-dd')
          : ''
      );

      setShowSubmit(false);
      setTablehide(true);

      setTimeout(() => {
        setShowAlert(false);
        setAlertMessage('');
      }, 2000);
    }
  } catch (error) {
    console.error('No patient data:', error);
    setShowAlert(true);
    setAlertMessage('Patient Data not Available.');

    setTimeout(() => {
      setShowAlert(false);
      setAlertMessage('');
    }, 2000);
  }
};

  
  
  const handleMobileNumberChange = (event) => {
   const cleanedValue = event.target.value.replace(/\D/g, '');
    setMobileNumber(cleanedValue);
  };

  const handleNextOfKinMobileNumberchange= (e) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    const limitedValue = numericValue.slice(0, 10);
    setNextOfKinMobileNumber(limitedValue);
  };

  const handleAadhaarNumberChange = (event) => {
    const cleanedValue = event.target.value.replace(/\D/g, '');
    const truncatedValue = cleanedValue.substring(0, 12);
    setAadhaarNumber(truncatedValue);
  
   
  };


  
  
  
  
  
  const handleBButtonClick = () => {
    setUhidInput('');
    setMobileNumberInput('');
    resetFormFields();
    setShowSubmit(true)
    setSubmitDisabled(false);
    setSelectedPhoto('');

   
  
  };
  

  
  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
  };


  const handleOccupationChange = (event) => {
    setOccupation(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleEducationLevelChange = (event) => {
    setEducationLevel(event.target.value);
  };

  const handleReligionChange = (event) => {
    setReligion(event.target.value);
  };



  

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };
  


  const handleNextOfKinNameChange = (e) => {
    const inputValue = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;
   if (regex.test(inputValue) || inputValue === "") {
      
      setNextOfKinName(inputValue);
    }
  };
  
  const handleNextOfKinRelationChange  = (e) => {
    const inputValue = e.target.value;
  

    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(inputValue) || inputValue === "") {
      
      setNextOfKinRelation(inputValue);
    }
   
  };

  const handleTurnOnCamera = async () => {
    try {
      const videoElement = videoRef.current;

      if (!videoElement) {
        console.error('Video element not found.');
        return;
      }

  
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      videoElement.srcObject = stream;
      videoElement.play();
    } catch (error) {
      console.error('Error turning on the camera:', error);
    }
  };

  const handlePhotoCapture = async () => {
    try {
      const videoElement = videoRef.current;

      if (!videoElement) {
        console.error('Video element not found.');
        return;
      }

      // Capture a photo from the video feed
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // Convert the captured photo to data URL
      const photoDataURL = canvas.toDataURL('image/jpeg');

      // Display the selected photo
      setSelectedPhoto(photoDataURL);
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  

  
  const handleNextOfKinCityChange = (e) => {
    const inputValue = e.target.value;
  

    const regex = /^[a-zA-Z\s]*$/;
  
    if (regex.test(inputValue) || inputValue === "") {
      setNextOfKinCity(inputValue);
    }
  };
  
  
  const handleNextOfKinCountryChange = (e) => {
    setNextOfKinCountry(e.target.value);
  };
  
  const handleNextOfKinAddressChange = (e) => {
    setNextOfKinAddress(e.target.value);
  };

  const handlePayerChange = (e) => {
    setPayer(e.target.value);

    setInsuranceType('');
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleInsuranceTypeChange = (e) => {
    setInsuranceType(e.target.value);
  };
  // Assuming this is where you handle the patient selection
  const handlePatientSelect = (selectedPatient) => {
    console.log('Selected Patient:', selectedPatient);
    setEditedData(selectedPatient);
  
    // Set the patient data to fill the input fields
    setIsAllAre(true);
    setTablehide(true);
  
  
    setTitle(selectedPatient.Title || '');
    setFirstName(selectedPatient.first_Name || '');
    setLastName(selectedPatient.last_Name || '');
    setFatherName(selectedPatient.father_name || '');
  
    const dateOfBirthString = selectedPatient.date_of_birth;
    setDob(
      dateOfBirthString
        ? format(new Date(dateOfBirthString), 'yyyy-MM-dd')
        : null
    );
  
    setAge(selectedPatient.age || '');
    setAgeUnit(selectedPatient.age_Unit || '');
    setGender(selectedPatient.gender || '');
    setMaritalStatus(selectedPatient.marital_status || '');
    setOccupation(selectedPatient.occupation || '');
    setLanguage(selectedPatient.language || '');
    setEducationLevel(selectedPatient.education_level || '');
    setReligion(selectedPatient.religion || '');
    setEmail(selectedPatient.email || '');
    setMobileNumber(selectedPatient.Mobile_number || '');
    setAadhaarNumber(selectedPatient.aadhar_number || '');
    setStreet1(selectedPatient.street1 || '');
    setStreet2(selectedPatient.street2 || '');
    setCityVillage(selectedPatient.city_village || '');
    setDistrict(selectedPatient.district || '');
    setState(selectedPatient.state || '');
    setCountry(selectedPatient.country || '');
    setNextOfKinName(selectedPatient.next_of_kin_name || '');
    setNextOfKinRelation(selectedPatient.next_of_kin_relation || '');
    setNextOfKinMobileNumber(selectedPatient.next_of_kin_Mobile_number || '');
    setNextOfKinCity(selectedPatient.next_of_kin_city || '');
    setNextOfKinCountry(selectedPatient.next_of_kin_country || '');
    setNextOfKinAddress(selectedPatient.next_of_kin_address || '');
    setPayer(selectedPatient.payer || '');
    setPaymentMethod(selectedPatient.payment_method || '');
    setInsuranceType(selectedPatient.insurance_type || '');
    setRegistrationFees(selectedPatient.registration_fees || '');
  
    const registrationDateString = selectedPatient.registration_date;
    setRegistrationDate(
      registrationDateString
        ? format(new Date(registrationDateString), 'yyyy-MM-dd')
        : ''
    );
  
    setShowSubmit(false);
  
    setTimeout(() => {
      setShowAlert(false);
      setAlertMessage('');
    }, 2000);
  };
  




  return (

    <div className="container overflow-auto ">
  <div className="pl-14 pr-20 pt-5 h-full border bg-gray-50">
 <div style={{ display: 'inline-block', marginRight: '20px'}}>
  <label className="inline" style={{ marginRight: '8px' }}>UHID:</label>

  <input
    type="text"
    id="uhidInput"
    value={uhidInput}
    onChange={(e) => setUhidInput(e.target.value)}
    className="w-full  border border-gray-500 md:w-40"
  />
</div>

<div style={{ display: 'inline-block' }}>
  <label className="inline" style={{ marginRight: '8px' }}>Mobile No:</label>
  <input
    type="tel"
    pattern="[0-9]{10}"
    maxLength="10"
    value={mobileNumberInput}
    onChange={(e) => setMobileNumberInput(e.target.value)}
    className="w-full border border-gray-500 md:w-48"
  />
</div>

<button onClick={handleSearchClick} className="bg-blue-500 text-white p-2 ml-8 rounded-md ">
      Search
    </button>
    <button onClick={handleBButtonClick} className="bg-green-500   text-white p-2  ml-8 rounded-md  ">
      Clear
    </button>
    
    <div style={{ display: 'inline-block' }}>

        <video ref={videoRef} style={{ display: 'none' }} />

 
        <button onClick={handleTurnOnCamera} className="bg-blue-500 text-white p-2 ml-8 rounded-md">
          Turn On Camera
        </button>

        <button onClick={handlePhotoCapture} className="bg-green-500 text-white p-2 ml-8 rounded-md">
          Capture Photo
        </button>

    
        {selectedPhoto && (
          <img
            src={selectedPhoto}
            alt="Selected Photo"
            className='float-right w-20 h-25 ml-5 '
        
          />
        )}
      </div>

          <div style={{display:'flex', justifyContent:'space-between'}}>
          <h2 className="text-xl font-bold">Patient Details</h2>
       </div>

        <div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4 mt-2">
    
          <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
  <label className=" mb-1 mr-2 whitespace-nowrap label-width">Title  <span className="mandatory-asterisk">*</span></label>
  <select
    value={isFirstTimeRegistration ? title : editedData.title}
    onChange={handleTitleChange}
    style={{backgroundColor:'white'}}
    className={`border ${showRedBorders && !title ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md h-7 fixed-size-input`}
  >
    <option value="">Select Title</option>
    <option value="Mr">Mr</option>
    <option value="Mrs">Mrs</option>
    <option value="Miss">Miss</option>
    <option value="Baby">Baby</option>
    <option value="Baby boy of">Baby boy of</option>
    <option value="Baby girl of">Baby girl of</option>
  </select>
</div>



  <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
    <label className="mb-1 mr-2 whitespace-nowrap label-width">First Name  <span className="mandatory-asterisk">*</span></label>
    <input
      type="text"
      value={isFirstTimeRegistration ? firstName : editedData.firstName}
      onChange={handleFirstNameChange}
      className={`border ${showRedBorders && !firstName ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md fixed-size-input`}
    />
  </div>

  <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
    <label className="mb-1 mr-2 whitespace-nowrap label-width">Last Name  <span className="mandatory-asterisk">*</span></label>
    <input
      type="text"
      value={isFirstTimeRegistration ? lastName : editedData.lastName}
      onChange={handleLastNameChange}
      className={`border ${showRedBorders && !lastName ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md input-field w-full fixed-size-input`}
    />
  </div>
</div>


<div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4 mt-2">

  <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
    <label className="mb-1 mr-2 whitespace-nowrap label-width">Father Name <span className="mandatory-asterisk">*</span></label>
    <input
      type="text"
      value={isFirstTimeRegistration ? fatherName : editedData.fatherName}
      onChange={handleFatherNameChange}
      className={`border ${showRedBorders && !fatherName ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md input-field w-full fixed-size-input`}
    />
  </div>

  <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
  <label className="mb-1 mr-3 whitespace-nowrap label-width">Date of Birth</label>
  <input
    type="date"
    className="border border-gray-300 p-2 rounded-md  fixed-size-input"
    value={isFirstTimeRegistration ? dob : editedData.dob}
    onChange={handleDobChange}
    max={new Date().toISOString().split('T')[0]}
   
  />
</div>

 <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
    <label className="mb-1  mr-24 whitespace-nowrap ">Age  <span className="mandatory-asterisk">*</span></label>
    <div className="flex items-center space-x-1">
      <input
        type="number"
        className={`border ${showRedBorders && !age ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md  fixed-size-input`} style={{width:'105px'}}
        value={isFirstTimeRegistration ? age : editedData.age}
        onChange={handleAgeChange}
      />
      <select
        className="border border-gray-300 rounded-md  p-2 text-sm "
        value={isFirstTimeRegistration ? ageUnit : editedData.ageUnit}
        onChange={handleAgeUnitChange}
        style={{backgroundColor:'white'}}
      >
        <option value="days">Days</option>
        <option value="months">Months</option>
        <option value="years">Years</option>
      </select>
    </div>
  </div>

</div>


<div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4 mt-2">

  <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
    <label className="mb-1 mr-2 whitespace-nowrap label-width">Gender  <span className="mandatory-asterisk">*</span></label>
    <select
className={`h-7 border ${showRedBorders && !gender? 'border-red-500' : 'border-gray-300'} p-2 rounded-md input-field w-full fixed-size-input`}
      value={isFirstTimeRegistration ? gender : editedData.gender}
      onChange={handleGenderChange}
      style={{backgroundColor:'white'}}
    >
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="transgender">TransGender</option>
      <option value="other">Other</option>
    </select>
  </div>


  <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
    <label className="mb-1 mr-2 whitespace-nowrap label-width">Marital Status</label>
    <select
      className="h-7 border border-gray-300 p-2 rounded-md fixed-size-input"
      value={isFirstTimeRegistration ? maritalStatus : editedData.maritalStatus}
      onChange={handleMaritalStatusChange}
      style={{backgroundColor:'white'}}
    >
      <option value="">Select Marital Status</option>
      <option value="single">Single</option>
      <option value="married">Married</option>
      <option value="divorced">Divorced</option>
    </select>
  </div>


  <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
    <label className="mb-1 mr-2 whitespace-nowrap label-width">Occupation</label>
    <select
      className="h-7 border border-gray-300 p-2 rounded-md fixed-size-input"
      value={isFirstTimeRegistration ? occupation : editedData.occupation}
      onChange={handleOccupationChange}
      style={{backgroundColor:'white'}}
    >
      <option value="">Select Occupation</option>
      <option value="employed">Employed</option>
      <option value="student">Student</option>
      <option value="unemployed">Unemployed</option>
      <option value="other">Other</option>
    </select>
  </div>
</div>

<div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4 mt-2">

  <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
    <label className="mb-1 mr-2 whitespace-nowrap label-width">Language</label>
    <select
      className="h-7 border border-gray-300 p-2 rounded-md fixed-size-input"
      value={isFirstTimeRegistration ? language : editedData.language}
      onChange={handleLanguageChange}
      style={{ backgroundColor: 'white' }}
    >
      <option value="">Select Language</option>
      <option value="tamil">Tamil</option>
      <option value="english">English</option>
      <option value="hindi">Hindi</option>
      <option value="malayalam">Malayalam</option>
      <option value="kannada">Kannada</option>
      <option value="telugu">Telugu</option>
      <option value="marathi">Marathi</option>
    </select>
  </div>


  <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
    <label className="mb-1 mr-2 label-width">Education Level</label>
    <select
      className="h-7 border border-gray-300 p-2 rounded-md fixed-size-input"
      value={isFirstTimeRegistration ? educationLevel : editedData.educationLevel}
      onChange={handleEducationLevelChange}
      style={{ backgroundColor: 'white' }}
    >
      <option value="">Select Education Level</option>
      <option value="highschool">High School</option>
      <option value="diploma">Diploma</option>
      <option value="undergraduate">Undergraduate</option>
      <option value="postgraduate">Postgraduate</option>
      <option value="doctorate">Doctorate</option>
      <option value="engineering">Engineering</option>
    </select>
  </div>


  <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
    <label className="mb-1 mr-2 whitespace-nowrap label-width">Religion</label>
    <select
      className="h-7 border border-gray-300 p-2 rounded-md fixed-size-input"
      value={isFirstTimeRegistration ? religion : editedData.religion}
      onChange={handleReligionChange}
      style={{ backgroundColor: 'white' }}
    >
      <option value="">Select Religion</option>
      <option value="hindu">Hindu</option>
      <option value="christian">Christian</option>
      <option value="muslim">Muslim</option>
      <option value="sikhism">Sikhism</option>
      <option value="buddhism">Buddhism</option>
      <option value="jainism">Jainism</option>
    </select>
  </div>
</div>


<div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4 mt-2">

  <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
    <label className="mb-1 mr-2 whitespace-nowrap label-width">Email ID</label>
    <input
      type="email"
      className="border border-gray-300 rounded-md p-2 fixed-size-input"
      value={isFirstTimeRegistration ? email : editedData.email}
      onChange={handleEmailChange}
    />
  </div>


  <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
    <label className="mb-1 mr-2 whitespace-nowrap label-width">Mobile No  <span className="mandatory-asterisk">*</span></label>
    <input
      type="tel"
      pattern="[0-9]{10}"
      maxLength="10"
      className={`border ${showRedBorders && !mobileNumber ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md input-field w-full fixed-size-input`}
      value={isFirstTimeRegistration ? mobileNumber : editedData.mobileNumber}
      onChange={handleMobileNumberChange}
    />
  </div>


  <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
    <label className="mb-1 mr-2 label-width">Aadhaar No  <span className="mandatory-asterisk">*</span></label>
   {isallare ?( <input
      type="text"
      pattern="[0-9]{12}"
      maxLength="12"
      className={`border ${showRedBorders && !aadhaarNumber ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md input-field w-full fixed-size-input`}
      value={isFirstTimeRegistration ? aadhaarNumber : editedData.aadhaarNumber}
      onChange={handleAadhaarNumberChange} 
      readOnly
    />):( <input
      type="text"
      pattern="[0-9]{12}"
      maxLength="12"
      className={`border ${showRedBorders && !aadhaarNumber ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md input-field w-full fixed-size-input`}
      value={isFirstTimeRegistration ? aadhaarNumber : editedData.aadhaarNumber}
      onChange={handleAadhaarNumberChange} 
    />)}
  </div>
  
</div>

</div>


    
<div>
  <h2 className="text-xl font-bold mt-2 mb-4">Home Address</h2>
  <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4 mt-2">

  <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
      <label className="mb-1 mr-2 whitespace-nowrap label-width">Country  <span className="mandatory-asterisk">*</span></label>
      <select
     className={`border ${showRedBorders && !country ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md input-field w-full fixed-size-input`}
        style={{ backgroundColor: 'white' }}
        value={isFirstTimeRegistration ? country : editedData.country}
        onChange={handleCountryChange}
      >
        <option value="">Select Country</option>
        <option value="India">India</option>
      
    
      </select>
    </div>

  <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
        <label className="mb-1 mr-2 whitespace-nowrap label-width">State  <span className="mandatory-asterisk">*</span></label>
        <select
          className={`border ${showRedBorders && !state ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md  fixed-size-input`}
          style={{ backgroundColor: 'white' }}
          value={state}
          onChange={handleStateChange}
        >
          <option value="">Select State</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Kerala">Kerala</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>

      
        </select>
      </div>

      <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
        <label className="mb-1 mr-2 whitespace-nowrap label-width">District  <span className="mandatory-asterisk">*</span></label>
        <select
          className={`border ${showRedBorders && !district ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md fixed-size-input`}
          style={{ backgroundColor: 'white' }}
          value={district}
          onChange={handleDistrictChange}
        >
          <option value="">Select District</option>
          {districtsOptions.map((districtOption) => (
            <option key={districtOption} value={districtOption}>
              {districtOption}
            </option>
          ))}
        </select>
      </div>

      </div>

  <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4 mt-2">
  
    <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
      <label className="mb-1 mr-2 whitespace-nowrap label-width">Street1  <span className="mandatory-asterisk">*</span></label>
      <input
        type="text"
        className={`border ${showRedBorders && !street1 ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md  fixed-size-input`}
        value={isFirstTimeRegistration ? street1 : editedData.street1}
        onChange={handleStreet1Change}
      />
    </div>


    <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
      <label className="mb-1 mr-2 whitespace-nowrap label-width">Street2  <span className="mandatory-asterisk">*</span></label>
      <input
        type="text"
        placeholder="Street 2"
        className={`border ${showRedBorders && !street2 ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md  fixed-size-input`}
        value={isFirstTimeRegistration ? street2 : editedData.street2}
        onChange={handleStreet2Change}
      />
    </div>


    <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
  <label className="mb-1 mr-2 whitespace-nowrap label-width">Town/Village  <span className="mandatory-asterisk">*</span></label>
  <input
    type="text"
    className={`border ${showRedBorders && !cityVillage ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md  fixed-size-input`}
    style={{ backgroundColor: 'white' }}
    value={isFirstTimeRegistration ? cityVillage : editedData.cityVillage}
    placeholder="Enter Town/Village"
    onChange={handleCityVillageChange}
  />
</div>

</div>

</div>



<div className="mt-2">
  <h2 className="text-xl font-bold mb-2">Next of Kin</h2>

  <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4 mt-2">
   
    <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
      <label className="mb-1 mr-2 whitespace-nowrap label-width">Next of Kin Name:</label>
      <input
        type="text"
        className="border border-gray-300 rounded-md p-2 fixed-size-input"
        value={isFirstTimeRegistration ? nextOfKinName : editedData.nextOfKinName}
        onChange={handleNextOfKinNameChange}
      />
    </div>

    <div className="flex flex-col items-start mt-2 ml-14 md:flex-row md:items-center md:mt-0">
      <label className="mb-1 mr-2 whitespace-nowrap label-width">Relation:</label>
      <input
        type="text"
        className="border border-gray-300 p-2 rounded-md fixed-size-input"
        value={isFirstTimeRegistration ? nextOfKinRelation : editedData.nextOfKinRelation}
        onChange={handleNextOfKinRelationChange}
      />
    </div>

    <div className="flex flex-col items-start mt-2 md:flex-row md:items-center md:mt-0">
      <label className="mb-1 mr-2 whitespace-nowrap label-width">Mobile No:</label>
      <input
          type="tel"
          className="border border-gray-300 rounded-lg p-2 fixed-size-input"
          value={isFirstTimeRegistration ? nextOfKinMobileNumber : editedData.nextOfKinMobileNumber}
          onChange={handleNextOfKinMobileNumberchange}
        />
    
    </div>

  </div>

  <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4 mt-2">
  
    <div className="flex flex-col items-start md:flex-row md:items-center md:mt-0">
      <label className="mb-1 mr-2 whitespace-nowrap label-width">City:</label>
      <select
        className="border border-gray-300 p-2 rounded-md fixed-size-input"
        value={isFirstTimeRegistration ? nextOfKinCity : editedData.nextOfKinCity}
        style={{ backgroundColor: 'white' }}
        onChange={handleNextOfKinCityChange}
      >
        <option value="select city">Select City</option>
        <option value="Chennai">Chennai</option>
        <option value="Coimbatore">Coimbatore</option>
        <option value="Madurai">Madurai</option>
        <option value="Theni">Theni</option>
        <option value="Salem">Salem</option>
        <option value="Karur">Karur</option>
      </select>
    </div>


    <div className="flex flex-col items-start mt-2 md:flex-row md:items-center md:mt-0">
      <label className="mb-1 mr-2 whitespace-nowrap label-width">Country:</label>
      <select
        className="border border-gray-300 p-2 rounded-md fixed-size-input"
        value={isFirstTimeRegistration ? nextOfKinCountry : editedData.nextOfKinCountry}
        style={{ backgroundColor: 'white' }}
        onChange={handleNextOfKinCountryChange}
      >
        <option value="">Select Country</option>
        <option value="India">India</option>
       
      </select>
    </div>

    <div className="flex flex-col items-start mt-2 md:flex-row md:items-center md:mt-0">
      <label className="mb-1 mr-2 whitespace-nowrap label-width">Address:</label>
      <textarea
        rows="3"
        className="border border-gray-300 p-2 rounded-md fixed-size-input"
        style={{ width: '200px', height: '40px' }}
        value={isFirstTimeRegistration ? nextOfKinAddress : editedData.nextOfKinAddress}
        onChange={handleNextOfKinAddressChange}
      ></textarea>
    </div>
  </div>
</div>



<div className="mt-7">
  <h2 className="text-xl font-bold mb-4">Payer Information</h2>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div>

      <div className="flex flex-col items-start mt-2 md:flex-row md:items-center md:mt-0">
        <label className="mb-1 mr-2 whitespace-nowrap label-width">Payer  <span className="mandatory-asterisk">*</span></label>
        <select
     className={`border ${showRedBorders && !payer ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md input-field w-full fixed-size-input`}
          value={isFirstTimeRegistration ? payer : editedData.payer}
          onChange={handlePayerChange}
        >
          <option value="">Select Payer</option>
          {payerOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>


      <div className="flex flex-col items-start mt-2 md:flex-row md:items-center md:mt-0">
        <label className="mb-1 mr-2 whitespace-nowrap label-width">Payment Method <span className="mandatory-asterisk">*</span></label>
        <select
       className={`border ${showRedBorders && !paymentMethod ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md input-field w-full fixed-size-input`}
          value={isFirstTimeRegistration ? paymentMethod : editedData.paymentMethod}
          onChange={handlePaymentMethodChange}
        >
          <option value="">Select Payment Method</option>
          {paymentMethodOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>


      {payer === 'Insurance' && (
        <div className="flex flex-col items-start mt-2 md:flex-row md:items-center md:mt-0">
          <label className="mb-1 mr-2 whitespace-nowrap label-width">Insurance Type</label>
          <select
            className="border border-gray-300 p-2 rounded-md fixed-size-input"
            value={isFirstTimeRegistration ? insuranceType : editedData.insuranceType}
            onChange={handleInsuranceTypeChange}
          >
            <option value="">Select Insurance Type</option>
            {insuranceTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>

    <div>
      <div className="flex">
        <div className="flex md:items-center mr-20">
          <label className="mb-1 mr-2 label-width">Registration Fee</label>
          <input
            type="number"
            className="border border-gray-300 p-2 rounded-md fixed-size-input"
            value={registrationFees}
            onChange={handleRegistrationFeesChange}
            readOnly
          />
        </div>
        <div className="flex md:items-center">
          <label className="mb-1 mr-2 label-width">Registration Date:</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md p-2 fixed-size-input"
            value={registrationDate}
            readOnly
          />
        </div>
      </div>
    </div>


  </div>
</div>

<div className='flex float-right  '>
          {showSubmit ? (<button
            onClick={handleSubmit}
            className={`bg-blue-500 text-white p-2 ml-8 rounded-md ${isSubmitDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={isSubmitDisabled} >
            Submit
          </button>)
              :(<button className={`bg-green-700 text-white p-2 rounded-md ml-8 ${isSubmitDisabled ? 'cursor-not-allowed opacity-50' : ''}`} 
              onClick={handleSaveChanges}
               disabled={isSubmitDisabled}>
    Update
  </button>
  )}
{isSubmitting && <LoadingSpinner />}
{isUpdating && <LoadingSpinner />}
  {showSuccessMessage && (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-md">
      Patient data submitted successfully
    </div>
  )}
  {showUpdateSuccessMessage && (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-md">
      Patient data updated successfully
    </div>
  )}
  
</div>




    {showAlert && (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded">
        {alertMessage}
      </div>
    )}

  </div>
  
  {showIdCard && (
      <div className="overlay "ref={printRef}>
       
        <div className="border-2 border-black p-2 w-96 bg-white">
        <button
              className="absolute top-2 right-2 text-red-500 cursor-pointer"
              onClick={() => {
                handleClose();
              }}
            >
              &#10006; {/* Unicode character for cross mark */}
            </button>
            <div className="flex flex-col items-center">
            <h1  className="text-black ">ID CARD</h1>
        <div className="flex">
    <div className="w-3/5 ml-2">
              <p className="text-black ">UHID: {idCardData.uhid}</p>
              <p className="text-black">Name: {idCardData.name}</p>
              <p className="text-black">Age: {idCardData.age}</p>
              <p className="text-black">District: {idCardData.district}</p>
              <p className="text-black">Mobile Number: {idCardData.mobileNumber}</p>
            </div>
            <div className="w-1/2 flex justify-end mr-4">
              {/* Display photo image here */}
              {/* Use your selectedPhoto state or any appropriate source */}
              <img src="/path/to/photo.jpg" alt="not found" className="w-24 h-24 bg-gray-300 square-full" />
            </div>
          </div>
          <div className="mt-3">
            {/* Generate QR code using the 'qrcode.react' library */}
            <Barcode value={idCardData.uhid} />
           
          </div>
          <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 ml-2"
        onClick={handlePrint}
      >
        Print
      </button>
        </div>
        </div>
        </div>
      )}


{!tablehide && multiplePatients && multiplePatients.length > 0 && (
  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 text-black p-4 rounded-md">
    <button
      className="absolute top-2 right-2 text-red-500"
      onClick={() => setTablehide(true)}
    >
      &#x2716; 
    </button>
    <h5 className="text-center mb-4">Please Select a Patient:</h5>
    <table className="w-full">
      <thead className="text-center">
        <tr>
          <th>UHID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Father Name</th>
          <th>Age</th>
          <th>Aadhar Number</th>
          <th>Mobile Number</th>
          <th>Select</th>
        </tr>
      </thead>
      <tbody>
        {multiplePatients.map((patient, index) => (
          <tr key={index} className="text-center">
            <td>{patient.uhid}</td>
            <td>{patient.first_Name}</td>
            <td>{patient.last_Name}</td>
            <td>{patient.father_name}</td>
            <td>{patient.age}</td>
            <td>{patient.aadhar_number}</td>
            <td>{patient.Mobile_number}</td>
            <td>
              <button onClick={() => handlePatientSelect(patient)}>
                Select
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
    </div>
  );
  
  
};

export default CheckboxApp;