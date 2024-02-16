import React, { useState, useRef, useEffect } from 'react';
import HelpIcon from '../../assets/Images/HelpIcon.png'
import "../../assets/css/common/HelpRequest.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CustomDropdown from '../../components/common/CustomDropdown'
const HelpRequest = () => {
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [,setSelectedPrefferdTime]=useState(null)
  const [, setOwnerProfile] = useState("");
  const [contentPage,setContentPage] = useState(true);
  const [sucessMsg,setSucessMsg] = useState(false);

  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddOptions = (event) => {
    const selectedValue = event.target.value;
    setShowContactDropdown(selectedValue !== "");

    // Set the options for the second dropdown based on the selected value
    if (selectedValue === "Sales support") {
      setSecondDropdownOptions(["", "I need pricing information"]);
    } else if (selectedValue === "Technical issues") {
      setSecondDropdownOptions([
        "",
        "Access request/Profile Update",
        "Application slow/Unavailable",
        "Broken/Missing Functionality",
        "Content/Data/Profile changes",
      ]);
    } else if (selectedValue === "Billing and payment") {
      setSecondDropdownOptions([
        "",
        "Finding Invoices",
        "Help with a quote",
        "Problem with a personal or Credit card",
        "Cancel cloud subscription",
      ]);
    } else {
      // Set default options for other cases or when "Select...." is selected
      setSecondDropdownOptions([]);
    }
  };

  //  const wrapper = document.querySelector('.wrapper');
  function submitForm() {
    setContentPage(false);
    setSucessMsg(true);

  }

  // Country code Reset and submit:
  const originalInputProps = {
    required: true,
    style: { width: "100%", border: "0.1px solid #ccc",outlineColor:"#3d87a6"},
  };

  const [inputProps, setInputProps] = useState(originalInputProps);

  const handleInput = () => {
    setInputProps(originalInputProps);
  };

  const preferedRegions =[
    "(UTC-12:00) International Date Line West",
    "(UTC-11:00) Coordinated Universal Time-11",
    "(UTC-10:00) Hawaii",
    "(UTC-09:30) Marquesas Islands",
    "(UTC-09:00) Aleutian Islands",
    "(UTC-09:00) Coordinated Universal Time-09",
    "(UTC-08:00) Alaska",
    "(UTC-08:00) Coordinated Universal Time-08",
    "(UTC-07:00) Baja California",
    "(UTC-07:00) Pacific Time (US & Canada)",
    "(UTC-07:00) Arizona",
    "(UTC-07:00) Chihuahua, La Paz, Mazatlan",
    "(UTC-06:00) Saskatchewan",
    "(UTC-06:00) Easter Island",
    "(UTC-06:00) Guadalajara, Mexico City, Monterrey",
    "(UTC-06:00) Central America",
    "(UTC-06:00) Mountain Time (US & Canada)",
    "(UTC-05:00) Bogota, Lima, Quito, Rio Branco",
    "(UTC-05:00) Chetumal",
    "(UTC-05:00) Central Time (US & Canada)",
    "(UTC-04:00) Santiago",
    "(UTC-04:00) Georgetown, La Paz, Manaus, San Juan",
    "(UTC-04:00) Cuiaba",
    "(UTC-04:00) Caracas",
    "(UTC-04:00) Asuncion",
    "(UTC-04:00) Turks and Caicos",
    "(UTC-04:00) Havana",
    "(UTC-04:00) Haiti",
    "(UTC-04:00) Eastern Time (US & Canada)",
    "(UTC-04:00) Indiana (East)",
    "(UTC-03:00) Salvador",
    "(UTC-03:00) City of Buenos Aires",
    "(UTC-03:00) Montevideo",
    "(UTC-03:00) Cayenne, Fortaleza",
    "(UTC-03:00) Araguaina",
    "(UTC-03:00) Atlantic Time (Canada)",
    "(UTC-03:00) Brasilia",
    "(UTC-02:30) Newfoundland",
    "(UTC-02:00) Greenland",
    "(UTC-02:00) Saint Pierre and Miquelon",
    "(UTC-02:00) Coordinated Universal Time-02",
    "(UTC-01:00) Cabo Verde Is",
    "(UTC+00:00) Coordinated Universal Time",
    "(UTC+00:00) Azores",
    "(UTC+00:00) Monrovia, Reykjavik",
    "(UTC+00:00) Sao Tome",
    "(UTC+01:00) Casablanca",
    "(UTC+01:00) West Central Africa",
    "(UTC+01:00) Dublin, Edinburgh, Lisbon, London",
    "(UTC+02:00) Kaliningrad",
    "(UTC+02:00) Harare, Pretoria",
    "(UTC+02:00) Windhoek",
    "(UTC+02:00) Khartoum",
    "(UTC+02:00) Belgrade, Bratislava, Budapest, Ljubljana",
    "(UTC+02:00) Sarajevo, Skopje, Warsaw, Zagreb",
    "(UTC+02:00) Brussels, Copenhagen, Madrid, Paris",
    "(UTC+02:00) Amsterdam, Berlin, Bern, Rome, Stockholm",
    "(UTC+02:00) Tripoli",
    "(UTC+03:00) Nairobi",
    "(UTC+03:00) Moscow, St. Petersburg",
    "(UTC+03:00) Minsk",
    "(UTC+03:00) Kuwait, Riyadh",
    "(UTC+03:00) Istanbul",
    "(UTC+03:00) Amman",
    "(UTC+03:00) Volgograd",
    "(UTC+03:00) Baghdad",
    "(UTC+03:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius",
    "(UTC+03:00) Jerusalem",
    "(UTC+03:00) Gaza, Hebron",
    "(UTC+03:00) Damascus",
    "(UTC+03:00) Chisinau",
    "(UTC+03:00) Cairo",
    "(UTC+03:00) Beirut",
    "(UTC+03:00) Athens, Bucharest",
    "(UTC+03:30) Tehran",
    "(UTC+04:00) Yerevan",
    "(UTC+04:00) Saratov",
    "(UTC+04:00) Port Louis",
    "(UTC+04:00) Tbilisi",
    "(UTC+04:00) Baku",
    "(UTC+04:00) Astrakhan, Ulyanovsk",
    "(UTC+04:00) Izhevsk, Samara",
    "(UTC+04:00) Abu Dhabi, Muscat",
    "(UTC+04:30) Kabul",
    "(UTC+05:00) Islamabad, Karachi",
    "(UTC+05:00) Qyzylorda",
    "(UTC+05:00) Ashgabat, Toshkent",
    "(UTC+05:00) Ekaterinburg",
    "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
    "(UTC+05:30) Sri Jayawardenepura",
    "(UTC+05:45) Kathmandu",
    "(UTC+06:00) Nur-Sultan",
    "(UTC+06:00) Dhaka",
    "(UTC+06:00) Omsk",
    "(UTC+06:30) Yangon (Rangoon)",
    "(UTC+07:00) Novosibirsk",
    "(UTC+07:00) Krasnoyarsk",
    "(UTC+07:00) Tomsk",
    "(UTC+07:00) Barnaul, Gorno-Altaysk",
    "(UTC+07:00) Hovd",
    "(UTC+07:00) Bangkok, Hanoi, Jakarta",
    "(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi",
    "(UTC+08:00) Irkutsk",
    "(UTC+08:00) Kuala Lumpur, Singapore",
    "(UTC+08:00) Perth",
    "(UTC+08:00) Taipei",
    "(UTC+08:00) Ulaanbaatar",
    "(UTC+08:45) Eucla",
    "(UTC+09:00) Yakutsk",
    "(UTC+09:00) Seoul",
    "(UTC+09:00) Chita",
    "(UTC+09:00) Osaka, Sapporo, Tokyo",
    "(UTC+09:00) Pyongyang",
    "(UTC+09:30) Adelaide",
    "(UTC+09:30) Darwin",
    "(UTC+10:00) Hobart",
    "(UTC+10:00) Vladivostok",
    "(UTC+10:00) Canberra, Melbourne, Sydney",
    "(UTC+10:00) Brisbane",
    "(UTC+10:00) Guam, Port Moresby",
    "(UTC+10:30) Lord Howe Island",
    "(UTC+12:00) Sakhalin",
    "(UTC+12:00) Norfolk Island",
    "(UTC+12:00) Solomon Is., New Caledonia",
    "(UTC+12:00) Chokurdakh",
    "(UTC+12:00) Bougainville Island",
    "(UTC+12:00) Magadan",
    "(UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky",
    "(UTC+12:00) Auckland, Wellington",
    "(UTC+12:00) Coordinated Universal Time+ 12",
    "(UTC+12:00) Fiji",
    "(UTC+12:45) Chatham Islands",
    "(UTC+13:00) Samoa",
    "(UTC+13:00) Coordinated Universal Time+ 13",
    "(UTC+13:00) Nuku'alofa"
]

   const [phoneNumber, setPhoneNumber] = useState("");
  const [, setValid] = useState(true);

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = () => {
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  let [HelpPage,setHelpPage] = useState(false);

  const helpPageOpenining =()=>{
    setContentPage(true);
    setSucessMsg(false);
    setHelpPage(!HelpPage);
    setSelectedLevel("")

  }


  const handlePrefferdTime = (preferredTime) => {
    setSelectedPrefferdTime(preferredTime);
    setOwnerProfile("");

    if (preferredTime) {
      const profileText = preferredTime
        .split(" ")
        .map((word) => word[0])
        .join("");
    
      setOwnerProfile(profileText);
    }
  };
  const [levelListVisible, setLevelListVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('');
  const levelInputRef = useRef(null);
  const levelListRef = useRef(null);

  const handleLevelClick = () => {
    setLevelListVisible(!levelListVisible);
  };

  const handleLevelItemClick = (event) => {
    const selectedOptionsLevel = event.target.textContent;
    setSelectedLevel(selectedOptionsLevel);
    setLevelListVisible(false);
  };

  const handleLevelOutsideClick = (event) => {
    if (levelInputRef.current && !levelInputRef.current.contains(event.target)) {
      setLevelListVisible(false);
    }
  };

  useEffect(() => {
    if (levelListVisible) {
      window.addEventListener('click', handleLevelOutsideClick);
    } else {
      window.removeEventListener('click', handleLevelOutsideClick);
    }
    return () => {
      window.removeEventListener('click', handleLevelOutsideClick);
    };
  }, [levelListVisible]);
    return (
    <div>
      <div className="helpbox">
        <button className="help">
            <img
              src={HelpIcon}
              alt="Help"
              style={{ height: "35px", width: "35px" }}
              onClick ={helpPageOpenining}
            />
        </button>
      </div>
     {HelpPage && (<div className="overlay" id="divOne">
        <div className="wrapper">
          <p className="head" id="p">
            LOG A SUPPORT REQUEST
          </p>
          <br />
          <label className="close" onClick={helpPageOpenining}>
            x
          </label>
          {contentPage && <div className="content">
            <div className="container1">
              <form>
                <div>
                  <label htmlFor="">Name:</label>
                  <br />
                  <input type="text" id="nameInput" />
                </div>
                <br />
                <div>
                  <label htmlFor="">Email:</label>
                  <br />
                  <input type="text" id="EmailInput" />
                </div>
                <br />
                <div>
                  <label htmlFor="">Contact Number:</label>
                  <br />
                  <PhoneInput
                    onClick={handleInput}
                    type="text"
                    country={"in"}
                    value={phoneNumber}
                    onChange={handleChange}
                    id="NumberInput"
                    inputProps={inputProps}
                    style={{width:"100%",}}
                  />
                </div>
                <br />
                <label htmlFor="">What can we help you with?</label>
                <br />
                <select name="" id="helpDropdownOptions" onClick={handleAddOptions}>
                  <option> </option>
                  <option>Sales support</option>
                  <option>Technical issues</option>
                  {/* <option>My account</option> */}
                  <option>Billing and payment</option>
                  {/* <option>Enhancement</option>
                    <option>Others</option> */}
                </select>
                <br />
                {showContactDropdown && (
                  <div>
                    <label htmlFor="">Select a Topic:</label>
                    <select name="" id="prefereddropdown">
                      {secondDropdownOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <br />
                <label>Summary:</label>
                <input type="text" className="help-input" />
                <br />
                <br />
                <label>Description:</label> <br />
                <textarea
                  rows={8}
                  cols
                  defaultValue={""}
                  style={{ width: "100%", height: "134px" }}
                />{" "}
                <br />
                <br />
                <div id="levels">
                  <label id="levellabel">
                    What is the impact on your buisness:
                  </label>
                  <input
        id="levelinput"
        type="text"
        
        onClick={handleLevelClick}
        value={selectedLevel}
        ref={levelInputRef}
        required
      />
      <ul id="levellist" style={{ display: levelListVisible ? 'block' : 'none', top: '-18px' }} ref={levelListRef}>
        <li id='prioritylist' onClick={handleLevelItemClick}>
          <pre>
            <span id="levelhead">Priority 1: </span>
            <br />
            Production application down or major malfunction affecting business
            <br />
            and high number of staff
          </pre>
        </li>
        <li id='prioritylist' onClick={handleLevelItemClick}>
          <pre>
            <span id="levelhead">Priority 2: </span>
            <br />
            Issues or question with limited business
          </pre>
        </li>
        <li id='prioritylist' onClick={handleLevelItemClick}>
          <pre>
            <span id="levelhead">Priority 3: </span>
            <br />
            Application issue that has a moderate impact on the business
          </pre>
        </li>
        <li id='prioritylist' onClick={handleLevelItemClick}>
          <pre>
            <span id="levelhead">Priority 4: </span>
            <br />
            Issues or question with limited business
          </pre>
        </li>
      </ul>

                  {/* <FontAwesomeIcon icon={faCaretDown} className="level-icon" /> */}
                  
                </div>
                <br />
                {/* Contact Method div */}
                <div id="contactdiv">
                  <label htmlFor=""> Prefereed Contact Method:</label>
                  <br />
                  <div id="phoneEmail">
                    <input type="checkbox" name="email" id="radio" />
                    <label htmlFor="email" id="labels">
                      Email
                    </label>
                    &nbsp; &nbsp;{" "}
                    <input type="checkbox" name="phone" id="radio" />
                    <label htmlFor="Phone" id="labels">
                      Phone
                    </label>
                  </div>{" "}
                  <br />
                </div>
                {/* Permission to Acecess data */}
                <div>
                  <p id="acessinfodiv">
                    I give DealDox support personnel permission to access data
                    in my Cloud Instance to assist me with my request:
                  </p>
                  <div id="yesorNoDiv">
                    <input type="radio" name="infoAcess" id="" />
                    &nbsp;<label htmlFor="">Yes</label>&nbsp;&nbsp;&nbsp;
                    <input type="radio" name="infoAcess" id="" />
                    &nbsp;<label htmlFor="">No</label>
                  </div>
                </div>
                <br />
                {/* Prefered Date */}
                <div>
                  <label htmlFor="">Prefereed Date:</label>
                  <br />{" "}
                  <DatePicker
                    id="dateInput"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd" // Customize date format if needed
                  />
                </div>
                <br />
                <div id="helpDropdown">
                  <label id="helpTimelabel">
                    Preferred Time (Regional Time):
                  </label>
                  <CustomDropdown
                  options={preferedRegions}
                  onSelect={handlePrefferdTime}
                  ID={"helpRequestInput"}               
                  labelforverticl="regionlabel"
                />
                </div>
                <br />
                <br />
                <br />
                <input type="submit" onClick={submitForm} />
              </form>
            </div>
          </div>
}
          {sucessMsg && <div id="successMessage">
            <div id="sucessMsg">
              <h2>Thank You for Submitting your Queries</h2>
              <h1>We will get back to you shortly</h1>
             
            </div>
          </div>
}
        </div>
      </div>)} 
      
    </div>
  );
};

export const handleLevelClick = () => {
  const levellist = document.querySelector("#levellist");
  const levelinput = document.querySelector("#levelinput");
  levellist.style.display =
    levellist.style.display === "none" ? "block" : "none";
  // parentDiv.style.height = '59px';
  levellist.style.top = "-18px";

  //  ITEM SELECTING
  const handleLevelItemClick = (event) => {
    const selectedOptionsLevel = event.target.textContent;
    levelinput.value = selectedOptionsLevel;
    levellist.style.display = "none";
  };

  // WINDOWS CLICK
  const handleLevelOutsideClick = (event) => {
    if (!levelinput.contains(event.target)) {
      levellist.style.display = "none";
    }
  };

  // ITEM SELECTING
  const levellistitems = levellist.querySelectorAll("li");
  levellistitems.forEach(function (item) {
    levelinput.value = "";
    item.addEventListener("click", handleLevelItemClick);
  });

  window.addEventListener("click", handleLevelOutsideClick);
};

// Prefered Time dropdown code
export const handleHelpTimeClick = () => {
  const HelpTimelist = document.querySelector("#helpTimelist");
  const HelpTimeinput = document.querySelector("#helpTimeinput");

  HelpTimelist.style.display =
    HelpTimelist.style.display === "none" ? "block" : "none";
  // parentDiv.style.height = '59px';
  HelpTimelist.style.top = "-18px";

  //  ITEM SELECTING
  const handleHelpTimeItemClick = (event) => {
    const selectedOptionsHelpTime = event.target.textContent;
    HelpTimeinput.value = selectedOptionsHelpTime;
    HelpTimelist.style.display = "none";
  };

  // search filter
  const handleHelpTimeInput = () => {
    const filter = HelpTimeinput.value.toUpperCase();
    const helpTimelistitems = HelpTimelist.querySelectorAll("li");

    helpTimelistitems.forEach(function (item) {
      const text = item.textContent.toUpperCase();
      if (text.indexOf(filter) > -1) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  };
  // ENTER
  const handleHelpTimeInputKeydown = (event) => {
    if (event.keyCode === 13) {
      const visibleItem = HelpTimelist.querySelector(
        "li:not([style*='display: none'])"
      );
      if (visibleItem) {
        HelpTimeinput.value = visibleItem.textContent;
        HelpTimelist.style.display = "none";
      }
    }
  };

  // WINDOWS CLICK
  const handleHelpTimeOutsideClick = (event) => {
    if (!HelpTimeinput.contains(event.target)) {
      HelpTimelist.style.display = "none";
    }
  };

  // ITEM SELECTING
  const helpTimelistitems = HelpTimelist.querySelectorAll("li");
  helpTimelistitems.forEach(function (item) {
    HelpTimeinput.value = "";
    item.addEventListener("click", handleHelpTimeItemClick);
  });

  HelpTimeinput.addEventListener("input", handleHelpTimeInput);
  HelpTimeinput.addEventListener("keydown", handleHelpTimeInputKeydown);
  window.addEventListener("click", handleHelpTimeOutsideClick);
};

export default HelpRequest;
