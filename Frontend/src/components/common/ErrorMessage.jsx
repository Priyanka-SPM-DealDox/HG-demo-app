import React, { useState } from "react";
import "../../assets/css/common/CustomDropdown.css";

function ErrorMessage({
  value,
  onChange,
  label,
  errormsg,
  placeholdersection,
  validationinputcustom,
  validationnumberinput,
  labelnumber,
  errornumbermsg,
  placeholdernumber,
  emailerrormsg,
  emailinputcustom,
  emailplaceholder,
  EmailLabel,
  labelNoMAndatory,
  validationlabelNoMandatoryy,
  placeholdersectionNoMandatory,
  errormsgNoMAndatory,
  validationinputNoMandatory,
  showFlaxErrorMessageTextNoMandatory,
  showFlaxErrorMessageText,
  showFlaxErrorMessageNumber,
  showFlagEmail,
  onBlur,
  permission,
  readOnly = false
}) {


  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    const input = event.target;

    if (input.value.trim() !== "") {
      setError(false);
      input.style.outlineColor = "#ccc"; // Reset border color
      input.style.outlineColor = "#216c98"; // Reset outline color
    } else {
      setError(true);
      input.style.outlineColor = "red";
      input.style.outlineColor = "red";
    }

    setInputValue(input.value);
    onChange(input.value);
    // onBlur(event)
  };

  const labelStyle = {
    color: error ? "red" : "#216c98",
  };

  const containerStyle = { borderLeft: (value ?? '').length === 0 ? "3px solid #216c98" : "" };
  // number error message

  const [inputnumbervalue, setInputNumberValue] = useState("");
  const [errornumber, setErrorNumber] = useState(false);

  const handleInputNumberChange = (event) => {
    const input = event.target;

    if (input.value.trim() !== "") {
      setErrorNumber(false);
      input.style.outlineColor = "#ccc"; // Reset border color
      input.style.outlineColor = "#216c98"; // Reset outline color
    } else {
      setErrorNumber(true);
      input.style.outlineColor = "red";
      input.style.outlineColor = "red";
    }

    setInputNumberValue(input.value);
    onChange(input.value);
    // onBlur(event)
  };

  const labelnumberstyle = {
    color: errornumber ? "red" : "#216c98",
  };

  const containernumberstyle = {
    borderLeft:
      errornumber || inputnumbervalue !== "" ? " " : "3px solid #216c98",
  };
  // error message of email

  const [inputValueError, setInputValueError] = useState("");

  const [emailerror, setEmailError] = useState(false);

  const handleInputErrorChange = (event) => {
    const input = event.target;

    if (input.value.trim() !== "") {
      setEmailError(false);

      input.style.outlineColor = "#ccc"; // Reset border color

      input.style.outlineColor = "#216c98"; // Reset outline color
    } else {
      setEmailError(true);
      input.style.outlineColor = "red";
      input.style.outlineColor = "red";
    }

    setInputValueError(input.value);
    onChange(input.value);
    // onBlur(event)
  };

  const emaillabelStyle = {
    color: emailerror ? "red" : "#216c98",
  };

 const emailerrorStyle = { borderLeft: (value ?? '').length === 0 ? "3px solid #216c98" : "" };

  const [inputValueNoMandatory, setInputValueNoMAndatory] = useState("");
  const [errorNoMAndatory, setErrorNoMAndatory] = useState(false);

  const handleInputChangeNoMAndatory = (event) => {
    const input = event.target;

    if (input.value.trim() !== "") {
      setErrorNoMAndatory(false);
      input.style.outlineColor = "#ccc"; // Reset border color
      input.style.outlineColor = "#216c98"; // Reset outline color
    } else {
      setErrorNoMAndatory(true);
      input.style.outlineColor = "red";
      input.style.outlineColor = "red";
    }

    setInputValueNoMAndatory(input.value);
  };

  const labelStyleNoMandatory = {
    color: errorNoMAndatory ? "red" : "#216c98",
  };

  return (
    <>
      {showFlaxErrorMessageText && (
        <div id="validationDiv">
          <input
            type="text"
            className={`validationinput ${validationinputcustom} ${
              error ? "error" : ""
            }`}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholdersection}
            style={containerStyle}
            onBlur={(event)=>{onBlur?onBlur(event):<></>}}
            readOnly={readOnly}
          />
          <label
            htmlFor="validationinput"
            className="validationinputlabel"
            style={labelStyle}
          >
            {error ? errormsg : label}
          </label>
        </div>
      )}
      {showFlaxErrorMessageNumber && (
        <div className="validnumberdiv">
          <input
            type="number"
            className={`validationnumberinput ${validationnumberinput} ${
              errornumber ? "errornumber" : ""
            }`}
            value={inputnumbervalue}
            onChange={handleInputNumberChange}
            placeholder={placeholdernumber}
            style={containernumberstyle}
            onBlur={(event)=>{onBlur?onBlur(event):<></>}}
            readOnly={readOnly}
          ></input>
          <label
            htmlFor="validationnumberinput"
            className="validationinputnumberlabel"
            style={labelnumberstyle}
          >
            {errornumber ? errornumbermsg : labelnumber}
          </label>
        </div>
      )}
      {/* email */}
      {showFlagEmail && (
        <div id="contentquote">
          <input
            className={`emailinput ${emailinputcustom}

    ${emailerror ? "emailerror" : ""}`}
            value={value}
            onChange={handleInputErrorChange}
            name="text"
            type="email"
            placeholder={emailplaceholder}
            style={emailerrorStyle}
            onBlur={(event)=>{onBlur?onBlur(event):<></>}}
            readOnly={readOnly}
          />

          <label
            htmlFor="emailerrorinput"
            className="emailerrorinputlabel"
            style={emaillabelStyle}
          >
            {emailerror ? emailerrormsg : EmailLabel}
          </label>
        </div>
      )}
      {showFlaxErrorMessageTextNoMandatory && (
        <div id="validationDivNoMandatory">
          <input
            type="text"
            className={`validationinputNoMandatory ${validationinputNoMandatory} ${
              error ? "error" : ""
            }`}
            value={inputValueNoMandatory}
            onChange={handleInputChangeNoMAndatory}
            placeholder={placeholdersectionNoMandatory}
            onBlur={(event)=>{onBlur?onBlur(event):<></>}}
            readOnly={readOnly}
          />
          <label
            htmlFor="validationinputNoMandatory"
            className={`labelnomandatory ${validationlabelNoMandatoryy}`}
            style={labelStyleNoMandatory}
          >
            {errorNoMAndatory ? errormsgNoMAndatory : labelNoMAndatory}
          </label>
        </div>
      )}
    </>
  );
}

export default ErrorMessage;
