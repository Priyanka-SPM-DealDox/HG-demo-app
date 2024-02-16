import React, { useState, useEffect, useRef } from "react";
import "../assets/css/login/ResetPassword.css";
import ForgotPasswordImage from "../assets/Images/Forgotpassword.png";
import Dealdoxicon from "../assets/Images/Dealdoxicon.png";
import { baseUrl } from "../config";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";

const ResetPassword = () => {

  const urlParams = new URLSearchParams(window.location.search);

// Extract values using the get method
const useremail = urlParams.get('email');
console.log(useremail);

  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState(useremail);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const confirmPasswordRef = useRef(null);

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setIsPasswordMatch(newPassword === event.target.value);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleOutsideClick = (e) => {
    if (
      confirmPasswordRef.current &&
      !confirmPasswordRef.current.contains(e.target) &&
      !isPasswordMatch
    ) {
      setIsPasswordMatch(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isPasswordMatch]);

  const ResetPassword = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(newPassword);

    try {
      const response = await fetch(`${baseUrl}/api/admin/restpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: newPassword,
        }),
      });

      const json = await response.json();
        console.log(json);
        if (response) {
          window.location.href = "/";
          console.log("Password Updated SUccessfully");
        } else {
          window.location.href = "/forgotpassword";
          console.log("Unable to update password");
        }
   
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <div className="reset">
      <div className="flexreset">
        <div className="leftforgot">
          <img
            src={ForgotPasswordImage}
            alt="Forgot Password"
            id="ForgoticonlogFor"
          />
        </div>
        <div className="resetright">
          <div className="resetrightcontent">
            <img src={Dealdoxicon} alt="Dealdox Icon" id="DealDoxIcon" />
            <div className="hedreset">
              <h1 className="hedingreset">Reset your password</h1>
            </div>
            <div className="labeloldmsgbot">
              <label className="oldonemsg">
                Your new password should be different from the old one
              </label>
            </div>
            <div className="form-groupnew">
              <label htmlFor="newPassword" className="confirmpass">
                Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                placeholder="Enter your password"
                value={newPassword}
                onChange={(e) => handlePasswordChange(e)}
                required
              />
              <span onClick={toggleNewPasswordVisibility}>
                {showNewPassword ? (
                  <FaEyeSlash id="password_eyeicon" />
                ) : (
                  <FaEye id="password_eyeicon" />
                )}
              </span>
            </div>

            <div
              className={`form-groupconfirm ${
                !isPasswordMatch ? "errorreset" : ""
              }`}
              ref={confirmPasswordRef}
            >
              <label htmlFor="confirmPassword" className="confirmpass">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e)}
                required
                style={!isPasswordMatch ? { outlineColor: "red" } : {}}
              />
              <span onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? (
                  <FaEyeSlash id="password_eyeicon" />
                ) : (
                  <FaEye id="password_eyeicon" />
                )}
              </span>

              {!isPasswordMatch && (
                <div className="error-messagereset">
                  <FaInfoCircle />
                  <label>PASSWORD DO NOT MATCH</label>
                </div>
              )}
            </div>
          </div>
          <div className="savecancel">
            <div className="resetsubmit">
              <button
                type="submit"
                className="continuereset"
                onClick={ResetPassword}
              >
                Save
              </button>
            </div>
            <div className="resetsubmit">
              <button type="submit" className="canncelclick">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
