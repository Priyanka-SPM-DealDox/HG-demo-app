import React, { useState, useEffect } from 'react';
import Navbar from '../../layouts/Navbar';
import Sidebar from '../../layouts/Sidebar';
import CustomDropdown from '../../components/common/CustomDropdown';
import InputTypes from '../../components/common/InputTypes';
import ErrorMessage from '../../components/common/ErrorMessage';
import { Link } from 'react-router-dom';
import HeaderBar from '../../components/common/HeaderBar';
import '../../assets/css/opportunity/Opportunities.css'
import { baseUrl } from '../../config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from 'react-icons/fa';
import Cookies from 'js-cookie';
const Opportunities = () => {
  const { user } = useAuthContext();
  console.log(user);

  const [accountId, setAccountId] = useState('');
  const [opportunityName, setOpportunityName] = useState("");
  const [netPrice, setNetPrice] = useState("");
  const [margin, setMargin] = useState("");
  const [cost, setCost] = useState(0);
  const [stage, setStage] = useState('');
  const [probability, setProbability] = useState("");
  const [hours, setHours] = useState("");
  const [durationWeek, setDurationWeek] = useState(0);
  const [owner, setOwner] = useState("");
  const [region, setRegion] = useState('');
  const [vertical, setVertical] = useState('');
  const [practice, setPractice] = useState('');
  const [currency, setCurrency] = useState('');
  const [org, setOrg] = useState('');
  const [opportunityType, setOpportunityType] = useState('');
  //useState to hold the data from access Page
  const [peopleData, setPeopleData] = useState([]);


  const optionregion = ["AP", "EMEA", "LA", "NA"];
  const optionvertical = ["BANKING", "CHEMICALS", "CONSTRUCTION & ENGG", "CONSULTING SERVICE", "CONSUMER PRODUCTS", "EDUCATION ", "ENTERTAINMENT & LEISURE", "FINANCIAL SERVICES",];
  const optionpractice = ["DBA", "DSOM", "EDUCATION", "IZOT"];
  const optionorg = ["AFRICA", "ALL OTHER AP", "AP-ALL OTHER", "AP-AUS/JP", "AP-CHINA", "AP-INDIA", "ARGENTINA", "AUSTRALIA",];
  const optioncurrency = [
    "Afghanistan - Afghani (AFN)",
    "Albania - Lek (ALL)",
    "Algeria - Algerian Dinar (DZD)",
    "American Samoa - US Dollar (USD)",
    "Andorra - Euro (EUR)",
    "Angola - Kwanza (AOA)",
    "Anguilla - East Caribbean Dollar (XCD)",
    "Antigua and Barbuda - East Caribbean Dollar (XCD)",
    "Argentina - Argentine Peso (ARS)",
    "Armenia - Armeniam Dram (AMD)",
    "Aruba - Aruban Florin (AWG)",
    "Australia - Australian Dollar (AUD)",
    "Austria - Euro (EUR)",
    "Azerbaijan - Azerbaijanian Manat (AZN)",
    "Bahamas - Bahamian Dollar (BSD)",
    "Bahrain - Bahraini Dinar (BHD)",
    "Bangladesh - Taka (BDT)",
    "Barbados - Barbados Dollar (BBD)",
    "Belarus - Belarusian Ruble (BYN)",
    "Belgium - Euro (EUR)",
    "Belize - Belize Dollar (BZD)",
    "Benin - CFA Franc (BCEAO) (XOF)",
    "Bermuda - Bermudian Dollar (BMD)",
    "Bhutan - Ngultrum (BTN)",
    "Bolivia (Plurinat.State) - Boliviano (BOB)",
    "Bonaire/S.Eustatius/Saba - US Dollar (USD)",
    "Bosnia and Herzegovina - Convertible Mark (BAM)",
    "Botswana - Pula (BWP)",
    "Brazil - Brazilian Real (BRL)",
    "British Indian Ocean Ter - US Dollar (USD)",
    "British Virgin Islands - US Dollar (USD)",
    "Brunei Darussalam - Brunei Dollar (BND)",
    "Bulgaria - Bulgarian Lev (BGN)",
    "Burkina Faso - CFA Franc (BCEAO) (XOF)",
    "Burundi - Burundi Franc (BIF)",
    "Cabo Verde - Cabo Verde Escudo (CVE)",
    "Cambodia - Riel (KHR)",
    "Cameroon - CFA Franc (BEAC) (XAF)",
    "Canada - Canadian Dollar (CAD)",
    "Cayman Islands - Cayman Islands Dollar (KYD)",
    "Central African Republic - CFA Franc (BEAC) (XAF)",
    "Chad - CFA Franc (BEAC) (XAF)",
    "Channel Islands - Pound Sterling (GBP)",
    "Chile - Chilean Peso (CLP)",
    "China - Yuan Renminbi (CNY)",
    "China, Hong Kong SAR - Hong Kong Dollar (HKD)",
    "China, Macao SAR - Pataca (MOP)",
    "Taiwan Province of China - New Taiwan Dollar (TWD)",
    "Christmas Island - Australian Dollar (AUD)",
    "Cocos (Keeling) Islands - Australian Dollar (AUD)",
    "Colombia - Colombian Peso (COP)",
    "Coordinating Working Party on Fishery Statistics (CWP)",
    "Comoros - Comoro Franc (KMF)",
    "Congo - CFA Franc (BEAC) (XAF)",
    "Congo, Dem. Rep. of the - Congolese Franc (CDF)",
    "Cook Islands - New Zealand Dollar (NZD)",
    "Costa Rica - Costa Rican Colón (CRC)",
    "Côte d'Ivoire - CFA Franc (BCEAO) (XOF)",
    "Croatia - Croatian Kuna (HRK)",
    "Cuba - Cuban Peso (CUP)",
    "Curaçao - Netherlands Antillian Guilder (ANG)",
    "Cyprus - Euro (EUR)",
    "Czechia - Czech Koruna (CZK)",
    "Denmark - Danish Krone (DKK)",
    "Djibouti - Djibouti Franc (DJF)",
    "Dominica - East Caribbean Dollar (XCD)",
    "Dominican Republic - Dominican Peso (DOP)",
    "Ecuador - US Dollar (USD)",
    "Egypt - Egyptian Pound (EGP)",
    "El Salvador - US Dollar (USD)",
    "Equatorial Guinea - CFA Franc (BEAC) (XAF)",
    "Eritrea - Nakfa (ERN)",
    "Estonia - Euro (EUR)",
    "Ethiopia - Ethiopian Birr (ETB)",
    "Falkland Is.(Malvinas) - Falkland Islands Pound (FKP)",
    "Faroe Islands - Danish Krone (DKK)",
    "Fiji, Republic of - Fiji Dollar (FJD)",
    "Finland - Euro (EUR)",
    "France - Euro (EUR)",
    "French Guiana - Euro (EUR)",
    "French Polynesia - CFP Franc (XPF)",
    "French Southern Terr - Euro (EUR)",
    "Gabon - CFA Franc (BEAC) (XAF)",
    "Gambia - Dalasi (GMD)",
    "Georgia - Lari (GEL)",
    "Germany - Euro (EUR)",
    "Ghana - Ghana Cedi (GHS)",
    "Gibraltar - Gibraltar Pound (GIP)",
    "Greece - Euro (EUR)",
    "Greenland - Danish Krone (DKK)",
    "Grenada - East Caribbean Dollar (XCD)",
    "Guadeloupe - Euro (EUR)",
    "Guam - US Dollar (USD)",
    "Guatemala - Quetzal (GTQ)",
    "Guernsey - Pound Sterling (GBP)",
    "Guinea - Guinea Franc (GNF)",
    "Guinea-Bissau - CFA Franc (BCEAO) (XOF)",
    "Guyana - Guyana Dollar (GYD)",
    "Haiti - Gourde (HTG)",
    "Honduras - Lempira (HNL)",
    "Hungary - Forint (HUF)",
    "Iceland - Iceland Króna (ISK)",
    "India - Indian Rupee (INR)",
    "Indonesia - Rupiah (IDR)",
    "Iran (Islamic Rep. of) - Iranian Rial (IRR)",
    "Iraq - Iraqi Dinar (IQD)",
    "Ireland - Euro (EUR)",
    "Isle of Man - Pound Sterling (GBP)",
    "Israel - New Israeli Sheqel (ILS)",
    "Italy - Euro (EUR)",
    "Jamaica - Jamaican Dollar (JMD)",
    "Japan - Yen (JPY)",
    "Jersey - Pound Sterling (GBP)",
    "Jordan - Jordanian Dinar (JOD)",
    "Kazakhstan - Tenge (KZT)",
    "Kenya - Kenyan Shilling (KES)",
    "Kiribati - Australian Dollar (AUD)",
    "Korea, Dem. People's Rep - North Korean Won (KPW)",
    "Korea, Republic of - Won (KRW)",
    "Kuwait - Kuwaiti Dinar (KWD)",
    "Kyrgyzstan - Som (KGS)",
    "Lao People's Dem. Rep. - Kip (LAK)",
    "Latvia - Euro (EUR)",
    "Lebanon - Lebanese Pound (LBP)",
    "Lesotho - Loti (LSL)",
    "Liberia - Liberian Dollar (LRD)",
    "Libya - Libyan Dinar (LYD)",
    "Liechtenstein - Swiss Franc (CHF)",
    "Lithuania - Euro (EUR)",
    "Luxembourg - Euro (EUR)",
    "Macedonia, Fmr Yug Rp of - Denar (MKD)",
    "Madagascar - Malagasy Ariary (MGA)",
    "Malawi - Malawi Kwacha (MWK)",
    "Malaysia - Malaysian Ringgit (MYR)",
    "Maldives - Rufiyaa (MVR)",
    "Mali - CFA Franc (BCEAO) (XOF)",
    "Malta - Euro (EUR)",
    "Marshall Islands - US Dollar (USD)",
    "Martinique - Euro (EUR)",
    "Mauritania - Ouguiya (MRO)",
    "Mauritius - Mauritius Rupee (MUR)",
    "Mayotte - Euro (EUR)",
    "Mexico - Mexican Peso (MXN)",
    "Micronesia,Fed.States of - US Dollar (USD)",
    "Moldova, Republic of - Moldovan Leu (MDL)",
    "Mongolia - Tugrik (MNT)",
    "Montenegro - Euro (EUR)",
    "Montserrat - East Caribbean Dollar (XCD)",
    "Morocco - Moroccan Dirham (MAD)",
    "Mozambique - Metical (MZN)",
    "Myanmar - Kyat (MMK)",
    "Namibia - Namibian Dollar (NAD)",
    "Nauru - Australian Dollar (AUD)",
    "Nepal - Nepalese Rupee (NPR)",
    "Netherlands - Euro (EUR)",
    "New Caledonia - CFP Franc (XPF)",
    "New Zealand - New Zealand Dollar (NZD)",
    "Nicaragua - Córdoba Oro (NIO)",
    "Niger - CFA Franc (BCEAO) (XOF)",
    "Nigeria - Naira (NGN)",
    "Niue - New Zealand Dollar (NZD)",
    "Northern Mariana Is. - US Dollar (USD)",
    "Norway - Norwegian Krone (NOK)",
    "Oman - Rial Omani (OMR)",
    "Pakistan - Pakistan Rupee (PKR)",
    "Palau - US Dollar (USD)",
    "Panama - Balboa (PAB)",
    "Papua New Guinea - Kina (PGK)",
    "Paraguay - Guaraní (PYG)",
    "Peru - Sol (PEN)",
    "Philippines - Philippine Peso (PHP)",
    "Pitcairn Islands - New Zealand Dollar (NZD)",
    "Poland - Zloty (PLN)",
    "Portugal - Euro (EUR)",
    "Puerto Rico - US Dollar (USD)",
    "Qatar - Qatari Rial (QAR)",
    "Réunion - Euro (EUR)",
    "Romania - Romanian Leu (RON)",
    "Russian Federation - Russian Ruble (RUB)",
    "Rwanda - Rwanda Franc (RWF)",
    "Saint Barthélemy - Euro (EUR)",
    "Saint Helena - Saint Helena Pound (SHP)",
    "Saint Kitts and Nevis - East Caribbean Dollar (XCD)",
    "Saint Lucia - East Caribbean Dollar (XCD)",
    "Saint-Martin - Euro (EUR)",
    "St. Pierre and Miquelon - Euro (EUR)",
    "Saint Vincent/Grenadines - East Caribbean Dollar (XCD)",
    "Samoa - Tala (WST)",
    "Sao Tome and Principe - Dobra (STD)",
    "Saudi Arabia - Saudi Riyal (SAR)",
    "Senegal - CFA Franc (BCEAO) (XOF)",
    "Serbia - Serbian Dinar (RSD)",
    "Seychelles - Seychelles Rupee (SCR)",
    "Sierra Leone - Leone (SLL)",
    "Singapore - Singapore Dollar (SGD)",
    "Sint Maarten - Netherlands Antillian Guilder (ANG)",
    "Slovakia - Euro (EUR)",
    "Slovenia - Euro (EUR)",
    "Solomon Islands - Solomon Islands Dollar (SBD)",
    "Somalia - Somali Shilling (SOS)",
    "South Africa - Rand (ZAR)",
    "South Sudan - South Sudanese Pound (SSP)",
    "Spain - Euro (EUR)",
    "Sri Lanka - Sri Lanka Rupee (LKR)",
    "Sudan - Sudanese Pound (SDG)",
    "Suriname - Suriname Dollar (SRD)",
    "Swaziland - Lilangeni (SZL)",
    "Sweden - Swedish Krona (SEK)",
    "Switzerland - Swiss Franc (CHF)",
    "Syrian Arab Republic - Syrian Pound (SYP)",
    "Tajikistan - Somoni (TJS)",
    "Tanzania, United Rep. of - Tanzanian Shilling (TZS)",
    "Thailand - Baht (THB)",
    "Timor-Leste - US Dollar (USD)",
    "Togo - CFA Franc (BCEAO) (XOF)",
    "Tokelau - New Zealand Dollar (NZD)",
    "Tonga - Pa'anga (TOP)",
    "Trinidad and Tobago - Trinidad and Tobago Dollar (TTD)",
    "Tunisia - Tunisian Dinar (TND)",
    "Turkey - Turkish Lira (TRY)",
    "Turkmenistan - Turkmenistan New Manat",
    "Country name Currency name Currency ISO code",
    "Uganda Uganda Shilling UGX",
    "Ukraine Hryvnia UAH",
    "United Arab Emirates UAE Dirham AED",
    "United Kingdom Pound Sterling GBP",
    "United States of America US Dollar USD",
    "US Virgin Islands US Dollar USD",
    "Uruguay Peso Uruguayo UYU",
    "Uzbekistan Uzbekistan Sum UZS",
    "Vanuatu Vatu VUV",
    "Venezuela, Boliv Rep of Bolívar VEF",
    "VietNam Dong VND",
    "Wallis and Futuna Is. CFP Franc XPF",
    "Western Sahara Moroccan Dirham MAD",
    "Yemen Yemeni Rial YER",
    "Zambia Zambian Kwacha ZMW",
    "Zimbabwe Zimbabwe Dollar ZWL",
  ];
  const optionopportunitytype = ["CONSULTING SERVICES OPPORTUNITY", "EDUCATIONAL SERVICES OPPORTUNITY"];
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedCloseDate, setSelectedCloseDate] = useState(null);

  const handleCalendarStartChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleCalendarCloseChange = (date) => {
    setSelectedCloseDate(date);
  };
  const handleStageSelect = (selectedOption) => {
    setStage(selectedOption);
  };

  const handleOwnerSelect = (selectedOption) => {
    setOwner(selectedOption);
  };

  const handleRegionSelect = (selectedOption) => {
    setRegion(selectedOption);
  };

  const handleVerticalSelect = (selectedOption) => {
    setVertical(selectedOption);
  };

  const handlePracticeSelect = (selectedOption) => {
    setPractice(selectedOption);
  };

  const handleCurrencySelect = (selectedOption) => {
    setCurrency(selectedOption);
  };

  const handleOrgSelect = (selectedOption) => {
    setOrg(selectedOption);
  };

  const handleOpportunityTypeSelect = (selectedOption) => {
    setOpportunityType(selectedOption);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get("data");

    if (dataParam) {
      const decodedData = JSON.parse(decodeURIComponent(dataParam));
      setAccountId(decodedData);
    }
  }, []);
  const [isToastActive, setIsToastActive] = useState(false);
  const handleAddOpportunity = () => {
    if (!opportunityName || !stage || !selectedStartDate || !selectedCloseDate || !owner) {
      toast.info("Please fill in the 'OPPORTUNITY','STAGE' ,'START DATE' and 'CLOSE DATE' fields.");
      return;
    }
    const newOpportunity = {
      account_Id: accountId,
      opportunity_name: opportunityName,
      net_price: netPrice,
      margin: margin,
      cost: cost,
      stage: stage,
      probability: probability,
      hours: hours,
      close: selectedCloseDate,
      start: selectedStartDate,
      duration_weeks: durationWeek,
      owner: owner,
      region: region,
      vertical: vertical,
      practice: practice,
      currency: currency,
      org: org,
      opportunity_type: opportunityType,
    }

    fetch(`${baseUrl}/api/opportunity/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify(newOpportunity),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error Adding Opportunity')
        }
      })
      .then((data) => {
        toast.success("Opportunity added successfully", {
          icon: <span style={{ color: 'rgb(74, 146, 59) ' }}><FaUser /></span>,
          className: 'custom-toast_add',
        });
        console.log("Opportunity Added Successfully", data);
        const delay = 2000;
        setTimeout(() => {
          window.location.href = '/account';
        }, delay);
      })

      .catch((error) => {
        console.error("Error adding Account:", error);
        if (!isToastActive) {
          toast.error(`${opportunityName} name already exists`, {
            onClose: () => setIsToastActive(false),
            onOpen: () => setIsToastActive(true),
          }
          );
        }
      });
  }
  // ---------RESET-----------
  const resetFields = () => {
    setOpportunityName("");
    setNetPrice("");
    setMargin("");
    setCost(0);
    setStage("");
    setProbability("");
    setHours("");
    setDurationWeek(0);
    setOwner("");
    setRegion("");
    setVertical("");
    setPractice("");
    setCurrency("");
    setOrg("");
    setOpportunityType("");
    setSelectedStartDate(null);
    setSelectedCloseDate(null);
  };

  // --------------------------start function to get peopleData with access from people data -------------------------------------------
  const [peoplewithAccess, setPeopleWithAccess] = useState([]);
  useEffect(() => {
    const getPeopledata = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/people/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const people = await response.json();
          const peoplewithAccess = people.data.filter(access => access.access === "granted");
          setPeopleWithAccess(peoplewithAccess);
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPeopledata();
  }, [user]);

console.log(peoplewithAccess);

const subOwners = peoplewithAccess.length > 0 ? peoplewithAccess.map(access =>  access.first_name + " "+ access.last_name): [];

  useEffect(() => {
    const peopleDatas = Cookies.get('peopleWithAccess');
    if (peopleDatas) {
      try {
        const PeopleUserData = JSON.parse(peopleDatas);
        setPeopleData(PeopleUserData);
      } catch (error) {
        // Handle any potential JSON parsing errors, e.g., invalid JSON format
        console.error('Error parsing the cookie:', error);
      }
    }
  }, []);


  const userName = user && user.admin ? `${user.admin.firstname} ${user.admin.lastname}` : "";
  const optionOwner = [userName, ...subOwners || ""];

  //----------------------------------End of people Functionality--------------------------------------------------


  // Function to check if all required fields are filled
  const areRequiredFieldsFilled = () => {
    return opportunityName && stage && selectedStartDate && selectedCloseDate  && owner;
  };



  //API's to get the stage LookUp data from database to Opportunity Page
  // API-1 -> To get LookUp Names
  const [lookupName, setLookpName] = useState([]);
  const [lookupkey, setLookUpKey] = useState("");
  const className = "Stage";

  useEffect(() => {

    const getLookupNames = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/lookups/getClassName`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify({ class_name: className }), // Corrected object syntax
        });
        if (response.ok) {
          const lookups = await response.json();
          if (lookups.status === "Success") {
            setLookpName(lookups.data);
            setLookUpKey(lookups.data._id || "");
            console.log(lookups.data);
          }
          else {
            console.log('Response not okay:', response.status, response.statusText);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLookupNames();
  }, [user]);


  // API-2 -> To get lookups sub-Datas
  const [stageLookUp, setStageLookUp] = useState([]);

  useEffect(() => {

    const getStageLookUpData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/lookups_data/get`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify({ lookups_accesskey: lookupkey })
        });
        if (response.ok) {
          const lookups = await response.json();
          if (lookups.status === "Success") {
            const filteredData = lookups.data.filter((item) => item.disable === 1);
            setStageLookUp(filteredData);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getStageLookUpData();
  }, [lookupkey])

  console.log(stageLookUp);

  let stages = stageLookUp && stageLookUp.length > 0 ? stageLookUp.map(sName => sName.lookups_name) : [];
  console.log(stages);
  const optionstage = [...stages];

  //-----------------------------------------------------End of Lookup API's----------------------------------------------------


  const [currentAccount, setCurrentAccount] = useState(null);
  const [dbAccountData, setDbAccountData] = useState([]);

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
            setCurrentAccount(accountss.data[0]); // Set the first account
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

  // ... (your existing code)

  const currentAccountId = accountId; // Assuming accountId is the ID of the current account
  const currentAccount1 = dbAccountData.find((account) => account._id === currentAccountId);
  const accountName = currentAccount1 ? currentAccount1.accounts : '';

  console.log(accountName);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="bread">
        <ul className="breadcrumbs">
          <li className="breadcrumbs--item">
            <Link to="/home" className="breadcrumbs--link" >HOME</Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="/account" className="breadcrumbs--link_mid" >{accountName}</Link>
          </li>
          <li className="breadcrumbs--item">
            <Link className="breadcrumbs--link--active">{opportunityName ? opportunityName : "New Opportunity"}</Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <div className="oppo">
        <HeaderBar headerlabel="NEW OPPORTUNITY" />
        <div className="containerO1">
          <div id="contentO1">
            <ErrorMessage
              label="OPPORTUNITY"
              showFlaxErrorMessageText={true}
              errormsg="OPPORTUNITY IS REQUIRED FIELD"
              value={opportunityName}
              onChange={(value) => setOpportunityName(value)}
            />
          </div>
        </div>
        <div className="containerO2">
          <div id="contentO2">
            <InputTypes showFlagNumber={true} NumberLabel={"NET PRICE"} numberplaceholder={"$0.00"} value={netPrice} onChange={(value) => setNetPrice(value)} />
          </div>
          <div id="contentO2">
            <InputTypes showFlagNumber={true} NumberLabel={"MARGIN"} numberplaceholder={"0%"} value={margin} onChange={(value) => setMargin(value)} />
          </div>
          <div id="contentO2">
            <InputTypes showFlagNumber={true} NumberLabel={"COST"} numberplaceholder={"$0.00"} value={cost} onChange={(value) => setCost(value)} />
          </div>
        </div>
        <div className="containerO3">
          <div id="contentO3">
            <CustomDropdown options={optionstage} onSelect={handleStageSelect} label="STAGE" isBorderVisible={true} isMandatory={true} value={stage} onChange={(value) => setStage(value)} />
          </div>
          <div id="contentO3">
            <InputTypes showFlagNumber={true} NumberLabel={"PROBABILITY"} numberplaceholder={"0%"} value={probability} onChange={(value) => setProbability(value)} />
          </div>
          <div id="contentO3">
            <InputTypes showFlagText={true} TextLabel={"HOURS"} value={hours} onChange={(value) => setHours(value)} />
          </div>
        </div>
        <div className="containerO4">
          <div id="contentD5">
            <InputTypes
              showFlagCalender={true}
              key={`close-${selectedCloseDate}`}
              CalenderLabel={'CLOSE'}
              selectedDate={selectedCloseDate}
              onCalendarChange={handleCalendarCloseChange}
              placeholder='Close date'
            />
          </div>
          <div id="contentD5">
            <InputTypes
              showFlagCalender={true}
              key={`start-${selectedStartDate}`}
              CalenderLabel={'START'}
              selectedDate={selectedStartDate}
              onCalendarChange={handleCalendarStartChange}
              placeholder='Start date'
            />
          </div>
          <div id="contentO4">
            <InputTypes showFlagText={true} TextLabel={"DURATION WEEKS"} value={durationWeek} onChange={(value) => setDurationWeek(value)} />
          </div>
        </div>
        <b className='generaloppo'>GENERAL</b>
        <div className="containerO5">
          <div id="contentO5">
             <CustomDropdown
                        options={optionOwner}
                        onSelect={handleOwnerSelect}
                        label="OWNER"
                        labelforverticl="ownerlabel"
                        custuminput="custom_dropdown_owner"
                        isBorderVisible={true}
                        isMandatory={true}
                        value={owner}
                        onChange={(value) => setOwner(value)}
                      />
             <div className="profile-icon">
                        {owner
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </div>
          </div>
          <div id="contentO5">
            <CustomDropdown options={optionregion} onSelect={handleRegionSelect} label="REGION" value={region} onChange={(value) => setRegion(value)} />
          </div>
          <div id="contentO5">
            <CustomDropdown options={optionvertical} onSelect={handleVerticalSelect} label="VERTICAL" value={vertical} onChange={(value) => setVertical(value)} />
          </div>
          <div id="contentO5">
            <CustomDropdown options={optionpractice} onSelect={handlePracticeSelect} label="PRACTICE" value={practice} onChange={(value) => setPractice(value)} />
          </div>
        </div>
        <div className="containerO6">
          <div id="contentO6">
            <CustomDropdown options={optioncurrency} onSelect={handleCurrencySelect} label="CURRENCY" value={currency} onChange={(value) => setCurrency(value)} />
          </div>
          <div id="contentO6">
            <CustomDropdown options={optionorg} onSelect={handleOrgSelect} label="ORG" value={org} onChange={(value) => setOrg(value)} />
          </div>
          <div id="contentO6">
            <CustomDropdown options={optionopportunitytype} onSelect={handleOpportunityTypeSelect} label="OPPORTUNITY TYPE" value={opportunityType} onChange={(value) => setOpportunityType(value)} />
          </div>
        </div>
        <div className="saveandcancel">
          <button id="save_data" type="submit" style={{ width: '60px' }} onClick={handleAddOpportunity} disabled={!areRequiredFieldsFilled()}>SAVE</button>
          <button id="reset_data" type="reset" onClick={resetFields}>CANCEL</button>
        </div>
      </div>
    </div>
  )
}
export default Opportunities;