import React, { useState, useEffect, useCallback, useRef } from 'react';
import copyIcon from './computer-icons-cut-copy-and-paste-copying-icon-design-copy-vector.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Password.css';

const PasswordGenerator = () => {
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [passwordLength, setPasswordLength] = useState(8);
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef(null); // Ref for the password input field

  const generatePassword = useCallback(() => {
    let characterList = '';
    if (lowerCase) characterList += 'abcdefghijklmnopqrstuvwxyz';
    if (upperCase) characterList += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) characterList += '0123456789';
    if (symbols) characterList += '!@#$%^&*()_?';

    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characterList.length);
      newPassword += characterList.charAt(characterIndex);
    }

    setPassword(newPassword);
  }, [lowerCase, upperCase, numbers, symbols, passwordLength]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);
  
  const handleCheckbox = (setState) => {
    setState(prevState => !prevState);
  };

  const copyPassword = async () => {
    await navigator.clipboard.writeText(password);
    toast.success('Password copied to clipboard!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    passwordInputRef.current.focus(); 
  };

  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className="password-wrapper">
        <input type="text" value={password} disabled ref={passwordInputRef} className="password-input" />
        <button onClick={copyPassword} className="copy-button">
          <img src={copyIcon} alt="Copy" className="copy-icon" />
        </button>
      </div>
      <div className="checkboxes">
        <label>
          <input type="checkbox" checked={lowerCase} onChange={() => handleCheckbox(setLowerCase)} />
          Lowercase
        </label>
        <label>
          <input type="checkbox" checked={upperCase} onChange={() => handleCheckbox(setUpperCase)} />
          Uppercase
        </label>
        <label>
          <input type="checkbox" checked={numbers} onChange={() => handleCheckbox(setNumbers)} />
          Numbers
        </label>
        <label>
          <input type="checkbox" checked={symbols} onChange={() => handleCheckbox(setSymbols)} />
          Symbols
        </label>
      </div>
      <div className="password-length">
        <label>Password Length: {passwordLength}</label>
        <input type="range" min="8" max="20" value={passwordLength} onChange={(e) => setPasswordLength(parseInt(e.target.value))} className="range-input" />
      </div>
      <button onClick={generatePassword} className="generate-button">Generate Password</button>
      <ToastContainer/>
    </div>
  );
};

export default PasswordGenerator;
