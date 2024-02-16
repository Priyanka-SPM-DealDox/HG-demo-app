import React, { useState, useEffect, useRef } from 'react';
import '../../assets/css/doctypeSidePanel/DoctypeSidePanel.css';
import {
  FaAngleUp,
  FaAngleDown
}from "react-icons/fa";
 
const DocTypeDropdown = ({ placeholder, label, doctypePublished, onSelect, updateChild1State, selectedOptionsContentdoctype }) => {
  console.log("doc", selectedOptionsContentdoctype);
  const [isContentdoctypeOpen, setIsContentdoctypeOpen] = useState(false);
  //const [selectedOptionsContentdoctype, setSelectedOptionsContentdoctype] = useState([selectedOptionsContentdoctype1]);
  const [ContentdoctypeSearchTerm, setContentdoctypeSearchTerm] = useState('');
  const [showMore, setShowMore] = useState(false);
 
  const toggleDropdownContentdoctype = () => {
    setIsContentdoctypeOpen(!isContentdoctypeOpen);
    if (!isContentdoctypeOpen) {
      setContentdoctypeSearchTerm('');
    }
  };
 
  const toggleOptionContentdoctype = (option) => {
    if (selectedOptionsContentdoctype.includes(option)) {
      //setSelectedOptionsContentdoctype(selectedOptionsContentdoctype.filter((item) => item !== option));
      updateChild1State(selectedOptionsContentdoctype.filter((item) => item !== option));
    } else {
      //setSelectedOptionsContentdoctype([...selectedOptionsContentdoctype, option]);
      updateChild1State([...selectedOptionsContentdoctype, option])
    }
  };
  //console.log(selectedOptionsContentdoctype);
 
  // const passStateToChild1 = () => {
  //   updateChild1State(selectedOptionsContentdoctype);
  // }
 
  const clearSelectedOption = (option) => {
    //setSelectedOptionsContentdoctype(selectedOptionsContentdoctype.filter((item) => item !== option));
    updateChild1State(selectedOptionsContentdoctype.filter((item) => item !== option));
  };
 
  // const filteredOptionsContentdoctype = doctypePublished.filter((option) =>
  //   typeof option === 'string' && option.toLowerCase().includes(ContentdoctypeSearchTerm.toLowerCase())
  // );
 
  const dropdownContentdoctypeRef = useRef(null);
 
  useEffect(() => {
    function handleClickOutsideContentdoctype(event) {
      if (
        dropdownContentdoctypeRef.current &&
        !dropdownContentdoctypeRef.current.contains(event.target)
      ) {
        setIsContentdoctypeOpen(false);
      }
    }
 
    document.addEventListener('mousedown', handleClickOutsideContentdoctype);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideContentdoctype);
    };
  }, []);
 
  const generateSelectedOptionsString = () => {
    if (selectedOptionsContentdoctype.length === 0) {
      return (
        <div className="selected-options-placeholder">
          {placeholder}
        </div>
      );
    }
 
    return selectedOptionsContentdoctype.map((option) => (
      <span key={option} className="selected-option">
        {option}
        <button className="cancel-button" onClick={() => clearSelectedOption(option)}>
          X
        </button>
      </span>
    ));
  };
 
  const handleShowMore = () => {
    setShowMore(!showMore);
  };
 
 
 
  return (
    <div>
      <div className="containerdoctype">
        <div className="contentdoctypeallContainer" ref={dropdownContentdoctypeRef}>
          <div className="contentalldoctype">
            <div className="selected-options-allcontainer">
              {generateSelectedOptionsString()}
            </div>
            {!selectedOptionsContentdoctype.length && (
              <label className="contentdoctypeallvertical">{label}</label>
            )}
            <span
              className="dropdown-icon-allcontentdoctype"
              onClick={toggleDropdownContentdoctype}
            >
              {isContentdoctypeOpen ? (
                  <FaAngleUp onClick={toggleDropdownContentdoctype}style={{ float: "right" }} id="anglupdown" />
            ) : (
              <FaAngleDown
                onClick={toggleDropdownContentdoctype}
                style={{ float: "right" }}
                id="anglupdown"
              />
            )}
            </span>
          </div>
          {isContentdoctypeOpen && (
            <ul className="options-alldropdown" style={{ overflowY: 'scroll', maxHeight: showMore ? 'none' : '150px' }}>
              <input
                type='search'
                placeholder='Start Typing to Search...'
                className='serchdoctpe'
                value={ContentdoctypeSearchTerm}
                onChange={(e) => setContentdoctypeSearchTerm(e.target.value)}
              />
              <div>
                {doctypePublished.map((option, index) => (
                  <li
                    key={index}
                    className={`option ${
                      selectedOptionsContentdoctype.includes(option.doc_name) ? 'selected' : ''
                    }`}
                    onClick={() => toggleOptionContentdoctype(option.doc_name)}
                  >
                    {option.doc_name}
                  </li>
                ))}
              </div>
              <div className='showdiv'>
                <button className="show-more-button" onClick={handleShowMore}>
                  {showMore ? 'SHOW LESS' : 'SHOW MORE'}
                </button>
              </div>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default DocTypeDropdown;
 