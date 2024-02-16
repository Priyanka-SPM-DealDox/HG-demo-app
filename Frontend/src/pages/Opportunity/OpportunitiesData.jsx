import { useState, useEffect } from "react";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import CustomDropdown from "../../components/common/CustomDropdown";
import { Link, useLocation, useParams } from "react-router-dom";
import InputTypes from "../../components/common/InputTypes";
import HeaderBar from "../../components/common/HeaderBar";
import { FaPlus, FaTrash } from "react-icons/fa";
import "../../assets/css/opportunity/OpportunitiesData.css";
import BillingAndShippingAddress from "../../components/common/BillingAndShippingAddress";
import { baseUrl } from "../../config";
import ErrorMessage from "../../components/common/ErrorMessage";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const OpportunitiesData = () => {

  
  const { user } = useAuthContext();
  console.log(user);


  //URL DATA
  const urlParams = new URLSearchParams(window.location.search);
  const permission = urlParams.get('permission');
  const quote_add = urlParams.get('quotePermission');
  console.log(quote_add);
  const isReadOnly = permission === 'readOnly';
  const isQuoteReadOnly = quote_add === 'readOnly' || 'none';
  const qouteOpportunityID = urlParams.get('oppID');

  console.log(qouteOpportunityID);
  console.log(isQuoteReadOnly);

  const [, setSelectedOption] = useState(null);
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [quotesData, setQuotesData] = useState([]);
  const quoteNumber = quotesData&&quotesData.length > 0 ? quotesData[quotesData.length - 1].quotes_name : "";
  console.log(quoteNumber);
  // const [, setSelectedOptioncalender] = useState(null);
  const { state: row } = useLocation();
  const oppData = row?.row || {}; // Use an empty object as a fallback
  console.log(oppData);

  var acc_opp_id = { acc_key: oppData.account_Id, opp_id: oppData._id, length:quoteNumber };
  console.log("acc_opp_id", acc_opp_id);

  const [account_Id, setAccount_Id] = useState('');
  console.log(account_Id);
  const [opportunityId, setOpportunityId] = useState('');
  console.log(opportunityId);
  const [opportunityData, setOpportunityData] = useState("");
  const [opportunityName, setOpportunityName] = useState("");
  const [parentOpportunity, setParentOpportunity] = useState("");
  const [account, setAccount] = useState("");
  const [netPrice, setNetPrice] = useState("");
  const [margin, setMargin] = useState("");
  const [cost, setCost] = useState("");
  const [stage, setStage] = useState("");
  const [permissionType, setPermissionType] = useState("");
  const [probability, setProbability] = useState("");
  const [hours, setHours] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedCloseDate, setSelectedCloseDate] = useState("");
  const [duration_weeks, setDuration_weeks] = useState("");
  const [list_price, setListPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [avgRate, setAvgRate] = useState("");
  const [owner, setOwner] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");
  const [vertical, setVertical] = useState("");
  const [practice, setPractice] = useState("");
  const [currency, setCurrency] = useState("");
  const [org, setOrg] = useState("");
  const [opportunityType, setOpportunityType] = useState("");
  const [selectedDueDate, setSelectedDueDate] = useState("");
  const [billingAddress, setBillingAddress] = useState({
    billingStreet1: "",
    billingStreet2: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    billingCountry: "",
    billingPhone: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    shippingStreet1: "",
    shippingStreet2: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    shippingCountry: "",
    shippingPhone: "",
  });
  // ------------------------------------------------------------------------------------------

  const optionpermissiom = ["CONFIDENTIAL", "DEFAULT", "PERMISSION TYPE"];
  const optionopportunitytype = [
    "CONSULTING SERVICES OPPORTUNITY",
    "EDUCATIONAL SERVICES OPPORTUNITY",
  ];
  const optionstatus = ["REQUESTED", "IN PROGRESS", "ON HOLD"];
  const optionregion = ["AP", "EMEA", "LA", "NA"];
  const optionvertical = ["BANKING", "CHEMICALS", "CONSTRUCTION & ENGG", "CONSULTING SERVICE", "CONSUMER PRODUCTS", "EDUCATION", "ENTERTAINMENT & LEISURE", "FINANCIAL SERVICES"];
  const optionpractice = ["DBA", "DSOM", "EDUCATION", "IZOT"];
  const optiontemplatequote = [
    "BMC DEAL REVIEW REPORT",
    "BMC DEAL REVIEW REPORT-MULTI WORKSTREAM/CCO",
    "BMC ENGAGEMENT SUMMARY",
    "BMC EXPERT SERVICES SOW",
    "BMC FRAMEWORK SOW-SINGLE WORKSTREAM ",
    "BMC SURVEY REVIEW-CTM IMPL.",
    "EDU DIFF REGION",
    "EDUCATION APPROVAL TEMPLATE",
    "EDUCATION ORDER SUMMARY DOCUMENT",
    "EDUCATION QUOTE",
    "GARY TEST<",
    "ORDER SERVICES OPENAIR REPORT",
  ];
  const optionorg = [
    "AFRICA",
    "ALL OTHER AP",
    "AP-ALL OTHER",
    "AP-AUS/JP",
    "AP-CHINA",
    "AP-INDIA",
    "ARGENTINA",
    "AUSTRALIA",
  ];
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

  const handleActionSelect1 = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleActionSelectStage = (selectedOption) => {
    setStage(selectedOption);
  };

  const handleActionSelectPermissionType = (selectedOption) => {
    setPermissionType(selectedOption);
  };
  const handleActionSelectOpportunityType = (selectedOption) => {
    setOpportunityType(selectedOption);
  };
  const handleActionSelectOrg = (selectedOption) => {
    setOrg(selectedOption);
  };
  const handleActionSelectCurrency = (selectedOption) => {
    setCurrency(selectedOption);
  };

  const handleActionSelectrRegion = (selectedOption) => {
    setRegion(selectedOption);
  };

  const handleActionSelectVertical = (selectedOption) => {
    setVertical(selectedOption);
  };

  const handleActionSelectPractice = (selectedOption) => {
    setPractice(selectedOption);
  };

  const handleToggledetail = () => {
    setDetailOpen(!isDetailOpen);
  };
  // const [selectedStartDate, setSelectedStartDate] = useState(null);
  // const [selectedCloseDate, setSelectedCloseDate] = useState(null);

  const handleCalendarStartChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleCalendarCloseChange = (date) => {
    setSelectedCloseDate(date);
  };
  const handleCalendarDueDateChange = (date) => {
    setSelectedDueDate(date);
  };
 

  const handleOwnerSelect = (selectedOption) => {
    setOwner(selectedOption);

    if (selectedOption) {
      const profileText = selectedOption
        .split(" ")
        .map((word) => word[0])
        .join("");
      console.log(profileText);
      // setOwnerProfile(profileText);
    }
  };

  // GET OPPORTUNITY
  useEffect(() => {

    if (user) {
      getQuotesData();
    }

    setOpportunityName(oppData.opportunity_name);
    setOpportunityId(oppData._id);
    setParentOpportunity(oppData.parentOpportunity);
    setAccount(oppData.account);
    setNetPrice(oppData.net_price);
    setMargin(oppData.margin);
    setCost(oppData.cost);
    setStage(oppData.stage);
    setPermissionType(oppData.permissionType);
    setProbability(oppData.probability);
    setHours(oppData.hours);
    setSelectedCloseDate(oppData.close);
    console.log(oppData.close);
    setSelectedStartDate(oppData.start);
    setDuration_weeks(oppData.duration_weeks);
    setOwner(oppData.owner);
    setRegion(oppData.region);
    setVertical(oppData.vertical);
    setPractice(oppData.practice);
    setCurrency(oppData.currency);
    setOrg(oppData.org);
    setOpportunityType(oppData.opportunity_type);

  }, [user]);

  

  //function to get data using oppID received from the quotes page
  const [filteredopportunity, setFilteredopportunity] = useState([]);
  console.log(filteredopportunity);
  useEffect(() => {
    const getOpportunityData = async () => {
      console.log(qouteOpportunityID);
      try {
        const response = await fetch(`${baseUrl}/api/opportunity/getOpp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            opp_id: qouteOpportunityID,
          }),

        });
        if (response.ok) {
          const oppData = await response.json();
          console.log(oppData);
          console.log(
            oppData.data + "-----+--------+-------+--------+-------+"
          ); 
          setFilteredopportunity(oppData.data)
      } else{
        console.log("no Data Founfs");
      }
    }catch (error) {
        console.log(error);
      }
    };

    getOpportunityData();
  }, [qouteOpportunityID]);
  console.log(filteredopportunity);


  useEffect(() => {
    if (!filteredopportunity || !filteredopportunity[0]) {
      // If filteredAccounts is empty or null, or its first element is undefined, do not execute the rest of the code
      return;
    }

    // Execute the code only if filteredAccounts is not empty or null
    setOpportunityId(filteredopportunity[0]._id || "");
    console.log(filteredopportunity[0]._id);
    setAccount_Id(filteredopportunity[0].account_Id || "");
    console.log(filteredopportunity[0].account_Id);
    setOpportunityName(filteredopportunity[0].opportunity_name || "");
    console.log(opportunityName);
    setParentOpportunity(filteredopportunity[0].parentOpportunity || "");
    setAccount(filteredopportunity[0].account || "");
    setNetPrice(filteredopportunity[0].net_price || "");
    setMargin(filteredopportunity[0].margin || "");
    setCost(filteredopportunity[0].cost || "");
    setStage(filteredopportunity[0].stage || "");
    setPermissionType(filteredopportunity[0].permissionType || "");
    setProbability(filteredopportunity[0].probability || "");
    setHours(filteredopportunity[0].hours || "");
    setSelectedCloseDate(filteredopportunity[0].close || "");
    console.log(filteredopportunity[0].close)
    setSelectedStartDate(filteredopportunity[0].start || "");
    console.log(filteredopportunity[0].start)
    setDuration_weeks(filteredopportunity[0].duration_weeks || "");
    setOwner(filteredopportunity[0].owner || "");
    setRegion(filteredopportunity[0].region || "");
    setVertical(filteredopportunity[0].vertical || "");
    setPractice(filteredopportunity[0].practice || "");
    setCurrency(filteredopportunity[0].currency || "");
    setOrg(filteredopportunity[0].org || "");
    setOpportunityType(filteredopportunity[0].opportunity_type || "");
  }, [filteredopportunity]);

  // UPDATE OPPORTUNITY
  const handleUpdateOpportunity = () => {
    fetch(`${baseUrl}/api/opportunity/update/${opportunityId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        opportunity_name: opportunityName,
        net_price: netPrice,
        margin: margin,
        cost: cost,
        stage: stage,
        probability: probability,
        hours: hours,
        close: selectedCloseDate,
        start: selectedStartDate,
        duration_weeks: duration_weeks,
        owner: owner,
        region: region,
        vertical: vertical,
        practice: practice,
        currency: currency,
        org: org,
        opportunity_type: opportunityType,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.info("Opportunity updated successfully");
        console.log("Opportunity updated successfully!", data);
        window.location.href = "/account";
      })
      .catch((error) => {
        console.error("Error updating opportunity:", error);
      });
  };

  const deleteOpportunity = () => {
    fetch(`${baseUrl}/api/opportunity/delete/${opportunityId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Opportunity deleted successfully", {
          icon: (
            <span style={{ color: "red " }}>
              <FaTrash />
            </span>
          ),
          className: "custom-toast_delete",
        });
        const delay = 3000;
        setTimeout(() => {
          window.location.reload();
        }, delay);
        console.log("Opportunity Deleted successfully!", data);
        window.location.href = "/account";
      })
      .catch((error) => {
        console.error("Error Deleting opportunity:", error);
      });
  };

  //API to get the Quotes Data 
  // const[account_Id, setAccount_Id] = useState('');
  // const[opportunityId, setOpportunityId] = useState('');
  // const [quotesData, setQuotesData] = useState([]);

  console.log(account_Id, opportunityId);
  
  const getQuotesData = async () => {
    try {
      console.log(account_Id, opportunityId);
      const response = await fetch(`${baseUrl}/api/quotes/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },

        body: JSON.stringify({ 
          acc_key: acc_opp_id.acc_key || account_Id,
          opp_id: acc_opp_id.opp_id || opportunityId
        })
      });
      if (response) {
        const quoteData = await response.json();
        console.log(quoteData.data);
        setQuotesData(quoteData.data);
      } else {
        console.log('No Data Found');
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(quotesData);

  useEffect(() => {
    getQuotesData();
  }, [account_Id, opportunityId]);
  
  // ----------------------------------
  const [dbAccountData, setDbAccountData] = useState([]);
  console.log("!@#$%^&*");
  console.log(dbAccountData);
  // console.log("ACCOUNTDATA", JSON.stringify(dbAccountData, null, 2));

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
          console.log(accountss);
          console.log(accountss.data);
          setDbAccountData(accountss.data);

          if (dbAccountData == null) {
            try {
              const accDaata = account.data;
              console.log(accDaata);
            } catch (error) {
              console.log(error);
            }
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
  const currentAccountId = oppData.account_Id ||account_Id ; // Assuming account_Id is the ID of the current account
  const currentAccount = dbAccountData.find(account => account._id === currentAccountId);

  console.log("Current Account:", currentAccount);



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


  //------------------------------------------------------Function to get PeopleData with access from people table with access -----------------------------------------------

  //-------------------------------start function to get peopleData with access from people table-------------------------------------
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
  const userName = user && user.admin ? `${user.admin.firstname} ${user.admin.lastname}` : "";
  const optionOwner = [userName, ...(subOwners || "")];

  //----------------------------------------------------------------End Of the People Function---------------------------------------------

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
              {currentAccount ? currentAccount.accounts : ""}
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link
              href="/account"
              className="breadcrumbs--link--active"
            >
              {opportunityName}
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <div id="mainpage">
        <div className="opportunitydata">
          <div id="opportunitiesheader1">
            <HeaderBar headerlabel="OPPORTUNITY" />
          </div>
          <div className="dataleft">
            <div id="contentD1">
              <ErrorMessage
                label="OPPORTUNITY"
                showFlaxErrorMessageText={true}
                errormsg="OPPORTUNITY IS REQUIRED FIELD"
                value={opportunityName}
                onChange={(value) => setOpportunityName(value)}
                readOnly={permission === 'readOnly'}
              />
            </div>

            <div className="containerD2">
              <div id="contentD2">
                <InputTypes
                  showFlagText={true}
                  TextLabel={"PARENT OPPORTUNITY"}
                  value={parentOpportunity}
                  onChange={(value) => setParentOpportunity(value)}
                  readOnly={permission === 'readOnly'}
                />
              </div>
            </div>
            <div className="containerD3">
              <div id="contentD3">
                <InputTypes
                  showFlagText={true}
                  TextLabel={"ACCOUNT"}
                  value={account}
                  onChange={(value) => setAccount(value)}
                  readOnly={permission === 'readOnly'}
                />
              </div>
              <div id="contentD3A">
                <div id="contentO62">
                  <CustomDropdown
                    options={optionopportunitytype}
                    onSelect={handleActionSelectOpportunityType}
                    label="OPPORTUNITY TYPE"
                    value={opportunityType}
                    onChange={(value) => setOpportunityType(value)}
                    readOnly={permission === 'readOnly'}
                  />
                </div>
              </div>
            </div>
            <div className="containerD4">
              <div className="containt03container">
                <CustomDropdown
                  options={optionstage}
                  onSelect={handleActionSelectStage}
                  label="STAGE"
                  value={stage}
                  onChange={(value) => setStage(value)}
                  readOnly={permission === 'readOnly'}
                />
              </div>
              <div id="contentD4PermissionType">
                <div id="contentD4PermissionType">
                  <CustomDropdown
                    options={optionpermissiom}
                    onSelect={handleActionSelectPermissionType}
                    label="PERMISSION TYPE"
                    value={permissionType}
                    onChange={(value) => setPermissionType(value)}
                    readOnly={permission === 'readOnly'}
                  />
                </div>
              </div>
            </div>
            <div className="containerD5">
              <div id="contentD5">
                <InputTypes
                  showFlagText={true}
                  TextLabel={"PROBABILITY"}
                  value={probability}
                  onChange={(value) => setProbability(value)}
                  readOnly={permission === 'readOnly'}
                />
              </div>
              <div id="contentD5">
                <InputTypes
                  showFlagCalender={true}
                  key={`close-${selectedCloseDate}`}
                  CalenderLabel={"CLOSE"}
                  selectedDate={selectedCloseDate}
                  onCalendarChange={handleCalendarCloseChange}
                  readOnly={permission === 'readOnly'}
                // placeholder='Close date'
                />
              </div>
              <div id="contentD5">
                <InputTypes
                  showFlagCalender={true}
                  key={`start-${selectedStartDate}`}
                  CalenderLabel={"START"}
                  selectedDate={selectedStartDate}
                  onCalendarChange={handleCalendarStartChange}
                  readOnly={permission === 'readOnly'}
                // placeholder='Start Date'
                />
              </div>
            </div>
          </div>
          <div className="dataright">
            <div className="containerD6">
              <div id="contentD6">
                <InputTypes
                  showFlagNumber={true}
                  NumberLabel={"NET PRICE"}
                  numberplaceholder={"$0.00"}
                  value={netPrice}
                  onChange={(value) => setNetPrice(value)}
                  readOnly={permission === 'readOnly'}
                />
              </div>
              <div id="contentD6">
                <InputTypes
                  showFlagNumber={true}
                  NumberLabel={"MARGIN"}
                  numberplaceholder={"0%"}
                  value={margin}
                  onChange={(value) => setMargin(value)}
                  readOnly={permission === 'readOnly'}
                />
              </div>
            </div>
            <div className="containerD7">
              <div id="contentD7">
                <InputTypes
                  showFlagNumber={true}
                  NumberLabel={"COST"}
                  numberplaceholder={"$0.00"}
                  value={cost}
                  onChange={(value) => setCost(value)}
                  readOnly={permission === 'readOnly'}
                />
              </div>
              <div id="contentD7">
                <InputTypes
                  showFlagNumber={true}
                  NumberLabel={"WEEKS"}
                  numberplaceholder={"0%"}
                  value={duration_weeks}
                  onChange={(value) => setDuration_weeks(value)}
                  readOnly={permission === 'readOnly'}
                />
              </div>
            </div>
            <div className="containerD8">
              <div id="contentD8">
                <InputTypes
                  showFlagNumber={true}
                  NumberLabel={"LIST PRICE"}
                  numberplaceholder={"$0.00"}
                  value={list_price}
                  onChange={(value) => setListPrice(value)}
                  readOnly={permission === 'readOnly'}
                />
              </div>
              <div id="contentD8">
                <InputTypes
                  showFlagNumber={true}
                  NumberLabel={"DISCOUNT"}
                  numberplaceholder={"$0.00"}
                  value={discount}
                  onChange={(value) => setDiscount(value)}
                  readOnly={permission === 'readOnly'}
                />
              </div>
            </div>
            <div className="containerD9">
              <div id="contentD9">
                <InputTypes
                  showFlagNumber={true}
                  NumberLabel={"HOURS"}
                  numberplaceholder={"$0.00"}
                  value={hours}
                  onChange={(value) => setHours(value)}
                  readOnly={permission === 'readOnly'}
                />
              </div>
              <div id="contentD9">
                <InputTypes
                  showFlagNumber={true}
                  NumberLabel={"AVG RATE"}
                  numberplaceholder={"$0.00"}
                  value={avgRate}
                  onChange={(value) => setAvgRate(value)}
                  readOnly={permission === 'readOnly'}
                />
              </div>
            </div>
            <div className="containerD10">
              <div id="contentO61">
                <div id="contentO61">
                  <CustomDropdown
                    options={optionorg}
                    onSelect={handleActionSelectOrg}
                    label="ORG"
                    value={org}
                    onChange={(value) => setOrg(value)}
                    readOnly={permission === 'readOnly'}
                  />
                </div>
              </div>
              <div id="contentD10">
                <div className="content6container1">
                  <div id="contentO6">
                    <CustomDropdown
                      options={optioncurrency}
                      onSelect={handleActionSelectCurrency}
                      label="CURRENCY"
                      value={currency}
                      onChange={(value) => setCurrency(value)}
                      readOnly={permission === 'readOnly'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*OPPORTUNITY DETAILS  */}

          <div onClick={handleToggledetail}>
            <HeaderBar
              headerlabel={"DETAILS"}
              isButtonVisible={true}
              isDropdownOpen={isDetailOpen}
            />
          </div>
          {isDetailOpen && (
            <div id="oppodetails" className="hidden1" >
              <div className="input_description">
                <InputTypes
                  showFlagTextarea={true}
                  textareaplaceholder={"Enter Description"}
                  TextareaLabel={"DESCRIPTION"}
                  value={description}
                  textarealabelcustom={"description_label"}
                  onChange={(value) => setDescription(value)}
                />
              </div>
              <div className="containerDleft_data">
                <div id="contentD12">
                <CustomDropdown
                        options={optionOwner}
                        onSelect={handleOwnerSelect}
                        label="OWNER"
                        labelforverticl="ownerlabel"
                        custuminput="custom_dropdown_owner"
                        value={owner}
                        onChange={(value) => setOwner(value)}
                        readOnly={permission === 'readOnly'}
                      />
                       <div className="profile-icon">
                        {owner
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </div>
                </div>
                <div id="contentD12">
                  <CustomDropdown
                    onSelect={handleActionSelect1}
                    label="DELIVERY MANAGER"
                    readOnly={permission === 'readOnly'}
                  />
                </div>

                <div id="contentD12">
                  <CustomDropdown
                    options={optionregion}
                    onSelect={handleActionSelectrRegion}
                    label="REGION"
                    readOnly={permission === 'readOnly'}
                    value={region}
                    onChange={(value) => setRegion(value)}
                  />
                </div>
                <div id="contentD12">
                  <CustomDropdown
                    options={optionvertical}
                    onSelect={handleActionSelectVertical}
                    label="VERTICAL"
                    value={vertical}
                    onChange={(value) => setVertical(value)}
                    readOnly={permission === 'readOnly'}
                  />

                </div>
              </div>
              <div className="containerDleft">
                <div id="contentO5">
                  <InputTypes
                    showFlagCalender={true}
                    key={`duedate-${selectedDueDate}`}
                    selectedDate={selectedDueDate}
                    onCalendarChange={handleCalendarDueDateChange}
                    readOnly={permission === 'readOnly'}
                    CalenderLabel={"DUE DATE"}
                  />
                </div>

                <div id="contentO52">
                  <CustomDropdown
                    options={optionstatus}
                    onSelect={handleActionSelect1}
                    label="STATUS"
                    readOnly={permission === 'readOnly'}
                    value={status}
                    onChange={(value) => setStatus(value)}
                  />
                </div>

                <div id="contentO53">
                  <CustomDropdown
                    options={optionpractice}
                    onSelect={handleActionSelectPractice}
                    label="PRACTICE"
                    value={practice}
                    onChange={(value) => setPractice(value)}
                    readOnly={permission === 'readOnly'}
                  />
                </div>

                <div id="contentO53">
                  <CustomDropdown
                    options={optiontemplatequote}
                    onSelect={handleActionSelect1}
                    label="TEMPLATE QUOTE"
                    readOnly={permission === 'readOnly'}
                  />
                </div>
              </div>

            </div>
          )}
          <div>
            <BillingAndShippingAddress
              billingAddress={billingAddress}
              setBillingAddress={setBillingAddress}
              shippingAddress={shippingAddress}
              setShippingAddress={setShippingAddress}
              readOnly={permission === 'readOnly'}
            />
          </div>
          {/* opportunity quote table */}
          <div className="downloadandreload">
            {/* <div className="downloadquotes">
              <span className="fa fa-file-excel-o" id="excelid" />
              <div>
                <label className="ex_down">DOWNLOAD</label>
              </div>
            </div> */}
            <div className="quoteshead">
              {quote_add !== 'none' && (
                <b>QUOTES</b>
              )}
            </div>
            {/* <div className="reload">
              <span className="fa fa-refresh" id="refreshid" />
              <div>
                <label className="re_load">RELOAD</label>
              </div>
            </div> */}
          </div>
          <div className="listquotes">
          {quote_add !== 'none' && (
    <>
      {quotesData && quotesData.length > 0 ? (
        <table id="tblStocksQuotes">
          <tbody>
            <tr className="ellipsisquotes">
              <th className="tableHeading">PRIMARY</th>
              <th className="tableHeading">STATUS</th>
              <th className="tableHeading">QUOTE</th>
              <th className="tableHeading">DESCRIPTION</th>
              <th className="tableHeading">LAST EDITED</th>
              <th className="tableHeading">BY</th>
              <th className="tableHeading">NET PRICE</th>
              <th className="tableHeading">MARGIN</th>
            </tr>
            {quotesData.map((quotes, index) => (
              <tr key={index} >
                <td className="tabledata">{index + 1}</td>
                <td className="tabledata"></td>
                <td className="tabledata">
                  <Link
                    to={`/guidedselling?guidedAnswerPermission=${quote_add}`}
                    state={{ template: quotes.template_type, acc_opp_id: oppData, quotes: quotes }}
                  >
                    {quotes.quotes_name}
                  </Link>
                </td>
                <td className="tabledata"></td>
                <td className="tabledata">
                  <Link style={{ fontSize: "8px", fontWeight: "770"}}
                    to={`/guidedselling?guidedAnswerPermission=${quote_add}` }
                    state={{ template: quotes.template_type, acc_opp_id: oppData, quotes: quotes }}
                  >
                   {new Date(quotes.modifiedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' , hour: '2-digit', minute: '2-digit', second: '2-digit' })}

                    {/* {quotes.modifiedAt} */}
                  </Link>
                </td>
                <td className="tabledata"></td>
                <td className="tabledata"></td>
                <td className="tabledata"></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{color:"#ccc" ,textAlign:"center"}}>No quotes found</p>
      )}
      <br />
      <div className="plus-quotes">
        <Link to="/quotecreation" state={acc_opp_id}>
          {(quote_add === "access" || quote_add === "null" || quote_add === "") && (
            <FaPlus style={{ color: "267c98" }} />
          )}
        </Link>
      </div>
    </>
  )}
            <div className="saveandcancel">
              {!isReadOnly ? (
                <button
                  id="update_data"
                  type="submit"
                  onClick={handleUpdateOpportunity}
                >
                  UPDATE
                </button>
              ) : null}
              {!isReadOnly ? (
                <button
                  id="delete_data"
                  type="submit"
                  onClick={deleteOpportunity}
                >
                  DELETE
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OpportunitiesData;
