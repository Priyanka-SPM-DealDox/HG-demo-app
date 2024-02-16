import React, { useState, useEffect } from 'react';
import '../../assets/css/login/Password.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const Password = ({ onChange, onValidityChange }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    validatePasswords();
  }, [password, confirmPassword]);

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword((prevState) => !prevState);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword((prevState) => !prevState);
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
    onChange(newPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    validatePasswords();
  };

  const validatePasswords = () => {
    const isValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/.test(password) &&
      password === confirmPassword;
    setPasswordsMatch(isValid);
    onValidityChange(isValid);
  };

  const validatePassword = (newPassword) => {
    const isPatternValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/.test(newPassword);
    const passwordError = isPatternValid
      ? ''
      : 'Password consist of one letter,digit and special character.';
    onValidityChange(isPatternValid);
    setPasswordError(passwordError);
  };

  return (
    <div id="complexPassword">
      <div id="mainpasswordDiv">
        <label htmlFor="" id="mainpasswordlabel">
          Password
        </label>
        <br />
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          className="registerPassword"
          required
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          onPaste={handlePaste}
          autoComplete='off'
        />
        <span onClick={() => togglePasswordVisibility('password')} className="eye-icon_password">
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        <br />
        {passwordError && <b id="notMatch">{passwordError}</b>}
      </div>
      <br />
      <div id="confirmPassworddiv">
        <label id="confirmPasswordLabel">Confirm Password</label> <br />
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          id="cpassReg"
          required
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onPaste={handlePaste}
          autoComplete='off'
        />
        <span onClick={() => togglePasswordVisibility('confirmPassword')} className="eye-icon_password">
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        <br />
        {!passwordsMatch && confirmPassword && <b id="notMatch">Password does not match</b>}
      </div>
    </div>
  );
};

export default Password;
