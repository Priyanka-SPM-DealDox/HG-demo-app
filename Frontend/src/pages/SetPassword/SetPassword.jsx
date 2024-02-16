import React from 'react';
import './SetPassword.css';
import Dealdoxicon from '../../assets/Images/Dealdoxicon.png'
import { useState } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext";
import {baseUrl } from '../../config';

const SetPassword = () => {

  const { user } = useAuthContext();
  console.log(user);

  // Get the current URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Extract values using the get method
const securityRole = urlParams.get('securityRole');
const email = urlParams.get('email');
const access = urlParams.get('access');

// Log the values to the console (you can do further processing here)
console.log('Security Role:', securityRole);
console.log('Email:', email);
console.log('access:', access)

  const txt = {
    marginBottom: '20px',
    marginTop: '30px'
  };

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const savePeopleLoginData = async (e) => {
    e.preventDefault();
  
    if (password === confirmPassword) {
      try {
        const response = await fetch(`${baseUrl}/api/access/updateAccess`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            access: access,
            email: email,
            securityRole: securityRole,
            password: password,
          }),
        });
  
        if (response.ok) {
          alert('Password Updated Successfully!');
          window.location.href = "/";
        } else {
          alert('Unable to update password!');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Both the passwords did not match! Please try again.');
    }
  };

  return (
    <div id="entireForgot">
          <div id="forgotContent">
          <div className="forgotlogo">
          <img src={Dealdoxicon} alt="" id='ForgotDealDoxIcon' />
        </div>
        <input style={txt} type='email' value={email} hidden readOnly />
        <div id="setpasswordHeading">
          <h1 id="setPassword">SET PASSWORD</h1>
        </div>
        <div id="passwordContent">
          <form action="">
          <div id="newPasswordDiv">
            <label htmlFor="" id='newpassLabel'>NEW PASSWORD</label>
            <input type="password" placeholder='Enter Your Password' value={password} id='newpassInput' onChange={(e) => setPassword(e.target.value)}/>

            
          </div>
          <br />
          <div id="retypePasswordDiv">
            <label htmlFor="" id='retypepassLabel'>RETYPE NEW PASSWORD</label>
            <input type="password" placeholder='Re-type Above Password'  id='retypepassInput' value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} />

          </div>
          </form>
          <br />
          <br />
          <div id="submitdiv">
            <button id='saveButton' onClick={savePeopleLoginData} >SAVE</button>
          </div>
        </div>
          </div>
    </div>
  )
}


export default SetPassword;