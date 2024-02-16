import React, { useEffect, useState } from "react";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import "../../assets/css/guidedselling/GuidedSelling.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsLeftRight,
  faCog,
  faDownLeftAndUpRightToCenter,
  faTable,
  faPencil,
  faPen,
  faScroll,
  faFileExcel,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  Link,
  withRouter,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import TemplateGuided from "../../components/templateComps/TemplateGuided";
import HeaderBar from "../../components/common/HeaderBar";
import GuidedListing from "../../components/templateComps/GuidedListing";
import AddSection from "../../components/addsection/AddSection";
import GuidedSellingGrid from "../../components/pcrgridguidedselling/GuidedSellingGrid";
import HelpRequest from "../../components/common/HelpRequest";
import { baseUrl } from "../../config";
import { useAuthContext } from "../../hooks/useAuthContext";
import SidePanel from "../../components/common/SidePanel";
import { FaGreaterThan, FaLessThan, FaTrash } from "react-icons/fa";

const LookupsOptions = ({ class_name }) => {
  const { user } = useAuthContext();
  console.log(class_name);

  const [lookupsData, setLookupsData] = useState([]);
  console.log(lookupsData);

  useEffect(() => {
    get_LookupsData(class_name)
  }, []);

  const get_LookupsData = async (class_name) => {
    try {
      const response = await fetch(`${baseUrl}/api/lookups/getClassName`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ class_name: class_name }),
      });
      if (response.ok) {
        const json = await response.json();
        if (json.status == 'Success') {
          setLookupsData(json);
          console.log(json);
        }
      }
    } catch (error) {

    }
  }

  return (
    <>
      {
        Array.isArray(lookupsData.lookups_data) && lookupsData.lookups_data.length > 0 ?
          lookupsData.lookups_data.map((data) => (
            <option>{data.lookups_name}</option>
          ))
          : <></>
      }
    </>

  );
};


function htmlDecode(input) {
  var e = document.createElement("div");
  e.innerHTML = input;
  return e.childNodes[0].nodeValue;
}

