import React, { useEffect, useState } from "react";
import Navbar from "../../layouts/Navbar";
import CatalogSidebar from "../../layouts/CatalogSidebar";
import WriteFlex from "../../components/common/WriteFlex";
import AddSection from "../../components/addsection/AddSection";
import "../../assets/css/survey/Surveysetup.css";
import CustomDropdown from "../../components/common/CustomDropdown";
import { Link } from "react-router-dom";
import HeaderBar from "../../components/common/HeaderBar";
import ErrorMessage from "../../components/common/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import InputTypes from "../../components/common/InputTypes";
import SurveyPopup from "../../components/addsection/SurveyPopup";
import HelpRequest from "../../components/common/HelpRequest";
import { useAuthContext } from "../../hooks/useAuthContext";
import { baseUrl } from "../../config";
import { toast } from "react-toastify";
import { FaUser , FaTrash } from "react-icons/fa";
import AddQuestionSection from "../../components/addsection/AddQuestionSection";
import SpreadSheet from "../../components/calcEngine/SpreadSheet";
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css";
import GC from "@grapecity/spread-sheets";


const Surveysetup = () => {
  const { user } = useAuthContext();

  const catalogcategory_options = ["DBA", "DSOM", "EDUCATION", "IZOT"];
  const catalogstatus_options = ["IN ACTIVE", "IN PROCESS", "PUBLISHED"];
  const catalogupdate_options = [
    "NO UPDATE",
    "AUTOMATIC UPDATE",
    "PROMPT USER",
  ];
  const [showSaveCancel, setShowSaveCancel] = useState(false);
  const [isCalcContainerVisible, setIsCalcContainerVisible] = useState(true);
  const [isCalcHeaderVisible, setIsCalcHeaderVisible] = useState(false);
  const [isCalcDropdownVisible, setisCalcDropdownVisible] = useState(true);
  const [isInputVisible, setIsInputVisible] = useState(true);

  const [title, setTitle] = useState("");
  const [survey_id, setSurvey_id] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [globals, setGlobals] = useState(false);
  const [wide, setWide] = useState(false);
  const [update_type, setUpdate_type] = useState("");
  const [notification, setNotification] = useState("");
  const [surveySectionsData, setSurveySectionsData] = useState([]);
  const [surveySectionTag, setSurveySectionTag] = useState(<></>);

  console.log("@#$%^");
  console.log(surveySectionsData);
  const [surveyKey, setSurveyKey] = useState(""); // Corrected variable names
  const [sectionKey, setSectionKey] = useState(""); // Corrected variable names

  useEffect(() => {
    if (surveySectionsData && surveySectionsData.length > 0) {
      setSurveyKey(surveySectionsData[0].survey_key);
      setSectionKey(surveySectionsData[0]._id);
    } else {
      // Handle the case when surveySectionsData is undefined or empty
      setSurveyKey("");
      setSectionKey("");
    }

    if (document.querySelector(".mainsection")) {
      var mainsecdiv = document.querySelectorAll(".mainsection");
      for (var i = 0; i <= mainsecdiv.length; i++) {
        console.log("=======+++========");
        console.log(mainsecdiv[i]);
        // mainsecdiv[i].remove();
      }
    }
  }, [user, surveySectionsData]);

  console.log("@#$%");
  console.log(surveyKey); // Corrected variable name
  console.log(sectionKey); // Corrected variable name

  // const[surveyQuestionData, setSurveySectionData] = usestate([]);
  // const[ surveyQuestionsId, setSurveyQuestionsId ] = usestate([]);
  // const[surveyQuestionPosition , setSurveuQuestionPosition] = usestate([]);
  // const[surveyQuestionNum, setSurveyQuestioNum] = usestate([]);
  // const[surveyQuestionName, setSurveyQuestionName ] = usestate([]);
  // const[surveyQuestionRequired,setSurveyQuestionRequired ] = usestate([]);
  // const[surveyQuestionToggle, setSurveyQuestionToggle] = usestate([]);
  // const[surveyQuestionNote, setSurveyQuestionNote ] = usestate([]);
  // const[surveyQuestionCategory, setSurveyQuestionCategory ] = usestate([]);
  // const[surveyQuestionExternalReferenceId, setSurveyQuestionExternalReferenceId ] = usestate([]);
  // const[surveyQuestionLinkToQuestion, setSurveyQuestionLinkToQuestion ] = usestate([]);

  const [surveyData, setSurveyData] = useState([]);
  console.log(surveyData);
  useEffect(() => {
    if (user != "" && user != null) {
      getSurvey();
    }
  }, [user]);

  // survey api function
  const getSurvey = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/survey/getSurvey`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const survey = await response.json();
        console.log(survey);
        if (survey.status == "Success") {
          setSurveyData(survey.data);
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  // getSurveySections api function
  const getSurveySections = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/api/survey/getSurveySections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ survey_key: id }),
      });
      if (response.ok) {
        const survey = await response.json();
        console.log(survey);
        if (survey.status == "Success") {
          setSurveySectionsData(survey.data);

          setSurveySectionTag(
            <AddSection
              showFlag={false}
              survey_id={id}
              surveySectionsData={survey.data}
            />
          );
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  // getSurveyQuestions api Function

  // const [surveyQuestionData, setSurveyQuestionData] = useState([]);
  // const [surveyQuestionTag, setSurveyQuestionTag] = useState(<></>);
  // console.log(surveyQuestionData);

  // Function to get and display survey questions
  // const getSurveyQuestions = async (surveyKey, sectionKey) => {
  //   try {
  //     const response = await fetch(`${baseUrl}/api/survey/getSurveyQuestions`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //       body: JSON.stringify({ survey_key: surveyKey, section_key: sectionKey }),
  //     });
  //     if (response.ok) {
  //       const surveyQuestions = await response.json();
  //       console.log(surveyQuestions);
  //       if (surveyQuestions.status === "Success") {
  //         setSurveyQuestionData(surveyQuestions.data);

  //         // You can customize the component to display survey questions here
  //         setSurveyQuestionTag(
  //           <AddQuestionSection
  //             survey_id={surveyKey}
  //             sectionId={sectionKey}
  //             surveyQuestionData={surveyQuestions.data}
  //           />
  //         );
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const createSurvey = async (event) => {
    var setup_key = survey_id;
    var survey_data = {
      setup_key,
      title: title,
      category: category,
      status: status,
      globals: globals,
      wide: wide,
      update_type: update_type,
      notification: notification,
    };
    console.log(survey_data);
    try {
      const response = await fetch(`${baseUrl}/api/survey/addSurvey`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(survey_data),
      });
      if (response.ok) {
        const survey = await response.json();
        if (survey.status == "Success") {
          setSurvey_id(survey.survey_key);

          getSurvey();
          console.log("Data received:", survey);

          toast.success("survey added successfully", {
            icon: (
              <span style={{ color: "rgb(74, 146, 59)" }}>
                <FaUser />
              </span>
            ),
            className: "custom-toast_add",
          });
          console.log("Duplicate survey detected:", survey);
        } else if (survey.error && survey.error === "existingSurvey") {
          console.log("Duplicate survey detected:", survey);

          toast.error("duplicate added", {
            icon: (
              <span style={{ color: "rgb(74, 146, 09)" }}>
                <FaUser />
              </span>
            ),
          });
        }
      }
    } catch (error) {
      // alert(error);
      toast.error(`${title} name already exists`);

    }
  };
  let deleteToastDisplayed = false;
  const deleteSurvey = async () => {
    try {
      // Make a request to delete the survey
      const response = await fetch(`${baseUrl}/api/survey/deleteSurvey`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ survey_key: survey_id }),
      });

      if (response.ok) {
        const result = await response.json();
        if (!deleteToastDisplayed) {
          if (result.status === "Success") {
            // Handle deletion failure
            toast.success("survey deleted successfully", {
              icon: (
                <span style={{ color: "red " }}>
                  <FaTrash />
                </span>
              ),
              className: "custom-toast_delete",
            });
            const delay = 1000;
            setTimeout(() => {
              window.location.reload();
            }, delay);
          }
          deleteToastDisplayed = true;
        }
      }
    } catch (error) {
      console.error("Error deleting survey:", error);
      alert("An error occurred while deleting the survey.");
    }
  };
  const toggleTable = () => {
    setIsCalcContainerVisible(false);
    setIsCalcHeaderVisible(true);
    setisCalcDropdownVisible(true);
  };

  const backClick = () => {
    setIsCalcContainerVisible(true);
    setIsCalcHeaderVisible(false);
    setisCalcDropdownVisible(true);
  };

  const handleTempalateUpdateSelect = (selectedOption) => {
    setUpdate_type(selectedOption);
    // createSurvey();
  };

  const handleCategorySelect = (selectedOption) => {
    setCategory(selectedOption);
    // createSurvey();
  };
  const handleStatusSelect = (selectedOption) => {
    setStatus(selectedOption);
    // createSurvey();
  };

  const resetFields = () => {
    setTitle("");
    setSurvey_id("");
    setCategory("");
    setStatus("");
    setGlobals(false);
    setWide(false);
    setUpdate_type("");
    setNotification("");
    setSurveySectionsData([]);
    setIsInputVisible(true);
  };

  const handleItemSelect = (selectedItem, selectedIndex) => {
    if (isCalcContainerVisible) {
      setTitle(selectedItem.title);
      setSurvey_id(selectedItem._id);
      setSurveySectionsData([]);
      getSurveySections(selectedItem._id);
      setCategory(selectedItem.category);
      setStatus(selectedItem.status);
      setGlobals(selectedItem.globals);
      setWide(selectedItem.wide);
      setUpdate_type(selectedItem.update_type);
      setNotification(selectedItem.notification);
      setIsInputVisible(true);

    } else {
      setTitle(selectedItem.title);
      setSurvey_id(selectedItem._id);
      setSurveySectionsData([]);
      getSurveySections(selectedItem._id);
      setCategory(selectedItem.category);
      setStatus(selectedItem.status);
      setGlobals(selectedItem.globals);
      setWide(selectedItem.wide);
      setUpdate_type(selectedItem.update_type);
      setNotification(selectedItem.notification);
      setIsInputVisible(true);
    }
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
              className="breadcrumbs--link_mid"
            >
              Home
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link
              to="/rolessetup"
              className="breadcrumbs--link_mid"
            >
              Catalog
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="" className="breadcrumbs--link_mid">
              Survey
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="" className="breadcrumbs--link--active">
              Setup
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <HelpRequest />
      <div className="rowsurvey">
        <WriteFlex
          resetFields={resetFields}
          showGrouping={false}
          onItemSelect={handleItemSelect}
          data={surveyData}
          dataType="setups"
        />
        <div className="rightsurvey">
          <div id="mainsurvey">
            <div className="surveyhead">
              <div id="headersurvey">
                <HeaderBar headerlabel={"SURVEY SETUP"}>
                  <button className="approvesurvey2">CREATE A COPY</button>
                  <SurveyPopup />
                </HeaderBar>
              </div>
            </div>

            {/* <div className="containersurvey"> */}
            {isCalcContainerVisible && (
              <div id="contentS1">
                <div className="surveyName" id="surveynamesection">
                  <ErrorMessage
                    inputValueError={true}
                    showFlaxErrorMessageText={true}
                    label={"TITLE"}
                    errormsg={"TITLE NAME IS REQUIRED FIELD"}
                    onChange={(value) => setTitle(value)}
                    value={title}
                  />
                </div>
                <div className="catIcon" id="caticonid">
                  <FontAwesomeIcon icon={faClipboardList} id="iconclip" />
                  <label htmlFor id="clipLabel">
                    DEFAULTS
                  </label>
                </div>
                <div className="calcIcon" id="calcId" onClick={toggleTable}>
                  <i className="fa fa-table" id="calcIcon" />
                  <label id="calcLabel">CALC</label>
                </div>
              </div>
            )}
            {isCalcHeaderVisible && (
              <div id="headsurvey2">
                <Link className="export" to="#">
                  EXPORT
                </Link>
                <label htmlFor="myfile" id="file">
                  IMPORT FROM LOCAL FILE
                </label>
                <input
                  type="file"
                  id="myfile"
                  name="myfile"
                  display="show"
                  hidden
                />
                <input type="hidden" />
                <Link className="resumecalc" to="#">
                  RESUME CALCULATIONS
                </Link>
                <button id="backk" onClick={backClick}>
                  BACK
                  <i
                    className="fa fa-chevron-left"
                    id="backicon"
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}

            <div id="containerSA">
              <div id="contentS2">
                <CustomDropdown
                  label={"CATALOG CATEGORY"}
                  options={catalogcategory_options}
                  onSelect={handleCategorySelect}
                  Placeholder={"Select A Category"}
                  value={category}
                  onChange={(value) => setCategory(value)}
                />
              </div>
              <div id="contentS3">
                <CustomDropdown
                  label={"CATALOG STATUS"}
                  options={catalogstatus_options}
                  onSelect={handleStatusSelect}
                  value={status}
                  onChange={(value) => setStatus(value)}
                />
              </div>
              <div id="contentS4">
                <InputTypes
                  showFlagCheckBox={true}
                  Checkboxlabel={"GLOBALS"}
                  value={globals}
                  onChange={(value) => setGlobals(value)}
                />
              </div>
              <div id="contentS5">
                <InputTypes
                  showFlagCheckBox={true}
                  Checkboxlabel={"WIDE"}
                  value={wide}
                  onChange={(value) => setWide(value)}
                />
              </div>
            </div>

            {isCalcHeaderVisible && (
              <>
                <div id="calc-container">
                  
                  <SpreadSheet survey_id={survey_id} />
                  
                </div>
              </>
            )}

            <div id="containerSB">
              {isCalcContainerVisible && (
                <div id="contentS6">
                  <CustomDropdown
                    label={"TEMPLATE UPDATE TYPE"}
                    options={catalogupdate_options}
                    onSelect={handleTempalateUpdateSelect}
                    value={update_type}
                  />
                </div>
              )}
              {isInputVisible && update_type === "PROMPT USER" && (
                <div id="contentS7">
                  <InputTypes
                    showFlagText={true}
                    textplaceholder="Enter Your Message"
                    TextLabel={"UPDATE NOTIFICATION"}
                    value={notification}
                    onChange={(value) => setNotification(value)}
                  />
                </div>
              )}
            </div>
            {isCalcContainerVisible && (
              <div id="main-section">
                {survey_id && surveySectionsData ? surveySectionTag : <></>}
                <div className="deletesurvey">
                  <button id="save_data" onClick={createSurvey}>
                    SAVE SURVEY
                  </button>
                  <button id="delete_data" onClick={deleteSurvey} disabled={status==="PUBLISHED"}>
                    DELETE SURVEY
                  </button>
                </div>
              </div>
            )}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Surveysetup;
