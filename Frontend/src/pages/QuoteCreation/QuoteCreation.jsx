import React, { useState, useEffect } from "react";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import "../../assets/css/quoteCreation/QuoteCreation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import CustomDropdown from "../../components/common/CustomDropdown";
import HelpRequest from "../../components/common/HelpRequest";
import { Link, withRouter, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { baseUrl } from "../../config";

const QuoteCreation = () => {
  const { user } = useAuthContext();
  const [template, setTempalate] = useState('')
  const [surveyName, setSurveyName] = useState('');
  const [selectedOptionGuidedSelling, SetselectedOptionGuidedSelling] = useState();

  const data_state = useLocation();
  const acc_opp_id = data_state.state;
  console.log(acc_opp_id);
const length = parseInt(acc_opp_id&&acc_opp_id.length > 0 ? acc_opp_id.length : 0, 10) + 1;
  const formattedLength = String(length).padStart(3, '0');
  console.log(formattedLength);
  
  const [surveyNames, setSurveyNames] = useState([]);
  const [surveyData, setSurveyData] = useState([]);

  const [selectedOption, setSelectedOption] = useState('');
  const isButtonDisabled = template.length === 0;

  const handleSelectTemplate = (selected) => {
    // alert(selected)
    surveyData.filter((item) => {
      if (item.title == selected) {
        // return setSelectedOption(item._id); 
        setSelectedOption(item._id);
        setSurveyName(item.title);
        return setTempalate(item._id);

      }
    });
    // setTempalate(selected);
  }

  useEffect(() => {

    const getServeyNames = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/survey/getSurveyGuidedSelling`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const surveyNames = await response.json();
          console.log('Surveys: ' + surveyNames);
          console.log('surveyNames.data: ' + surveyNames.data);
          var surveynames_arr = surveyNames.data.map((item) => (item.title));
          setSurveyData(surveyNames.data);
          setSurveyNames(surveynames_arr);

        } else {
          console.log('Error: ', response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (user != "" && user != null) {
      getServeyNames();
    }
  }, [user]);



  const addQuotes = async (e) => {
    try {
      const response = await fetch(`${baseUrl}/api/quotes/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ acc_key: acc_opp_id.acc_key, opp_id: acc_opp_id.opp_id, survey_key: selectedOption })
      });
      if (response.ok) {
        const quotes = await response.json();
        alert('Successfully created!')
        window.location.href = `/guidedselling?
        selectedOption=${selectedOption}&template=${template}&surveyName=${surveyName}&acc_opp_id=${JSON.stringify(acc_opp_id)}&quotes=${JSON.stringify(quotes.data)}`
      } else {
        alert('Failed to create!')

      }
    } catch (error) {
      alert('Failed to create!')

    }
  };


  // --------------------------
   const [currentAccount, setCurrentAccount] = useState(null);
   const [dbAccountData, setDbAccountData] = useState([]);
   console.log(setDbAccountData);
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
           console.log(accountss.data);
           setDbAccountData(accountss.data);
  
           // Set the current account using the first account from the fetched data
           if (accountss.data.length > 0) {
             setCurrentAccount(accountss.data); // Set the first account
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
   const currentAccountId = acc_opp_id?.acc_key; // Assuming acc_key is the ID of the current account
   console.log(currentAccountId);
   const currentAccount1 = dbAccountData.find(
     (account) => account._id === currentAccountId
   );
   console.log(currentAccount1);
   const accountName = currentAccount1 ? currentAccount1.accounts : "";
  
   // -------------------------
   const [rows, setOpportunityData] = useState([]);
  
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
           setOpportunityData(oppData.data);
         }
       } catch (error) {
         console.log(error);
       }
     };
  
     getOpportunityData();
   }, [accountId]);
  
   const ooppId = acc_opp_id?.opp_id;
   console.log("ooooooo", ooppId);
   const currentOpportunity = rows.find(
     (opportunity) => opportunity._id === ooppId
   );
   console.log("945858", currentOpportunity);
   const opportunityName = currentOpportunity
     ? currentOpportunity.opportunity_name
     : "";
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
              to="/opportunitiesdata"
              className="breadcrumbs--link_mid"
            >
              {opportunityName}
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link
              className="breadcrumbs--link--active"
            >
              {formattedLength}
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <HelpRequest />
      <div className="flex-container">
        <div className="row-newquote">
          <div className="left-newquote">
            <div className="create_quote_header_div">
              <Link
                to="NewQuote.html"
                style={{ color: "white", textDecoration: "none" }}
              ></Link>
              <header className="createquoteheader">
                <Link
                  to="/opportunitiesdata"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "19px",
                  }}
                >
                  <FontAwesomeIcon icon={faAngleLeft} className="faAngleLeft" />
                </Link>
                <label className="guidedsellinglabel">
                  USE GUIDED SELLLING
                </label>
              </header>
            </div>
            <div className="template">
              {/* survey Name */}
              <CustomDropdown
                options={surveyNames}
                onSelect={handleSelectTemplate}
                label="GUIDED SELLING TEMPLATE"
                custuminput="guidedsellinginput"
                value={surveyName}
                onChange={(value) => setTempalate(value)}
                isBorderVisible={true}
              />
              <div className="createbtn">
                <Link>
                {/* <Link to="/guidedselling" state={{ selectedOption, template }}>
                </Link> */}
                  <button type="submit" id="create" disabled={isButtonDisabled} onClick={(e) => { addQuotes(e) }}>
                    CREATE
                  </button>
                
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// export function showOptions() {
//   var selectElement = document.getElementById("temp");
//   selectElement.options[1].style.display = "block"; // Display the first option
//   selectElement.options[2].style.display = "block"; // Display the second option
// }
export default QuoteCreation;