//start of component function
function GuidedSellingR({ survey_id, section_key, sectionId }, props) {

  const { user } = useAuthContext();
  const data_state = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlParams = new URLSearchParams(window.location.search);
  const gsAnswer = urlParams.get('guidedAnswerPermission');
  console.log(gsAnswer);
  const surveyName = urlParams.get('surveyName');
  console.log(surveyName);

  var survey_key = data_state.state ? data_state.state.template : "";

  if (!survey_key) {
    survey_key = searchParams.get("template");
  }
  const [sKey, setSKey] = useState("");
  useEffect(() => {
    setSKey(survey_key);
  }, [survey_key]);

  // const { survey_section_key } = data_state.state ? data_state.state : "";
  // console.log(survey_section_key);

  var { template } = data_state.state ? data_state.state : "";
  if (!template) {
    template = searchParams.get("template");
  }
  console.log(data_state.state);
  console.log(template);
  var acc_opp_id = data_state.state ? data_state.state.acc_opp_id : "";
  console.log(acc_opp_id);
  if (!acc_opp_id) {
    acc_opp_id = JSON.parse(searchParams.get("acc_opp_id"));
  }

  // var quotes = data_state.state ? data_state.state.quotes : "";
  // if (!quotes) {
  //   quotes = JSON.parse(searchParams.get("quotes"));
  // }
  console.log(quotes);
  var quote_id = quotes ? quotes._id : "";
  console.log(acc_opp_id);
  var quotes = data_state.state ? data_state.state.quotes : "";
  if (!quotes) {
    quotes = JSON.parse(searchParams.get("quotes"));
  }
  var quote_id = quotes ? quotes._id : "";


  if (quotes && typeof quotes === 'object') {
    console.log(quotes.quotes_name);
  } else {
    console.log('No quotes data or invalid format');
  }
  console.log(acc_opp_id);


  console.log("£$%^£$%^&");
  const { accountIDs, opp_ids, Quote_id, TEMPLATE_TYPE, QUOTE_NAME } = data_state.state || {};

  // Now you can use accountIDs, opp_ids, and Quote_ids in your component
  console.log('accountIDs', accountIDs);
  console.log('opp_ids', opp_ids);
  console.log('Quote_ids', Quote_id);
  console.log('Quote_ids', TEMPLATE_TYPE);
  console.log('Quote_ids', QUOTE_NAME);

  // const [isOpenGuided, setIsOpenGuided] = useState(false);
  const [guidedSellingSideBar, setGuidedSellingSideBar] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState("77%");
  const [configDisplay, setConfigDisplay] = useState(true);
  const [guidedSellingSub1, setGuidedSellingSub1] = useState(true);
  const [applyDisplay, setApplyDisplay] = useState(true);
  const [pencilDisplay, setPencilDisplay] = useState(false);
  const [guidedSellingText, setGuidedSellingText] = useState("GUIDED SELLING");
  const [isArrowsLeftRight, setFaArrowsLeftRight] = useState(true);
  const [isdownrighticon, setFaDownLeftAndUpRightToCenter] = useState(false);
  const [isLeftSideGuidedSelling, setLeftSideGuidedSelling] = useState(true);
  const [isAddSectionVisible, setAddSectionVisible] = useState(false);

  const [guided_saved_data, setGuided_saved_data] = useState([]);
  console.log(guided_saved_data);

  // const [account_id, setAccountId] = useState("");

  const [opportunityId, setOpportunityId] = useState("");

  const [quoteId, setQuoteId] = useState("");

  const [templateType, setTemplateType] = useState("");

  const [surveySectionsData, setSurveySectionsData] = useState([]);
  const [sectionsKey, setSectionsKey] = useState([]);
  console.log(sectionsKey);
  console.log(surveySectionsData);

  const [surveyQuestionsData, setSurveyQuestionsData] = useState([]);
  console.log(surveyQuestionsData);
  const [questionsKey, setQuestionsKey] = useState([]);
  console.log(questionsKey);

  const [surveyRulesData, setSurveyRulesData] = useState([]);
  const [surveyActionsData, setSurveyActionsData] = useState([]);

  const [surveyAnswerData, setSurveyAnswerData] = useState([]);

  const [surveyQuoteData, setSurveyQuoteData] = useState([]);

  const [questionValue, setQuestionValue] = useState("");

  const [accountOpen, setAccountOpen] = useState(false);
  const [, setSelectedOptionsContentdoctype] = useState([]);
  const handleOpenSideBar = () => {
    setAccountOpen(!accountOpen);
  };
  const handleguidedSellingSideBarClick = () => {
    if (sidebarWidth === "0%") {
      setSidebarWidth("77%");
      setConfigDisplay(true);
      setApplyDisplay(true);
      setGuidedSellingSub1(true);
    } else {
      setSidebarWidth("0%");
      setConfigDisplay(false);
      setApplyDisplay(false);
      setGuidedSellingSub1(false);
      // setFaArrowsLeftRight(false);
    }
  };
  const handleGuidedSellingFullWidth = () => {
    setSidebarWidth("100%");
    setPencilDisplay(true);
    setGuidedSellingText("DEFINE RULES");
    setConfigDisplay(false);
    setApplyDisplay(false);
    setLeftSideGuidedSelling(false);
    setAddSectionVisible(true);
  };

  const handleArrowsLeftRightClick = () => {
    setSidebarWidth("77%");
    setConfigDisplay(true);
    setApplyDisplay(true);
    setLeftSideGuidedSelling(true);
    setPencilDisplay(false);
    setGuidedSellingText("GUIDED SELLING");
    setAddSectionVisible(false);
  };
  const handleExpandArrow = () => {
    if (sidebarWidth === "77%") {
      setSidebarWidth("40%");
      setFaDownLeftAndUpRightToCenter(true);
      setFaArrowsLeftRight(false);
    } else if (sidebarWidth === "100%") {
      setFaArrowsLeftRight(false);
      setFaDownLeftAndUpRightToCenter(true);
    }
  };
  const handleExpandArrowResize = () => {
    if (sidebarWidth === "40%") {
      setSidebarWidth("77%");
      setFaArrowsLeftRight(true);
      setFaDownLeftAndUpRightToCenter(false);
    } else if (sidebarWidth === "100%") {
      setFaArrowsLeftRight(true);
      setFaDownLeftAndUpRightToCenter(false);
    } else if (sidebarWidth === "77%") {
      setSidebarWidth("40%");
      setFaDownLeftAndUpRightToCenter(true);
      setFaArrowsLeftRight(false);
    }
  };
  const [iconClassGuided, setIconClassGuided] = useState("fa-angle-down");
  const [isGuidedSellingVisible, setGuidedSellingVisible] = useState(true);
  const [guidedSellingListingVisible, setGuidedSellingListingVisible] =
    useState(false);
  const [guidedSellingGridVisible, setGuidedSellingGridVisible] =
    useState(true);
  const [penbackgroundcolor, setPenbackgroundcolor] = useState("#216c98");
  const [penColor, setPenColor] = useState("white");
  const [scrollbackgroundcolor, setScrollbackgroundcolor] = useState(false);
  const [scrollColor, setScrollColor] = useState("black");
  const [surveyGridbackgroundcolor, setSurveyGridbackgroundcolor] =
    useState(false);
  const [surveyGridColor, setSurveyGridColor] = useState("black");

  const [guided_survery_id, setGuided_survery_id] = useState("");
  // const [activeIcon, setActiveIcon] = useState(null);
  const toggleGuideSelling = () => {
    setGuidedSellingVisible(!isGuidedSellingVisible);
    setIconClassGuided(
      isGuidedSellingVisible ? "fa-angle-down" : "fa-angle-up"
    );
  };

  const [clicked, setClicked] = useState(0);

  console.log("==================================================");
  console.log("TEST_ID :" + survey_id);

  useEffect(() => {
    if (user) {
      // questions
      getSurveyQuestions();
      // Call the fetchData function when you need to fetch the data
      getGuidedAnswers();
      // sections
      getSurveySections();

      //rules
      getSurveyRules();
      //guidedSurveySubmit
      // guidedSurveySubmit();
      getSurveyNames();

    }
  }, [user]);

  // getSurveySections api function

  const getSurveySections = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/survey/getSurveySections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ survey_key: survey_key }),
      });
      if (response.ok) {
        const survey = await response.json();
        if (survey.status == "Success") {
          setSurveySectionsData(survey.data);
          const allsectionID = survey.data.map(item => item._id);
          setSectionsKey(allsectionID);

        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  // getSurveyQuestions api function
  const getSurveyQuestions = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/api/survey/getSurveyQuestionsguidedSelling`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ survey_key: survey_key }),
        }
      );
      if (response.ok) {
        const survey = await response.json();
        if (survey.status == "Success") {
          setSurveyQuestionsData(survey.data);
          console.log(survey.data);
          const allQuestionId = survey.data.map(item => item._id);
          console.log(allQuestionId);
          setQuestionsKey(allQuestionId);

        }
      }
    } catch (error) {
      // console.log(error);
    }
  };


  // get SurveyRules
  const getSurveyRules = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/survey/getSurveyGuidedSellingRules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ survey_key: survey_key }),
      });
      if (response.ok) {
        const survey = await response.json();
        if (survey.status == "Success") {
          setSurveyRulesData(survey.data);
          getSurveyActions(survey.data);
        }
      }
    } catch (error) { }
  };

  const [load_data, setLoad_data] = useState(0);
  const [surveySectionKey, setSurveySectionKey] = useState("");
  const [surveyRuleKey, setSurveyRuleKey] = useState("");
  console.log("MNMMNMNM", surveySectionKey);
  // getSurveyActions api function
  const getSurveyActions = async (rules_items) => {
    try {
      const response = await fetch(`${baseUrl}/api/survey/getSurveyGuidedSellingActions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ survey_key: survey_key }),
      });
      if (response.ok) {
        const survey = await response.json();
        if (survey.status == "Success") {
          setSurveyActionsData(survey.data);
          const surveysectionsKey = survey.data.map(item => item.survey_section_key);
          const Survey_SectionKey = surveysectionsKey.find(key => key !== "");
          setSurveySectionKey(Survey_SectionKey || "");
          const survey_RuleKey = survey.data.map(item => item.survey_rules_key);
          const Rule_Key = survey_RuleKey.find(key => key !== "");
          setSurveyRuleKey(Rule_Key || "");
          setTimeout(() => {
            if (rules_items) {
              rules_items.forEach((rules, j) => {
                if (rules.rule_condition_name == "ALWAYS") {
                  if (survey.data) {
                    console.log(survey.data);
                    survey.data.forEach((actions, k) => {
                      if (actions.survey_rules_key === rules._id) {

                        if (actions.survey_actions_sections) {
                          var actions_sec_val = actions.survey_actions_sections
                            .replaceAll(".", "")
                            .replaceAll(" ", "")
                            .replaceAll(/[^a-zA-Z0-9]/g, "");
                          console.log(actions_sec_val);
                          if (document.querySelector(".a" + actions_sec_val)) {
                            if (actions.survey_action_name === "SHOW SECTION") {
                              document.querySelector(".a" + actions_sec_val).style.display =
                                "grid";
                            }
                            if (actions.survey_action_name === "HIDE SECTION") {
                              console.log(actions_sec_val);

                              document.querySelector(".a" + actions_sec_val).style.display =
                                "none";
                            }
                            if (actions.survey_action_name === "SHOW QUESTION") {
                              console.log(actions_sec_val);
                              document.querySelector(".a" + actions_sec_val).style.display =
                                "grid";
                            }
                            if (actions.survey_action_name === "HIDE QUESTION") {
                              console.log("HIDE QUES");
                              document.querySelector(".a" + actions_sec_val).style.display =
                                "none";
                            }
                          }
                        }
                      }
                    });
                  }
                }

                if (rules.rule_condition_name == "WHEN") {
                  if (survey.data) {
                    console.log(surveyActionsData);
                    survey.data.forEach((actions, k) => {
                      console.log("=====djjdjebdjdebdedhebj====");

                      if (actions.survey_rules_key == rules._id) {
                        console.log("=====djjdjebdjdebdedhebj====");

                        if (actions.survey_actions_sections) {
                          var actions_sec_val = actions.survey_actions_sections.replaceAll(".", "").replaceAll(" ", "").replaceAll(/[^a-zA-Z0-9]/g, "");
                          console.log("djjdjebdjdebdedhebj");

                          console.log(actions_sec_val);
                          console.log(actions.survey_action_name);
                          console.log(".a" + actions_sec_val)
                          setTimeout(() => {

                            if (document.querySelector(".a" + actions_sec_val)) {
                              if (actions.survey_action_name == "SHOW SECTION") {
                                document.querySelector(".a" + actions_sec_val).style.display =
                                  "none";
                              }
                              if (actions.survey_action_name == "HIDE SECTION") {
                                console.log(actions_sec_val);

                                document.querySelector(".a" + actions_sec_val).style.display =
                                  "grid";
                              }
                              if (actions.survey_action_name == "SHOW QUESTION") {
                                console.log("====s=ss=s=======")
                                console.log(actions_sec_val);
                                document.querySelector(".a" + actions_sec_val).style.display =
                                  "none";
                              }
                              if (actions.survey_action_name == "HIDE QUESTION") {
                                console.log("HIDE QUES");
                                document.querySelector(".a" + actions_sec_val).style.display =
                                  "flex";
                              }
                            }
                          }, 1000);
                        }
                      }
                    });
                  }
                }
              })
            }
          }, 1000)
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  // guidedSurveySubmit================================>

  const guidedSurveySubmit = async () => {
    try {
      // Extract only the survey_section_title from surveySectionsData
      let dataToSend = JSON.stringify(
        surveySectionsData.map((item) => ({
          section_title: item.survey_section_title,
          section_num: item.survey_section_number,
          section_key: item._id,
          question_data: surveyQuestionsData.map((ques_item) => ({
            question_key: ques_item._id,
            question_num: ques_item.survey_questions_num,
            question_name: ques_item.survey_questions_name,
            question_toggle: ques_item.survey_questions_toggle
              ? ques_item.survey_questions_toggle
              : "",
            question_val: document.querySelector(
              ".a" +
              ques_item.survey_questions_num.replaceAll(".", "") +
              "" +
              ques_item.survey_questions_name
                .replaceAll(" ", "")
                .replaceAll(".", "")
                .replaceAll(".", "")
                .replaceAll(/[^a-zA-Z0-9]/g, "")
            )
              ? document
                .querySelector(
                  ".a" +
                  ques_item.survey_questions_num.replaceAll(".", "") +
                  "" +
                  ques_item.survey_questions_name
                    .replaceAll(" ", "")
                    .replaceAll(".", "")
                    .replaceAll(".", "")
                    .replaceAll(/[^a-zA-Z0-9]/g, "")
                )
                .querySelector('input[type="text"]')
                ? document
                  .querySelector(
                    ".a" +
                    ques_item.survey_questions_num.replaceAll(".", "") +
                    "" +
                    ques_item.survey_questions_name
                      .replaceAll(" ", "")
                      .replaceAll(".", "")
                      .replaceAll(".", "")
                      .replaceAll(/[^a-zA-Z0-9]/g, "")
                  )
                  .querySelector('input[type="text"]').value
                : document
                  .querySelector(
                    ".a" +
                    ques_item.survey_questions_num.replaceAll(".", "") +
                    "" +
                    ques_item.survey_questions_name
                      .replaceAll(" ", "")
                      .replaceAll(".", "")
                      .replaceAll(".", "")
                      .replaceAll(/[^a-zA-Z0-9]/g, "")
                  )
                  .querySelector("select")
                  ? document
                    .querySelector(
                      ".a" +
                      ques_item.survey_questions_num.replaceAll(".", "") +
                      "" +
                      ques_item.survey_questions_name
                        .replaceAll(" ", "")
                        .replaceAll(".", "")
                        .replaceAll(".", "")
                        .replaceAll(/[^a-zA-Z0-9]/g, "")
                    )
                    .querySelector("select").value
                  : document
                    .querySelector(
                      ".a" +
                      ques_item.survey_questions_num.replaceAll(".", "") +
                      "" +
                      ques_item.survey_questions_name
                        .replaceAll(" ", "")
                        .replaceAll(".", "")
                        .replaceAll(".", "")
                        .replaceAll(/[^a-zA-Z0-9]/g, "")
                    )
                    .querySelector("textarea")
                    ? document
                      .querySelector(
                        ".a" +
                        ques_item.survey_questions_num.replaceAll(".", "") +
                        "" +
                        ques_item.survey_questions_name
                          .replaceAll(" ", "")
                          .replaceAll(".", "")
                          .replaceAll(".", "")
                          .replaceAll(/[^a-zA-Z0-9]/g, "")
                      )
                      .querySelector("textarea").value
                    : document
                      .querySelector(
                        ".a" +
                        ques_item.survey_questions_num.replaceAll(".", "") +
                        "" +
                        ques_item.survey_questions_name
                          .replaceAll(" ", "")
                          .replaceAll(".", "")
                          .replaceAll(".", "")
                          .replaceAll(/[^a-zA-Z0-9]/g, "")
                      )
                      .querySelector('input[type="checkbox"]')
                      ? document
                        .querySelector(
                          ".a" +
                          ques_item.survey_questions_num.replaceAll(".", "") +
                          "" +
                          ques_item.survey_questions_name
                            .replaceAll(" ", "")
                            .replaceAll(".", "")
                            .replaceAll(".", "")
                            .replaceAll(/[^a-zA-Z0-9]/g, "")
                        )
                        .querySelector('input[type="checkbox"]').value
                      : document
                        .querySelector(
                          ".a" +
                          ques_item.survey_questions_num.replaceAll(".", "") +
                          "" +
                          ques_item.survey_questions_name
                            .replaceAll(" ", "")
                            .replaceAll(".", "")
                            .replaceAll(".", "")
                            .replaceAll(/[^a-zA-Z0-9]/g, "")
                        )
                        .querySelector('input[type="date"]')
                        ? document
                          .querySelector(
                            ".a" +
                            ques_item.survey_questions_num.replaceAll(".", "") +
                            "" +
                            ques_item.survey_questions_name
                              .replaceAll(" ", "")
                              .replaceAll(".", "")
                              .replaceAll(".", "")
                              .replaceAll(/[^a-zA-Z0-9]/g, "")
                          )
                          .querySelector('input[type="date"]').value
                        : document
                          .querySelector(
                            ".a" +
                            ques_item.survey_questions_num.replaceAll(".", "") +
                            "" +
                            ques_item.survey_questions_name
                              .replaceAll(" ", "")
                              .replaceAll(".", "")
                              .replaceAll(/[^a-zA-Z0-9]/g, "")
                          )
                          .querySelector('input[type="number"]')
                          ? document
                            .querySelector(
                              ".a" +
                              ques_item.survey_questions_num.replaceAll(".", "") +
                              "" +
                              ques_item.survey_questions_name
                                .replaceAll(" ", "")
                                .replaceAll(".", "")
                                .replaceAll(/[^a-zA-Z0-9]/g, "")
                            )
                            .querySelector('input[type="number"]').value
                          : ""
              : "",
          })),
        }))
      );
      console.log("====[=-==-=-==-==]");

      console.log(dataToSend);

      const response = await fetch(
        `${baseUrl}/api/survey/addGuidedSellingQuestions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            survey_key: survey_key,
            template_type: template,
            account_id: acc_opp_id.acc_key
              ? acc_opp_id.acc_key
              : acc_opp_id.account_Id,
            opportunity_id: acc_opp_id.opp_id
              ? acc_opp_id.opp_id
              : acc_opp_id._id,
            quote_id: quote_id,
            data: dataToSend.toString(),
            guided_survery_id: guided_survery_id
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to submit guided survey. Status: ${response.status}`
        );
      }

      const survey = await response.json();

      if (survey.status === "Success") {
        if (survey._id) {
          setGuided_survery_id(survey._id);
        }

        alert("Guided survey submitted successfully.");
      } else {
        throw new Error(
          `Failed to submit guided survey. Server response: ${JSON.stringify(
            survey
          )}`
        );
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the guided survey.");
    }
  };

  // getGuidedAnswers =========================================>

  const getGuidedAnswers = async () => {
    try {
      // Assuming you have the necessary information (survey_id, account_id, opportunity_id) for the request
      const requestBody = {
        survey_key: survey_key,
        account_id: acc_opp_id.acc_key ? acc_opp_id.acc_key : acc_opp_id.account_Id,
        opportunity_id: acc_opp_id.opp_id ? acc_opp_id.opp_id : acc_opp_id._id,
        quote_id: quote_id,
      };

      const response = await fetch(
        `${baseUrl}/api/survey/getGuidedSellingQuestionAnswers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include any other headers if needed
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Data sjsshh:", data);
        setGuided_survery_id(data.data._id);
        if (data.data) {
          setGuided_saved_data(JSON.parse(data.data.data));

        }
        // Now you can use the 'data' in your application as needed
      } else if (response.status === 204) {
        console.log("No data found");
      } else {
        console.error(
          "Failed to fetch data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  const [surveyTittle, setSurveyTittle] = useState("");
  console.log(surveyTittle);
  // const [surveyKey, setSurveyKey] = useState("");


  const getSurveyNames = async () => {
    try {
      console.log(survey_key);
      const response = await fetch(`${baseUrl}/api/survey/getSurveyNames`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          // user_id: user._id,
          survey_key: survey_key,
        }),

      });

      if (response.ok) {
        const survey = await response.json();
        console.log(survey);

        if (survey.status === "Success") {
          setSurveyTittle(survey.data[0].title);
          console.log(surveyTittle);
        } else {
          console.log("Survey Not Found");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verifyAction = async (rules) => {
    console.log("--------nsjsnjnjw-----------")

    console.log(rules)
    if (rules.rule_condition_name == "WHEN") {

      surveyActionsData.forEach((actions, k) => {
        if (actions.survey_rules_key == rules._id) {
          console.log(actions)
          var actions_sec_val = actions.survey_actions_sections
            .replaceAll(".", "")
            .replaceAll(" ", "");
          if (document.querySelector(".a" + actions_sec_val)) {

            if (actions.survey_action_name == "SHOW SECTION") {
              document.querySelector(".a" + actions_sec_val).style.display = "grid";
            }
            if (actions.survey_action_name == "HIDE SECTION") {
              console.log(actions_sec_val);

              document.querySelector(".a" + actions_sec_val).style.display = "none";
            }
            if (actions.survey_action_name == "SHOW QUESTION") {
              console.log(actions_sec_val);
              document.querySelector(".a" + actions_sec_val).style.display = "flex";
            }
            if (actions.survey_action_name == "HIDE QUESTION") {
              document.querySelector(".a" + actions_sec_val).style.display = "none";
            }
            if (actions.survey_action_name == "TEMPLATE MERGE") {
              document.querySelector(".a" + actions_sec_val).style.display = "none";
            }
            if (actions.survey_action_name == "PROCESS CALC RANGE(PCR)") {
              document.querySelector(".a" + actions_sec_val).style.display = "none";
            }
          }
        }
      });
    }
  };

  const reverseVerifyAction = async (rules) => {
    if (rules.rule_condition_name == "WHEN") {
      surveyActionsData.forEach((actions, k) => {
        if (actions.survey_rules_key == rules._id) {

          var actions_sec_val = actions.survey_actions_sections
            .replaceAll(".", "")
            .replaceAll(" ", "");
          if (document.querySelector(".a" + actions_sec_val)) {

            if (actions.survey_action_name == "SHOW SECTION") {
              document.querySelector(".a" + actions_sec_val).style.display = "none";
            }
            if (actions.survey_action_name == "HIDE SECTION") {
              console.log(actions_sec_val);

              document.querySelector(".a" + actions_sec_val).style.display = "grid";
            }
            if (actions.survey_action_name == "SHOW QUESTION") {
              console.log(actions_sec_val);
              document.querySelector(".a" + actions_sec_val).style.display = "none";
            }
            if (actions.survey_action_name == "HIDE QUESTION") {
              document.querySelector(".a" + actions_sec_val).style.display = "flex";
            }
          }
        }
      });
    }
  };

  const questionSubmit = async (event, questions_val) => {
    var sectionParentEle = event.target.parentNode.parentNode.parentNode;
    // console.log(sectionParentEle);
    var questionParentEle = event.target.parentNode.parentNode;
    // console.log(questionParentEle);

    console.log("===-=-=-=-==-njdnw-==-=-=-=-")
    console.log(questions_val)
    console.log(event.target.value)
    if (event.target.value) {
      if (surveyRulesData) {
        console.log("===1=====")
        console.log(surveyRulesData)
        surveyRulesData.forEach((rules, j) => {
          if (rules.question_or_value) {
            console.log("===2=====")

            var rules_ques_val = rules.question_or_value.replaceAll(".", "").replaceAll(" ", "");
            console.log("===-=-=-=-==-njdnw-==-=-=-=-")

            console.log(questions_val)
            console.log(rules_ques_val)
            if (questions_val == rules_ques_val) {
              console.log(event.target.value)
              console.log(rules.date)

              console.log(rules.rule_operator)
              if (htmlDecode(rules.rule_operator) == "EQUAL") {
                console.log(rules);
                Object.keys(rules).filter((data) => { return data != "_id" && data != "user_id" && data != "survey_key" && data != "survey_section_key" && data != "rule_number" && data != "rule_name" && data != "createdAt" && data != "modifiedAt" && data != "__v" && data != "question_or_value" && data != "rule_condition_name" && data != "rule_operator" && data != "rule_value" }).forEach((data, i) => {

                  console.log(rules[data])
                  // .filter(())
                  if (rules[data]) {
                    var rule_val = "";
                    if (rules.numbers || rules.whole_numbers || rules.numeric_num) {
                      rule_val = parseInt(rules[data])
                    }
                    else {
                      rule_val = rules[data];
                    }
                    var eve_val = event.target.value;
                    if (rules.toggle) {
                      eve_val = event.target.checked ? "1" : "0";
                    }
                    if (rules.numbers || rules.whole_numbers || rules.numeric_num) {
                      eve_val = parseInt(event.target.value);
                    }
                    if (rule_val && rule_val != NaN && rule_val != "NaN") {
                      if (eve_val == rule_val) {
                        console.log("=======" + i + "=======")

                        console.log(rules[data])
                        if (surveyActionsData) {
                          verifyAction(rules);
                        }
                      } else {
                        if (surveyActionsData) {
                          reverseVerifyAction(rules);
                        }
                      }
                    }
                  }

                })

                // // countries
                // if (event.target.value === rules.countries) {
                //   if (surveyActionsData) {
                //     verifyAction(rules);
                //   }
                // }
                // // end countries
                // // yes/no
                // if (event.target.value === rules.yes_no) {
                //   if (surveyActionsData) {
                //     verifyAction(rules);
                //   }
                // }
                // // end yes/no
                // // Months
                // if (event.target.value === rules.months) {
                //   if (surveyActionsData) {
                //     verifyAction(rules);
                //   }
                // }
                // // end Months

                // // hi_norm_lo
                // if (event.target.value === rules.hi_norm_lo) {
                //   if (surveyActionsData) {
                //     verifyAction(rules);
                //   }
                // }
                // // end hi_norm_lo

                // // HI/MED/LO/NOT_SURE
                // if (event.target.value === rules.hi_lo_med) {
                //   if (surveyActionsData) {
                //     verifyAction(rules);
                //   }
                // }
                // // end HI/MED/LO/NOT_SURE

                // // numericValue(1-10)")
                // if (event.target.value === rules.numeric_num) {
                //   if (surveyActionsData) {
                //     verifyAction(rules);
                //   }
                // }
                // // numericValue(1-10)")

                // // Numbers

                // if (rules.numbers) {
                //   if (parseInt(event.target.value) == rules.numbers) {
                //     if (surveyActionsData) {
                //       verifyAction(rules);
                //     }
                //   } else {
                //     if (surveyActionsData) {
                //       reverseVerifyAction(rules);
                //     }
                //   }
                // }


                // // end Numbers

                // //Date
                // if (rules.date) {
                //   if (event.target.value == rules.date) {
                //     console.log("trtrtrrtretr")
                //     if (surveyActionsData) {
                //       verifyAction(rules);
                //     }
                //   } else {
                //     if (surveyActionsData) {
                //       reverseVerifyAction(rules);
                //     }
                //   }
                // }
                // //End Date

                // //yes_no_not
                // if (rules.yes_no_not) {
                //   if (event.target.value == rules.yes_no_not) {
                //     if (surveyActionsData) {
                //       verifyAction(rules);
                //     }
                //   } else {
                //     if (surveyActionsData) {
                //       reverseVerifyAction(rules);
                //     }
                //   }
                // }
                // //End yes_no_not
              }
              // END EQual
              if (htmlDecode(rules.rule_operator) == "<") {
                Object.keys(rules).filter((data) => { return data != "_id" && data != "user_id" && data != "survey_key" && data != "survey_section_key" && data != "rule_number" && data != "rule_name" && data != "createdAt" && data != "modifiedAt" && data != "__v" && data != "question_or_value" && data != "rule_condition_name" && data != "rule_operator" && data != "rule_value" }).forEach((data, i) => {

                  if (rules[data]) {

                    var rule_val = "";
                    if (rules.numbers || rules.whole_numbers || rules.numeric_num) {
                      rule_val = parseInt(rules[data])
                    }
                    else {
                      rule_val = rules[data];
                    }
                    var eve_val = event.target.value;
                    if (rules.toggle) {
                      eve_val = event.target.checked ? "1" : "0";
                    }
                    if (rules.numbers || rules.whole_numbers || rules.numeric_num) {
                      eve_val = parseInt(event.target.value);
                    }
                    if (rule_val && rule_val != NaN && rule_val != "NaN") {

                      if (eve_val < rule_val) {
                        if (surveyActionsData) {
                          console.log("tryruru")
                          verifyAction(rules);
                        }
                      } else {
                        if (surveyActionsData) {
                          reverseVerifyAction(rules);
                        }
                      }
                    }
                  }
                });
              }
              if (htmlDecode(rules.rule_operator) == "<=") {
                Object.keys(rules).filter((data) => { return data != "_id" && data != "user_id" && data != "survey_key" && data != "survey_section_key" && data != "rule_number" && data != "rule_name" && data != "createdAt" && data != "modifiedAt" && data != "__v" && data != "question_or_value" && data != "rule_condition_name" && data != "rule_operator" && data != "rule_value" }).forEach((data, i) => {
                  if (rules[data]) {
                    var rule_val = "";
                    if (rules.numbers || rules.whole_numbers || rules.numeric_num) {
                      rule_val = parseInt(rules[data])
                    }
                    else {
                      rule_val = rules[data];
                    }
                    var eve_val = event.target.value;
                    if (rules.toggle) {
                      eve_val = event.target.checked ? "1" : "0";
                    }
                    if (rules.numbers || rules.whole_numbers || rules.numeric_num) {
                      eve_val = parseInt(event.target.value);
                    }
                    if (rule_val && rule_val != NaN && rule_val != "NaN") {
                      if (eve_val <= rule_val) {
                        if (surveyActionsData) {
                          verifyAction(rules);
                        }
                      } else {
                        if (surveyActionsData) {
                          reverseVerifyAction(rules);
                        }
                      }
                    }
                  }
                });
              }
              if (htmlDecode(rules.rule_operator) == ">") {
                Object.keys(rules).filter((data) => { return data != "_id" && data != "user_id" && data != "survey_key" && data != "survey_section_key" && data != "rule_number" && data != "rule_name" && data != "createdAt" && data != "modifiedAt" && data != "__v" && data != "question_or_value" && data != "rule_condition_name" && data != "rule_operator" && data != "rule_value" }).forEach((data, i) => {
                  if (rules[data]) {
                    var rule_val = "";
                    if (rules.numbers || rules.whole_numbers || rules.numeric_num) {
                      rule_val = parseInt(rules.numbers)
                    }
                    else {
                      rule_val = rules[data];
                    }
                    var eve_val = event.target.value;
                    if (rules.toggle) {
                      eve_val = event.target.checked ? "1" : "0";
                    }
                    if (rules.numbers || rules.whole_numbers || rules.numeric_num) {
                      eve_val = parseInt(event.target.value);
                    }
                    if (rule_val && rule_val != NaN && rule_val != "NaN") {
                      if (eve_val > rule_val) {
                        if (surveyActionsData) {
                          verifyAction(rules);
                        }
                      } else {
                        if (surveyActionsData) {
                          reverseVerifyAction(rules);
                        }
                      }
                    }
                  }
                });
              }
              if (htmlDecode(rules.rule_operator) == ">=") {
                Object.keys(rules).filter((data) => { return data != "_id" && data != "user_id" && data != "survey_key" && data != "survey_section_key" && data != "rule_number" && data != "rule_name" && data != "createdAt" && data != "modifiedAt" && data != "__v" && data != "question_or_value" && data != "rule_condition_name" && data != "rule_operator" && data != "rule_value" }).forEach((data, i) => {
                  if (rules[data]) {
                    var rule_val = "";
                    if (rules.numbers || rules.whole_numbers || rules.numeric_num) {
                      rule_val = parseInt(rules.numbers)
                    }
                    else {
                      rule_val = rules[data];
                    }
                    var eve_val = event.target.value;
                    if (rules.toggle) {
                      eve_val = event.target.checked ? "1" : "0";
                    }
                    if (rules.numbers || rules.whole_numbers || rules.numeric_num) {
                      eve_val = parseInt(event.target.value);
                    }
                    if (rule_val && rule_val != NaN && rule_val != "NaN") {
                      if (eve_val >= rule_val) {
                        if (surveyActionsData) {
                          verifyAction(rules);
                        }
                      } else {
                        if (surveyActionsData) {
                          reverseVerifyAction(rules);
                        }
                      }
                    }
                  }
                });
              }
            }
          }
        });
      }
    }

    // var section_key = sectionParentEle.querySelector(
    //   'input[name="section_key"]'
    // ).value;
    // var question_key = questionParentEle.querySelector(
    //   'input[name="question_key"]'
    // ).value;
    // var question_num = questionParentEle.querySelector(
    //   'input[name="question_num"]'
    // ).value;
    // var question_name = questionParentEle.querySelector('input[name="question_name"]').value;
    // var question_toggle = questionParentEle.querySelector('input[name="question_toggle"]').value;
    // var question_required = questionParentEle.querySelector('input[name="question_required"]');

    var survey_key = "";

    // var field_name = event.target.getAttribute("name");
    // var field_value = event.target.value;
    // if (field_name == "question_required") {
    //   if (event.target.checked) {
    //     field_value = 1;
    //     // event.target.checked = true;
    //     // surveySetup.wide = 1;
    //   } else {
    //     field_value = 0;
    //     // event.target.checked = false;

    //     // surveySetup.wide = 0;
    //   }
    // }
    // var section_data = {
    //   section_key,
    //   survey_key,
    //   question_key,
    //   question_num,
    //   field_name,
    //   field_value,
    // };
    try {
      // const response = await fetch(`${baseUrl}/api/guidedselling/addGuidedSellingQuestions`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${user.token}`,
      //   },
      //   body: JSON.stringify(section_data)
      // });
      // if (response.ok) {
      //   const survey = await response.json();
      //   if (survey.status == "Success") {
      //     // alert("SUccess");
      //     questionParentEle.querySelector('input[name="question_key"]').value = survey.question_key;
      //     // setup_key.value = survey.survey_key;
      //     // getSurvey();
      //     // setSurveySetup(survey.data);
      //   }
      // }
    } catch (error) {
      alert(error);
    }
  };

  const handlePenIconVisible = () => {
    setLeftSideGuidedSelling(true);
    setGuidedSellingSideBar(true);
    setGuidedSellingListingVisible(false);
    setGuidedSellingGridVisible(true);
    setPenbackgroundcolor("#216c98");
    setPenColor("white");
    setScrollbackgroundcolor("white");
    setScrollColor("black");
    setSurveyGridbackgroundcolor("white");
    setSurveyGridColor("black");
  };
  const handleScrollIconVisible = () => {
    setGuidedSellingListingVisible(true);
    setGuidedSellingSideBar(true);
    setLeftSideGuidedSelling(false);
    setGuidedSellingGridVisible(false);
    setPenbackgroundcolor("white");
    setPenColor("black");
    setSurveyGridbackgroundcolor("white");
    setSurveyGridColor("black");
    setScrollbackgroundcolor("#216c98");
    setScrollColor("white");
  };
  const handleCalcIconVisible = () => {
    setGuidedSellingListingVisible(false);
    setLeftSideGuidedSelling(false);
    setGuidedSellingSideBar(false);
    setGuidedSellingGridVisible(false);
    setPenbackgroundcolor("white");
    setPenColor("black");
    setScrollbackgroundcolor("white");
    setScrollColor("black");
    setSurveyGridbackgroundcolor("#216c98");
    setSurveyGridColor("white");
  };
  const [isOpenGuided, setIsOpenGuided] = useState(
    Array(surveySectionsData.length).fill(false)
  );

  const bidonclik = (index) => {
    const newIsOpenGuided = [...isOpenGuided]; // Create a copy of the state array
    newIsOpenGuided[index] = !newIsOpenGuided[index]; // Toggle the state for the specified dropdown
    setIsOpenGuided(newIsOpenGuided); // Update the state
  };

  document.body.addEventListener("click", () => {
    console.log("==========CLICKED==========");
    console.log(clicked);
    if (clicked == 0) {
      console.log(surveyActionsData);

      setClicked(1);
    }
  });

  // <=============================== Dynamic lookup starts =============================>

  // API-1 -> To get LookUp Names

  const [lookupNames, setLookupNames] = useState([]);
  const [lookupkey, setLookUpKey] = useState("");
  const className = "Stage";

  const getLookupNames = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/lookups/getClassName`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const lookups = await response.json();
        if (lookups.status === "Success") {
          setLookupNames(lookups.data);
        } else {
          console.log(
            "Response not okay:",
            response.status,
            response.statusText
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLookupNames();
  }, [user]);







  // // API-2 -> To get lookups sub-Datas
  const [stageLookUp, setStageLookUp] = useState([]);

  const getStageLookUpData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/lookups_data/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ lookups_accesskey: lookupkey }),
      });
      if (response.ok) {
        const lookups = await response.json();
        if (lookups.status === "Success") {
          const filteredData = lookups.data.filter(
            (item) => item.disable === 1
          );
          setStageLookUp(filteredData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStageLookUpData();
  }, [lookupkey]);

  let stages =
    stageLookUp && stageLookUp.length > 0
      ? stageLookUp.map((sName) => sName.lookups_name)
      : [];
  console.log(stages);
  const optionstage = [...stages];

  // <============================= Dynamic Lookup end  =====================>

  // for template merge form servey page
  const [templateNames, setTemplateNames] = useState([]);
  // getting template names
  const templatem = "TEMPLATE MERGE";
  const templatedata = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/survey/getTemp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ survey_key, templatem }),
      });
      if (response.ok) {
        const template = await response.json();
        console.log(template.data);
        setTemplateNames(template.data);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    templatedata();
  }, [user]);
  console.log(survey_key);
  console.log(templatem);
  console.log(templateNames);

  //End of Tmplate API from Survey Page

  // //Getting only template Name
  // const quoteName = (templateNames && templateNames[0]?.template) || "";
  // console.log(quoteName);

  const [doc_tempData, setDocTempData] = useState([]);
  const quote_name = templateNames.length > 0 ? templateNames.map(qnames => qnames.survey_actions_sections) : [];
  console.log(quote_name);

  const gettemplinkedDocNames = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/template/getdoc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ quote_name }),
      });
      if (response.ok) {
        const doctypeyeArray = await response.json();
        console.log(doctypeyeArray.data);

        if (doctypeyeArray.data.length > 0) {
          const allDocTempData = doctypeyeArray.data.map(item => item.doc_tempData);

          // Flatten the array and remove duplicates based on doc_name
          const uniqueDocTempData = [].concat(...allDocTempData)
            .reduce((acc, current) => {
              if (!acc.find(item => item.doc_name === current.doc_name)) {
                acc.push(current);
              }
              return acc;
            }, []);

          setDocTempData(uniqueDocTempData);
        }


      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const gettemplinkedDocNames = async () => {
  //   try {
  //     const response = await fetch(`${baseUrl}/api/template/getdoc`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //       body: JSON.stringify({quote_name }),
  //     });
  //     if (response.ok) {
  //       const doctypeyeArray = await response.json();
  //       console.log(doctypeyeArray.data);

  //       if (doctypeyeArray.data.length > 0) {
  //         const allDocTempData = doctypeyeArray.data.map(item => item.doc_tempData);
  //         const flattenedDocTempData = [].concat(...allDocTempData);
  //         setDocTempData(flattenedDocTempData);
  //       }

  //     } else {
  //       console.log("Error:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    gettemplinkedDocNames();
  }, [user, templateNames]);

  console.log(doc_tempData);

  const selectedOptionsContentdoctype = doc_tempData.map(
    (item) => item.doc_name
  );
  console.log(selectedOptionsContentdoctype);

  const updateDocTempData = (newData) => {
    setDocTempData(newData);
  };

  const [doctypePublished, setDoctypePublished] = useState([]);

  useEffect(() => {
    const getDoctypedata = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/doctype/get`, {
          method: "GET",
          headers: {
            "Doctype-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const doctype = await response.json();
          console.log(doctype, "09090900");
          // setDbDoctypeData(doctype.data);
          console.log(
            doctype.data.filter((item) => item.status === "PUBLISHED")
          );
          setDoctypePublished(
            doctype.data.filter((item) => item.status === "PUBLISHED")
          );
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDoctypedata();
  }, [user, survey_key]);

  const updateOptionsDoctype = (data) => {
    setSelectedOptionsContentdoctype(data);
  };


  // ------------------------------------
  const [currentAccount, setCurrentAccount] = useState(null);
  const [dbAccountData, setDbAccountData] = useState([]);
  const [accountId, setAccountId] = useState("");
  useEffect(() => {
    const getaccountdata = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/accounts/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const accountss = await response.json();
          setDbAccountData(accountss.data);

          // Set the current account using the first account from the fetched data
          if (accountss.data.length > 0) {
            setCurrentAccount(accountss.data); // Set the first account
            console.log(accountss.data);
            setAccountId(accountss.data);
          }
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getaccountdata();
  }, [user]);
  const currentAccountId = acc_opp_id?.acc_key || acc_opp_id?.account_Id || accountIDs; // Assuming acc_key is the ID of the current account
  console.log(currentAccountId);
  const currentAccount1 = dbAccountData.find((account) => account._id === currentAccountId);
  console.log(currentAccount1);
  const accountName = currentAccount1 ? currentAccount1.accounts : '';
  // -------------------------------
  const [rows, setOpportunityData] = useState([]);
  console.log(rows);

  useEffect(() => {
    const getOpportunityData = async () => {
      console.log(accountId);
      try {
        const response = await fetch(`${baseUrl}/api/opportunity/get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            account_Id: accountId,
          }),
        });
        if (response.ok) {
          const oppData = await response.json();
          console.log(oppData.data);
          setOpportunityData(oppData.data)
        }
      } catch (error) {
        console.log(error);
      }
    };

    getOpportunityData();
  }, [accountId]);

  const ooppId = acc_opp_id?.opp_id || acc_opp_id?._id || opp_ids;
  console.log(ooppId);
  const currentOpportunity = rows.find((opportunity) => opportunity._id === ooppId);
  const opportunityName = currentOpportunity ? currentOpportunity.opportunity_name : '';



  // displaying data in questions using formula
  // -------GET formula DATA-------
  // const [dbFormulaData, setDbFormulaData] = useState([]);
  // console.log("dbFormulaData",dbFormulaData);

  // useEffect(() => {
  //   const getFormula = async () => {
  //     try {
  //       const response = await fetch(`${baseUrl}/api/surveyFormula/get`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //         body: JSON.stringify({
  //           survey_key:survey_key,
  //           survey_section_key:sectionsKey,
  //           survey_question_key: questionsKey,
  //         }),
  //       });
  //       if (response.ok) {
  //         const formula = await response.json();
  //         console.log(formula, "09090900");
  //         // Set the entire array of formula data
  //         setDbFormulaData(formula.data);
  //       } else {
  //         console.log("Error:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getFormula();
  // }, [questionsKey]);
  // console.log("dbFormulaData",dbFormulaData);

  // Assuming formula_add_formula is a property in dbFormulaData array
  const isAccountNameFormulaArray = surveyQuestionsData.map(item => item.formula_add_formula === "FIELD('Account','display')");
  const isOpportunityNameFormulaArray = surveyQuestionsData.map(item => item.formula_add_formula === "FIELD('Opportunity','display')");



  // --------------------------------
  const [netPrice, setNetPrice] = useState(0);
  const [listPrice, setListPrice] = useState(0);
  const [cost, setCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [margin, setMargin] = useState(0);
  const updateNetPrice = (newNetPrice) => {
    setNetPrice(newNetPrice);
  };
  const updateListPrice = (newListPrice) => {
    setListPrice(newListPrice);
  };
  const updateCost = (newCost) => {
    setCost(newCost);
  };
  const updateDiscount = (newDiscount) => {
    setDiscount(newDiscount);
  };
  const updateMargin = (newMargin) => {
    setMargin(newMargin);
  };
  return (
    <div>
      <Navbar />
      <Sidebar />
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
              to="/account"
              className="breadcrumbs--link_mid"
            >
              {accountName}
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link
              to={"/opportunitiesdata"}
              className="breadcrumbs--link_mid"
            >
              {opportunityName}
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link
              className="breadcrumbs--link--active"
            >
              {quotes.quotes_name}
            </Link>
          </li>
          <ol
            style={{ float: "right", listStyle: "none" }}
            className="pen_scroll_grid_icons"
          >
            <FontAwesomeIcon
              icon={faPen}
              className="guided_selling_icons"
              style={{
                backgroundColor: penbackgroundcolor,
                color: penColor,
                fontSize: "15px",
                marginRight: "10px",
                padding: "3px",
                // color: "white",
                // backgroundColor: "#216c98",
              }}
              onClick={handlePenIconVisible}
            />


            <FontAwesomeIcon
              icon={faScroll}
              className="guided_selling_icons"
              style={{
                backgroundColor: scrollbackgroundcolor,
                color: scrollColor,
                fontSize: "15px",
                marginRight: "10px",
                padding: "3px",
              }}
              onClick={handleScrollIconVisible}
            />


            <FontAwesomeIcon
              icon={faTable}
              className="guided_selling_icons"
              style={{
                backgroundColor: surveyGridbackgroundcolor,
                color: surveyGridColor,
                fontSize: "15px",
                marginRight: "10px",
                padding: "3px",
              }}
              onClick={handleCalcIconVisible}
            />

          </ol>
        </ul>
        <hr className="hr" />
      </div>
      <HelpRequest />

      {/* guided selling start customer details */}
      {/* <div className="rightguidedselling"> */}
      <div className="gridcontainerguide">
        {guidedSellingSideBar && (
          <div
            className="sidebarguide"
            id="leftsideguide"
            style={{ width: sidebarWidth }}
          >
            <button
              className="btnguide"
              id="leftBtn"
            
              onClick={handleguidedSellingSideBarClick}
            >
              &gt;
            </button>
            {/* onClick={guideOpen} */}
            <div className="guidedselling">
              {isArrowsLeftRight && (
                <div>
                  <FontAwesomeIcon
                    icon={faArrowsLeftRight}
                    onClick={handleExpandArrow}
                  />
                </div>
              )}
              {isdownrighticon && (
                <div>
                  <FontAwesomeIcon
                    icon={faDownLeftAndUpRightToCenter}
                    onClick={handleExpandArrowResize}
                    id="faDownLeftAndUpRightToCenter"
                  />
                </div>
              )}

              <h4 className="guidedselleingname">{guidedSellingText}</h4>
            </div>
            <div className="mainuideselling">
              {guidedSellingSub1 && (
                <div className="guided_selling_sub1">
                  <h4> {surveyTittle}</h4>
                  <label className="configlabel">CPQ</label>
                </div>
              )}

              <div>
                {configDisplay && (
                  <div className="config_div">
                    <div
                      className="guided_selling_sub2"
                      onClick={handleGuidedSellingFullWidth}
                    >
                      <FontAwesomeIcon icon={faCog} id="settingicon" />
                      <label className="configlabel">CONFIG</label>
                    </div>
                  </div>
                )}

                {pencilDisplay && (
                  <div className="calc_pencil_icon">
                    <div
                      className="pencil"
                      // style={{ display: pencilDisplay }}
                      onClick={handleArrowsLeftRightClick}
                    >
                      <FontAwesomeIcon icon={faPencil} id="pencil" />
                      <label
                        htmlFor="pencil"
                        id="answer"
                        style={{ fontSize: "10px" }}
                      >
                        ANSWER
                      </label>
                    </div>
                    <div className="configTable">
                      <FontAwesomeIcon icon={faTable} id="configTable" />
                      {/* style={{ display: tableDisplay }} */}
                      <label
                        htmlFor="configTable"
                        id="calc_tabel"
                        style={{ fontSize: "10px" }}
                      >
                        CALC
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="guidedsidebarcontent">
              {isAddSectionVisible && <AddSection />}

              {/* guided selling start customer details */}
              <div id="hideOnExpand">
                {surveySectionsData ? (
                  surveySectionsData.map((sections, i) => (
                    <>
                      <div
                        class={
                          "navside a" +
                          sections.survey_section_number.replaceAll(".", "") +
                          "" +
                          sections.survey_section_title.replaceAll(" ", "")
                        }
                      >
                        <input
                          type="hidden"
                          name="section_key"
                          value={sections.survey_section_key}
                        />
                        <button
                          className="dropdown-btn"
                          id={`sidetoggle4-${i}`}
                          onClick={() => bidonclik(i)}
                        >
                          <span className="spanclick">
                            <FontAwesomeIcon
                              icon={isOpenGuided[i] ? faAngleUp : faAngleDown}
                              aria-hidden="true"
                              onClick={bidonclik}
                            />
                          </span>
                          <span className="spanclick">
                            {sections.survey_section_number}.{" "}
                            {sections.survey_section_title}
                          </span>
                        </button>
                        {isOpenGuided[i] && (
                          <div className="dropdown-container">
                            {surveyQuestionsData &&
                              surveyQuestionsData.map((questions, index) => {
                                const isGuidedQuestion = guided_saved_data.some(
                                  (data) =>
                                    sections._id === data.section_key &&
                                    data.question_data.some((qd) => questions._id === qd.question_key)
                                );
                                return (
                                  (sections._id == questions.survey_section_key) && (
                                    <>
                                      {!isGuidedQuestion && (
                                        <div
                                          key={questions._id}
                                          id="textinc"
                                          className={
                                            "txt a" +
                                            questions.survey_questions_num.replaceAll(
                                              ".",
                                              ""
                                            ) +
                                            "" +
                                            questions.survey_questions_name
                                              .replaceAll(" ", "")
                                              .replaceAll(".", "")
                                              .replaceAll(/[^a-zA-Z0-9]/g, "")
                                          }
                                        >
                                          <input
                                            type="hidden"
                                            name="question_key"
                                            value={questions._id}
                                          />
                                          <input
                                            type="hidden"
                                            name="question_num"
                                            value={questions.survey_questions_num}
                                          />

                                          <button id="text-to-copyBid">
                                            {questions.survey_questions_toggle ===
                                              "USER MESSAGE"
                                              ? ""
                                              : questions.survey_questions_num}
                                          </button>
                                          <button id="guidedFieldsBid">
                                            {questions.survey_questions_toggle ===
                                              "USER MESSAGE" ? (
                                              <span
                                                style={{
                                                  color: "red",
                                                  fontWeight: "600",
                                                }}
                                              >
                                                {questions.survey_questions_name}
                                              </span>
                                            ) : (
                                              questions.survey_questions_name
                                            )}
                                          </button>

                                          {questions.survey_questions_toggle ===
                                            "TOGGLE" ? (
                                            <span className="togglein1">
                                              <input
                                                className="togglein"
                                                type="checkbox"
                                                value="1"
                                                onChange={(e) => {
                                                  questionSubmit(
                                                    e,
                                                    questions.survey_questions_num.replaceAll(
                                                      ".",
                                                      ""
                                                    ) +
                                                    "" +
                                                    questions.survey_questions_name
                                                      .replaceAll(" ", "")
                                                      .replaceAll(".", "")
                                                      .replaceAll(
                                                        /[^a-zA-Z0-9]/g,
                                                        ""
                                                      )
                                                  );
                                                }}
                                              />
                                            </span>
                                          ) : questions.survey_questions_toggle ===
                                            "COUNTRIES" ? (
                                            <select
                                              disabled={gsAnswer === 'readOnly'}
                                              className="contries"
                                              onChange={(e) => {
                                                questionSubmit(
                                                  e,
                                                  questions.survey_questions_num.replaceAll(
                                                    ".",
                                                    ""
                                                  ) +
                                                  "" +
                                                  questions.survey_questions_name
                                                    .replaceAll(" ", "")
                                                    .replaceAll(".", "")
                                                    .replaceAll(
                                                      /[^a-zA-Z0-9]/g,
                                                      ""
                                                    )
                                                );
                                              }}
                                            >
                                              <option></option>
                                              <option>India</option>
                                              <option>Canada</option>
                                              <option>Mexico</option>
                                              <option>Brazil</option>
                                              <option>Argentina</option>
                                              <option>UK</option>
                                              <option>Germany</option>
                                              <option>France</option>
                                              <option>Italy</option>
                                              <option>Switzerland</option>
                                              <option>Spain</option>
                                              <option>Austria</option>
                                              <option>Sweden</option>
                                              <option>Austria</option>
                                              <option>Denmark</option>
                                              <option>Portugal</option>
                                              <option>Saudi Arabia</option>
                                              <option>Africa</option>
                                              <option>Israel</option>
                                              <option>US</option>
                                              <option>Singapore</option>
                                              <option>Australia</option>
                                              <option>Japan</option>
                                              <option>China</option>
                                              <option>Korea</option>
                                            </select>
                                          ) : questions.survey_questions_toggle ===
                                            "TEXTAREA" ? (
                                            <textarea
                                              readOnly={gsAnswer === 'readOnly'}
                                              className="textareabox"
                                              onBlur={(e) => {
                                                questionSubmit(
                                                  e,
                                                  questions.survey_questions_num.replaceAll(
                                                    ".",
                                                    ""
                                                  ) +
                                                  "" +
                                                  questions.survey_questions_name
                                                    .replaceAll(" ", "")
                                                    .replaceAll(".", "")
                                                    .replaceAll(
                                                      /[^a-zA-Z0-9]/g,
                                                      ""
                                                    )
                                                );
                                              }}
                                            ></textarea>
                                          ) : questions.survey_questions_toggle ===
                                            "DATE" ? (
                                            <input
                                              className="dateinputs"
                                              type="date"
                                              onBlur={(e) => {
                                                questionSubmit(
                                                  e,
                                                  questions.survey_questions_num.replaceAll(
                                                    ".",
                                                    ""
                                                  ) +
                                                  "" +
                                                  questions.survey_questions_name
                                                    .replaceAll(" ", "")
                                                    .replaceAll(".", "")
                                                    .replaceAll(
                                                      /[^a-zA-Z0-9]/g,
                                                      ""
                                                    )
                                                );
                                              }}
                                            />
                                          ) : questions.survey_questions_toggle ===
                                            "MULTITEXT" ? (
                                            <textarea
                                              className="multitextareabox"
                                              onBlur={(e) => {
                                                questionSubmit(
                                                  e,
                                                  questions.survey_questions_num.replaceAll(
                                                    ".",
                                                    ""
                                                  ) +
                                                  "" +
                                                  questions.survey_questions_name
                                                    .replaceAll(" ", "")
                                                    .replaceAll(".", "")
                                                    .replaceAll(
                                                      /[^a-zA-Z0-9]/g,
                                                      ""
                                                    )
                                                );
                                              }}
                                            ></textarea>
                                          ) : questions.survey_questions_toggle ===
                                            "MONTHS" ? (
                                            <select
                                              onChange={(e) => {
                                                questionSubmit(
                                                  e,
                                                  questions.survey_questions_num.replaceAll(
                                                    ".",
                                                    ""
                                                  ) +
                                                  "" +
                                                  questions.survey_questions_name
                                                    .replaceAll(" ", "")
                                                    .replaceAll(".", "")
                                                    .replaceAll(
                                                      /[^a-zA-Z0-9]/g,
                                                      ""
                                                    )
                                                );
                                              }}
                                            >
                                              <option></option>
                                              <option>January</option>
                                              <option>February</option>
                                              <option>March</option>
                                              <option>April</option>
                                              <option>May</option>
                                              <option>June</option>
                                              <option>July</option>
                                              <option>August</option>
                                              <option>September</option>
                                              <option>October</option>
                                              <option>November</option>
                                              <option>December</option>
                                            </select>
                                          ) : questions.survey_questions_toggle ===
                                            "HI/NORM/LO" ? (
                                            <select
                                              onChange={(e) => {
                                                questionSubmit(
                                                  e,
                                                  questions.survey_questions_num.replaceAll(
                                                    ".",
                                                    ""
                                                  ) +
                                                  "" +
                                                  questions.survey_questions_name
                                                    .replaceAll(" ", "")
                                                    .replaceAll(".", "")
                                                    .replaceAll(
                                                      /[^a-zA-Z0-9]/g,
                                                      ""
                                                    )
                                                );
                                              }}
                                            >
                                              <option></option>
                                              <option>HIGH</option>
                                              <option>NORMAL</option>
                                              <option>LOW</option>
                                            </select>
                                          ) : questions.survey_questions_toggle ===
                                            "HI/LO/MED" ? (
                                            <select
                                              onChange={(e) => {
                                                questionSubmit(
                                                  e,
                                                  questions.survey_questions_num.replaceAll(
                                                    ".",
                                                    ""
                                                  ) +
                                                  "" +
                                                  questions.survey_questions_name
                                                    .replaceAll(" ", "")
                                                    .replaceAll(".", "")
                                                    .replaceAll(
                                                      /[^a-zA-Z0-9]/g,
                                                      ""
                                                    )
                                                );
                                              }}
                                            >
                                              <option></option>
                                              <option>HIGH</option>
                                              <option>LOW</option>
                                              <option>MEDIUM</option>
                                            </select>
                                          ) : questions.survey_questions_toggle ===
                                            "YES/NO" ? (
                                            <select
                                              disabled={gsAnswer === 'readOnly'}
                                              className="yesno"
                                              onChange={(e) => {
                                                questionSubmit(
                                                  e,
                                                  questions.survey_questions_num.replaceAll(
                                                    ".",
                                                    ""
                                                  ) +
                                                  "" +
                                                  questions.survey_questions_name
                                                    .replaceAll(" ", "")
                                                    .replaceAll(".", "")
                                                    .replaceAll(
                                                      /[^a-zA-Z0-9]/g,
                                                      ""
                                                    )
                                                );
                                              }}

                                            >
                                              <option></option>
                                              <option>YES</option>
                                              <option>NO</option>
                                            </select>
                                          ) : questions.survey_questions_toggle ===
                                            "NUMERIC" ? (
                                            <select
                                              disabled={gsAnswer === 'readOnly'}
                                              onChange={(e) => {
                                                questionSubmit(
                                                  e,
                                                  questions.survey_questions_num.replaceAll(
                                                    ".",
                                                    ""
                                                  ) +
                                                  "" +
                                                  questions.survey_questions_name
                                                    .replaceAll(" ", "")
                                                    .replaceAll(".", "")
                                                    .replaceAll(
                                                      /[^a-zA-Z0-9]/g,
                                                      ""
                                                    )
                                                );
                                              }}
                                            >
                                              <option></option>
                                              <option>1</option>
                                              <option>2</option>
                                              <option>3</option>
                                              <option>4</option>
                                              <option>5</option>
                                              <option>6</option>
                                              <option>7</option>
                                              <option>8</option>
                                              <option>9</option>
                                              <option>10</option>
                                            </select>
                                          ) :
                                            questions.survey_questions_toggle ===
                                              "NUMBERS" ? (
                                              <input
                                                readOnly={gsAnswer === 'readOnly'}
                                                className="nmbr"
                                                type="number"
                                                onBlur={(e) => {
                                                  questionSubmit(
                                                    e,
                                                    questions.survey_questions_num.replaceAll(
                                                      ".",
                                                      ""
                                                    ) +
                                                    "" +
                                                    questions.survey_questions_name
                                                      .replaceAll(" ", "")
                                                      .replaceAll(".", "")
                                                      .replaceAll(
                                                        /[^a-zA-Z0-9]/g,
                                                        ""
                                                      )
                                                  );
                                                }}
                                              />
                                            ) : questions.survey_questions_toggle ===
                                              "FORMULA" ? (
                                              <input
                                                readOnly
                                                className="nmb"
                                                type="text"
                                                value={
                                                  isAccountNameFormulaArray[index] ? accountName :
                                                    isOpportunityNameFormulaArray[index] ? opportunityName :
                                                      ''
                                                }
                                                onBlur={(e) => {
                                                  questionSubmit(
                                                    e,
                                                    questions.survey_questions_num.replaceAll(
                                                      ".",
                                                      ""
                                                    ) +
                                                    "" +
                                                    questions.survey_questions_name
                                                      .replaceAll(" ", "")
                                                      .replaceAll(".", "")
                                                      .replaceAll(
                                                        /[^a-zA-Z0-9]/g,
                                                        ""
                                                      )
                                                  );
                                                }}
                                              />

                                            )
                                              : questions.survey_questions_toggle ===
                                                "NUMERIC" ? (
                                                <select
                                                  onChange={(e) => {
                                                    questionSubmit(
                                                      e,
                                                      questions.survey_questions_num.replaceAll(
                                                        ".",
                                                        ""
                                                      ) +
                                                      "" +
                                                      questions.survey_questions_name
                                                        .replaceAll(" ", "")
                                                        .replaceAll(".", "")
                                                        .replaceAll(
                                                          /[^a-zA-Z0-9]/g,
                                                          ""
                                                        )
                                                    );
                                                  }}
                                                >
                                                  <option></option>
                                                  <option>1</option>
                                                  <option>2</option>
                                                  <option>3</option>
                                                  <option>4</option>
                                                  <option>5</option>
                                                  <option>6</option>
                                                  <option>7</option>
                                                  <option>8</option>
                                                  <option>9</option>
                                                  <option>10</option>
                                                </select>
                                              ) : questions.survey_questions_toggle ===
                                                "Stage" ? (
                                                <select
                                                  onChange={(e) => {
                                                    questionSubmit(
                                                      e,
                                                      questions.survey_questions_num.replaceAll(
                                                        ".",
                                                        ""
                                                      ) +
                                                      "" +
                                                      questions.survey_questions_name
                                                        .replaceAll(" ", "")
                                                        .replaceAll(".", "")
                                                        .replaceAll(
                                                          /[^a-zA-Z0-9]/g,
                                                          ""
                                                        )
                                                    );
                                                  }}
                                                >
                                                  <option></option>
                                                  <option>Go</option>
                                                  <option>Go-No_Go</option>
                                                  <option>CLose-First</option>
                                                  <option>Close-Last</option>
                                                </select>
                                              ) : questions.survey_questions_toggle ===
                                                "DD Document type" ? (
                                                <select
                                                  onChange={(e) => {
                                                    questionSubmit(
                                                      e,
                                                      questions.survey_questions_num.replaceAll(
                                                        ".",
                                                        ""
                                                      ) +
                                                      "" +
                                                      questions.survey_questions_name
                                                        .replaceAll(" ", "")
                                                        .replaceAll(".", "")
                                                        .replaceAll(
                                                          /[^a-zA-Z0-9]/g,
                                                          ""
                                                        )
                                                    );
                                                  }}
                                                >
                                                  <option></option>
                                                  <option>Draft </option>
                                                  <option>Final </option>
                                                </select>
                                              ) : questions.survey_questions_toggle ===
                                                "DD Quote type" ? (
                                                <select
                                                  onChange={(e) => {
                                                    questionSubmit(
                                                      e,
                                                      questions.survey_questions_num.replaceAll(
                                                        ".",
                                                        ""
                                                      ) +
                                                      "" +
                                                      questions.survey_questions_name
                                                        .replaceAll(" ", "")
                                                        .replaceAll(".", "")
                                                        .replaceAll(
                                                          /[^a-zA-Z0-9]/g,
                                                          ""
                                                        )
                                                    );
                                                  }}
                                                >
                                                  <option></option>
                                                  <option>Time and material</option>
                                                  <option>Fixed fee</option>
                                                </select>
                                              ) : questions.survey_questions_toggle ===
                                                "Price list currency" ? (
                                                <select
                                                  onChange={(e) => {
                                                    questionSubmit(
                                                      e,
                                                      questions.survey_questions_num.replaceAll(
                                                        ".",
                                                        ""
                                                      ) +
                                                      "" +
                                                      questions.survey_questions_name
                                                        .replaceAll(" ", "")
                                                        .replaceAll(".", "")
                                                        .replaceAll(
                                                          /[^a-zA-Z0-9]/g,
                                                          ""
                                                        )
                                                    );
                                                  }}
                                                >
                                                  <option></option>
                                                  <option>Africa</option>
                                                  <option>Argentina</option>
                                                  <option>Australia</option>
                                                  <option>Brazil</option>
                                                  <option>Canada</option>
                                                  <option>China</option>
                                                  <option>Eastern Europe</option>
                                                  <option>France</option>
                                                  <option>Germany</option>
                                                </select>
                                              ) : questions.survey_questions_toggle ===
                                                "Country of delivery" ? (
                                                <select
                                                  onChange={(e) => {
                                                    questionSubmit(
                                                      e,
                                                      questions.survey_questions_num.replaceAll(
                                                        ".",
                                                        ""
                                                      ) +
                                                      "" +
                                                      questions.survey_questions_name
                                                        .replaceAll(" ", "")
                                                        .replaceAll(".", "")
                                                        .replaceAll(
                                                          /[^a-zA-Z0-9]/g,
                                                          ""
                                                        )
                                                    );
                                                  }}
                                                >
                                                  <option></option>
                                                  <option>APAC</option>
                                                  <option>Canada</option>
                                                  <option>EMEA North</option>
                                                  <option>EMEA South</option>
                                                  <option>LATAM</option>
                                                </select>
                                              ) : questions.survey_questions_toggle ===
                                                "DD Roles" ? (
                                                <select
                                                  onChange={(e) => {
                                                    questionSubmit(
                                                      e,
                                                      questions.survey_questions_num.replaceAll(
                                                        ".",
                                                        ""
                                                      ) +
                                                      "" +
                                                      questions.survey_questions_name
                                                        .replaceAll(" ", "")
                                                        .replaceAll(".", "")
                                                        .replaceAll(
                                                          /[^a-zA-Z0-9]/g,
                                                          ""
                                                        )
                                                    );
                                                  }}
                                                >
                                                  <option></option>
                                                  <option>L2 Consultant</option>
                                                  <option>
                                                    L3 Associate Consultant
                                                  </option>
                                                  <option>L3 Consultant</option>
                                                  <option>L4 Project Manager</option>
                                                  <option>L4 Senior Consultant</option>
                                                  <option>
                                                    L5 Global Program Manager
                                                  </option>
                                                  <option>
                                                    L5 Principal Consultant
                                                  </option>
                                                  <option>L5 Solution Architect</option>
                                                </select>
                                              ) : questions.survey_questions_toggle ===
                                                "DD_Document Language" ? (
                                                <select
                                                  onChange={(e) => {
                                                    questionSubmit(
                                                      e,
                                                      questions.survey_questions_num.replaceAll(
                                                        ".",
                                                        ""
                                                      ) +
                                                      "" +
                                                      questions.survey_questions_name
                                                        .replaceAll(" ", "")
                                                        .replaceAll(".", "")
                                                        .replaceAll(
                                                          /[^a-zA-Z0-9]/g,
                                                          ""
                                                        )
                                                    );
                                                  }}
                                                >
                                                  <option></option>
                                                  <option>Kannada</option>
                                                  <option>Hindi</option>
                                                  <option>English</option>
                                                  <option>French</option>
                                                  <option>Arabic</option>
                                                  <option>Spanish</option>
                                                  <option>Portuguese</option>
                                                  <option>German</option>
                                                  <option>Russian</option>
                                                  <option>Persian</option>
                                                  <option>Bengali</option>
                                                  <option>Urdu</option>
                                                  <option>Japanese</option>
                                                  <option>Bhojpuri</option>
                                                  <option>Chinese</option>
                                                  <option>Korean</option>
                                                  <option>Gujarati</option>
                                                  <option>Nepali</option>
                                                </select>
                                              ) : questions.survey_questions_toggle ===
                                                "Currencies" ? (
                                                <select
                                                  onChange={(e) => {
                                                    questionSubmit(
                                                      e,
                                                      questions.survey_questions_num.replaceAll(
                                                        ".",
                                                        ""
                                                      ) +
                                                      "" +
                                                      questions.survey_questions_name
                                                        .replaceAll(" ", "")
                                                        .replaceAll(".", "")
                                                        .replaceAll(
                                                          /[^a-zA-Z0-9]/g,
                                                          ""
                                                        )
                                                    );
                                                  }}
                                                >
                                                  <option></option>
                                                  <option>INR</option>
                                                  <option>MXN</option>
                                                  <option>BRL</option>
                                                  <option>ARS</option>
                                                  <option>GPB</option>
                                                  <option>EUR</option>
                                                  <option>CHF</option>
                                                  <option>SEK</option>
                                                  <option>DKK</option>
                                                  <option>SAR</option>
                                                  <option>ZAR</option>
                                                  <option>USD</option>
                                                  <option>AUD</option>
                                                  <option>JPY</option>
                                                  <option>CNY</option>
                                                  <option>KRW</option>
                                                </select>
                                              ) : questions.survey_questions_toggle ===
                                                "TEXTAREA" ? (
                                                <textarea
                                                  readOnly={gsAnswer === 'readOnly'}
                                                  onBlur={(e) => {
                                                    questionSubmit(
                                                      e,
                                                      questions.survey_questions_num.replaceAll(
                                                        ".",
                                                        ""
                                                      ) +
                                                      "" +
                                                      questions.survey_questions_name
                                                        .replaceAll(" ", "")
                                                        .replaceAll(".", "")
                                                        .replaceAll(
                                                          /[^a-zA-Z0-9]/g,
                                                          ""
                                                        )
                                                    );
                                                  }}
                                                ></textarea>
                                              ) :
                                                lookupNames.indexOf(questions.survey_questions_toggle) > -1 ?
                                                  (<>
                                                    <select
                                                      className="contries"
                                                      onChange={(e) => {
                                                        questionSubmit(e, questions.survey_questions_num.replaceAll(".", "") + "" + questions.survey_questions_name.replaceAll(" ", "").replaceAll(".", "").replaceAll(/[^a-zA-Z0-9]/g, ""));
                                                      }}>
                                                      <option></option>

                                                      {/* New Component */}
                                                      <LookupsOptions class_name={questions.survey_questions_toggle} />

                                                    </select>
                                                  </>)
                                                  :
                                                  (
                                                    <input
                                                      className="inputtextv"
                                                      type="text"
                                                      defaultValue=""
                                                      onBlur={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    />
                                                  )}

                                          {/* <input type="text" value="" /> */}
                                          {/* <button id="bidData" onClick={openPopup}hidden /> */}
                                          {/* <label className='bidIcon' for="bidData"><i class="fa-regular fa-folder"></i></label> */}
                                        </div>
                                      )}

                                      {guided_saved_data.length > 0 && (
                                        guided_saved_data.filter((data) => sections._id === data.section_key).map((guided_sections) =>
                                          guided_sections.question_data.filter((data) => questions._id === data.question_key).map((guided_questions) =>
                                            (questions._id == guided_questions.question_key) && (
                                              <>
                                                <div
                                                  key={questions._id}
                                                  id="textinc"
                                                  className={
                                                    "txt a" +
                                                    questions.survey_questions_num.replaceAll(
                                                      ".",
                                                      ""
                                                    ) +
                                                    "" +
                                                    questions.survey_questions_name
                                                      .replaceAll(" ", "")
                                                      .replaceAll(".", "")
                                                      .replaceAll(/[^a-zA-Z0-9]/g, "")
                                                  }
                                                >
                                                  <input
                                                    type="hidden"
                                                    name="question_key"
                                                    value={questions._id}
                                                  />
                                                  <input
                                                    type="hidden"
                                                    name="question_num"
                                                    value={questions.survey_questions_num}
                                                  />

                                                  <button id="text-to-copyBid">
                                                    {questions.survey_questions_toggle ===
                                                      "USER MESSAGE"
                                                      ? ""
                                                      : questions.survey_questions_num}
                                                  </button>
                                                  <button id="guidedFieldsBid">
                                                    {questions.survey_questions_toggle ===
                                                      "USER MESSAGE" ? (
                                                      <span
                                                        style={{
                                                          color: "red",
                                                          fontWeight: "600",
                                                        }}
                                                      >
                                                        {questions.survey_questions_name}
                                                      </span>
                                                    ) : (
                                                      questions.survey_questions_name
                                                    )}
                                                  </button>

                                                  {questions.survey_questions_toggle ===
                                                    "TOGGLE" ? (
                                                    <span>
                                                      <input
                                                        readOnly={gsAnswer === 'readOnly'}
                                                        className="togglein"
                                                        type="checkbox"
                                                        value="1"
                                                        onChange={(e) => {
                                                          questionSubmit(
                                                            e,
                                                            questions.survey_questions_num.replaceAll(
                                                              ".",
                                                              ""
                                                            ) +
                                                            "" +
                                                            questions.survey_questions_name
                                                              .replaceAll(" ", "")
                                                              .replaceAll(".", "")
                                                              .replaceAll(
                                                                /[^a-zA-Z0-9]/g,
                                                                ""
                                                              )
                                                          );
                                                        }}
                                                      />
                                                    </span>
                                                  ) : questions.survey_questions_toggle ===
                                                    "COUNTRIES" ? (
                                                    <select
                                                      disabled={gsAnswer === 'readOnly'}
                                                      className="contries"
                                                      onChange={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}

                                                    >
                                                      <option>{guided_questions.question_val}</option>
                                                      <option>India</option>
                                                      <option>Canada</option>
                                                      <option>Mexico</option>
                                                      <option>Brazil</option>
                                                      <option>Argentina</option>
                                                      <option>UK</option>
                                                      <option>Germany</option>
                                                      <option>France</option>
                                                      <option>Italy</option>
                                                      <option>Switzerland</option>
                                                      <option>Spain</option>
                                                      <option>Austria</option>
                                                      <option>Sweden</option>
                                                      <option>Austria</option>
                                                      <option>Denmark</option>
                                                      <option>Portugal</option>
                                                      <option>Saudi Arabia</option>
                                                      <option>Africa</option>
                                                      <option>Israel</option>
                                                      <option>US</option>
                                                      <option>Singapore</option>
                                                      <option>Australia</option>
                                                      <option>Japan</option>
                                                      <option>China</option>
                                                      <option>Korea</option>
                                                    </select>
                                                  ) : questions.survey_questions_toggle ===
                                                    "TEXTAREA" ? (
                                                    <textarea
                                                      readOnly={gsAnswer === 'readOnly'}
                                                      className="textareabox"
                                                      onBlur={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    >{guided_questions.question_val}</textarea>
                                                  ) : questions.survey_questions_toggle ===
                                                    "DATE" ? (
                                                    <input
                                                      readOnly={gsAnswer === 'readOnly'}
                                                      className="dateinputs"
                                                      type="date"
                                                      defaultValue={guided_questions.question_val}
                                                      onBlur={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    />
                                                  ) : questions.survey_questions_toggle ===
                                                    "MULTITEXT" ? (
                                                    <textarea
                                                      readOnly={gsAnswer === 'readOnly'}
                                                      className="multitextareabox"
                                                      onBlur={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    >{guided_questions.question_val}</textarea>
                                                  ) : questions.survey_questions_toggle ===
                                                    "MONTHS" ? (
                                                    <select
                                                      disabled={gsAnswer === 'readOnly'}
                                                      onChange={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    >
                                                      <option>{guided_questions.question_val}</option>
                                                      <option>January</option>
                                                      <option>February</option>
                                                      <option>March</option>
                                                      <option>April</option>
                                                      <option>May</option>
                                                      <option>June</option>
                                                      <option>July</option>
                                                      <option>August</option>
                                                      <option>September</option>
                                                      <option>October</option>
                                                      <option>November</option>
                                                      <option>December</option>
                                                    </select>
                                                  ) : questions.survey_questions_toggle ===
                                                    "HI/NORM/LO" ? (
                                                    <select
                                                      disabled={gsAnswer === 'readOnly'}
                                                      onChange={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    >
                                                      <option>{guided_questions.question_val}</option>
                                                      <option>HIGH</option>
                                                      <option>NORMAL</option>
                                                      <option>LOW</option>
                                                    </select>
                                                  ) : questions.survey_questions_toggle ===
                                                    "HI/LO/MED" ? (
                                                    <select
                                                      disabled={gsAnswer === 'readOnly'}
                                                      onChange={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    >
                                                      <option>{guided_questions.question_val}</option>
                                                      <option>HIGH</option>
                                                      <option>LOW</option>
                                                      <option>MEDIUM</option>
                                                    </select>
                                                  ) : questions.survey_questions_toggle ===
                                                    "YES/NO" ? (
                                                    <select
                                                      disabled={gsAnswer === 'readOnly'}
                                                      className="yesno"
                                                      onChange={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    >
                                                      <option>{guided_questions.question_val}</option>
                                                      <option>YES</option>
                                                      <option>NO</option>
                                                    </select>
                                                  ) : questions.survey_questions_toggle ===
                                                    "NUMBERS" ? (
                                                    <input
                                                      readOnly={gsAnswer === 'readOnly'}
                                                      className="nmb"
                                                      type="number"
                                                      defaultValue={guided_questions.question_val}
                                                      onBlur={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    />
                                                  ) : questions.survey_questions_toggle ===
                                                    "FORMULA" ? (

                                                    <input
                                                      readOnly={gsAnswer === 'readOnly'}
                                                      className="nmb"
                                                      type="text"
                                                      defaultValue={guided_questions.question_val}
                                                      onBlur={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    />
                                                  ) : questions.survey_questions_toggle ===
                                                    "NUMERIC" ? (
                                                    <select
                                                      disabled={gsAnswer === 'readOnly'}
                                                      onChange={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    >
                                                      <option>{guided_questions.question_val}</option>
                                                      <option>1</option>
                                                      <option>2</option>
                                                      <option>3</option>
                                                      <option>4</option>
                                                      <option>5</option>
                                                      <option>6</option>
                                                      <option>7</option>
                                                      <option>8</option>
                                                      <option>9</option>
                                                      <option>10</option>
                                                    </select>
                                                  ) : questions.survey_questions_toggle ===
                                                    "Stage" ? (
                                                    <select
                                                      disabled={gsAnswer === 'readOnly'}
                                                      onChange={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    >
                                                      <option>{guided_questions.question_val}</option>
                                                      <option>Go</option>
                                                      <option>Go-No_Go</option>
                                                      <option>CLose-First</option>
                                                      <option>Close-Last</option>
                                                    </select>
                                                  ) : questions.survey_questions_toggle ===
                                                    "DD Document type" ? (
                                                    <select
                                                      disabled={gsAnswer === 'readOnly'}
                                                      onChange={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    >
                                                      <option>{guided_questions.question_val}</option>
                                                      <option>Draft </option>
                                                      <option>Final </option>
                                                    </select>
                                                  ) : questions.survey_questions_toggle ===
                                                    "DD Quote type" ? (
                                                    <select
                                                      disabled={gsAnswer === 'readOnly'}
                                                      onChange={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    >
                                                      <option>{guided_questions.question_val}</option>
                                                      <option>Time and material</option>
                                                      <option>Fixed fee</option>
                                                    </select>
                                                  ) : questions.survey_questions_toggle ===
                                                    "Price list currency" ? (
                                                    <select
                                                      disabled={gsAnswer === 'readOnly'}
                                                      onChange={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    >
                                                      <option>{guided_questions.question_val}</option>
                                                      <option>Africa</option>
                                                      <option>Argentina</option>
                                                      <option>Australia</option>
                                                      <option>Brazil</option>
                                                      <option>Canada</option>
                                                      <option>China</option>
                                                      <option>Eastern Europe</option>
                                                      <option>France</option>
                                                      <option>Germany</option>
                                                    </select>
                                                  ) : questions.survey_questions_toggle ===
                                                    "Country of delivery" ? (
                                                    <select
                                                      disabled={gsAnswer === 'readOnly'}
                                                      onChange={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    >
                                                      <option>{guided_questions.question_val}</option>
                                                      <option>APAC</option>
                                                      <option>Canada</option>
                                                      <option>EMEA North</option>
                                                      <option>EMEA South</option>
                                                      <option>LATAM</option>
                                                    </select>
                                                  ) : questions.survey_questions_toggle ===
                                                    "DD Roles" ? (
                                                    <select
                                                      disabled={gsAnswer === 'readOnly'}
                                                      onChange={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    >
                                                      <option>{guided_questions.question_val}</option>
                                                      <option>L2 Consultant</option>
                                                      <option>
                                                        L3 Associate Consultant
                                                      </option>
                                                      <option>L3 Consultant</option>
                                                      <option>L4 Project Manager</option>
                                                      <option>L4 Senior Consultant</option>
                                                      <option>
                                                        L5 Global Program Manager
                                                      </option>
                                                      <option>
                                                        L5 Principal Consultant
                                                      </option>
                                                      <option>L5 Solution Architect</option>
                                                    </select>
                                                  ) : questions.survey_questions_toggle ===
                                                    "DD_Document Language" ? (
                                                    <select
                                                      disabled={gsAnswer === 'readOnly'}
                                                      onChange={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    >
                                                      <option>{guided_questions.question_val}</option>
                                                      <option>Kannada</option>
                                                      <option>Hindi</option>
                                                      <option>English</option>
                                                      <option>French</option>
                                                      <option>Arabic</option>
                                                      <option>Spanish</option>
                                                      <option>Portuguese</option>
                                                      <option>German</option>
                                                      <option>Russian</option>
                                                      <option>Persian</option>
                                                      <option>Bengali</option>
                                                      <option>Urdu</option>
                                                      <option>Japanese</option>
                                                      <option>Bhojpuri</option>
                                                      <option>Chinese</option>
                                                      <option>Korean</option>
                                                      <option>Gujarati</option>
                                                      <option>Nepali</option>
                                                    </select>
                                                  ) : questions.survey_questions_toggle ===
                                                    "Currencies" ? (
                                                    <select
                                                      disabled={gsAnswer === 'readOnly'}
                                                      onChange={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    >
                                                      <option>{guided_questions.question_val}</option>
                                                      <option>INR</option>
                                                      <option>MXN</option>
                                                      <option>BRL</option>
                                                      <option>ARS</option>
                                                      <option>GPB</option>
                                                      <option>EUR</option>
                                                      <option>CHF</option>
                                                      <option>SEK</option>
                                                      <option>DKK</option>
                                                      <option>SAR</option>
                                                      <option>ZAR</option>
                                                      <option>USD</option>
                                                      <option>AUD</option>
                                                      <option>JPY</option>
                                                      <option>CNY</option>
                                                      <option>KRW</option>
                                                    </select>
                                                  ) : questions.survey_questions_toggle ===
                                                    "TEXTAREA" ? (
                                                    <textarea
                                                      readOnly={gsAnswer === 'readOnly'}
                                                      onBlur={(e) => {
                                                        questionSubmit(
                                                          e,
                                                          questions.survey_questions_num.replaceAll(
                                                            ".",
                                                            ""
                                                          ) +
                                                          "" +
                                                          questions.survey_questions_name
                                                            .replaceAll(" ", "")
                                                            .replaceAll(".", "")
                                                            .replaceAll(
                                                              /[^a-zA-Z0-9]/g,
                                                              ""
                                                            )
                                                        );
                                                      }}
                                                    ></textarea>
                                                  ) : lookupNames.indexOf(questions.survey_questions_toggle) > -1 ?
                                                    (<>
                                                      <select
                                                        disabled={gsAnswer === 'readOnly'}
                                                        onChange={(e) => {
                                                          questionSubmit(e, questions.survey_questions_num.replaceAll(".", "") + "" + questions.survey_questions_name.replaceAll(" ", "").replaceAll(".", "").replaceAll(/[^a-zA-Z0-9]/g, ""));
                                                        }}>
                                                        <option>{guided_questions.question_val}</option>
                                                        <LookupsOptions class_name={questions.survey_questions_toggle} />

                                                        {/* New Component */}

                                                      </select>
                                                    </>)
                                                    :

                                                    (
                                                      <input
                                                        className="inputtextv"
                                                        type="text"
                                                        defaultValue=""
                                                        onBlur={(e) => {
                                                          questionSubmit(
                                                            e,
                                                            questions.survey_questions_num.replaceAll(
                                                              ".",
                                                              ""
                                                            ) +
                                                            "" +
                                                            questions.survey_questions_name
                                                              .replaceAll(" ", "")
                                                              .replaceAll(".", "")
                                                              .replaceAll(
                                                                /[^a-zA-Z0-9]/g,
                                                                ""
                                                              )
                                                          );
                                                        }}
                                                      />
                                                    )}

                                                  {/* <input type="text" value="" /> */}
                                                  {/* <button id="bidData" onClick={openPopup}hidden /> */}
                                                  {/* <label className='bidIcon' for="bidData"><i class="fa-regular fa-folder"></i></label> */}
                                                </div>
                                                {/* NEW CODE */}
                                              </>
                                            )


                                          ))

                                      )}

                                      <>

                                      </>
                                    </>
                                  )
                                )

                              })
                            }


                            {/* end Here */}
                          </div>
                        )}
                      </div>
                    </>
                  ))
                ) : (
                  <></>
                )}

                {/* <!-- Learning Pass end Section--> */}
              </div>
            </div>
            {applyDisplay && (
              <div className="applybuttonguided">
                <button
                  type="submit"
                  class="guideApply"
                  onClick={(e) => {
                    guidedSurveySubmit();
                  }}
                >
                  APPLY
                </button>
              </div>
            )}
          </div>
        )}
        {isLeftSideGuidedSelling && (
          <div
            className="header_bar_guided"
            style={{
              width: accountOpen ? "65%" : "77%",
              // width: guidedSellingSideBar ? "100%" : "77%",
              height: "100vh",
              borderRight: accountOpen ? "3px solid #216c98" : "none",
            }}
          >
            <button
              id="openbtn"
              onClick={handleOpenSideBar}
              style={{
                marginRight: accountOpen ? "20.5%" : "0%",
                transition: "0.4s ease 0s",
              }}
            >
              {accountOpen ? <FaLessThan /> : <FaGreaterThan />}
            </button>
            <HeaderBar
              isSubmitApproveBtn={true}
              valueOfButton="SUBMIT FOR APPROVAL"
            />

            <div className="buttonguided">
              <button
                type="button"
                className="guidedbttn"
                id="clickmeguided"
                onClick={toggleGuideSelling}
              >
                <span id="saa" className={`fa ${iconClassGuided}`} />
              </button>
            </div>
            <div className="download_icon">
              <button className="xlbuttnpeople">
                <FontAwesomeIcon icon={faFileExcel} id="downloadpeople" />
                <span id="xlpeopledowlabel">DOWNLOAD</span>
              </button>
            </div>
            {isGuidedSellingVisible && (
              <div className="template_guide_start">
                <TemplateGuided
                  guidedSellingtogglebtn={true}
                  surveykeyTemplate={survey_key}
                  quoteName={quotes?.quotes_name || quotes}
                  readOnly={gsAnswer === 'readOnly'}
                  netPrice={netPrice}
                  listPrice={listPrice}
                  cost={cost}
                  discount={discount ? discount.toFixed(2) : "0.00"}
                  margin={margin ? margin.toFixed(2) : "0.00"}
                />
              </div>
            )}
            {guidedSellingGridVisible && (
              <div className="guidedSellinggrid">
                <GuidedSellingGrid
                  surveykey={survey_key}
                  sectionKey={surveySectionKey}
                  rulesKey={surveyRuleKey}
                  updateNetPrice={updateNetPrice}
                  updateListPrice={updateListPrice}
                  updateCost={updateCost}
                  updateDiscount={updateDiscount}
                  updateMargin={updateMargin}
                />
              </div>
            )}
          </div>
        )}
        {guidedSellingListingVisible && (
          <div
            className="guided_Listing_div"
            style={{
              width: accountOpen ? "65%" : "100%",
              height: "100vh",
              borderRight: accountOpen ? "3px solid #216c98" : "none",
            }}
          >
            <button
              id="openbtn"
              onClick={handleOpenSideBar}
              style={{
                marginRight: accountOpen ? "20.5%" : "0%",
                transition: "0.4s ease 0s",
              }}
            >
              {accountOpen ? <FaLessThan /> : <FaGreaterThan />}
            </button>
            <GuidedListing
              showFlagHeader={true}
              showFlagButton={false}
              options={selectedOptionsContentdoctype}
              doctypePublished={doctypePublished}
              doc_tempData={doc_tempData}
              updateDocTempData={updateDocTempData}
              survey_key={sKey}
            />
          </div>
        )}

        <div
          className="sidepanel"
          style={{
            width: accountOpen ? "26%" : "0%",
            transition: "0.4s ease 0s",
          }}
        >
          {accountOpen ? (
            <SidePanel
              showFlagExternal={true}
              showFlagTimeStamp={true}
              showFlagExchangeRates={true}
              showFlagDoctypeAll={true}
              showFlagDocumentExport={true}
              showFlagWorddocument={true}
              showFlagPdfdocument={true}
              showFlagRole={true}
              doctypePublished={doctypePublished}
              updateOptionsDoctype={updateOptionsDoctype}
              selectedOptionsContentdoctype={selectedOptionsContentdoctype}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default GuidedSellingR;
