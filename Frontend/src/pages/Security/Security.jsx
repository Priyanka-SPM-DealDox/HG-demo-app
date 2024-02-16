import React, { useEffect } from "react";
import Navbar from "../../layouts/Navbar";
import AdminSidebar from "../../layouts/AdminSidebar";
import { useState } from "react";
import "../../assets/css/security/Security.css";
import WriteFlex from "../../components/common/WriteFlex";
import HeaderBar from "../../components/common/HeaderBar";
import ErrorMessage from "../../components/common/ErrorMessage";
import InputTypes from "../../components/common/InputTypes";
import HelpRequest from "../../components/common/HelpRequest";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import {baseUrl} from "../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLock, FaTrash } from "react-icons/fa";
const Security = () => {
  const { user } = useAuthContext();


  const [inputValueSecurity, setInputValueSecurity] = useState("");
  const [inputValueSecurityRolesDesc, setInputValueSecurityRolesDesc] =
    useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageroles, setErrorMessageRoles] = useState("");
  const [securityRoleId, setSecurityRoleId] = useState("");
  const [securityRoleData, setSecurityRoleData] = useState([]);
  const [showSaveCancel, setShowSaveCancel] = useState(false);
  const [showUpdateDelete, setShowUpdateDelete] = useState(true);
  const [plusIconClicked, setPlusIconClicked] = useState(false);
  let role_name = inputValueSecurity;
  let role_desc = inputValueSecurityRolesDesc;
  const twoData = { role_name, role_desc };
  console.log("!@#$");
  console.log(twoData);

  const [initialData] = useState([
    {
      page: "Account",
      name: "account",
      none: false,
      readOnly: false,
      access: false,
    },
    {
      page: "Opportunity",
      name: "opportunity",
      none: false,
      readOnly: false,
      access: false,
    },
    {
      page: "Opportunity-Stage",
      name: "oppor_stage",
      none: false,
      readOnly: false,
      access: false,
    },
    {
      page: "Quote",
      none: false,
      name: "quote",
      readOnly: false,
      access: false,
    },
    {
      page: "Quote Add",
      none: false,
      name: "quote_add",
      readOnly: false,
      access: false,
    },
    {
      page: "Quote Guidedselling Answer",
      name: "quote_guideSel_ans",
      none: false,
      readOnly: false,
      access: false,
    },
    {
      page: "Quote Guidedselling Design",
      name: "quote_guidesel_desg",
      none: false,
      readOnly: false,
      access: false,
    },
    {
      page: "Catalog",
      name: "catalog",
      none: false,
      readOnly: false,
      access: false,
    },
    {
      page: "Catalog Roles",
      name: "catalog_roles",
      none: false,
      readOnly: false,
      access: false,
    },
  ]);

  const [data, setData] = useState(initialData);

  //API to send data to database
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

  console.log("@#$%");
  console.log(securityRoleData);

  const createSecurityRole = async () => {
    if (!twoData.role_name || !twoData.role_desc) {
      alert("Role and description are required!");
      return;
    }

    try {
      const result = data.reduce((acc, obj) => {
        const { page, name, ...rest } = obj;
        for (const key in rest) {
          if (rest[key] === true) {
            acc[name] = key;
            break; // Assuming only one true value per object
          }
        }
        return acc;
      }, {});

      const sendData = {
        ...twoData,
        ...result,
      };

      const response = await fetch(`${baseUrl}/api/security/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ sendData }),
      });

      if (response.ok) {
        toast.success("Security Role added successfully", {
          icon: (
            <span style={{ color: "rgb(74, 146, 59) " }}>
              <FaLock />
            </span>
          ),
          className: "custom-toast_add",
        });
        setData(initialData);
        setInputValueSecurity("");
        setInputValueSecurityRolesDesc("");
        getSecurityRoleData();
        setErrorMessage("");
        setErrorMessageRoles("");
      } else {
        toast.info("Unable to create security role!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Update API
  const updateSecurityRole = async () => {
    if (!twoData.role_name || !twoData.role_desc) {
      toast.info("Role and description are required!");
      return;
    }

    try {
      const result = data.reduce((acc, obj) => {
        const { page, name, ...rest } = obj;
        for (const key in rest) {
          if (rest[key] === true) {
            acc[name] = key;
            break; // Assuming only one true value per object
          }
        }
        return acc;
      }, {});

      const sendData = {
        ...twoData,
        ...result,
      };

      const response = await fetch(
        `${baseUrl}/api/security/update/${securityRoleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ sendData }),
        }
      );

      if (response.ok) {
        toast.info("Security role updated successfully!");
        getSecurityRoleData();
        setErrorMessage("");
        setErrorMessageRoles("");
      } else {
        toast.info("Unable to update security role!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Delete API
  const deleteData = async () => {
    const response = securityRoleId
      ? await fetch(`${baseUrl}/api/security/delete/${securityRoleId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
      : "";

    if (response.ok)
      toast.success("Security role deleted successfully", {
        icon: (
          <span style={{ color: "red " }}>
            <FaTrash />
          </span>
        ),
        className: "custom-toast_delete",
      });
    getSecurityRoleData();
    setData(initialData);
    setInputValueSecurity("");
    setInputValueSecurityRolesDesc("");
    setErrorMessage("");
    setErrorMessageRoles("");
  };

  //Saving the data from the database and dispaly it in fields

  const handleItemSelect = (selectedItem, selectedIndex) => {
    console.log(selectedItem);
    const {
      _id,
      role_desc,
      role_name,
      admin_id,
      created_at,
      modified_at,
      __v,
      ...rest
    } = selectedItem;
    console.log("rest", Object.entries(rest));
    const selectedData = securityRoleData[selectedIndex] || securityRoleData;
    setSecurityRoleId(selectedData._id || "");
    setInputValueSecurity(selectedData.role_name || "");
    setInputValueSecurityRolesDesc(selectedData.role_desc || "");
    const updatedData = initialData.map((item) => {
      console.log(Object.keys(rest).includes(item.name));
      if (Object.keys(rest).includes(item.name)) {
        let indexval = Object.keys(rest).indexOf(item.name);
        let property = Object.entries(rest)[indexval];
        console.log(property);
        return { ...item, [property[1]]: true };
      }
      return item;
    });
    console.log("up", updatedData);
    setData(updatedData);
    setShowSaveCancel(false);
    setShowUpdateDelete(true);
    setPlusIconClicked(true);
  };
  

  function handleInputChange(page, property, property1, property2, value) {
    console.log(page, property, property1, property2, value);
    const updatedData = data.map((item) => {
      if (item.page === page) {
        return {
          ...item,
          [property]: value,
          [property1]: false,
          [property2]: false,
        };
      }
      return item;
    });
    setData(updatedData);
    console.log("Xhxv" + updatedData);
  }
  console.log(data);

  const resetFields = () => {
    setSecurityRoleData("");
    setInputValueSecurity("");
    setInputValueSecurityRolesDesc("");
    setShowSaveCancel(true);
    setShowUpdateDelete(false);
    setPlusIconClicked(true);
    resetCheckboxes();
  };
  const resetCheckboxes = () => {
    const updatedData = data.map((item) => ({
      ...item,
      none: false,
      readOnly: false,
      access: false,
    }));
    setData(updatedData);
  };
  useEffect(() => {
    getSecurityRoleData();
  }, [user]);

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
              to='/companyprofile'
              className="breadcrumbs--link_mid"
            >
              Admin
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link className="breadcrumbs--link--active">
              Security
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <HelpRequest />
      <div className="rowsecurity" id="rowssecurity">
        <WriteFlex
          resetFields={resetFields}
          data={securityRoleData}
          dataType="security"
          onItemSelect={handleItemSelect}
        />

        {/* -------------------------- */}

        <div className="rightsecurity">
          <HeaderBar headerlabel="SECURITY ROLE" />
          {securityRoleData.length > 0 || plusIconClicked ? (
            <div id="securitycontentshow">
              <div className="securityrolediv">
                <div id="secutityinputdiv">
                  <ErrorMessage
                    showFlaxErrorMessageText={true}
                    label="SECURITY ROLE NAME"
                    errormsg="SECURITY ROLE NAME IS A REQUIRED FIELD"
                    value={inputValueSecurity}
                    onChange={(value) => setInputValueSecurity(value)}
                  />
                </div>
                <div id="rolesinputdiv">
                  <InputTypes
                    showFlagText={true}
                    TextLabel={"ROLES DESCRIPTION"}
                    value={inputValueSecurityRolesDesc}
                    onChange={(value) => setInputValueSecurityRolesDesc(value)}
                  />
                </div>
              </div>
              <label id="label1">options are grey are not yet avaliable</label>
              {/* static contaioner header */}
              <div className="staticcontaionerheader class1">
                <div className="class2">
                  <label>Page</label>
                </div>
                <div className="class2">
                  <label>None</label>
                </div>
                <div className="class2">
                  <label>Read only</label>
                </div>
                <div className="class2">
                  <label>Access</label>
                </div>
              </div>

              {data.map((item) => {
                return (
                  <div className="class1">
                    <div id={``} className="class2">
                      {/* <input type="text" value= {item.page} readOnly /> */}
                      <label>{item.page}</label>
                    </div>
                    <div className="class2">
                      <input
                        type="checkbox"
                        name={`none-${item.name}`}
                        onChange={(event) => {
                          return handleInputChange(
                            item.page,
                            "none",
                            "readOnly",
                            "access",
                            event.target.checked
                          );
                        }}
                        //onChange={(event) => { item.none = event.target.checked }}
                        checked={item.none}
                      />
                    </div>
                    <div className="class2">
                      <input
                        type="checkbox"
                        name={`readonly-${item.name}`}
                        onChange={(event) => {
                          return handleInputChange(
                            item.page,
                            "readOnly",
                            "none",
                            "access",
                            event.target.checked
                          );
                        }}
                        // onChange={(event) => { item.readOnly = event.target.checked }}
                        checked={item.readOnly}
                      />
                    </div>
                    <div className="class2">
                      <input
                        type="checkbox"
                        name={`access-${item.name}`}
                        onChange={(event) => {
                          return handleInputChange(
                            item.page,
                            "access",
                            "none",
                            "readOnly",
                            event.target.checked
                          );
                        }}
                        checked={item.access}
                      />
                    </div>
                  </div>
                );
              })}

              <div id="crud_security" className="classbutton">
                <div className="save_cancel_security" style={{ display: showSaveCancel ? "block" : "none" }} >
                  <button id="save_data" onClick={createSecurityRole}>SAVE SECURITY ROLE</button>
                  <button id="reset_data" type="reset" onClick={resetFields}> CANCEL SECURITY ROLE </button>
                </div>
                <div className="delete_update_security" style={{ display: showUpdateDelete ? "block" : "none" }} >
                   <button id="update_data" onClick={updateSecurityRole}> UPDATE SECURITY ROLE </button>
                  <button id="delete_data" onClick={deleteData}> DELETE SECURITY ROLE </button>
                </div>
              </div>
            </div>
          ) : (
            <div id="accessmsgdiv">
              <label id="accessmsg">
                NO SECURITY ROLE FOUND. PLEASE USE + TO ADD A NEW SECURITY ROLE
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Security;
