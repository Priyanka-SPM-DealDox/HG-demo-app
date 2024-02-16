import React, { useState } from "react";
import Navbar from "../../layouts/Navbar";
import { Link } from "react-router-dom";
import AdminSidebar from "../../layouts/AdminSidebar";
import WriteFlex from "../../components/common/WriteFlex";
import Addinfo from "../../components/addinfo/Addinfo";
import HeaderBar from "../../components/common/HeaderBar";
import InputTypes from "../../components/common/InputTypes";
import CustomDropdown from "../../components/common/CustomDropdown";
import ErrorMessage from "../../components/common/ErrorMessage";
import "../../assets/css/company/CompanyOrgs.css";
import HelpRequest from "../../components/common/HelpRequest";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import SidePanel from "../../components/common/SidePanel";

const CompOrgs = () => {
  const parentOptions = [];
  const orgTypeOptions = ["SOURCING", "SALES", "BOTH"];
  const DefaultTimeOptions = ["HOURS", "DAYS"];
  const languagesOptions = [
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

  const currencyListOptions = [
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
    "Viet Nam Dong VND",
    "Wallis and Futuna Is. CFP Franc XPF",
    "Western Sahara Moroccan Dirham MAD",
    "Yemen Yemeni Rial YER",
    "Zambia Zambian Kwacha ZMW",
    "Zimbabwe Zimbabwe Dollar ZWL",
  ];

  const [, setParentOptions] = useState(null);
  const [, setOrgTypeOptions] = useState(null);
  const [, setDefaultTimeOptions] = useState(null);
  const [, setSelectedOptionLanguageComp] = useState(null);
  const [, setSelectedOptionCurrency] = useState(null);

  const handleparentOptions = (selectedOption) => {
    setParentOptions(selectedOption);
  };
  const handleOrgTypeOptions = (selectedOption) => {
    setOrgTypeOptions(selectedOption);
  };

  const handleDefaultTimeClick = (selectedOption) => {
    setDefaultTimeOptions(selectedOption);
  };

  const handleOptionSelectLanguageComp = (selectedOption) => {
    setSelectedOptionLanguageComp(selectedOption);
  };
  const handleOptionSelectCurency = (selectedOption) => {
    setSelectedOptionCurrency(selectedOption);
  };
  // =======================================================================
  const [accountSideBar, setAccountSidebar] = useState(false);

  const handleOpenAccountSideBar = () => {
    setAccountSidebar(!accountSideBar);
  };

  return (
    <div>
      <Navbar />
      <AdminSidebar />
      <div className="bread">
        <ul className="breadcrumbs">
          <li className="breadcrumbs--item">
            <Link href="/home" className="breadcrumbs--link_mid">
              Home
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link href="/catalog" className="breadcrumbs--link_mid">
              Admin
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link href="" className="breadcrumbs--link--active">
              Company Organisation
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <HelpRequest />
      {/* -------------------------- */}
      <div className="roworg" id="orgsrows">
        <WriteFlex showGrouping={false} />
        <div
          id="rightOrgshead"
          style={{
            width: accountSideBar ? "65%" : "100%",
            borderRight: accountSideBar ? "3px solid #216c98" : "none",
          }}
        >
          <button
            id="openbtn"
            onClick={handleOpenAccountSideBar}
            style={{ marginRight: accountSideBar ? "18%" : "0%" }}
          >
            {accountSideBar ? <FaLessThan /> : <FaGreaterThan />}
          </button>
          <div className="profile_header">
            <HeaderBar headerlabel="COMPANY ORG" />
          </div>
          <div className="org_main_div">
            <div class="grid1">
              <div id="orgname">
                <ErrorMessage
                  showFlaxErrorMessageText={true}
                  placeholdersection="Enter Name"
                  label="ORG NAME"
                  errormsg="THE FIELD IS REQUIRED"
                />
              </div>
              <div id="activeorg">
                <InputTypes
                  showFlagCheckBox={true}
                  checkboxlabel="checboxorglabel"
                  checkmarkbox="checkmarkboxinput"
                  Checkboxlabel="ACTIVE"
                />
              </div>
            </div>
            <div id="grid2">
              <div id="orgcode">
                <ErrorMessage
                  showFlaxErrorMessageText={true}
                  label="ORG CODE"
                  placeholdersection="Enter Code"
                />
              </div>
              <div id="external">
                <InputTypes
                  showFlagText={true}
                  TextLabel="EXTERNAL REFERENCE"
                  textplaceholder="External Reference"
                />
              </div>
            </div>
            <div id="grid3">
              <div id="parent">
                <CustomDropdown
                  options={parentOptions}
                  onSelect={handleparentOptions}
                  label="PARENT ORG"
                  Placeholder="Select Parent"
                />
              </div>
              <div id="orgtype">
                <CustomDropdown
                  options={orgTypeOptions}
                  onSelect={handleOrgTypeOptions}
                  label="ORG TYPE"
                />
              </div>
            </div>

            <div id="grid4">
              <div id="defaulttime">
                <CustomDropdown
                  options={DefaultTimeOptions}
                  onSelect={handleDefaultTimeClick}
                  label="DEFAULT TIME UOM"
                  Placeholder="Select UOM"
                />
              </div>
              <div id="Defaultweekhours">
                <InputTypes
                  showFlagNumber={true}
                  NumberLabel="DEFAULT WEEK HOURS"
                  numberplaceholder="Enter hours"
                />
              </div>
            </div>

            <div id="grid5">
              <div id="languageorg">
                <CustomDropdown
                  label="LANGUAGES"
                  options={languagesOptions}
                  onSelect={handleOptionSelectLanguageComp}
                />
              </div>
              <div id="currency">
                <CustomDropdown
                  label="CURRENCY"
                  options={currencyListOptions}
                  onSelect={handleOptionSelectCurency}
                />
              </div>
            </div>

            <div id="grid6">
              <div id="cola">
                <ErrorMessage
                  showFlaxErrorMessageNumber={true}
                  placeholdersection="Yearly Price Adjustment"
                  labelnumber="COLA"
                  errornumbermsg="COLA INVALID NUMBER,PLEASE RE-ENTER"
                />
              </div>
              <div id="pola">
                <ErrorMessage
                  showFlaxErrorMessageNumber={true}
                  placeholdersection="Yearly Cost Adjustment"
                  labelnumber="POLA"
                  errornumbermsg="POLA INVALID NUMBER,PLEASE RE-ENTER"
                />
              </div>
              <div id="cost">
                <InputTypes
                  showFlagCheckBox={true}
                  Checkboxlabel="COST READ ONLY"
                  checkboxlabel="check_box_label_dupecheck_box_label_dupe"
                />
              </div>
            </div>
            <Addinfo />
            <div id="grid10">
              <button type="button" id="delete_data">
                Remove Org
              </button>
            </div>
          </div>

          {/* sidebar org */}
        </div>
        {/* -------------------------------------------- */}
        <div
          className="sidepanel"
          style={{ width: accountSideBar ? "20%" : "0%" }}
        >
          <SidePanel showFlagTimeStamp={true} />
        </div>
      </div>
    </div>
  );
};

export default CompOrgs;
