import React from 'react';
import { useState, useEffect } from 'react';
import Password from '../components/loginSetups/Password'
import { Link } from 'react-router-dom';
import FullLogo from "../assets/Images/FullLogo.png";
import RegisterImage from '../assets/Images/RegisterImage.png'
import PhoneInput from 'react-phone-input-2';
import { FaCheck, FaCircle, FaInfo } from "react-icons/fa";
import Signuplist from '../loginSetups/Signuplist';
import '../assets/css/login/Register.css';
import { baseUrl } from "../config";
// import CustomDropdown from "../components/common/CustomDropdown";


function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [country, setCountry] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Track button disabled state
  const [isPasswordValid, setIsPasswordValid] = useState(false); // Track password validity
  const [, setSelectedOption] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

 
  

  // Handle input change and update state for each input field
  const handlePhoneNumberChange = (phone_number) => {
    setPhone_Number(phone_number);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
  };
  const handleEmployeesSelect = (selectedOption) => {
    setNumberOfEmployees(selectedOption);
  };
  const handlecountrySelect = (selectedOption) => {
    setCountry(selectedOption);
  };
  // Practice Options
  const optionsize = ["1-20 employees", "21-200 employees", "200-10,000 employees", "10,000+ employees"];
  const optioncountry = [" Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor (Timor-Leste)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"]
  // Validate all input fields and update button disabled state
  const validateFields = () => {
    const isFullNameValid = firstName.trim() !== "";
    const isEmailValid = email.trim() !== "";
    const isPhoneNumberValid = phone_number.trim() !== "";
    const isCheckboxChecked = document.getElementById("terms").checked;
    setIsCheckboxChecked(isCheckboxChecked);
    setIsButtonDisabled(
      !(isFullNameValid && isEmailValid && isPhoneNumberValid && isCheckboxChecked && isPasswordValid)
    );
  };


  useEffect(() => {
    validateFields(); // Re-validate fields on every change
  }, [firstName, email, phone_number, isPasswordValid,isCheckboxChecked]);

  // Handle password validity change
  const handlePasswordValidityChange = (isValid) => {
    setIsPasswordValid(isValid);
  };

  const originalRegisterInputProps = {
    required: true,
    style: { width: '90%',height:'35px', border: '0.1px solid #ccc' },
    
  };

  const [inputProps, setInputProps] = useState(originalRegisterInputProps);


  const handleInput = () => {
    setInputProps(originalRegisterInputProps);
  };
  const [registerphoneNumber,setRegisterPhoneNumber] = useState("");
  const [ ,setRegisterValid] = useState(true);


  const handleChange = (value)=>{
    setRegisterPhoneNumber(value);
    setRegisterValid(validatePhoneNumber(value));
  }

  const validatePhoneNumber = ()=>{
    const  phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(registerphoneNumber);
    
  }
  const [firstNameError, setFirstNameError] = useState('');
  const handleFirstNameChange = (e) => {
    const inputValue = e.target.value;
    setFirstName(inputValue);

    // Add your validation logic here
    if (inputValue.trim() === '') {
      setFirstNameError('First Name is required');
    } else {
      setFirstNameError('');
    }
  };
    //API to send data to database

    const addAdmin = async (event) => {
      
      try {
        event.preventDefault();
        if (!isCheckboxChecked) {
          setErrorMessage("Please read and agree to the main services.");
          return; // Do not proceed with registration
        }
        // Proceed with user registration
        const response = await fetch(`${baseUrl}/api/admin/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: firstName,
            lastname: lastname,
            password: password,
            company: companyName,
            job_title: jobTitle,
            email: email,
            no_of_emp: numberOfEmployees,
            phone_num: registerphoneNumber,
            country: country,
          }),
        });
        const json = await response.json()
  
        if (response.ok) {
          console.log(json);
          
          if(json.status === "Success"){
            alert('User Registered Successfully. Check Your Mail For Login Details');
            window.location.href = "/";
          }else{
            alert(json.message)
          }
        } else {
          console.log('Request failed:', json.status);
          alert('Request failed try after some time!');
          window.location.href = "/register";
        }
        
        
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div id="entireSignupDiv">
      <div id="CompleteSignUp">
        <div id="LeftDiv">
          <div className="leftinnerdiv">
            <img src={FullLogo} alt="" id='SignUpDealDoxIcon' />
            <h1 id="leftSideHeading">Start your free trail</h1>
            <p id="leftsidePara">No credit card commitment software free experience.</p>

            <div>
              <span id="trialquote">With your 30 days trail, you get:</span>
              {/* <FaCheck id='textcheck'/> */}
              <div id='mn'>
                <FaCheck id='textcheck' /><p id="registerinfo">Faster Real-time Quotations</p>
                <FaCheck id='textcheck' /><p id="registerinfo">A Comprehensive Service Offering</p>
                <FaCheck id='textcheck' /><p id="registerinfo">Free Implementation</p>
                <FaCheck id='textcheck' /><p id="registerinfo">Instant,Error-free Documents</p>
                <FaCheck id='textcheck' /><p id="registerinfo">Quick and Reliable Support</p>
              </div>
            </div>
            <span id="needAssistance">Need Assistance? Call Us: +91 8431995645</span>

            <Link to="https://www.dealdox.io/demo"><button id="requestDemos">Request Demo</button></Link>

            <img src={RegisterImage} alt="" id="signUPImage" />
          </div>
        </div>
        <div id="RightDiv">
          <div id="boxForRightDiv">
            <h1 id="heading1"> Sign Up Now and Start using DealDox CPQ!! </h1>
            <p id="signupcontent">Tired of tedious Quoting?Boost Your Sales with DealDox  CPQ,Sign up now <br />and unleash its power!</p>
            <form action="" className="registerDeatils">
              <div id="mainnamediv">
                <div id="firstNameDiv">

                  <label htmlFor="" id='fistLabel'>First Name </label><br />
                  <input type="text" placeholder='Enter First Name' id='firstNameInput' value={firstName} onChange={handleFirstNameChange} autoComplete='off' style={{
                    outlineColor: firstNameError ? '#f54444' : '#715CF3', border: firstNameError ? '1.5px solid red' : '', color: firstNameError ? 'red' : '', placeholder: {
                      color: firstNameError ? "red" : "",
                    },

                  }} />

                  {firstNameError && (
                    <p style={{ color: 'red', fontSize: '12px', padding: '3px' }}>
                      <FaInfo id="sample" /> {firstNameError}
                    </p>
                  )}
                </div>

                <div id="LastNameDiv">
                  <label htmlFor="" id='lastLabel'>Last Name</label><br />
                  <input type="text" placeholder='Enter Last Name' id='LastNameInput' value={lastname} onChange={(e) => setLastName(e.target.value)} autoComplete='off' />
                </div>
              </div>

              <div id="password">
                <Password
                  onChange={handlePasswordChange}
                  onValidityChange={handlePasswordValidityChange} />
              </div>

              <div id="companyJobTittleDiv">

                <div id="companyDiv">
                  <label htmlFor="" id='CompanyLabel'>Company</label><br />
                  <input type="text" placeholder='Enter Company Name' id='CompanyInput' value={companyName} onChange={(e) => setCompanyName(e.target.value)} autoComplete='off' />
                </div>
                <div id="jobTittleDiv">
                  <label htmlFor="" id='JobTittleLabel'>Job Title</label><br />
                  <input type="text" placeholder='Enter job title' id='JobTittleInput' value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} autoComplete='off' />
                </div>
              </div>

              <div id="emailEmployeeDiv">
                <div id="emailDiv">
                  <label htmlFor="" id='emailLabel'> Business Email</label><br />
                  <input type="email" placeholder='Enter business email' id='emailInput' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off' />
                </div>
                <div id="EmployeeDiv">
                  <Signuplist
                    label="Number Of Employees"
                    onSelect={handleEmployeesSelect}
                    options={optionsize}
                    Placeholder={"1-20 employees"}
                    value={numberOfEmployees}
                    onChange={(value) => setNumberOfEmployees(value)}
                  />
                </div>
              </div>

              <div id="countryPhoneDiv">
                <div id="PhoneDiv">
                  <label htmlFor="" id='registernumber'>Phone Number:</label>
                  <br />
                  <PhoneInput onClick={handleInput} type="text" country={'in'} value={registerphoneNumber} onChange={handleChange} id='NumberInput' inputProps={inputProps} />
                </div>
                <div id="countryDiv">
                  <Signuplist
                    label="Country"
                    onSelect={handlecountrySelect}
                    options={optioncountry}
                    Placeholder={"Select country"}
                    value={country}
                    onChange={(value) => setCountry(value)}
                  />
                </div>
              </div>
              <div>
                
                <span id='agreediv'>
                  <input
                    type="checkbox"
                    id="terms"
                    // required
                    onChange={() => {
                      validateFields(); // Call the validateFields function on checkbox change
                      setErrorMessage("");
                    }}
                    autoComplete='off'
                  />
      <label htmlFor="terms">
          I agree To The <span id="termsofuse"><Link to="https://www.dealdox.io/terms-of-use">Terms of use</Link></span>
        </label>
      </span>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
      
              </div>
              <div id="buttonDiv">
              <button id="startButton"disabled={(!firstName|| !lastname ||!email || !country ||!password )} onClick={(event) => addAdmin(event)}>Start My Free Trial</button>
{/* 
              <button id="startButton" onClick={addAdmin}>Start My Free Trail</button> */}
              </div>
          
            </form>
            <div id="infoDiv">
              <p id="SignInInfo">By registering,you confirm that you agree to the storing and processing <br /> of  your personal data by DealDox as described in the <span id="privacyLink"><Link to="https://www.dealdox.io/privacy-policy">Privacy Policy</Link></span></p>
            </div>
          </div>
          <div>
            <div id="mediadiv">
              <button id='cButton'>c</button><span id='InstructionPrivacy'> 2023 DealDox Pvt Ltd | All rights reserved | <Link to="https://www.dealdox.io/privacy-policy">Privacy</Link></span>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}


export default Register;

