import React, { useState } from "react";
import "../../assets/css/myprofile/Myprofile.css";
import Navbar from "../../layouts/Navbar";
import CatalogSidebar from "../../layouts/CatalogSidebar";
import HeaderBar from "../../components/common/HeaderBar";
import InputTypes from "../../components/common/InputTypes";
import { Link } from "react-router-dom";
import CustomDropdown from "../../components/common/CustomDropdown";

const Myprofile = () => {
  const optionsorgprofile = [
    "AFRICA",
    "ALL OTHER AP",
    "AP-ALL OTHER",
    "AP-AUS/JP",
    "AP-CHINA",
    "AP-INDIA",
    "ARGENTINA",
    "AUSTRALIA",
  ];
  const optionstimezone = [
    "AFRICA/ABIDJAN(FEBRUARY 16TH,6:40AM)",
    "AFRICA/ACCRA(FEBRUARY 16TH,6:40AM)",
    "AFRICA/ALGIERS(FEBRUARY 16TH,7:40AM)",
    "AFRICA/ADDIS_ABABA(FEBRUARY 16TH,9:40AM)",
    "AFRICA/ASMARA(FEBRUARY 16TH,9:40AM)",
    "AFRICA/BAMAKO(FEBRUARY 16TH,6:40AM)",
    "AFRICA/BANGUI(FEBRUARY 16TH,7:40AM)",
  ];
  const optionslang = [
    " Afrikaans",
    " Albanian",
    " Arabic",
    " Armenian",
    " Basque",
    " Bengali",
    " Bulgarian",
    " Catalan",
    " Cambodian",
    " Chinese (Mandarin)",
    " Croatian",
    " Czech",
    " Danish",
    " Dutch",
    " English",
    " Estonian",
    " Fiji",
    " Finnish",
    " French",
    " Georgian",
    " German",
    " Greek",
    " Gujarati",
    " Hebrew",
    " Hindi",
    " Hungarian",
    " Icelandic",
    " Indonesian",
    " Irish",
    " Italian",
    " Japanese",
    " Javanese",
    " Kannada",
    " Korean",
    " Latin",
    " Latvian",
    " Lithuanian",
    " Macedonian",
    " Malay",
    " Malayalam",
    " Maltese",
    " Maori",
    " Marathi",
    " Mongolian",
    " Nepali",
    " Norwegian",
    " Persian",
    " Polish",
    " Portuguese",
    " Punjabi",
    " Quechua",
    " Romanian",
    " Russian",
    " Samoan",
    " Serbian",
    " Slovak",
    " Slovenian",
    " Spanish",
    " Swahil",
    " Swedish",
    " Tamil",
    " Tatar",
    " Telugu",
    " Thai",
    " Tibetan",
  ];
  const optionsnotification = ["NONE", "BY EMAIL"];
  const [, setSelectedOption] = useState("");
  const handleOptionSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const [showLoginEmailPage, setShowLoginEmailPage] = useState(false);
  const handleEditButtonClick = () => {
    setShowLoginEmailPage(!showLoginEmailPage);
  };
  return (
    <div>
      <Navbar />
      <CatalogSidebar />
      <div className="bread">
        <ul className="breadcrumbs">
          <li className="breadcrumbs--item">
            <Link
              to="/home"
              className="breadcrumbs--link breadcrumbs"
              style={{ display: "inline", textDecoration: "none" }}
            >
              HOME
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="" className="breadcrumbs--link breadcrumbs--link--active">
              MYPROFILE
            </Link>
          </li>
        </ul>
        {/* <hr className="hr" /> */}
      </div>
      <div className="myprofile">
        <div>
          <HeaderBar headerlabel={"MY PROFILE"} />
        </div>
        <form>
          <div className="grid-containermy" style={{ marginLeft: "66px" }}>
            <div className="left-grid-item1">
              <i className="fa fa-circle" aria-hidden="true" />
              <Link className="reauthenticate" to="#">
                &nbsp;REAUTHENTICATE SALESFORCE&nbsp;
              </Link>
            </div>
            <div className="right-grid-item2">
              <div className="containerP1">
                <div id="contentP1">
                  <InputTypes
                    showFlagText={true}
                    TextLabel={"FIRST NAME"}
                    showReadOnly={true}
                  />
                </div>
                <div id="contentP1">
                  <InputTypes
                    showFlagText={true}
                    TextLabel={"LAST NAME"}
                    showReadOnly={true}
                  />
                </div>
              </div>
              <div className="containerP2">
                <div id="contentP2">
                  <InputTypes
                    showFlagText={true}
                    TextLabel={"TITLE"}
                    showReadOnly={true}
                  />
                </div>
                <div id="contentP2">
                  <InputTypes
                    showFlagText={true}
                    TextLabel={"MANAGER"}
                    showReadOnly={true}
                  />
                </div>
              </div>
              <div className="containerP3">
                <div id="contentP3">
                  <InputTypes
                    showFlagText={true}
                    TextLabel={"PHONE"}
                    showReadOnly={true}
                  />
                </div>
                <div id="contentP3">
                  <InputTypes
                    showFlagText={true}
                    TextLabel={"EMAIL"}
                    showReadOnly={true}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="role">
            <b>ROLE</b>
          </div>
          <div className="roles">
            <i>Roles are defined in the Admin Security section on the left</i>
          </div>
          <div className="containerP4">
            <div id="contentP4A">
              <InputTypes
                showFlagCheckBox={true}
                Checkboxlabel={"INTEGRATION ACCESS ONLY"}
              />
            </div>
            <div id="contentP4B">
              <a className="delete1" href="#">
                &nbsp;DELETE REFRESH TOKEN&nbsp;
              </a>
            </div>
          </div>
          <div className="containerP5">
            <div id="contentP5">
              <InputTypes
                showFlagText={true}
                TextLabel={"SECURITY ROLE"}
                readOnly
              />
            </div>
            <div id="contentP5">
              <InputTypes
                showFlagText={true}
                TextLabel={"PASSWORD EXPIRATION DATE"}
                readOnly
              />
            </div>
          </div>
        </form>
        <div className="preferences">
          <b>PREFERENCES</b>
        </div>
        <form>
          <div className="containerP6">
            <div id="contentP6">
              <CustomDropdown
                options={optionsorgprofile}
                label="SALES ORG"
                onSelect={handleOptionSelect}
              />
            </div>
            <div id="contentP6">
              <CustomDropdown
                options={optionstimezone}
                label="TIME ZONE"
                onSelect={handleOptionSelect}
              />
            </div>
          </div>
          <div className="containerP7">
            <div id="contentP7">
              <CustomDropdown
                options={optionslang}
                label="LANGUAGE"
                onSelect={handleOptionSelect}
              />
            </div>
            <div id="contentP7">
              <CustomDropdown
                options={optionsnotification}
                label="NOTIFICATIONS"
                onSelect={handleOptionSelect}
              />
            </div>
          </div>
          <div>
            <div className="loginemail">
              <b>LOGIN EMAIL &amp; PASSWORD</b>
            </div>
          </div>
        </form>
      </div>
      <div>
        <div>
          <button id="edit" onClick={handleEditButtonClick}>
            &nbsp;&nbsp;&nbsp;&nbsp;EDIT&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
        </div>
        <div></div>
        <div
          id="myLogin"
          className={showLoginEmailPage ? "loginemailpage" : "hidden"}
        >
          <p>LOGIN EMAIL &amp; PASSWORD</p>
          <div className="loginleft">
            <form>
              <div className="containerL1">
                <div id="contentL1">
                  <InputTypes showFlagEmail={true} EmailLabel={"EMAIL"} />
                </div>
                <div id="contentL2">
                  <InputTypes
                    showFlagNumber={true}
                    NumberLabel={"CURRENCT PASSWORD"}
                  />
                </div>
                <div id="contentL3">
                  <InputTypes
                    showFlagNumber={true}
                    NumberLabel={"NEW PASSWORD"}
                    placeholder="Enter Password"
                  />
                </div>
                <div id="contentL4">
                  <InputTypes
                    showFlagText={true}
                    TextLabel={"RE-TYPE NEW PASSWORD"}
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="saveandcance2">
            <button id="cancel_data" type="reset" style={{ color: "red" }}>
              <a>&nbsp;CANCEL&nbsp;</a>
            </button>
            <button id="save_data" type="submit" style={{ color: "green" }}>
              <a>&nbsp;SAVE&nbsp;</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Myprofile;
