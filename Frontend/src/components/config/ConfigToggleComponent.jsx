import React, { useState } from 'react';
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/config/ConfigToggleComponent.css"

const ConfigSection = ({ sectionNumber, sectionName}) => {
  const [isActive, setActive] = useState(false);

  const toggleSection = () => {
    setActive(!isActive);
  };

  return (
    <div>
      <div className={`con-sec${sectionNumber}`} id='con-sec-main' onClick={toggleSection}>
        <span
          className={`dropdown-icon-con-sec${sectionNumber}`}
          id='dropdown-icon-con-sec-main'
          onClick={toggleSection}
        >
          {isActive ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : (
            <FontAwesomeIcon icon={faCaretDown} />
          )}
        </span>
        <span className="config-number" >{sectionNumber}</span>
        <span className="config-name" >{sectionName}</span>
      </div>
     
    </div>
  );
};

export default ConfigSection;
