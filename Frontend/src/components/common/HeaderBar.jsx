import React from "react";
import "../../assets/css/common/HeaderBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const HeaderBar = ({ headerbardiv, headerlabel, isButtonVisible, isDropdownOpen,children }) => {
  return (
      <div className={`header_bar_div ${headerbardiv}`}>
        <h4>{headerlabel}</h4>
        {isButtonVisible && (
          <FontAwesomeIcon
            icon={isDropdownOpen ? faAngleUp : faAngleDown}
            className="careticoncategaries"
            id="togglecategaries"
          />
        )}
      <div className="header-children-container">{children}</div>
      </div>
  );
};

export default HeaderBar;
