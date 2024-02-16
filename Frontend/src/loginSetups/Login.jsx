import React from "react";
import { useState, useEffect } from "react";
import Dealdoxicon from "../assets/Images/Dealdoxicon.png";
import { Link } from "react-router-dom";
import DIcon from "../assets/Images/DIcon.png";
import "../assets/css/login/Login.css";
import { baseUrl } from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaUserAlt } from "react-icons/fa";
import SpreadSheet from "../components/calcEngine/SpreadSheet";
import LoginImage from "../assets/Images/loginPageImage.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [toastDisplayed, setToastDisplayed] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const adminLogin = async () => {

    if (buttonClicked || toastDisplayed) {
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        if (json.status === "Success") {
          toast.success("User Logged in Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
            icon: (
              <span style={{ color: "#715CF3" }}>
                <FaUserAlt />
              </span>
            ),
            className: "custom-toast_login",
          });
          setToastDisplayed(true);
          // Delay the redirection by 1 second (adjust as needed)
          setTimeout(() => {
            localStorage.setItem("user", JSON.stringify(json));
            window.location.href = "/auth";
          }, 1000);
        } else {
          toast.info(json.message);
          setToastDisplayed(true);
        }
      } else {
        console.error("Request failed:", response.status);
        alert("Login Failed");
        // window.location.href = "/";
        setToastDisplayed(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  // SF api
  // const [sfData, setSfData] = useState([]);
  // const token = "00D1s0000008qPA!AQEAQAPfZbO8FU4ezKuoqRNcVC0mWaShEUn1hOKzX7W.fXOalt3BzGJa7QQPAk5bDQfmyt0S20lzElN_0kQF13BeMvsQlhDu"
  // const SfData = async () => {
  //   try {
  //     const response = await fetch(`https://spmglobaltech--devminor.sandbox.my.salesforce.com/services/data/v58.0/query/?q=SELECT+name
  //     +from+Account`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (response.ok) {
  //       const sfdata = await response.json();
  //       setSfData(sfdata.data);
  //       console.log(sfData.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   SfData();
  // }, []);

  // console.log(sfData);

  //   //Usesate for SF
  //   const [salesForceData, setSalesForceData] = useState(sfData);
  //   console.log(salesForceData);
  //   const salesforceData = async () => {
  //     try {

  //       // Proceed with user registration
  //       const response = await fetch(`${baseUrl}/api/sf/save`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ data: salesForceData }),

  //       });
  //       const json = await response.json();

  //       if (response.ok) {
  //         console.log(json);
  //       } else {
  //         console.error(json.message); // Log the error message
  //         alert('Failed to save data to Salesforce. Please try again.'); // Show user-friendly error message
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     salesforceData();
  //   }, [salesForceData]);

  //   console.log("@#$%^");
  //   console.log(salesForceData);

  return (
    //  Entire Div
    <div className="entireloginPage">
      {/* Left Div start */}
      <div className="flex-containers">
        <div id="formDiv">
          {/* DealDox Icon */}
          <div className="logo">
            <img src={Dealdoxicon} alt="" id="DealDoxIcon" />
          </div>
          <form
            id="logform"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              adminLogin();
            }}
          >
            {/* Email Block */}
            <div id="emailLoginDiv">
              <label htmlFor="useremail" id="email">
                {" "}
                Email
              </label>
              <input
                type="email"
                id="useremail"
                value={email}
                name="useremail"
                onChange={(e) => {setEmail(e.target.value); setToastDisplayed(false);}}
                placeholder="Enter Your Email"
                required
                autoComplete="off"
              />
            </div>
            {/* Password Block */}
            <div id="passwordDiv">
              <label htmlFor="" id="passwords">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="passwordlogin"
                value={password}
                name="password"
                onChange={(e) => {setPassword(e.target.value); setToastDisplayed(false);}}
                placeholder="Enter Your Password"
                required
                autoComplete="off"
              />
              <div className="password_icon" onClick={togglePasswordVisibility}>
                {/* Eye icon, change the icon based on showPassword state */}
                {showPassword ? (
                  <span>
                    <FaEyeSlash id="password_eyeicon" />
                  </span>
                ) : (
                  <span>
                    <FaEye id="password_eyeicon" />
                  </span>
                )}
              </div>
            </div>
            {/* Remember and Forgot Block */}
            <div id="rememberForgotDiv">
              {/* Remember Block */}
              <div id="rememberBox">
                <label className="rememberBox">
                  <input type="checkBox" /> &nbsp;
                  <span htmlFor="" id="remember">
                    Remember me
                  </span>
                </label>
              </div>
            </div>
            {/* Forgot Block */}
            <div className="forgot">
              <label htmlFor="">
                <Link to="./Forgotpassword" id="forgot">
                  Forgot your Password?
                </Link>
              </label>
            </div>

            {/* Login Button Code */}
            <div>
              <button id="login" disabled={!email || !password || buttonClicked}>
                Log In
              </button>
            </div>
          </form>

          <div>
            <label id="signlabel">
              Haven't joined us as a customer yet?{" "}
              <a href="/register" id="reg">
                {" "}
                Sign Up
              </a>
            </label>
          </div>
        </div>
        <div>
          <button id="cButton">c</button>
          <span id="InstructionPrivacy">
            {" "}
            2023 DealDox Pvt Ltd | All rights reserved |{" "}
            <Link to="https://www.dealdox.io/privacy-policy" id="privacyCode">
              Privacy
            </Link>
          </span>
        </div>
      </div>
      {/* Left Div end */}

      {/* Right Div start */}
      <div className="rightInfodiv">
        <div id="rigthInfo">
          <h1 id="righthead1">
            Generate Quotations 10x <br /> Faster with DealDox CPQ!
          </h1>
          <h2 id="rigthead2">Close deals faster now!</h2>
          <h4 id="rigthpara">
            Introducing DealDox, your ultimate destination for streamlining
            sales processes.
            <br />
            Embrace our Lightning Platform, delivering unparalleled speed and
            comprehensive <br />
            automation for your sales cycle.Say goodbye to lengthy negotiations
            and <br />
            welcome quicker,more efficient way to Close deals.
          </h4>

          {/* Request Demo Button */}
          <Link to="https://www.dealdox.io/demo">
            <button id="rigthbutton">Request Demo</button>
          </Link>
        </div>

        {/* All the Images Div */}
        <div id="DIconDiv">
          <img
            src={LoginImage}
            alt=""
            height={"350px"}
            width={"300px"}
            style={{ position: "relative", bottom: "90px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
