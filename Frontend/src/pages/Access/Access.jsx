import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../layouts/Navbar";
import AdminSidebar from "../../layouts/AdminSidebar";
import { Link } from "react-router-dom";
import WriteFlex from "../../components/common/WriteFlex";
import HeaderBar from "../../components/common/HeaderBar";
import InputTypes from "../../components/common/InputTypes";
import CustomDropdown from "../../components/common/CustomDropdown";
import "../../assets/css/access/Access.css";
import HelpRequest from "../../components/common/HelpRequest";
import { baseUrl } from "../../config";
import { useAuthContext } from "../../hooks/useAuthContext";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa";

const Access = () => {
  const { user } = useAuthContext();
  console.log(user);

  const [isDropdownOpenextra, setisDropdownOpenextra] = useState(false);
  const [searchValueextra, setSearchValueextra] = useState("");
  const [, setSelectedItemextra] = useState("");
  const [displayvalueextra, setdisplayvalueextra] = useState("");
  const [peopleWithoutAccess, setPeopleWithoutAccess] = useState([]);
  const [peopleWithAccess, setPeopleWithAccess] = useState([]);
  const [securityRoleData, setSecurityRoleData] = useState([]);
  const [securityRole, setSecurityRole] = useState("");
  const [password, setPassword] = useState("");
  const inputrefextra = useRef(null);
  const dropdownRefextra = useRef(null);
  const [showAccess, setShowAccess] = useState(false);

  useEffect(() => {
    const handleClickOutsideroleextra = (event) => {
      const dropdownElement = dropdownRefextra.current;
      const inputElement = inputrefextra.current;
      if (
        dropdownElement &&
        !dropdownElement.contains(event.target) &&
        inputElement &&
        !inputElement.contains(event.target)
      ) {
        setisDropdownOpenextra(false);
      }
    };

    const handleWindowMousedown = (event) => {
      handleClickOutsideroleextra(event);
    };

    window.addEventListener("mousedown", handleWindowMousedown);

    return () => {
      window.removeEventListener("mousedown", handleWindowMousedown);
    };
  }, []);

  const toggledropdownextra = () => {
    setisDropdownOpenextra(!isDropdownOpenextra);
  };

  const handleOptionSelectextra = (optionsextra) => {
    setSelectedItemextra(optionsextra);

    setisDropdownOpenextra(false);

    setdisplayvalueextra(optionsextra);
    document.getElementById("accessshow").style.display = "block";
    var accesslist = document.getElementById("unique");
    accesslist.style.display = "none";
  };

  console.log(peopleWithoutAccess);

  let peoplesData =
    peopleWithoutAccess.length > 0
      ? peopleWithoutAccess.map((people) => people.first_name)
      : [];
  console.log(peoplesData);

  //Map only name to DropDown
  const optionsextra = peoplesData;
  const filteredOptionextra = optionsextra.filter((optionsextra) => {
    const isMatch =
      typeof optionsextra === "string" &&
      optionsextra.toLowerCase().includes(searchValueextra.toLowerCase());

    console.log(`Option: ${optionsextra}, Match: ${isMatch}`);
    console.log(optionsextra);
    return isMatch;
  });
  console.log("Filtered options:", filteredOptionextra);

  const handleSearchChangeextra = (e) => {
    const value = e.target.value;
    setSearchValueextra(value);
    setdisplayvalueextra(value);
  };
  const [, setSecurityOptions] = useState(null);
  const [, setAccessOrgOptions] = useState(null);
  const [, setTimeZoneOptions] = useState(null);
  const [, setlanguagesAcessOptions] = useState(null);
  const [, setNotificationAcessOptions] = useState(null);

  const asscessOrgOptions = [
    "AFRICA",
    "ALL OTHER AP",
    "AP-ALL OTHER",
    "AP-AUS/JP",
    "AP-CHINA",
    "AP-INDIA",
    "ARGENTINA",
    "AUSTRALIA",
  ];
  const timeZoneOptions = [
    "AFRICA/ABIDJAN(FEBRUARY 16TH,6:40AM)",
    "AFRICA/ACCRA(FEBRUARY 16TH,6:40AM)",
    "AFRICA/ADDIS_ABABA(FEBRUARY 16TH,9:40AM)",
    "AFRICA/ALGIERS(FEBRUARY 16TH,7:40AM)",
    "AFRICA/ASMARA(FEBRUARY 16TH,9:40AM)",
    " AFRICA/ASMERA(FEBRUARY 16TH,9:40AM)",
    "AFRICA/BANGUI(FEBRUARY 16TH,7:40AM)",
    "AFRICA/BAMAKO(FEBRUARY 16TH,6:40AM)",
  ];
  const languagesAcessOptions = [
    "Afrikaans",
    "Afrikaans",
    "Albanian",
    "Amharic",
    "Arabic",
    "Armenian",
    "Assamese",
    "Azerbaijani",
    "Bashkir",
    "Basque",
    "Belarusian",
    "Bengali",
    "Bihari",
    "Bislama",
    "Bosnian",
    "Breton",
    "Bulgarian",
    "Burmese",
    "Cambodian (Khmer)",
    "Catalan",
    "Cebuano",
    "Chamorro",
    "Chechen",
    "Chichewa",
    "Chinese (Mandarin)",
    "Chinese (Mandarin, Cantonese, etc.)",
    "Chuvash",
    "Cornish",
    "Corsican",
    "Cree",
    "Croatian",
    "Czech",
    "Danish",
    "Divehi",
    "Dutch",
    "Dzongkha (Bhutanese)",
    "English",
    "Esperanto",
    "Estonian",
    "Ewe",
    "Faroese",
    "Fijian",
    "Filipino",
    "Filipino (Tagalog)",
    "Finnish",
    "French",
    "Frisian",
    "Fulah",
    "Galician",
    "Georgian",
    "German",
    "Greek",
    "Greenlandic",
    "Guarani",
    "Gujarati",
    "Haitian Creole",
    "Hausa",
    "Hawaiian",
    "Hebrew",
    "Hindi",
    "Hmong",
    "Hungarian",
    "Icelandic",
    "Igbo",
    "Indonesian",
    "Interlingua",
    "Interlingue (Occidental)",
    "Inuktitut",
    "Inupiaq",
    "Irish",
    "Italian",
    "Japanese",
    "Javanese",
    "Kalaallisut (Greenlandic)",
    "Kannada",
    "Kanuri",
    "Kashmiri",
    "Kazakh",
    "Khmer",
    "Khmer (Cambodian)",
    "Kikuyu",
    "Kinyarwanda",
    "Kirghiz",
    "Kirundi",
    "Komi",
    "Kongo",
    "Korean",
    "Kurdish",
    "Kwanyama",
    "Kyrgyz",
    "Lao",
    "Latin",
    "Latvian",
    "Limburgish",
    "Lingala",
    "Lithuanian",
    "Lojban",
    "Lombard",
    "Luganda",
    "Luxembourgish",
    "Macedonian",
    "Malagasy",
    "Malay",
    "Malayalam",
    "Maltese",
    "Manx",
    "Maori",
    "Marathi",
    "Marshallese",
    "Moldovan",
    "Mongolian",
    "Montenegrin",
    "Nauruan",
    "Navajo",
    "Ndonga",
    "Nepali",
    "North Ndebele",
    "Northern Sami",
    "Norwegian",
    "Norwegian Bokmål",
    "Norwegian Nynorsk",
    "Occitan",
    "Ojibwe",
    "Old Church Slavonic",
    "Oriya",
    "Oromo",
    "Ossetian",
    "Pali",
    "Papiamento",
    "Pashto",
    "Persian (Farsi)",
    "Polish",
    "Portuguese",
    "Punjabi",
    "Quechua",
    "Rhaeto-Romance",
    "Romanian",
    "Russian",
    "Rwandan",
    "Samoan",
    "Sango",
    "Sanskrit",
    "Sardinian",
    "Scots Gaelic",
    "Scottish Gaelic",
    "Serbian",
    "Serbo-Croatian",
    "Sesotho",
    "Setswana",
    "Shona",
    "Sichuan Yi",
    "Sindhi",
    "Sinhalese",
    "Slovak",
    "Slovenian",
    "Somali",
    "South Ndebele",
    "Southern Sotho",
    "Spanish",
    "Sundanese",
    "Swahili",
    "Swati",
    "Swedish",
    "Tagalog",
    "Tahitian",
    "Tajik",
    "Tamil",
    "Tatar",
    "Telugu",
    "Thai",
    "Tibetan",
    "Tigrinya",
    "Tonga",
    "Tsonga",
    "Tswana",
    "Turkish",
    "Turkmen",
    "Twi",
    "Uighur",
    "Ukrainian",
    "Urdu",
    "Uzbek",
    "Venda",
    "Vietnamese",
    "Volapük",
    "Walloon",
    "Welsh",
    "Western Frisian",
    "Wolof",
    "Xhosa",
    "Yiddish",
    "Yoruba",
    "Zhuang",
    "Zulu",

  ];
  const NotificationAcessOptions = ["BY DEALDOX", "BY EMAIL"];

  const handleSecurityListOptions = (selectedOption) => {
    setSecurityRole(selectedOption);
  };
  const handleAccessOrgClick = (selectedOption) => {
    setAccessOrgOptions(selectedOption);
  };
  const handleTimeZoneClick = (selectedOption) => {
    setTimeZoneOptions(selectedOption);
  };

  const handlelanguageAccessOptions = (selectedOption) => {
    setlanguagesAcessOptions(selectedOption);
  };

  const handleNotificationAccessOptions = (selectedOption) => {
    setNotificationAcessOptions(selectedOption);
  };

  const [isDropdownAccessVisible, setDropdownAccessVisible] = useState(true);

  //API to get SecurityRole Name
  const getSecurityRoleData = async () => {
    try {
      let response = await fetch(`${baseUrl}/api/security/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      console.log(json);
      if (json) {
        setSecurityRoleData(json.data);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getSecurityRoleData();
  }, [user]);

  console.log(securityRoleData);
  let securityData =
    securityRoleData.length > 0
      ? securityRoleData.map((srole) => srole.role_name)
      : [];
  console.log(securityData);

  const securitylistitems = [...securityData];

  console.log("@#$%");
  console.log(displayvalueextra);

  //API to get data of the selected person
  const [getSinglePeople, setGetSinglePeople] = useState([]);
  const getPeopleData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/access/getPeople`, {
        method: "POST", // Use POST method for sending data in the request body
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          first_name: displayvalueextra,
        }),
      });

      if (response.ok) {
        const accessData = await response.json();
        console.log(accessData);
        setGetSinglePeople(accessData.data);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPeopleData();
  }, [displayvalueextra]);

  //End of API

  //Assigning Data of People and assigning into input tag value
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    if (Array.isArray(getSinglePeople) && getSinglePeople.length > 0) {
      setFirstName(getSinglePeople[0]?.first_name || "");
      setLastName(getSinglePeople[0]?.last_name || "");
      setEmail(getSinglePeople[0]?.email || "");
      setTitle(getSinglePeople[0]?.title || "");
      setPhone(getSinglePeople[0]?.phone || "");
      setUid(getSinglePeople[0]?.uid || "");
    }
  }, [getSinglePeople]);

  //end

  //API to update the security Role of people
  const updatePeople = async () => {
    if (!securityRole) {
      toast.info("Please fill Security Role fields.");
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/api/access/updateAccess`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          access: "granted",
          email: email,
          securityRole: securityRole,
          password: password,
        }),
      });

      if (response.ok) {
        toast.success("Access granted successfully", {
          icon: (
            <span style={{ color: "rgb(74, 146, 59) " }}>
              <FaUser />
            </span>
          ),
          className: "custom-toast_add",
        });
        window.location.href = `/setPassword?securityRole=${securityRole}&email=${email}&access=${"granted"}`;
        console.log("People  Updated successfully!");
        const delay = 1000;
        setTimeout(() => {
          window.location.reload();
        }, delay);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemSelect = (selectedItem, selectedIndex) => {
    const selectedData = peopleWithAccess[selectedIndex] || peopleWithAccess[0];
    setFirstName(selectedData.first_name || "");
    setLastName(selectedData.last_name || "");
    setEmail(selectedData.email || "");
    setTitle(selectedData.title || "");
    setPhone(selectedData.phone || "");
    setUid(selectedData.uid || "");
    setSecurityRole(selectedData.securityRole || "");
    setShowAccess(true);
    setDropdownAccessVisible(false);
  };

  const resetFields = () => {
    setShowAccess(false);
    setDropdownAccessVisible(true);
  };

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
          const peoplewithAccess = people.data.filter(
            (access) => access.access === "granted"
          );
          const peopleWithoutAccess = people.data.filter(
            (access) => access.access != "granted"
          );
          setPeopleWithAccess(peoplewithAccess);
          setPeopleWithoutAccess(peopleWithoutAccess);
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPeopledata();
  }, [user]);

  //API to Remove Access
  const removeAccess = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/access/deleteAccess`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          access: "null",
          email: email,
        }),
      });
      if (response.ok) {
        alert("Access Has Been removed!");
        const delay = 1000;
        setTimeout(() => {
          window.location.reload();
        }, delay);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <AdminSidebar />
      <div className="bread">
        <ul className="breadcrumbs">
          <li className="breadcrumbs--item">
            <Link to="/home" className="breadcrumbs--link_mid">
              Home
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="/companyprofile" className="breadcrumbs--link_mid">
              Admin
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="" className="breadcrumbs--link--active">
              Access
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      {/* ---------------------------- */}
      <HelpRequest />
      <div>
        <div className="rowaccess">
          <WriteFlex
            resetFields={resetFields}
            showGrouping={false}
            data={peopleWithAccess}
            dataType="peopleWithAccess"
            onItemSelect={handleItemSelect}
          />

          <div className="rightaccess">
            <HeaderBar headerlabel="ACCESS" />

            {isDropdownAccessVisible && (
              <div id="unique">
                <input
                  className="extrainput"
                  type="text"
                  onClick={toggledropdownextra}
                  value={displayvalueextra}
                  ref={inputrefextra}
                  onChange={handleSearchChangeextra}
                />

                <label id="labelextra">SELECT PERSON TO GIVE ACCESS TO </label>

                <i
                  className={`fa fa-caret-${
                    isDropdownOpenextra ? "up" : "down"
                  }`}
                  id="toggleextra"
                  onClick={toggledropdownextra}
                ></i>

                {isDropdownOpenextra && (
                  <ul id="extralist" ref={dropdownRefextra}>
                    {searchValueextra.length < 4 ? (
                      <li id="norextra">PLEASE ENTER 3 OR MORE CHARACTERS</li>
                    ) : (
                      filteredOptionextra.map((option) => (
                        <li
                          id="full"
                          key={option}
                          onClick={() => handleOptionSelectextra(option)}
                        >
                          {option}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
            )}
            {/* {bodyAccesVisible && ( */}
            <div
              id="accessshow"
              style={{ display: showAccess ? "block" : "none" }}
            >
              {/* Selected item: {selectedItemextra} */}
              <div className="grid-access">
                <div id="left-grid-access">
                  <i className="fa fa-circle" aria-hidden="true" />
                  <p>PENDING(EXPIRED)</p>
                  <label>EXPIRATION</label>
                </div>
                <div id="right-grid-access">
                  <div className="containerAccess1">
                    <div id="contentAccess1">
                      <InputTypes
                        showFlagText={true}
                        TextLabel="FIRST NAME"
                        textplaceholder="Enter First Name"
                        value={firstName}
                        onChange={(value) => setFirstName(value)}
                      />
                    </div>
                    <div id="contentAccess2">
                      <InputTypes
                        showFlagText={true}
                        TextLabel="LAST NAME"
                        textplaceholder="Enter Last Name"
                        value={lastName}
                        onChange={(value) => setLastName(value)}
                      />
                    </div>
                  </div>
                  <div className="containerAccess2">
                    <div id="contentAccess3">
                      <InputTypes
                        showFlagText={true}
                        TextLabel="TITLE"
                        textplaceholder="Enter Title"
                        value={title}
                        onChange={(value) => setTitle(value)}
                      />
                    </div>
                    <div id="contentAccess4">
                      <InputTypes showFlagText={true} TextLabel="MANAGER" />
                    </div>
                  </div>
                  <div className="containerAccess3">
                    <div id="contentAccess5">
                      <InputTypes
                        showFlagNumber={true}
                        NumberLabel="PHONE"
                        numberplaceholder="Enter Phone Number "
                        value={phone}
                        onChange={(value) => setPhone(value)}
                      />
                    </div>
                    <div id="contentAccess6">
                      <InputTypes
                        showFlagEmail={true}
                        EmailLabel="EMAIL"
                        value={email}
                        onChange={(value) => setEmail(value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="containerAccess4">
                <div id="contentAccess7">
                  <button
                    id="removeaccess"
                    type="reset"
                    style={{ color: "red" }}
                    onClick={removeAccess}
                  >
                    REMOVE ACCESS
                  </button>
                  <button
                    id="resendemail"
                    type="submit"
                    style={{ color: "rgb(0, 79, 128)" }}
                  >
                    RESEND EMAIL
                  </button>
                </div>
                <div id="contentAccess8">
                  <InputTypes
                    showFlagNumber={true}
                    NumberLabel="UID"
                    numberplaceholder="Enter UID"
                    value={uid}
                    onChange={(value) => setUid(value)}
                  />
                </div>
              </div>
              <div className="containerAccess5">
                <div className="role1">
                  <h4>ROLE</h4>
                </div>
                <div className="roles1">
                  Roles are defined in the Admin Security section on the left
                </div>
              </div>
              <div className="containerAccess6">
                <div id="contentAccess9">
                  <InputTypes
                    showFlagCheckBox={true}
                    Checkboxlabel="INTEGRATION ACCESS ONLY"
                    checkmarkbox="checkmarkboxaccess"
                  />
                  <div className="checkBoxAccess">
                    <InputTypes
                      showFlagCheckBox={true}
                      Checkboxlabel="INTEGRATION ACCESS ONLY"
                      checkmarkbox="checkmarkbox"
                    />
                  </div>
                </div>

                <div id="contentAccess10">
                  <button
                    id="deleteandtoken"
                    type="reset"
                    style={{ color: "red" }}
                  >
                    DELETE REFRESH TOKEN
                  </button>
                </div>
              </div>
              <div className="containerAccess7">
                <div id="contentAccess11">
                  <CustomDropdown
                    options={securitylistitems}
                    onSelect={handleSecurityListOptions}
                    label="SECURITY ROLE"
                    value={securityRole}
                    onChange={(value) => setSecurityRole(value)}
                    isBorderVisible={true}
                  />
                </div>

                <div id="contentAccess12">
                  <InputTypes
                    showFlagNumber={true}
                    NumberLabel="PASSWORD EXPIRATION DATE"
                    numberplaceholder="Enter expiry date"
                    onfocus="(this.type='date')"
                  />
                </div>
              </div>
              <div className="refernce1">
                <h4>REFERENCE</h4>
              </div>

              <div className="containerAccess8">
                <div id="contentAccess13">
                  <CustomDropdown
                    options={asscessOrgOptions}
                    onSelect={handleAccessOrgClick}
                    label="ORG"
                    Placeholder="Select Org"
                  />
                </div>
                <div id="contentAccess14">
                  <CustomDropdown
                    options={timeZoneOptions}
                    onSelect={handleTimeZoneClick}
                    placeholder="select Time Zone"
                    label="TIME ZONE"
                  />
                </div>
              </div>
              <div className="containerAccess9">
                <div id="contentAccess15">
                  <CustomDropdown
                    options={languagesAcessOptions}
                    onSelect={handlelanguageAccessOptions}
                    label="LANGUAGES"
                    placeholder="Select Language"
                  />
                </div>
                <div id="contentAccess16">
                  <CustomDropdown
                    options={NotificationAcessOptions}
                    onSelect={handleNotificationAccessOptions}
                    label="NOTIFICATIONS"
                    placeholder="Select Notification"
                  />
                </div>
              </div>
              <div className="login_email_div">
                <div className="loginemailpswd">
                  <h4>LOGIN EMAIL &amp; PASSWORD</h4>
                </div>
                <div className="login_email_msg">
                  <i>Cannot update password untill the Account is activated</i>
                </div>
              </div>
              <div className="loginEml">
                <h4>LOGIN EMAIL: </h4>
                <button
                  className="SendEmailAcess"
                  id="update_data"
                  onClick={updatePeople}
                >
                  SEND EMAIL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Access;
