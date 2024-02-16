import React, { useState, useEffect } from "react";
import Navbar from "../../layouts/Navbar";
import "../../assets/css/content/Content.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/common/ErrorMessage";
import CustomDropdownV from "../../components/common/CustomDropdown";
import InputTypes from "../../components/common/InputTypes";
import HeaderBar from "../../components/common/HeaderBar";
import WriteFlex from "../../components/common/WriteFlex";
import CatalogSidebar from "../../layouts/CatalogSidebar";
import {FROALA_LICENSE_KEY, baseUrl} from "../../config";
import { useAuthContext } from "../../hooks/useAuthContext";
import {FaNewspaper,  FaTrash} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Content = () => {
  const { user } = useAuthContext();
  console.log(user);
  const [contentId, setContentId] = useState("");
  const [contentName, setContentName] = useState("");
  const [salesOrg, setSalesOrg] = useState("");
  const [catalogNumber, setCatalogNumber] = useState("");
  const [catalogCategory, setCatalogCategory] = useState("");
  const [locked, setLocked] = useState(false);
  const [content, setContent] = useState("");
  const [showSaveCancel, setShowSaveCancel] = useState(false);
  const [showUpdateDelete, setShowUpdateDelete] = useState(true);
  const [plusIconClicked, setPlusIconClicked] = useState(false);
  const [isToastActive, setIsToastActive] = useState(false);
  const handleSalesOrgSelect = (selectedOption) => {
    setSalesOrg(selectedOption);
  };
  const handleCategorySelect = (selectedOption) => {
    setCatalogCategory(selectedOption);
  };
  const handleModelChange = (model) => {
    console.log(model);
    setContent(model);
  };

  // -----SAVE CONTENT DATA -------
  const saveContent = async (event) => {
    if (!contentName) {
      toast.info("Please fill in the 'TITLE' fields.");
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/api/content/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          content_name: contentName,
          sales_org: salesOrg,
          catalog_number: catalogNumber,
          catalog_category: catalogCategory,
          locked: locked ,
          content: content,
        }),
      });
      if (response.ok) {
        console.log("success");
        toast.success("content added successfully", {
          icon:  <span style={{ color: 'Green' }}><FaNewspaper/></span>,
          className:'custom-toast_add',
        });
        const delay = 1000;
        setTimeout(() => {
          window.location.reload();
        }, delay);
      } else {
        console.log("Request failed:", response.status);
        if (!isToastActive) {
          toast.error(`${contentName} name already exists`, {
            onClose: () => setIsToastActive(false),
            onOpen: () => setIsToastActive(true),
          }
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // -------GET CONTENT DATA-------
  const [dbContentData, setDbContentData] = useState([]);
  console.log(dbContentData);
  useEffect(() => {
    const getContentdata = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/content/get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const content = await response.json();
          console.log(content, "09090900");
          setDbContentData(content.data);
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getContentdata();
  }, [user]);

  const handleItemSelect = (selectedItem, selectedIndex) => {
    if (selectedIndex >= 0 && selectedIndex < dbContentData.length) {
      const selectedData = dbContentData[selectedIndex];
      setContentId(selectedData._id || "");
      setContentName(selectedData.content_name || "");
      setSalesOrg(selectedData.sales_org || "");
      setCatalogNumber(selectedData.catalog_number || "");
      setCatalogCategory(selectedData.catalog_category || "");
      setLocked(selectedData.locked || false);
      setContent(selectedData.content || "");
      setShowSaveCancel(false);
      setShowUpdateDelete(true);
      setPlusIconClicked(true);
    }
  };
  // ---------UPDATE CONTENT---------
  const handleUpdateContent = () => {
    if (!contentName) {
      toast.info("Please fill in the 'TITLE' fields.");
      return;
    }
    const newContentData = {
      content_name: contentName,
      sales_org: salesOrg,
      catalog_number: catalogNumber,
      catalog_category: catalogCategory,
      locked: locked,
      content: content,
    };

    fetch(`${baseUrl}/api/content/update/${contentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newContentData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error updating Content");
        }
      })
      .then((data) => {
        toast.info("Content added successfully");
        console.log("Content Updated successfully", data);
        const delay = 1000;
        setTimeout(() => {
          window.location.reload();
        }, delay);
      })
      .catch((error) => {
        console.error("Error Updating Content", error);
      });
  };

  // ---------DELETE CONTENT--------
  let deleteToastDisplayed = false;
  const handleDeleteContent = () => {
    fetch(`${baseUrl}/api/content/delete/${contentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!deleteToastDisplayed) {
          toast.success("Content deleted successfully", {
            icon: (
              <span style={{ color: "red" }}>
                <FaTrash />
              </span>
            ),
            className: "custom-toast_delete",
          });
          console.log("Content Deleted successfully!", data);
          const delay = 2000;
          setTimeout(() => {
            window.location.reload();
          }, delay);
          deleteToastDisplayed = true;
        }
      })
      .catch((error) => {
        console.log("Error Deleting content:", error);
      });
  };

  // --------RESET CONTENT------------
  const resetFields = () => {
    setContentName("");
    setSalesOrg("");
    setCatalogNumber("");
    setCatalogCategory("");
    setLocked(false);
    setContent("");
    setShowSaveCancel(true);
    setShowUpdateDelete(false);
    setPlusIconClicked(true);
  };
  // ------------------------------------------------------------------
  const editorConfig = {
    key: FROALA_LICENSE_KEY,
    toolbarButtons: [
      "fontAwesome",
      "fontFamily",
      "fontSize",
      "undo",
      "redo",
      "getPDF",
      "bold",
      "italic",
      "underline",
      "textColor",
      "backgroundColor",
      "clearFormatting",
      "alignLeft",
      "alignCenter",
      "alignRight",
      "alignJustify",
      "formatOL",
      "formatUL",
      "indent",
      "outdent",
      "paragraphFormat",
      "insertLink",
      "insertImage",
      "print",
      "quote",
      "html"
    ],
  };
  const optionscontent = [];
  const optionscontentCATEGARY = [];
  const areRequiredFieldsFilled = () => {
    return contentName;
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
              to="/rolessetup"
              className="breadcrumbs--link_mid"
            >
              Catalog
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="" className="breadcrumbs--link--active">
              Content
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <div className="rowcontent">
        <WriteFlex
          showGrouping={true}
          resetFields={resetFields}
          data={dbContentData}
          onItemSelect={handleItemSelect}
          dataType="content"
        />
       
          <div className="rightcontent">
            <div id="headercontent">
              <HeaderBar headerlabel=" CATALOG CONTENT" />
            </div>
            {dbContentData.length > 0 || plusIconClicked ? (
            <div id="createcontent">
              <div className="containercontent1">
                <div id="cc1">
                  <ErrorMessage
                    label="TITLE"
                    showFlaxErrorMessageText={true}
                    errormsg={"TITLE IS REQUIRED FIELD"}
                    value={contentName}
                    onChange={(value) => setContentName(value)}
                  />
                </div>
                <div id="cc2">
                  <CustomDropdownV
                    options={optionscontent}
                    label="SALES ORG"
                    onSelect={handleSalesOrgSelect}
                    value={salesOrg}
                    onChange={(value) => setSalesOrg(value)}
                  />
                </div>
                <div id="cc3">
                  <InputTypes
                    showFlagNumber={true}
                    NumberLabel={"CATALOG NUMBER"}
                    value={catalogNumber}
                    onChange={(value) => setCatalogNumber(value)}
                  />
                </div>
                <div id="cc4">
                  <div id="rolesetupcontent2">
                    <CustomDropdownV
                      options={optionscontentCATEGARY}
                      label="CATALOG CATEGORY"
                      onSelect={handleCategorySelect}
                      value={catalogCategory}
                      onChange={(value) => setCatalogCategory(value)}
                    />
                  </div>
                </div>
                <div id="cc5">
                  <InputTypes
                    showFlagCheckBox={true}
                    Checkboxlabel={"LOCKED"}
                    value={locked}
                    onChange={(value) => setLocked(value)}
                  />
                </div>
              </div>
              <div className="requillgridcontent">
                <FroalaEditorComponent
                  tag="textarea"
                  config={editorConfig}
                  onModelChange={handleModelChange}
                  model={content}
                />
              </div>
              <div
                className="save_cancel_content"
                style={{ display: showSaveCancel ? "block" : "none" }}
              >
                <button id="reset_data" type="reset" onClick={resetFields}>
                  CANCEL
                </button>
                <button id="save_data" type="submit" onClick={saveContent}
                    disabled={!areRequiredFieldsFilled()}>
                  SAVE NEW ITEM
                </button>
              </div>
              <div
                className="delete_update_content"
                style={{ display: showUpdateDelete ? "block" : "none" }}
              >
                <button
                  id="delete_data"
                  type="reset"
                  onClick={handleDeleteContent}
                >
                  DELETE
                </button>
                <button
                  id="update_data"
                  type="submit"
                  onClick={handleUpdateContent}
                >
                  UPDATE
                </button>
              </div>
            </div>
         
        ) : (
          <div id="accessmsgdiv">
            <label id="accessmsg">
              NO CONTENT FOUND. PLEASE USE + TO ADD A NEW CONTENT
            </label>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Content;
