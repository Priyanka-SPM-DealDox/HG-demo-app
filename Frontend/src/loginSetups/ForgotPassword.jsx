import React, { useState } from "react";
import "../assets/css/login/ForgotPassword.css";
import Dealdoxicon from "../assets/Images/Dealdoxicon.png";
import ForgotPasswordImage from "../assets/Images/Forgotpassword.png";
import { baseUrl } from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaInfo } from "react-icons/fa";



const ForgotPassword = () => {
  const [forgot, setForgot] = useState("");

  const forgotPasswordEmail = async (e) => {

    e.preventDefault(); // Prevents the default form submission behavior
    const rgExp = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2,6}$/
    if (rgExp.test(forgot)) {
      alert('Valid Email!')

      try {
        const response = await fetch(`${baseUrl}/api/admin/forgotpassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: forgot }),
        });

        const json = await response.json();

        if (response.ok) {
          if (json.status === "success") {
            window.location.href = "/logaccount";
          } else {
            window.location.href = "/forgotpassword";
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.success("Please Enter Your Valid Email", {
        icon: (
          <span style={{ color: "#715CF3" }}>
            <FaInfo />
          </span>
        ),
        className: "custom-toast_login",
      });
    }
  };
  return (
    <div className="containerdiv">
      <div className="forgot-password-container">
        <div className="leftforgot">
          <img
            src={ForgotPasswordImage}
            alt="Forgot Password"
            id="ForgoticonlogFor"
          />
        </div>
        <div className="EntireForgotright">
          <img src={Dealdoxicon} alt="Dealdox Icon" id="DealDoxIcon" />
          <div className="headheight">
            <h5 className="h5headingForgot">
              Unable to log in to your account?
            </h5>
          </div>
          <div className="ptags">
            <p className="ptag1">
              Usernames are in the form of an email address.
            </p>
            <p className="ptag1">Passwords are case sensitive.</p>
          </div>
          <div className="deal">
            <p className="deal">
              Enter your DealDox username to change your password.
            </p>
          </div>
          <div className="butnsfoca">
            <label htmlFor="forgotpassspam" className="spam">
              Username/Email
            </label>
            <input
              className="forgotpass"
              placeholder="Enter your username/Email"
              value={forgot}
              onChange={(e) => setForgot(e.target.value)}
            />
          </div>
          <div className="continuebuttondiv">
            <button
              type="submit"
              className="continuebutton"
              onClick={forgotPasswordEmail}
            >
              Continue
            </button>
          </div>
          <div className="cancelforgot">
            <button type="reset" className="cancelforgot">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
