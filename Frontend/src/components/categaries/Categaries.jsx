import React, { useState} from "react";
import "../../assets/css/categaries/Categaries.css";
import HeaderBar from "../common/HeaderBar";
import CustomDropdown from "../common/CustomDropdown";
import InputTypes from "../common/InputTypes";

const Categories = () => {
  const categary1 = ["DEFAULT"];
  const categary3 = ["DEFAULT"];
  const categary4 = ["DEFAULT"];
  const categary5 = ["DEFAULT"];
  const categary6 = ["DEFAULT"];
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
    <div>
      <div className="headerRoles2" onClick={handleToggle}>
        <HeaderBar
          headerlabel={"CATEGORIES"}
          isButtonVisible={true}
          isDropdownOpen={isDropdownOpen}
          headerbardiv="headerbardiv_items"
        />
      </div>
      {isDropdownOpen && (
        <div className="categaries" onClick={(e) => e.stopPropagation()}>
          <div className="categaries1grid">
            <div id="contentS123">
              <CustomDropdown label={"CATEGORY 1"} options={categary1} />
            </div>
            <div id="contentS123">
              <InputTypes showFlagText={true} TextLabel={"CATEGORY 2"} />
            </div>

            <div id="contentS123">
              <CustomDropdown label={"CATEGORY 3"} options={categary3} />
            </div>
          </div>

          <div className="categariesgrid2">
            <div id="contentS123">
              <CustomDropdown label={"CATEGORY 4"} options={categary4} />
            </div>

            <div id="contentS123">
              <CustomDropdown label={"CATEGORY 5"} options={categary5} />
            </div>
            <div id="contentS123">
              <CustomDropdown label={"CATEGORY 6"} options={categary6} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;