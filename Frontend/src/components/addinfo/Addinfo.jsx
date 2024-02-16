
import React, { useState } from "react";
import DeleteAction from "../../components/addsection/DeleteAction";
import "../../assets/css/addinfo/Addinfo.css";
import HeaderBar from "../../components/common/HeaderBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
const Addinfo = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchText, setSearchText] = useState("");
  const [inputSections, setInputSections] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isCustomOpen, setCustomOpen] = useState(false);
  const options = ["vanita 1", "vanita 2", "vanita 3"];
  const [isplusVisible, setIsplusVisible] = useState(false);
  const [isAdditionalInfoVisible, setIsAdditionalInfoVisible] = useState(false);
  const [isPencilIconVisible, setIsPencilIconVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    inputSections.map(() => "")
  );
  const [isDropdownOpenAdd, setIsDropdownOpenAdd] = useState(
    inputSections.map(() => false)
  );
 
  const toggleBillingVisibility = () => {
    setDropdownOpen(!isDropdownOpen);
    setCustomOpen(!isCustomOpen);
    setIsAdditionalInfoVisible(!isAdditionalInfoVisible);
  };
 
  const toggleDataLabelVisibility = () => {
    setIsplusVisible(true);
    setCustomOpen(!isCustomOpen);
    setIsPencilIconVisible(true);
    // setDropdownOpen(true);
    setIsAdditionalInfoVisible(true);
  };
  const togglePencilLabelVisibility = () => {
    // setDropdownOpen(isDropdownOpen);
    setIsplusVisible(false);
    setIsAdditionalInfoVisible(true);
    setIsPencilIconVisible(false);
  };
  const handleAddInputSection = () => {
    const newInputSections = [...inputSections];
    newInputSections.push(inputValue);
 
    // Add corresponding initial states for the new section
    setSelectedOptions([...selectedOptions, ""]);
    setIsDropdownOpenAdd([...isDropdownOpenAdd, false]);
 
    setInputSections(newInputSections);
    setInputValue("");
  };
 
  const handleInputChange = (index, event) => {
    const updatedInputSections = [...inputSections];
    updatedInputSections[index] = event.target.value;
    setInputSections(updatedInputSections);
  };
 
  const handleDeleteInputSection = (index) => {
    const updatedInputSections = [...inputSections];
    const updatedSelectedOptions = [...selectedOptions];
    const updatedDropdownStates = [...isDropdownOpenAdd];
 
    updatedInputSections.splice(index, 1);
    updatedSelectedOptions.splice(index, 1);
    updatedDropdownStates.splice(index, 1);
 
    setInputSections(updatedInputSections);
    setSelectedOptions(updatedSelectedOptions);
    setIsDropdownOpenAdd(updatedDropdownStates);
  };
 
  const handleMoveInputSection = (index, direction) => {
    if (index + direction >= 0 && index + direction < inputSections.length) {
      const updatedInputSections = [...inputSections];
      const updatedSelectedOptions = [...selectedOptions];
      const tempInput = updatedInputSections[index];
      const tempOption = updatedSelectedOptions[index];
 
      updatedInputSections[index] = updatedInputSections[index + direction];
      updatedSelectedOptions[index] = updatedSelectedOptions[index + direction];
 
      updatedInputSections[index + direction] = tempInput;
      updatedSelectedOptions[index + direction] = tempOption;
 
      setInputSections(updatedInputSections);
      setSelectedOptions(updatedSelectedOptions);
    }
  };
 
  const handleInputClick = (index) => {
    const updatedDropdownStates = [...isDropdownOpenAdd];
    updatedDropdownStates[index] = !updatedDropdownStates[index];
    setIsDropdownOpenAdd(updatedDropdownStates);
  };
  // ...
 
  const handleOptionClick = (index, option) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[index] = option;
    setSelectedOptions(updatedSelectedOptions);
    setIsDropdownOpenAdd(new Array(inputSections.length).fill(false)); // Close all other dropdowns
  };
 
  // ...
 
  const handleSearchChange = (e) => {
    setSearchText(e.target.value); // Update the shared search text
  };
 
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div className="addinf">
      <div id="grid7">
        <div
          className="additionalinput"
          id="additionalbtn"
          onClick={toggleBillingVisibility}
        >
          <HeaderBar
            isButtonVisible={true}
            headerlabel="ADDITIONAL INFO"
            isDropdownOpen={isDropdownOpen}
          >
            <div
              className="right-side-content2"
              onClick={toggleDataLabelVisibility}
            >
              {isAdditionalInfoVisible && <label id="define">Define</label>}
              {isAdditionalInfoVisible && (
                <FontAwesomeIcon
                  icon={faGear}
                  className="gear-icon"
                  id="fagearai"
                />
              )}
            </div>
            <div
              className="right-side-content"
              onClick={togglePencilLabelVisibility}
            >
              {isPencilIconVisible && <label id="data">Data</label>}
              {isPencilIconVisible && (
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  className="pencil-icon"
                  id="fapenai"
                />
              )}
            </div>
          </HeaderBar>
        </div>
      </div>
      {isCustomOpen && (
        <div id="grid9">
          <label id="NCFDlabel">NO CUSTOM FIELDS DEFINED</label>
        </div>
      )}
      {isPencilIconVisible && (
        <div id="grid8">
          <div id="containeraddinfo" className="column-container">
            {inputSections.map((inputSection, index) => (
              <div key={index} className="custom-inputcustomfiled">
                <div className="checkbox_div">
                  <input type="checkbox" className="checkbox-section1" />
                  <label id="checkbox1">Persist On Apply</label>
                  <input type="checkbox" className="checkbox-section2" />
                  <label id="checkbox2">Admin Only</label>
                  <input type="checkbox" className="checkbox-section3" />
                  <label id="checkbox3">Read Only</label>
                  {index !== 0 && (
                    <button
                      className="movepreve"
                      id={`movepre_${index}`}
                      onClick={() => handleMoveInputSection(index, -1)}
                    >
                      MOVE PREVIOUS
                    </button>
                  )}
                  {index !== inputSections.length - 1 && (
                    <button
                      className="movenext"
                      id={`movenext_${index}`}
                      onClick={() => handleMoveInputSection(index, 1)}
                    >
                      MOVE NEXT
                    </button>
                  )}
                </div>
                <>
                  <div className="dropdown_addinfo">
                    <div className="input-row">
                      <input
                        className="input_addinfo"
                        onClick={() => handleInputClick(index)}
                        value={selectedOptions[index]}
                        onChange={(e) => handleSearchChange(e)}
                      />
                      <div className="dele">
                        <DeleteAction
                          onDelete={() => handleDeleteInputSection(index)}
                        />
                      </div>
                    </div>
                    {isDropdownOpenAdd[index] && (
                      <ul className="ul_addinfo">
                        {filteredOptions.map((option, optionIndex) => (
                          <li
                            key={optionIndex}
                            onClick={() => handleOptionClick(index, option)}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </>
                <input
                  type="text"
                  className="inputcustomfield"
                  id={`ailistinput_${index}`}
                  value={inputSection}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Enter Field Name"
                />
              </div>
            ))}
            {isplusVisible && (
              <div id="grid8">
                <div id="containeraddinfo" className="column-container">
                  <div id="plusiconaddinfo">
                    <input
                      type="button"
                      id="plusbtn"
                      onClick={handleAddInputSection}
                      value="+"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Addinfo;
 