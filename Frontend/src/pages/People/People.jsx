import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../layouts/Navbar";
import AdminSidebar from "../../layouts/AdminSidebar";
import "../../assets/css/people/People.css";
import WriteFlex from "../../components/common/WriteFlex";
import "react-datepicker/dist/react-datepicker.css";
import CustomDropdown from "../../components/common/CustomDropdown";
import InputTypes from "../../components/common/InputTypes";
import HeaderBar from "../../components/common/HeaderBar";
import ErrorMessage from "../../components/common/ErrorMessage";
import { Link } from "react-router-dom";
import { baseUrl } from "../../config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaTrash, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidePanel from "../../components/common/SidePanel";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

const People = () => {
  const { user } = useAuthContext();
  console.log(user);

  const [peopleId, setPeopleId] = useState("");
  const [access, setAccess] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [uid, setUid] = useState("");
  const [empId, setEmpId] = useState("");
  const [empRefId, setEmpRefId] = useState("");
  const [selectedCloseDate, setSelectedCloseDate] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [srcSystemUserName, setSrcSystemUserName] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [practice, setPractice] = useState("");
  const [org, setOrg] = useState("");
  const [manager, setManager] = useState("");
  const optionmanager = [
    "HOUSE",
    "COMPANY",
    "BUILDING",
    "OFFICE",
    "CABIN",
    "APPARTMENT",
  ];
  const [expYear, setExpYear] = useState("");
  const [tenure, setTenure] = useState("");
  const [crmStatus, setCrmStatus] = useState("");
  const [contractor, setContractor] = useState(false);
  const [supplier, setSupplier] = useState("");
  const [currency, setCurrency] = useState("");
  const [costPerHour, setCostPerHour] = useState("");
  const [weekHour, setWeekHour] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [ownerProfile, setOwnerProfile] = useState("");

  //saving the roles just to send the data to sidePanel
  const [rolesFromDb, setRolesFromDb] = useState([]);

  // ------------------------------------------------------------------------------------------
  const [, setIsDropdownOpenmanager] = useState(false);
  const [showSaveCancel, setShowSaveCancel] = useState(false);
  const [showUpdateDelete, setShowUpdateDelete] = useState(true);
  const [plusIconClicked, setPlusIconClicked] = useState(false);
  const optionPractice = ["DBA", "DSOM", "EDUCATION", "IZOT"];
  const optionORG = ["DEFAULT", "DELIVERY", "DELIVERY OWNER", "PRACTICE"];
  const optionSupplier = ["DEFAULT"];
  const optionCurrency = [
    "Afghanistan - Afghani (AFN)",
    "Albania - Lek (ALL)",
    "Algeria - Algerian Dinar (DZD)",
    "American Samoa - US Dollar (USD)",
    "Andorra - Euro (EUR)",
  ];
  const handleSelectPractice = (selectedOption) => {
    setPractice(selectedOption);
  };
  const handleSelectManager = (selectedOption) => {
    setManager(selectedOption);
    setOwnerProfile("");
    if (selectedOption) {
      const profileText = selectedOption
        .split(" ")
        .map((word) => word[0])
        .join("");
      console.log(profileText);
      setOwnerProfile(profileText);
    }
  };
  const handleSelectOrg = (selectedOption) => {
    setOrg(selectedOption);
  };
  const handleSelectSupplier = (selectedOption) => {
    setSupplier(selectedOption);
  };
  const handleSelectCurrency = (selectedOption) => {
    setCurrency(selectedOption);
  };
  const handleCalendarStartChange = (date) => {
    setSelectedStartDate(date);
  };
  const handleCalendarCloseChange = (date) => {
    setSelectedCloseDate(date);
  };
  const handleOpenSideBar = () => {
    setAccountOpen(!accountOpen);
  };
  // ADDPEOPLE
  const handleAddPeople = () => {
    if (
      !firstName ||
      !lastName ||
      !selectedStartDate ||
      !selectedCloseDate ||
      !email ||
      !weekHour
    ) {
      toast.info("Please fill required fields.");
      return;
    }

    const rgExp = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2,6}$/;
    if (rgExp.test(email)) {
      alert("Valid Email!");

      const newPeopleData = {
        first_name: firstName,
        last_name: lastName,
        title: title,
        uid: uid,
        emp_id: empId,
        emp_ref_id: empRefId,
        start_date: selectedStartDate,
        end_date: selectedCloseDate,
        email: email,
        phone: phone,
        src_sys_usr_name: srcSystemUserName,
        city: city,
        region: region,
        country: country,
        practice: practice,
        org: org,
        // manager: manager,
        exp_yr: expYear,
        tenure: tenure,
        crm_status: crmStatus,
        contractor: contractor,
        supplier: supplier,
        currency: currency,
        cost_per_hour: costPerHour,
        week_hour: weekHour,
        // access: access,
        catalog_role: selectedcatalogRoles,
      };

      fetch(`${baseUrl}/api/people/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newPeopleData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error adding People");
          }
        })
        .then((data) => {
          toast.success("People added successfully", {
            icon: (
              <span style={{ color: "rgb(74, 146, 59) " }}>
                <FaUser />
              </span>
            ),
            className: "custom-toast_add",
          });
          console.log("People added successfully!", data);
          const delay = 2000;
          setTimeout(() => {
            window.location.reload();
          }, delay);
        })
        .catch((error) => {
          console.error("Error adding People:", error);
        });
    } else if (email === "") {
      alert("Enter Email!");
    } else if (!rgExp.test(email)) {
      alert("Invalid Email!");
    } else {
      alert("Try again!");
    }
  };

  // -------GET People DATA-------
  const [dbPeopleData, setDbPeopleData] = useState([]);
  console.log(dbPeopleData);
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
          console.log(people, "09090900");
          setDbPeopleData(people.data);
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPeopledata();
  }, [user]);

  //catalogRole of People
  const [selectedcatalogRoles, setSelectedcatalogRoles] = useState([]);

  const updateSelectedRoles = (selectedRoles) => {
    const roleValues = selectedRoles.map((role) => role.value);
    setSelectedcatalogRoles(roleValues);
  };

  console.log(selectedcatalogRoles);

  const handleItemSelect = (selectedItem, selectedIndex) => {
    if (selectedIndex >= 0 && selectedIndex < dbPeopleData.length) {
      const selectedData = dbPeopleData[selectedIndex];
      setPeopleId(selectedData._id || "");
      setAccess(selectedData.access || "");
      setFirstName(selectedData.first_name || "");
      setLastName(selectedData.last_name || "");
      setTitle(selectedData.title || "");
      setUid(selectedData.uid || "");
      setEmpId(selectedData.emp_id || "");
      setEmpRefId(selectedData.emp_ref_id || "");
      setSelectedStartDate(selectedData.start_date || null);
      setSelectedCloseDate(selectedData.end_date || null);
      setPractice(selectedData.practice || "");
      setOrg(selectedData.org || "");
      setIsDropdownOpenmanager(false);
      // setManager(selectedData.manager || "");
      setExpYear(selectedData.exp_yr || "");
      setTenure(selectedData.tenure || "");
      setCrmStatus(selectedData.crm_status || "");
      setEmail(selectedData.email || "");
      setPhone(selectedData.phone || "");
      setSrcSystemUserName(selectedData.src_sys_usr_name || "");
      setCity(selectedData.city || "");
      setRegion(selectedData.region || "");
      setCountry(selectedData.country || "");
      setContractor(selectedData.contractor || false);
      setSupplier(selectedData.supplier || "");
      setCurrency(selectedData.currency || "");
      setCostPerHour(selectedData.cost_per_hour || "");
      setWeekHour(selectedData.week_hour || "");
      setShowSaveCancel(false);
      setShowUpdateDelete(true);
      setSelectedcatalogRoles(selectedData.catalog_role || "");
      setRolesFromDb(selectedData.catalog_role || "");
    }
  };

  // UPDATE PEOPLE
  const handleUpdatePeople = () => {
    if (
      !firstName ||
      !lastName ||
      !selectedStartDate ||
      !selectedCloseDate ||
      !email ||
      !weekHour
    ) {
      toast.info("Please fill required fields.");
      return;
    }
    const newPeopleData = {
      first_name: firstName,
      last_name: lastName,
      title: title,
      uid: uid,
      emp_id: empId,
      emp_ref_id: empRefId,
      start_date: selectedStartDate,
      end_date: selectedCloseDate,
      email: email,
      phone: phone,
      src_sys_usr_name: srcSystemUserName,
      city: city,
      region: region,
      country: country,
      practice: practice,
      org: org,
      // manager: optionmanager,
      exp_yr: expYear,
      tenure: tenure,
      crm_status: crmStatus,
      contractor: contractor,
      supplier: supplier,
      currency: currency,
      cost_per_hour: costPerHour,
      week_hour: weekHour,
      // access: access,
      catalog_role: selectedcatalogRoles,
    };

    fetch(`${baseUrl}/api/people/update/${peopleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newPeopleData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error Updating People");
        }
      })
      .then((data) => {
        toast.info("People Updated successfully");
        console.log("People Updated successfully!", data);
        const delay = 1000;
        setTimeout(() => {
          // window.location.reload();
        }, delay);
      })
      .catch((error) => {
        console.error("Error Updating People:", error);
      });
  };

  // ---------DELETE PEOPLE--------
  const handleDeletePeople = () => {
    fetch(`${baseUrl}/api/people/delete/${peopleId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("People Deleted successfully!", data);
        toast.success("People deleted successfully", {
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
      })
      .catch((error) => {
        console.log("Error Deleting People:", error);
      });
  };

  const resetFields = () => {
    setFirstName("");
    setLastName("");
    setTitle("");
    setUid("");
    setEmpId("");
    setEmpRefId("");
    setSelectedStartDate(null);
    setSelectedCloseDate(null);
    setPractice("");
    setOrg("");
    setIsDropdownOpenmanager(false);
    // setManager("");
    setExpYear("");
    setTenure("");
    setCrmStatus("");
    setEmail("");
    setPhone("");
    setSrcSystemUserName("");
    setCity("");
    setRegion("");
    setCountry("");
    setContractor(false);
    setSupplier("");
    setCurrency("");
    setCostPerHour("");
    setWeekHour("");
    setShowSaveCancel(true);
    setShowUpdateDelete(false);
    setPlusIconClicked(true);
  };

  //Function To get the data of published Catalog Roles
  const [catalogRolesData, setCatalogRolesData] = useState([]);
  const catalogRolesdata = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/roles/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const catalogRoles = await response.json();
        console.log(catalogRoles.data);
        const publishedRoles = catalogRoles.data.filter(
          (roles) => roles.role_cat_status === "PUBLISHED"
        );
        setCatalogRolesData(publishedRoles);
      } else {
        console.log("ERROR: ", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    catalogRolesdata();
  }, [user]);

  // saving only the names of roles in the variable for the side panel
  let rolesData =
    catalogRolesData.length > 0
      ? catalogRolesData.map((roles) => roles.role_name)
      : [];
  console.log(rolesData);

  return (
    <div>
      <Navbar />
      <AdminSidebar />
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
              to="/companyprofile"
              className="breadcrumbs--link_mid"
            >
              Admin
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="" className="breadcrumbs--link--active">
              People
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <div className="rowpeople">
        <WriteFlex
          showGrouping={true}
          resetFields={resetFields}
          data={dbPeopleData}
          dataType="people"
          onItemSelect={handleItemSelect}
        />
        <div
          className="rightpeople"
          style={{
            width: accountOpen ? "65%" : "100%",
            borderRight: accountOpen ? "3px solid #216c98" : "none",
          }}
        >
          <button
            id="openbtn"
            onClick={handleOpenSideBar}
            style={{ marginRight: accountOpen ? "18%" : "0%" }}
          >
            {accountOpen ? <FaLessThan /> : <FaGreaterThan />}
          </button>
          <HeaderBar headerlabel="PEOPLE" />

          {dbPeopleData.length > 0 || plusIconClicked ? (
            <div className="people_data">
              <div id="hidepeople">
                <div className="peopleprofile">
                  <i className="fa fa-circle" aria-hidden="true" />
                  <div className="peopleaccess">
                    <InputTypes
                      showFlagCheckBox={true}
                      value={access}
                      onChange={(value) => setAccess(value)}
                    />
                    <label className="hasaccess">HAS ACCESS</label>
                  </div>
                </div>
                <p style={{textAlign:"center", marginTop: "10px"}}>To manage user access,Please go to admin Access</p>
                <div className="people">
                  <div id="peoplemain">
                    <div className="persondataleft">
                      <p>PERSON</p>
                      <div className="containerPP1">
                        <div id="contentPP1">
                          <ErrorMessage
                            showFlaxErrorMessageText={true}
                            label="FIRST NAME"
                            placeholdersection="Enter First Name"
                            errormsg="FIRST NAME IS A REQUIRED FIELD"
                            value={firstName}
                            onChange={(value) => setFirstName(value)}
                          />
                        </div>
                        <div id="contentPP2">
                          <ErrorMessage
                            showFlaxErrorMessageText={true}
                            label="LAST NAME"
                            placeholdersection="Enter Last Name"
                            errormsg="LAST NAME IS A REQUIRED FIELD"
                            value={lastName}
                            onChange={(value) => setLastName(value)}
                          />
                        </div>
                      </div>
                      <div className="containerPP2">
                        <div id="contentPP3">
                          <InputTypes
                            TextLabel="TITLE"
                            textplaceholder="Enter Title"
                            showFlagText={true}
                            value={title}
                            onChange={(value) => setTitle(value)}
                          />
                        </div>
                        <div id="contentPP4">
                          <InputTypes
                            NumberLabel="UID"
                            numberplaceholder="Enter UID"
                            showFlagNumber={true}
                            value={uid}
                            onChange={(value) => setUid(value)}
                          />
                        </div>
                      </div>
                      <div className="containerPP3">
                        <div id="contentPP5">
                          <InputTypes
                            TextLabel="EMPLOYEE ID"
                            textplaceholder="Enter Employe ID"
                            showFlagText={true}
                            value={empId}
                            onChange={(value) => setEmpId(value)}
                          />
                        </div>
                        <div id="contentPP6">
                          <InputTypes
                            TextLabel="EXTERNAL REFERENCE ID"
                            textplaceholder="Enter External Reference ID"
                            showFlagText={true}
                            value={empRefId}
                            onChange={(value) => setEmpRefId(value)}
                          />
                        </div>
                      </div>
                      <div className="containerPP4">
                        <div id="contentPP7">
                          <InputTypes
                            showFlagCalender={true}
                            key={`start-${selectedStartDate}`}
                            CalenderLabel={"STARTED ON "}
                            selectedDate={selectedStartDate}
                            onCalendarChange={handleCalendarStartChange}
                            placeholder="Select a Date"
                          />
                        </div>
                        <div id="contentPP8">
                          <InputTypes
                            showFlagCalender={true}
                            key={`close-${selectedCloseDate}`}
                            CalenderLabel={"ENDS ON"}
                            selectedDate={selectedCloseDate}
                            onCalendarChange={handleCalendarCloseChange}
                            placeholder="Select a Date"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="practicedataright">
                      <p>PRACTICE</p>
                      <div className="containerPP5">
                        <div id="contentPP9">
                          <CustomDropdown
                            label="PRACTICE"
                            Placeholder="Select Practice"
                            onSelect={handleSelectPractice}
                            options={optionPractice}
                            value={practice}
                            onChange={(value) => setPractice(value)}
                          />
                        </div>
                        <div id="contentPP9">
                          <CustomDropdown
                            label="ORG"
                            Placeholder="Select Org"
                            onSelect={handleSelectOrg}
                            options={optionORG}
                            value={org}
                            onChange={(value) => setOrg(value)}
                          />
                        </div>
                      </div>
                      <div id="contentPP11">
                        <CustomDropdown
                          label="MANAGER"
                          onSelect={handleSelectManager}
                          custuminput="custom_dropdown_owner"
                          labelforverticl="ownerlabel"
                          options={optionmanager}
                        />
                        <div className="profile-icon">{ownerProfile}</div>
                      </div>
                      <div className="containerPP7">
                        <div id="contentPP12">
                          <InputTypes
                            TextLabel="YEAR OF EXPERIENCE"
                            textplaceholder="Enter Year Of Experience"
                            showFlagText={true}
                            value={expYear}
                            onChange={(value) => setExpYear(value)}
                          />
                        </div>
                        <div id="contentPP13">
                          <InputTypes
                            TextLabel="YEAR OF TENTURE"
                            textplaceholder="Enter Year Of Tenture"
                            showFlagText={true}
                            value={tenure}
                            onChange={(value) => setTenure(value)}
                          />
                        </div>
                      </div>
                      <div className="containerPP8">
                        <InputTypes
                          TextLabel="CRM STATUS"
                          textplaceholder="Enter CRM Status"
                          showFlagText={true}
                          value={crmStatus}
                          onChange={(value) => setCrmStatus(value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="peoplemain">
                    <div className="contactdataleft">
                      <p>CONTACT</p>
                      <div className="containerPC1">
                        <div id="contentPC1">
                          <ErrorMessage
                            showFlagEmail={true}
                            EmailLabel="EMAIL"
                            emailerrormsg="EMAIL IS A REQUIRED FIELD"
                            emailplaceholder="Enter Your Email"
                            value={email}
                            onChange={(value) => setEmail(value)}
                          />
                        </div>
                        <div id="contentPC2">
                          <InputTypes
                            NumberLabel="PHONE"
                            numberplaceholder="Enter Your Phone Number"
                            showFlagNumber={true}
                            value={phone}
                            onChange={(value) => setPhone(value)}
                          />
                        </div>
                      </div>
                      <div className="containerPC2">
                        <InputTypes
                          TextLabel="SOURCE SYSTEM USER NAME"
                          textplaceholder="Enter Source System User Name"
                          showFlagText={true}
                          value={srcSystemUserName}
                          onChange={(value) => setSrcSystemUserName(value)}
                        />
                      </div>
                      <div className="containerPC3">
                        <div id="contentPC4">
                          <InputTypes
                            TextLabel="CITY"
                            textplaceholder="Enter City Name"
                            showFlagText={true}
                            value={city}
                            onChange={(value) => setCity(value)}
                          />
                        </div>
                        <div id="contentPC5">
                          <InputTypes
                            TextLabel="REGION"
                            textplaceholder="Enter Your Region"
                            showFlagText={true}
                            value={region}
                            onChange={(value) => setRegion(value)}
                          />
                        </div>
                        <div id="contentPC6">
                          <InputTypes
                            TextLabel="COUNTRY"
                            textplaceholder="Enter Your Country"
                            showFlagText={true}
                            value={country}
                            onChange={(value) => setCountry(value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="costdataright">
                      <p>COST</p>
                      <div className="containerPC4">
                        <div id="contentPC7">
                          <InputTypes
                            Checkboxlabel="CONTRACTOR"
                            showFlagCheckBox={true}
                            value={contractor}
                            onChange={(value) => setContractor(value)}
                          />
                        </div>
                        <div id="contentPC8">
                          <CustomDropdown
                            label="SUPPLIER"
                            Placeholder="Select Supplier"
                            onSelect={handleSelectSupplier}
                            options={optionSupplier}
                            value={supplier}
                            onChange={(value) => setSupplier(value)}
                          />
                        </div>
                      </div>
                      <div className="containerPC5">
                        <div id="contentPC9">
                          <CustomDropdown
                            label="CURRENCY"
                            Placeholder="Select Currency"
                            onSelect={handleSelectCurrency}
                            options={optionCurrency}
                            value={currency}
                            onChange={(value) => setCurrency(value)}
                          />
                        </div>
                        <div id="contentPC10">
                          <InputTypes
                            NumberLabel="COST PER HOUR"
                            numberplaceholder="Enter Cost Per Hour"
                            showFlagNumber={true}
                            value={costPerHour}
                            onChange={(value) => setCostPerHour(value)}
                          />
                        </div>
                      </div>
                      <div className="containerPC6">
                        <div id="contentPC11">
                          <ErrorMessage
                            showFlaxErrorMessageText={true}
                            label="WEEK HOUR"
                            placeholdersection="Enter Week Hour"
                            errormsg="WEEK HOUR IS A REQUIRED FIELD"
                            value={weekHour}
                            onChange={(value) => setWeekHour(value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="buttons_save_cancel"
                  style={{ display: showSaveCancel ? "block" : "none" }}
                >
                  <button id="reset_data" onClick={resetFields}>
                    CANCEL
                  </button>
                  <button id="save_data" onClick={handleAddPeople}>
                    SAVE NEW PEOPLE
                  </button>
                </div>
                <div
                  className="buttons_delete_update"
                  style={{ display: showUpdateDelete ? "block" : "none" }}
                >
                  <button id="update_data" onClick={handleUpdatePeople}>
                    UPDATE
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div id="accessmsgdiv">
              <label id="accessmsg">
                NO PEOPLES FOUND. PLEASE USE + TO ADD A NEW PEOPLE
              </label>
            </div>
          )}
        </div>
        <div
          className="sidepanel"
          style={{ width: accountOpen ? "20%" : "0%" }}
        >
          <SidePanel
            showFlagRole={true}
            showFlagTimeStamp={true}
            showFlagSkill={true}
            catalogRoles={rolesData}
            updateSelectedRoles={updateSelectedRoles}
            DbRoles={rolesFromDb}
          />
        </div>
      </div>

      {/* =================================================================  */}
      <div id="peoplegridmainheader" style={{ display: "none" }}>
        <div className="peoplegridsubheader">
          <div id="peoplegridheader">
            <Link>PEOPLE LISTING</Link>
          </div>

          <div>
            <button className="refreshbuttpeople">
              <i className="fa fa-refresh" id="refreshdownloadpeople"></i>
              <span id="xlpeoplelabel">RELOAD</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default People;
