import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import "../../assets/css/accounts/Accounts.css";
import CustomDropdown from "../../components/common/CustomDropdown";
import InputTypes from "../../components/common/InputTypes";
import WriteFlex from "../../components/common/WriteFlex";
import ErrorMessage from "../../components/common/ErrorMessage";
import BillingAndShippingAddress from "../../components/common/BillingAndShippingAddress";
import { FaPen, FaPlus, FaTable, FaTrash, FaUser } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import HeaderBar from "../../components/common/HeaderBar";
import Addinfo from "../../components/addinfo/Addinfo";
import { baseUrl } from "../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import SidePanel from '../../components/common/SidePanel'


const Account = () => {


  const { user } = useAuthContext();
  console.log(user);

  //to extract data from the url
  const urlParams = new URLSearchParams(window.location.search);
  const permission = urlParams.get('permission');
  const oppPermission = urlParams.get('oppPermission');
  const quote_add = urlParams.get('quote_add');

  console.log(quote_add);
  const isReadOnly = permission === 'readOnly';


  const [accountId, setAccountId] = useState("");
  const [accounts, setAccounts] = useState("");
  const [owner, setOwner] = useState("");
  const [parentAccount, setParentAccount] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");
  const [industry, setIndustry] = useState("");
  const [vertical, setVertical] = useState("");
  const [type, setType] = useState("");
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  const [accountSideBar,setAccountSidebar]  = useState(false);

  const handleOpenAccountSideBar = () => {
    setAccountSidebar(!accountSideBar);
  };



  console.log(filteredAccounts);
  let filtered;
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

  const [rows, setOpportunityData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  // const [ownerProfile, setOwnerProfile] = useState("");
  const [showOppopagination, setShowOppopagination] = useState(true);
  const [showSaveCancel, setShowSaveCancel] = useState(false);
  const [plusIconClicked, setPlusIconClicked] = useState(false);
  //useState to hold the data from access Page
  const [peopleData, setPeopleData] = useState([]);
  const handleItemSelect = (selectedItem, selectedIndex) => {
    console.log("ssss", selectedIndex);
    const selectedData = dbAccountData[selectedIndex] || dbAccountData[0];
    setAccountId(selectedData._id || "");
    setAccounts(selectedData.accounts || "");
    setOwner(selectedData.owner || "");
    setParentAccount(selectedData.parent_account || "");
    setDescription(selectedData.description || "");
    setRegion(selectedData.region || "");
    setIndustry(selectedData.industry || "");
    setVertical(selectedData.vertical || "");
    setType(selectedData.type || "");
    setBillingAddress({
      billingStreet1: selectedData.billing_street1 || "",
      billingStreet2: selectedData.billing_street2 || "",
      billingCity: selectedData.billing_city || "",
      billingState: selectedData.billing_state || "",
      billingZip: selectedData.billing_zip || "",
      billingCountry: selectedData.billing_country || "",
      billingPhone: selectedData.billing_phone || "",
    });

    setShippingAddress({
      shippingStreet1: selectedData.shipping_street1 || "",
      shippingStreet2: selectedData.shipping_street2 || "",
      shippingCity: selectedData.shipping_city || "",
      shippingState: selectedData.shipping_state || "",
      shippingZip: selectedData.shipping_zip || "",
      shippingCountry: selectedData.shipping_country || "",
      shippingPhone: selectedData.shipping_phone || "",
    });
    setShowOppopagination(true);
    setShowSaveCancel(false);
    setPlusIconClicked(true);
  };
  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };
  const navigate = useNavigate();
  const handleRowClick = async (row) => {
    try {
      navigate(`/opportunitiesdata?permission=${oppPermission}&&quotePermission=${quote_add}`, { state: { row } });
    } catch (error) {
      console.log(error);
    }
  };

  const renderTableRows = () => {
    // Calculate indexes for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the opportunity data for the current page
    const currentOpportunityData = rows.slice(startIndex, endIndex);

    // Render table rows
    return currentOpportunityData.map((row, index) => (
      <tr key={index} onClick={() => handleRowClick(row)}>
        <td>{row.opportunity_name}</td>
        <td>{row.quote}</td>
        <td>{row.status}</td>
        <td>{new Date(row.close).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
        <td>{row.owner}</td>
        <td>{row.revenue}</td>
        <td>{row.margin}</td>
      </tr>
    ));
  };

  const renderPagination = () => {
    // Calculate the total number of pages
    const totalPages = Math.ceil(rows.length / itemsPerPage);

    return (
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  // Define functions to handle dropdown selection for each dropdown
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

  const handleRegionSelect = (selectedOption) => {
    setRegion(selectedOption);
  };

  const handleIndustrySelect = (selectedOption) => {
    setIndustry(selectedOption);
  };

  const handleVerticalSelect = (selectedOption) => {
    setVertical(selectedOption);
  };

  const handleTypeSelect = (selectedOption) => {
    setType(selectedOption);
  };


  const optionRegion = ["AP", "EMEA ", "LA", "NA"];
  const optionIndustry = [
    "BUSINESS SERVICES",
    "FINANCE AND INSURANCE",
    "MANUFACTURING ",
    "MEDIA,ENTERTAINMENT & LEISURE",
    "PUBLIC SECTOR",
    "RETAIL & WHOLESALE TRADE",
    "UTILITIES & TELECOMMUNICATION",
    "OTHER",
  ];
  const optionVertical = [
    "BANKING",
    "CHEMICALS",
    "CONSTRUCTION & ENGG",
    "CONSULTING SERVICE",
    "CONSUMER PRODUCTS",
    "EDUCATION",
    "ENTERTAINMENT & LEISURE",
    "FINANCIAL SERVICES",
  ];
  const optionType = [
    "BANKING",
    "CHEMICALS",
    "CONSTRUCTION & ENGG",
    "CONSULTING SERVICE",
    "CONSUMER PRODUCTS ",
    "EDUCATION",
    "ENTERTAINMENT & LEISURE",
    "FINANCIAL SERVICES",
  ];

  const [isToastActive, setIsToastActive] = useState(false);

  const handleAddAccount = () => {
    if (!accounts || !owner) {
      if (!isToastActive) {
        toast.info("Please fill the required fields.", {
          onClose: () => setIsToastActive(false),
          onOpen: () => setIsToastActive(true),
        });
      }
      return;
    }
    const newAccountData = {
      accounts: accounts,
      owner: owner,
      parent_account: parentAccount,
      description: description,
      region: region,
      industry: industry,
      vertical: vertical,
      type: type,
      billing_street1: billingAddress.billingStreet1,
      billing_street2: billingAddress.billingStreet2,
      billing_city: billingAddress.billingCity,
      billing_state: billingAddress.billingState,
      billing_zip: billingAddress.billingZip,
      billing_country: billingAddress.billingCountry,
      billing_phone: billingAddress.billingPhone,
      shipping_street1: shippingAddress.shippingStreet1,
      shipping_street2: shippingAddress.shippingStreet2,
      shipping_city: shippingAddress.shippingCity,
      shipping_state: shippingAddress.shippingState,
      shipping_zip: shippingAddress.shippingZip,
      shipping_country: shippingAddress.shippingCountry,
      shipping_phone: shippingAddress.shippingPhone,
    };

    fetch(`${baseUrl}/api/accounts/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newAccountData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error adding Account");
        }
      })
      .then((data) => {
        console.log("Data received:", data);
        if (data.success && data.success === "Success") {
          toast.success("Account added successfully", {
            icon: (
              <span style={{ color: "rgb(74, 146, 59) " }}>
                <FaUser />
              </span>
            ),
            className: "custom-toast_add",
          });

          console.log("Account added successfully!", data);
          localStorage.setItem('indexNumber', JSON.stringify(dbAccountData.length));
          const delay = 2000;
          setTimeout(() => {
            window.location.reload();
          }, delay);
          const indexNum = JSON.parse(localStorage.getItem('indexNumber'));
          const passNum = indexNum === 0 ? 0 : indexNum;
          localStorage.setItem('indexNumber', JSON.stringify(passNum));
        } else if (data.Error && data.Error === "DuplicateAccount") {
          if (!isToastActive) {
            toast.error({
              message: data.message,
              icon: (
                <span style={{ color: "rgb(74, 146, 09)" }}>
                  <FaUser />
                </span>
              ),
              onClose: () => setIsToastActive(false),
              onOpen: () => setIsToastActive(true),
            });
          }
        }
      })

      .catch((error) => {
        console.error("Error adding Account:", error);
        if (!isToastActive) {
          toast.error(`${accounts} name already exists`, {
            onClose: () => setIsToastActive(false),
            onOpen: () => setIsToastActive(true),
          }
          );
        }
      });
  };
 

  // GET ACCOUNT DATA _______________________________________
  const [dbAccountData, setDbAccountData] = useState([]);
  console.log("!@#$%^&*");
  console.log(dbAccountData);
  // console.log("ACCOUNTDATA", JSON.stringify(dbAccountData, null, 2));
  const { accountIds } = useParams();
  console.log("tttt", accountId);
  console.log(accountIds);
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
          const account = await response.json();
          console.log(account);
          console.log(account.data);
          setDbAccountData(account.data);
          filtered = account.data.filter((acc) => acc._id === accountIds);
          console.log(filtered);
          // Update state with filtered accounts
          setFilteredAccounts(filtered);

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
  // ---------CANCEL ACCOUNT-------------------------
  const resetFields = () => {
    setAccounts("");
    setOwner("");
    // setOwnerProfile("");
    setParentAccount("");
    setDescription("");
    setRegion("");
    setIndustry("");
    setVertical("");
    setType("");
    setBillingAddress({
      billingStreet1: "",
      billingStreet2: "",
      billingCity: "",
      billingState: "",
      billingZip: "",
      billingCountry: "",
      billingPhone: "",
    });
    setShippingAddress({
      shippingStreet1: "",
      shippingStreet2: "",
      shippingCity: "",
      shippingState: "",
      shippingZip: "",
      shippingCountry: "",
      shippingPhone: "",
    });
    setShowOppopagination(false);
    setShowSaveCancel(true);
    setPlusIconClicked(true);
  };

  //------------update API For Accounts-------------------------------
  let updateToastDisplayed = false;
  const handleUpdateAccount = () => {
    if (!accounts || !owner) {
      toast.info("Please fill required fields.");
      return;
    }
    const newAccountData = {
      accounts: accounts,
      owner: owner,
      parent_account: parentAccount,
      description: description,
      region: region,
      industry: industry,
      vertical: vertical,
      type: type,
      billing_street1: billingAddress.billingStreet1,
      billing_street2: billingAddress.billingStreet2,
      billing_city: billingAddress.billingCity,
      billing_state: billingAddress.billingState,
      billing_zip: billingAddress.billingZip,
      billing_country: billingAddress.billingCountry,
      billing_phone: billingAddress.billingPhone,
      shipping_street1: shippingAddress.shippingStreet1,
      shipping_street2: shippingAddress.shippingStreet2,
      shipping_city: shippingAddress.shippingCity,
      shipping_state: shippingAddress.shippingState,
      shipping_zip: shippingAddress.shippingZip,
      shipping_country: shippingAddress.shippingCountry,
      shipping_phone: shippingAddress.shippingPhone,
    };

    fetch(`${baseUrl}/api/accounts/update/${accountId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newAccountData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error Updating Account");
        }
      })
      .then((data) => {
        if (!updateToastDisplayed) {
          toast.info("Account updated successfully");
          console.log("Account Updated successfully!", data);
          const delay = 2000;
          setTimeout(() => {
            window.location.reload();
          }, delay);
          updateToastDisplayed = true;
        }
      })
      .catch((error) => {
        console.error("Error Updating Account:", error);
      });
  };

  //API FOR ACCOUNT DELETE FUNCTION
  let deleteToastDisplayed = false;
  const handelDeleteAccount = () => {
    fetch(`${baseUrl}/api/accounts/delete/${accountId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error Deleteing Account");
        }
      })
      .then((data) => {
        if (!deleteToastDisplayed) {
          toast.success("Account deleted successfully", {
            icon: (
              <span style={{ color: "red" }}>
                <FaTrash />
              </span>
            ),
            className: "custom-toast_delete",
          });
          console.log("Account Deleted successfully!", data);
          const delay = 2000;
          setTimeout(() => {
            window.location.reload();
          }, delay);
          const indexNum = JSON.parse(localStorage.getItem('indexNumber'));
          const passNum = indexNum === 0 ? 0 : indexNum -1;
          localStorage.setItem('indexNumber', JSON.stringify(passNum));
          deleteToastDisplayed = true;
        }
      })
      .catch((error) => {
        console.error("Error Deleting Account:", error);
      });
  };

  //ACCOUNT API's END
  //****************************************Opportunity section start ***************************************
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
          console.log(oppData);
          console.log(
            oppData.data + "-----+--------+-------+--------+-------+"
          );
          setOpportunityData(oppData.data);
          console.log(oppData.data);

          if (rows == null) {
            try {
              const opporData = oppData.data[0];
              console.log(opporData);
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

    getOpportunityData();
  }, [accountId, accountIds]);

//------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (!filteredAccounts || !filteredAccounts[0]) {
      // If filteredAccounts is empty or null, or its first element is undefined, do not execute the rest of the code
      return;
    }

    // Execute the code only if filteredAccounts is not empty or null
    setAccountId(filteredAccounts[0]._id || "");
    setAccounts(filteredAccounts[0].accounts || "");
    setOwner(filteredAccounts[0].owner || "");
    setParentAccount(filteredAccounts[0].parent_account || "");
    setDescription(filteredAccounts[0].description || "");
    setRegion(filteredAccounts[0].region || "");
    setIndustry(filteredAccounts[0].industry || "");
    setVertical(filteredAccounts[0].vertical || "");
    setType(filteredAccounts[0].type || "");
  }, [filteredAccounts]);

  const areRequiredFieldsFilled = () => {
    return accounts && owner;
  };


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

  //------------------------------------end of people access functionality---------------------------------------------------

  return (

    <div>
      <Navbar />
      <Sidebar />
      <div className="bread">
        <ul className="breadcrumbs" id="accountbreadcrumbs">
          <div id="breadDiv1">
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
                className="breadcrumbs--link--active"
              >
                {accounts ? accounts : "New Account"}
              </Link>
            </li>

          </div>
          <div id="breadDiv2">
            <Link to="#">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="accountpen"
                style={{
                  backgroundColor: "rgb(33, 108, 152)",
                  color: "white",
                  fontSize: "12px",
                  marginRight: "10px",
                  padding: "7px",
                  marginBottom: "-7px",
                  marginTop: "-4px",
                }}
              // onClick={handlePenIconVisible}
              />
            </Link>
          </div>
        </ul>
        <hr className="hr" />
      </div>
      <div className="row" id="rows">
        <WriteFlex
          resetFields={resetFields}
          showGrouping={false}
          onItemSelect={handleItemSelect}
          data={dbAccountData}
          // onSelectUser={onSelectUser}
          dataType="account"
          borderVisible={false}
          permission={permission}
        />
        <div className="right"
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
            {accountSideBar ? <FaGreaterThan /> : <FaLessThan />}
          </button>


          <HeaderBar headerlabel="ACCOUNTS" />
          <div>
            {dbAccountData.length > 0 || plusIconClicked ? (
              <div className="hfg">
                <div className="containerA1">
                  <div className="containeraccounts">
                    <ErrorMessage
                      label="ACCOUNT"
                      showFlaxErrorMessageText={true}
                      errormsg="ACCOUNT IS A REQUIRED FIELD"
                      value={accounts}
                      onChange={(value) => setAccounts(value)}
                      readOnly={permission === 'readOnly'}
                    />
                  </div>
                  <div id="content2">
                    <div id="content8Container">
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
                        readOnly={permission === 'readOnly'}
                      />
                      <div className="profile-icon">
                        {owner
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </div>
                      {/* <div>{ownerProfile}</div> */}
                    </div>
                  </div>
                </div>
                <div className="containerA2">
                  <div id="content3" className="input-container-creataccount">
                    <InputTypes
                      showFlagText={true}
                      TextLabel={"PARENT ACCOUNT"}
                      value={parentAccount}
                      onChange={(value) => setParentAccount(value)}
                      // permission={permission}
                      readOnly={permission === 'readOnly'}
                    />
                  </div>
                </div>
                <div className="containerA3">
                  <div id="content4">
                    <InputTypes
                      showFlagText={true}
                      TextLabel={"DESCRIPTION"}
                      value={description}
                      onChange={(value) => setDescription(value)}
                      readOnly={permission === 'readOnly'}
                    />
                  </div>
                </div>
                <div className="containerA4">
                  <div className="dropdown_list">
                    <CustomDropdown
                      options={optionRegion}
                      onSelect={handleRegionSelect}
                      label="REGION"
                      labelforverticl="regionlabel"
                      value={region}
                      onChange={(value) => setRegion(value)}
                      readOnly={permission === 'readOnly'}
                    />
                  </div>

                  <div className="content5Container">
                    <CustomDropdown
                      options={optionIndustry}
                      onSelect={handleIndustrySelect}
                      label="INDUSTRY"
                      labelforverticl="industrylabel"
                      value={industry}
                      onChange={(value) => setIndustry(value)}
                      readOnly={permission === 'readOnly'}
                    />
                  </div>
                </div>

                <div className="containerA5">
                  <div className="content7Container">
                    <CustomDropdown
                      options={optionVertical}
                      onSelect={handleVerticalSelect}
                      label="VERTICAL"
                      labelforverticl="verticallabel"
                      value={vertical}
                      onChange={(value) => setVertical(value)}
                      readOnly={permission === 'readOnly'}
                    />
                  </div>

                  <div id="content8Container">
                    <CustomDropdown
                      options={optionType}
                      onSelect={handleTypeSelect}
                      label="TYPE"
                      labelforverticl="typelabel"
                      value={type}
                      onChange={(value) => setType(value)}
                      readOnly={permission === 'readOnly'}
                    />
                  </div>
                </div>
                <BillingAndShippingAddress
                  billingAddress={billingAddress}
                  setBillingAddress={setBillingAddress}
                  shippingAddress={shippingAddress}
                  setShippingAddress={setShippingAddress}
                  readOnly={permission === 'readOnly'}
                />
                <Addinfo />
                <div
                  id="save_cancel"
                  style={{ display: showSaveCancel ? "block" : "none" }}
                >
                  <button
                    id="save_data"
                    type="submit"
                    onClick={handleAddAccount}
                    disabled={!areRequiredFieldsFilled()}
                  >
                    SAVE ACCOUNT
                  </button>
                  <button id="reset_data" type="reset" onClick={resetFields}>
                    CANCEL ACCOUNT
                  </button>
                </div>

                {/* --------------opportunities----------------- */}
                <div
                  id="oppopagination"
                  style={{ display: showOppopagination ? "block" : "none" }}
                >
                  <div className="project">
                    <b>OPPORTUNITIES</b>
                  </div>

              {oppPermission !== 'none' && (
            <>
              {rows.length > 0 ? (
                <>
                  <table className="oppotable">
                    <thead>
                      <tr>
              <th className="table_heading">Name</th>
              <th className="table_heading">Quote</th>
              <th className="table_heading">Status</th>
              <th className="table_heading">Close Date</th>
              <th className="table_heading">Owner</th>
              <th className="table_heading">Revenue</th>
              <th className="table_heading">Margin</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
        <br />
        {renderPagination()}
        {/* + opportunities */}
        <div className="plus-oppertunities">
          
        </div>
                 </>
               ) : (
                 <p style={{ color: "#ccc",textAlign:"center"}}>No Opportunities found.</p>
               )}
               <Link
                       to={`/opportunities?data=${encodeURIComponent(
                         JSON.stringify(accountId)
                       )}`}
                     >
                       {(oppPermission === "access" || oppPermission === "" || !oppPermission) && (
                         <FaPlus style={{color:"#046088",width:"100%",textAlign:"center", marginTop:"10px"}}/>
                       )}
                     </Link>
             </>
           )}
           
                             {/* ------------delete account------------- */}
                  {/* <div className="project">
                    <b>PROJECTS</b>
                    <p style={{ color: "#ccc" }}>No Projects</p>
                  </div> */}
                  <div className="delete_update">
                    {!isReadOnly ? (
                      <button id="update_data" onClick={handleUpdateAccount}>
                        UPDATE ACCOUNT
                      </button>
                    ) : null}
                    {!isReadOnly ? (
                      <button id="delete_data" onClick={handelDeleteAccount}>
                        DELETE ACCOUNT
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : (
              <div id="accessmsgdiv">
                <label id="accessmsg">
                  NO ACCOUNTS FOUND. PLEASE USE + TO ADD A NEW ACCOUNT
                </label>
              </div>
            )}
          </div>  
        </div>
        <div
          className="sidepanel"
          style={{ width: accountSideBar ? "20%" : "0%" }}
        >
          <SidePanel
           showFlagFiles={true}
           showFlagNotes={true}
           showFlagExternalReference={true}
           showFlagTimeStamp={true}
           showFlagInternal={true}
           showFlagLink={true}   
          />
        </div>
      </div>
      {/*---------- accountslisting------------- */}

    </div>
  );
};
export default Account;
