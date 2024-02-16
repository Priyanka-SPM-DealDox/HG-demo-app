import React, { useState, useEffect } from "react";
import Navbar from "../../layouts/Navbar";
import AdminSidebar from "../../layouts/AdminSidebar";
import "../../assets/css/company/CompanyProfile.css";
import { Link } from "react-router-dom";
import HeaderBar from "../../components/common/HeaderBar";
import InputTypes from "../../components/common/InputTypes";
import CustomDropdown from "../../components/common/CustomDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../../config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CompanyProfile = () => {
  const { user } = useAuthContext();
  console.log(user);
  const languagesOptions = [
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

  const [selectedOptionLanguage, setSelectedOptionLanguage] = useState(null);
  const [logoSrc, setLogoSrc] = useState(null);

  const handleProfileLogoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Data = e.target.result;
        setCompanyLogo(base64Data);
        setLogoSrc(URL.createObjectURL(file));
      };

      reader.readAsDataURL(file);
    }
  };
  const handleOptionSelectLanguage = (selectedOption) => {
    setSelectedOptionLanguage(selectedOption);
  };

  // backend code start
  const [mode, setMode] = useState("create"); // Initially set to 'create'
  //useState to save data of DB
  const [companyId, setCompanyId] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [userAuthorizationDomain, setUserAuthorizaytionDomain] = useState("");
  const [companyDomain, setCompanyDomain] = useState("");
  const [contactPersonFirstName, setContactPersonFirstName] = useState("");
  const [contactPersonLastName, setContactPersonLastName] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const labelText = logoSrc || companyLogo ? "CHANGE LOGO" : "UPLOAD LOGO";

  // adding company
  const addCompany = () => {
    const newCompData = {
      companyLogo: companyLogo,
      companyName: companyName,
      searchValue: selectedOptionLanguage,
      userAuthorizationDomain: userAuthorizationDomain,
      companyDomain: companyDomain,
      contactPersonFirstName: contactPersonFirstName,
      contactPersonLastName: contactPersonLastName,
      phone: phone,
      email: email,
      street: street,
      city: city,
      state: state,
      country: country,
    };

    fetch(`${baseUrl}/api/company/add`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newCompData),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Profile added successfully", {
            icon: (
              <span style={{ color: "Green" }}>
                <FaUserAlt />
              </span>
            ),
            className: "custom-toast_add",
          });
          return response.json();
        } else {
          throw new Error("error adding account");
        }
      })
      .then((data) => {
        console.log("account added successfully", data);
        const delay = 1000;
        setTimeout(() => {
          window.location.reload();
        }, delay);
      })
      .catch((error) => {
        console.error("error adding account:", error);
      });
  };

  // GET Company DATA _______________________________________
  const [dbCompanyData, setDbCompanyData] = useState([]);
  console.log("!@#$%^&*");
  console.log(dbCompanyData);

  useEffect(() => {
    const getcompanydata = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/company/get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const company = await response.json();
          console.log(company);
          console.log(company.data);
          setDbCompanyData(company.data);

          if (dbCompanyData == null) {
            try {
              const compDaata = company.data;
              console.log(compDaata);
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

    getcompanydata();
  }, [user]);

  useEffect(() => {
    if (dbCompanyData && dbCompanyData.length > 0) {
      setMode("update"); // If data exists, switch to 'update' mode
      setCompanyId(dbCompanyData[0]._id || "");
      setCompanyLogo(dbCompanyData[0].companyLogo || "");
      setCompanyName(dbCompanyData[0].companyName || "");
      setSelectedOptionLanguage(dbCompanyData[0].searchValue || "");
      setUserAuthorizaytionDomain(
        dbCompanyData[0].userAuthorizationDomain || ""
      );
      setCompanyDomain(dbCompanyData[0].companyDomain || "");
      setContactPersonFirstName(dbCompanyData[0].contactPersonFirstName || "");
      setContactPersonLastName(dbCompanyData[0].contactPersonLastName || "");
      setPhone(dbCompanyData[0].phone || "");
      setEmail(dbCompanyData[0].email || "");
      setStreet(dbCompanyData[0].street || "");
      setCity(dbCompanyData[0].city || "");
      setState(dbCompanyData[0].state || "");
      setCountry(dbCompanyData[0].country || "");
    }
  }, [dbCompanyData]);

  // update company data
  const handleUpdateCompany = () => {
    const newCompData = {
      companyLogo: companyLogo,
      companyName: companyName,
      searchValue: selectedOptionLanguage,
      userAuthorizationDomain: userAuthorizationDomain,
      companyDomain: companyDomain,
      contactPersonFirstName: contactPersonFirstName,
      contactPersonLastName: contactPersonLastName,
      phone: phone,
      email: email,
      street: street,
      city: city,
      state: state,
      country: country,
    };

    fetch(`${baseUrl}/api/company/update/${companyId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newCompData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error adding Account");
        }
      })
      .then((data) => {
        toast.info("Profile updated successfully");
        console.log("Profile updated successfully!", data);
        const delay = 1000;
        setTimeout(() => {
          window.location.reload();
        }, delay);
      })
      .catch((error) => {
        console.error("Error Updating Account:", error);
      });
  };

  return (
    <div>
      <Navbar logoSrc={companyLogo} />
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
              Company Profile
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      {/* -------------------------- */}

      <div className="Companydiv">
        <div className="right_company">
          <HeaderBar headerlabel="COMPANY PROFILE" />
        </div>
        <div className="company_main_div">
          <div
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            <label htmlFor="logoInput" id="logo_update">
              <img
                alt=""
                src={logoSrc || companyLogo}
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  marginTop: "10px",
                  display: "block",
                  margin: "0 auto",
                  fontSize: "1px",
                }}
              />
              {!logoSrc && !companyLogo && (
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{ width: "100px", height: "100px", color: "#216c98" }}
                />
              )}
              <span className="uploadlogolabel">{labelText}</span>
            </label>
            <input
              type="file"
              id="logoInput"
              style={{ display: "none" }}
              onChange={handleProfileLogoChange}
              accept="image/*"
            />
          </div>

          <div class="bmc_grid">
            <InputTypes
              showFlagText={true}
              TextLabel="COMPANY NAME"
              value={companyName}
              onChange={(value) => setCompanyName(value)}
            />
            <div id="Language">
              <CustomDropdown
                label="LANGUAGES"
                options={languagesOptions}
                onSelect={handleOptionSelectLanguage}
                value={selectedOptionLanguage}
                onChange={(value) => setSelectedOptionLanguage(value)}
              />
            </div>
          </div>
          <div class="bmc_user">
            <InputTypes
              showFlagText={true}
              TextLabel="USER AUTHORIZATION DOMAIN"
              value={userAuthorizationDomain}
              onChange={(value) => setUserAuthorizaytionDomain(value)}
            />
            <div id="company_domain">
              <InputTypes
                showFlagText={true}
                TextLabel="COMPANY DOMAIN"
                value={companyDomain}
                onChange={(value) => setCompanyDomain(value)}
              />
            </div>
          </div>
          <div class="contact">
            <h4>CONTACT</h4>
          </div>
          <div class="bmc_admin">
            <div id="user_admin_0">
              <InputTypes
                showFlagText={true}
                TextLabel="CONTACT PERSON FIRST NAME"
                textlabelcustom="user_admin_0_label"
                value={contactPersonFirstName}
                onChange={(value) => setContactPersonFirstName(value)}
              />
            </div>
            <div id="user_admin_1">
              <InputTypes
                showFlagText={true}
                TextLabel="CONTACT PERSON LAST NAME"
                textlabelcustom="user_admin_1_label"
                value={contactPersonLastName}
                onChange={(value) => setContactPersonLastName(value)}
              />
            </div>
            <div id="user_admin_2">
              <InputTypes
                showFlagNumber={true}
                NumberLabel="PHONE"
                value={phone}
                onChange={(value) => setPhone(value)}
              />
            </div>
            <div id="user_admin_3">
              <InputTypes
                showFlagEmail={true}
                EmailLabel="EMAIL"
                value={email}
                onChange={(value) => setEmail(value)}
              />
            </div>
          </div>
          <div class="admin_add">
            <div id="user_admin_4">
              <InputTypes
                showFlagText={true}
                TextLabel="STREET"
                value={street}
                onChange={(value) => setStreet(value)}
              />
            </div>
            <div id="user_admin5">
              <InputTypes
                showFlagText={true}
                TextLabel="CITY"
                value={city}
                onChange={(value) => setCity(value)}
              />
            </div>
            <div id="user_admin_6">
              <InputTypes
                showFlagText={true}
                TextLabel="STATE"
                value={state}
                onChange={(value) => setState(value)}
              />
            </div>
            <div id="user_admin_7">
              <InputTypes
                showFlagText={true}
                TextLabel="COUNTRY"
                value={country}
                onChange={(value) => setCountry(value)}
              />
            </div>
          </div>
          <div className="update_button">
            <button
              className="company_update_button"
              onClick={mode === "create" ? addCompany : handleUpdateCompany}
            >
              {mode === "create" ? "CREATE" : "UPDATE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
