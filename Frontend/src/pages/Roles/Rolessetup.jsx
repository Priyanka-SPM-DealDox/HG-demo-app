import React, { useEffect, useState } from "react";
import Navbar from "../../layouts/Navbar";
import CatalogSidebar from "../../layouts/CatalogSidebar";
import CustomDropdown from "../../components/common/CustomDropdown";
import ErrorMessage from "../../components/common/ErrorMessage";
import { Link } from "react-router-dom";
import Addinfo from "../../components/addinfo/Addinfo";
import Categories from "../../components/categaries/Categaries";
import InputTypes from "../../components/common/InputTypes";
import WriteFlex from "../../components/common/WriteFlex";
import "../../assets/css/roles/Rolessetup.css";
import HeaderBar from "../../components/common/HeaderBar";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import { baseUrl } from "../../config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaUser } from "react-icons/fa";
const Rolessetup = () => {
  const { user } = useAuthContext();
  console.log(user);

  // const [, setSelectedOption] = useState(null);
  const [rolesId, setRolesId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [roleCatCategory, setRoleCatCategory] = useState("");
  const [roleCatStatus, setRoleCatStatus] = useState("");
  const [roleType, setRoleType] = useState("");
  const [roleGroup, setRoleGroup] = useState("");
  const [rolePractice, setRolePractice] = useState("");
  const [parentRole, setParentRole] = useState("");
  const [roleExterRef, setRoleExterRef] = useState("");
  const [roleProDisc, setRoleProDisc] = useState(false);
  const [roleCata1, setRoleCata1] = useState("");
  const [roleCata2, setRoleCata2] = useState("");
  const [roleCata3, setRoleCata3] = useState("");
  const [roleCata4, setRoleCata4] = useState("");
  const [roleCata5, setRoleCata5] = useState("");
  const [roleCata6, setRoleCata6] = useState("");
  const [showSaveCancel, setShowSaveCancel] = useState(false);
  const [showUpdateDelete, setShowUpdateDelete] = useState(true);
  const [plusIconClicked, setPlusIconClicked] = useState(false);
  const optioncatalog = [];
  const optionstatus = ["INACTIVE", "IN PROGRESS", "PUBLISHED"];
  const optionroletype = ["APPROVALS","SALES"," BID TEAM MEMBER"," MANAGEMENT","DELIVERY","DELIVERY OWNER",
  
  "PRACTICE"];
  const optionrolegroup = [];
  const optionpractice = ["DBA", "DSOM", "EDUCATION", "IZOT"];
  const optionparentrole = [];
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleToggledescription = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCatCategorySelect = (selectedOption) => {
    setRoleCatCategory(selectedOption);
  };

  const handleRoleCatStatusSelect = (selectedOption) => {
    setRoleCatStatus(selectedOption);
  };

  const handleRoleTypeSelect = (selectedOption) => {
    setRoleType(selectedOption);
  };

  const handleRoleGroupSelect = (selectedOption) => {
    setRoleGroup(selectedOption);
  };

  const handleRolePracticeSelect = (selectedOption) => {
    setRolePractice(selectedOption);
  };

  const handleParentRoleSelect = (selectedOption) => {
    setParentRole(selectedOption);
  };

  const handleModelChange = (model) => {
    console.log(model);
  };
  const editorConfig = {
    toolbarButtons: [
      [
        "fontFamily",
        "fontSize",
        "textColor",
        "backgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "formatOL",
        "formatUL",
        "paragraphFormat",
        "paragraphStyle",
        "|",
        "align",
        "indent",
        "outdent",
        "|",
        "insertLink",
        "insertImage",
        "insertTable",
        "|",
        "specialCharacters",
        "print",
        "undo",
        "redo",
      ],
    ],
  };

  let addToastDisplayed = false;
  const handleAddRolesSetup = () => {
    if (!roleName) {
      toast.info("Please fill in the 'ROLE NAME' field.");
      return;
    }
  
    const newRolesSetup = {
      role_name: roleName,
          role_cat_category: roleCatCategory,
          role_cat_status: roleCatStatus,
          role_type: roleType,
          role_group: roleGroup,
          role_practice: rolePractice,
          parent_role: parentRole,
          role_exter_ref: roleExterRef,
          role_pro_disc: roleProDisc,
          role_category_1: roleCata1,
          role_category_2: roleCata2,
          role_category_3: roleCata3,
          role_category_4: roleCata4,
          role_category_5: roleCata5,
          role_category_6: roleCata6,
    };
  
    fetch(`${baseUrl}/api/roles/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newRolesSetup),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400) {
          throw new Error("Duplicate role"); // Trigger catch block for duplicate role
        } else {
          throw new Error("Error adding Roles");
        }
      })
      .then((data) => {
        if (!addToastDisplayed) {
        toast.success("Role added successfully", {
          icon: <span style={{ color: 'Green' }}><FaUser /></span>,
          className: 'custom-toast_add',
        });
        console.log("Roles added successfully!", data);
        const delay = 2000;
        setTimeout(() => {
          window.location.reload();
        }, delay);
      }
      })
      .catch((error) => {
        console.error("Error adding Roles:", error);
        if (error.message === "Duplicate role") {
          toast.error("Duplicate role. Please choose a different role name.");
        }
      });
  };
  


  // GET ROLES
  const [dbRolesData, setDbRolesData] = useState([]);
  console.log("!@#$%^&*");
  console.log(dbRolesData);

  useEffect(() => {
    const getRolesData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/roles/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const roles = await response.json();
          console.log(roles);
          console.log(roles.data);
          setDbRolesData(roles.data);

          if (dbRolesData == null) {
            try {
              const rolesData = roles.data;
              console.log(rolesData);
            } catch (error) {
              console.log(error);
            }
          }
        } else {
          console.log("ERROR: ", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getRolesData();
  }, [user]);

  //Setting useState when clicked on the rightsidebar

  const handleItemSelect = (selectedItem, selectedIndex) => {
    if (selectedIndex >= 0 && selectedIndex < dbRolesData.length) {
      const selectedData = dbRolesData[selectedIndex];
      setRolesId(selectedData._id || "");
      setRoleName(selectedData.role_name || "");
      setRoleCatCategory(selectedData.role_cat_category || "");
      setRoleCatStatus(selectedData.role_cat_status || "");
      setRoleType(selectedData.role_type || "");
      setRoleGroup(selectedData.role_group || "");
      setRolePractice(selectedData.role_practice || "");
      setParentRole(selectedData.parent_role || "");
      setRoleExterRef(selectedData.role_exter_ref || "");
      setRoleProDisc(selectedData.role_pro_disc || "");
      setRoleCata1(selectedData.role_category_1 || "");
      setRoleCata2(selectedData.role_category_2 || "");
      setRoleCata3(selectedData.role_category_3 || "");
      setRoleCata4(selectedData.role_category_4 || "");
      setRoleCata5(selectedData.role_category_5 || "");
      setRoleCata6(selectedData.role_category_6 || "");
      setShowSaveCancel(false);
      setShowUpdateDelete(true);
    }
  };

  const resetFields = () => {
    setRoleName("");
    setRoleCatCategory("");
    setRoleCatStatus("");
    setRoleType("");
    setRoleGroup("");
    setRolePractice("");
    setParentRole("");
    setRoleExterRef("");
    setRoleProDisc(false);
    setRoleCata1("");
    setRoleCata2("");
    setRoleCata3("");
    setRoleCata4("");
    setRoleCata5("");
    setRoleCata6("");
    setShowSaveCancel(true);
    setShowUpdateDelete(false);
    setPlusIconClicked(true)
  };


  let displayToast = false;
  const handleUpdateRoles = () => {
    const newRolesSetup = {
      role_name: roleName,
      role_cat_category: roleCatCategory,
      role_cat_status: roleCatStatus,
      role_type: roleType,
      role_group: roleGroup,
      role_practice: rolePractice,
      parent_role: parentRole,
      role_exter_ref: roleExterRef,
      role_pro_disc: roleProDisc,
      role_category_1: roleCata1,
      role_category_2: roleCata2,
      role_category_3: roleCata3,
      role_category_4: roleCata4,
      role_category_5: roleCata5,
      role_category_6: roleCata6,
    };

    fetch(`${baseUrl}/api/roles/update/${rolesId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newRolesSetup),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error Updating Account");
        }
      })
      .then((data) => {
        if(!displayToast){
        toast.info("Role Updated successfully");
        console.log("Role Updated successfully!", data);
        displayToast = true;
        }
        const delay = 2000;
        setTimeout(() => {
          window.location.reload();
        }, delay);
      })
      .catch((error) => {
        console.error("Error Updating Roles:", error);
      });
  };

  // DELETE ROLES
  const handleDeleteRoles = () => {
    fetch(`${baseUrl}/api/roles/delete/${rolesId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error Deleteing Roles");
        }
      })
      .then((data) => {
        if(!displayToast){
        toast.success("Role deleted successfully", {
          icon: <span style={{ color: 'red ' }}><FaTrash /></span>,
          className: 'custom-toast_delete',
        });
        displayToast = true;
      }
        console.log("Roles Deleted successfully!", data);
        const delay = 2000;
        setTimeout(() => {
          window.location.reload();
        }, delay);
      })
      .catch((error) => {
        console.error("Error Deleting Roles:", error);
      });
  };
  const areRequiredFieldsFilled = () => {
    return roleName;
  };
  return (
    <div>
      <Navbar />
      <CatalogSidebar />
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
              to='/rolessetup'
              className="breadcrumbs--link_mid"
            >
              Catalog
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link
              to="/rolessetup"
              className="breadcrumbs--link_mid"
            >
              Roles
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="" className="breadcrumbs--link--active">
              Setup
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <div className="rowrolesetup">
        <WriteFlex
          showGrouping={true}
          resetFields={resetFields}
          data={dbRolesData}
          onItemSelect={handleItemSelect}
          dataType="rolesetup"
        />
        <div className="rightrolesetup">
          <div>
            <HeaderBar headerlabel="CATALOG ROLES" />
          </div>
          {dbRolesData.length > 0 || plusIconClicked ? (
            <div id="create_roles">
              <div className="rolesetupcontainer1">
                <ErrorMessage
                  label="ROLE NAME"
                  showFlaxErrorMessageText={true}
                  errormsg="ROLE PROFILE NAME IS REQUIRED"
                  value={roleName}
                  onChange={(value) => setRoleName(value)}
                />
                <div id="rolesetupcontent2">
                  <CustomDropdown
                    options={optioncatalog}
                    onSelect={handleCatCategorySelect}
                    label="CATALOG CATEGORY"
                    value={roleCatCategory}
                    onChange={(value) => setRoleCatCategory(value)}
                  />
                </div>
                <div id="rolesetupcontent3">
                  <CustomDropdown
                    options={optionstatus}
                    onSelect={handleRoleCatStatusSelect}
                    label="CATALOG STATUS"
                    value={roleCatStatus}
                    onChange={(value) => setRoleCatStatus(value)}
                  />
                </div>
              </div>
              <div className="rolesecomain">
                <div id="rolesetupcontent4">
                  <CustomDropdown
                    options={optionroletype}
                    onSelect={handleRoleTypeSelect}
                    label="ROLE TYPE"
                    value={roleType}
                    onChange={(value) => setRoleType(value)}
                  />
                </div>
                <div id="rolesetupcontent5">
                  <CustomDropdown
                    options={optionrolegroup}
                    onSelect={handleRoleGroupSelect}
                    label="ROLE GROUP"
                    value={roleGroup}
                    onChange={(value) => setRoleGroup(value)}
                  />
                </div>
                <div className="dropdownpractice">
                  <CustomDropdown
                    options={optionpractice}
                    onSelect={handleRolePracticeSelect}
                    label="PRACTICE"
                    value={rolePractice}
                    onChange={(value) => setRolePractice(value)}
                  />
                </div>
              </div>
              <div className="rolesmain2">
                <div className="dropdownparentrole">
                  <CustomDropdown
                    options={optionparentrole}
                    onSelect={handleParentRoleSelect}
                    label="PARENT ROLE"
                    value={parentRole}
                    onChange={(value) => setParentRole(value)}
                  />
                </div>
                <div className="rolesetupcontainer8">
                  <InputTypes
                    showFlagText={true}
                    TextLabel="EXTERNAL REFRENCE"
                    value={roleExterRef}
                    onChange={(value) => setRoleExterRef(value)}
                  />
                </div>
                <div className="rolesetupcontainer9">
                  <InputTypes
                    showFlagCheckBox={true}
                    Checkboxlabel={"PROHIBIT DISCOUNT"}
                    value={roleProDisc}
                    onChange={(value) => setRoleProDisc(value)}
                  />
                </div>
              </div>
              <div className="headerrole2">
                <Categories />
              </div>
              <div className="headerRoles3" onClick={handleToggledescription}>
                <HeaderBar
                  headerlabel={"DESCRIPTION"}
                  isButtonVisible={true}
                  isDropdownOpen={isDropdownOpen}
                  headerbardiv="headerbardiv_description"
                />
              </div>
              {isDropdownOpen && (
                <div className="requillgrid">
                  <FroalaEditorComponent
                    tag="textarea"
                    config={editorConfig}
                    onModelChange={handleModelChange}
                  />
                </div>
              )}
              <div className="addinfoforroles">
                <Addinfo />
              </div>
              <div className="roles_crud">
                <div
                  className="roles_reset_save"
                  style={{ display: showSaveCancel ? "block" : "none" }}
                >
                  <button id="reset_data" onClick={resetFields}>
                    CANCEL
                  </button>
                  <button id="save_data" onClick={handleAddRolesSetup}   disabled={!areRequiredFieldsFilled()}>
                    SAVE NEW ROLE
                  </button>
                </div>
                <div
                  className="roles_delete_update"
                  style={{ display: showUpdateDelete ? "block" : "none" }}
                >
                  <button id="delete_data" onClick={handleDeleteRoles}>
                    DELETE
                  </button>
                  <button id="update_data" onClick={handleUpdateRoles}>
                    UPDATE
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div id="accessmsgdiv">
              <label id="accessmsg">
                NO ROLES FOUND. PLEASE USE + TO ADD A NEW ROLE
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Rolessetup;
