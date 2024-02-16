import React from 'react';
import '../../assets/css/login/Login.css';
import { useState } from 'react';
import Dealdoxicon from '../../assets/images/Dealdoxicon.png'
import Girl from '../../assets/images/Girl.png'
import CFo from '../../assets/images/CFo.png'
import ChooseLanguage from '../../assets/images/ChooseLanguage.png'
import quotationGenerate from '../../assets/images/quotationGenerate.png'
import DealApproved  from '../../assets/images/DealApproved.png'
import ContactManagement from '../../assets/images/ContactManagement.png';
import DIcon from  '../../assets/images/DIcon.png'
import baseUrl from '../../config';

const Userlogin = () => {

    const [email, setUserEmail] = useState('');
    const [password, setPassword] = useState('');

    const userlogin = async () => {

        try {
          const response = await fetch(`${baseUrl}/api/people/peoplelogin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password
            }),
          });
          const json = await response.json()
          console.log(json);
          if (response.ok) {
            if(json.status == "Success"){
                alert('User Login Successfully. Check Your Mail For OTP');
                localStorage.setItem('user', JSON.stringify(json));
                window.location.href = "/auth";
            }else{
              alert(json.message)
            }
          } else {
            console.error('Request failed:', response.status);
            alert('Login Failed');
            window.location.href = "/userlogin";
          }
        } catch (error) {
          console.error('Error:', error);
         }
      };

  return (
    //  Entire Div
    <div className="entireloginPage">

      {/* Left Div start */}
      <div className="flex-containers">
        <div id='formDiv'>
         {/* DealDox Icon */}
        <div className="logo">
          <img src={Dealdoxicon} alt="" id='DealDoxIcon' />
          <h3 style={{ color: '#715CF3' }}>User Login</h3>
        </div>
        <form  id='logform' method='POST' onSubmit={e => { e.preventDefault(); userlogin(); }}>
          {/* Email Block */}
          <div id='emailLoginDiv'>
            <label htmlFor='useremail' id='email'> Email</label>
            <input type="email" id="useremail" value={email} name="useremail" onChange={(e) => setUserEmail(e.target.value)} placeholder="Enter Your Email" required />
          </div>
          {/* Password Block */}
          <div id='passwordDiv'> 
            <label htmlFor="" id='passwords'>Password</label>
            <input type="password" id="passwordlogin" value={password} name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$" required /><div className="password-icon"></div>
          </div>
           {/* Remember and Forgot Block */}
          <div id='rememberForgotDiv'>
            {/* Remember Block */}
            <div id='rememberBox'>
              <input type="checkBox" />
              <label htmlFor="" id='remember'>Remember me</label>
            </div>
            {/* Forgot Block */}
            <div>
              <label htmlFor=""><a href="./Forgotpassword" id='forgot'>Forgot your Password?</a></label>
            </div>
          </div>
          {/* Login Button Code */}
          <div>
            <button id='login'  >Log In</button>
          </div>
        </form>
        </div>
        <div>
        <button id='cButton'>c</button><span id='InstructionPrivacy'> 2023 DealDox Pvt Ltd | All rights reserved | <a href="https://dealdox.pbwebvision.com/privacy-policy">Privacy</a></span>
        </div>

      </div>
      {/* Left Div end */}

      {/* Right Div start */}
      <div className="rightInfodiv">
        
        <div id='rigthInfo'>

           <h1 id='righthead1'>Generate Quotations 10x <br /> Faster with DealDox CPQ!</h1>
            <h2 id='rigthead2'>Close deals faster now!</h2>
            <h4 id='rigthpara'>
              Introducing DealDox, your ultimate destination for streamlining sales
              processes.<br />Embrace our Lightning Platform, delivering unparalleled speed 
              and comprehensive <br />automation for your sales cycle.Say goodbye to
              lengthy negotiations and  <br />welcome quicker,more effecient way to Close 
              deals.
            </h4>

            {/* Request Demo Button */}
            <a href="#"><button id='rigthbutton'>Request Demo</button></a>
            </div>
              
              {/* All the Images Div */}
            <div id='DIconDiv'>
            <img src={DIcon} alt=""  id='DIcon'/> 
            <img src={quotationGenerate} alt="" id= 'quotationGenerate' />
            <img src={Girl} alt="" id='girlImage'/>
            <img src={DealApproved} alt="" id='DealApproved'/>
            <img src={CFo} alt="" id='CFo' />
            <img src={ChooseLanguage} alt="" id='ChooseLanguage'/>
            <img src={ContactManagement} alt=""  id='ContactManagement'/>
            </div>
      </div>
      {/* Right div ends */}
    </div>
  //  Entire div ends
  )
}

export default Userlogin;