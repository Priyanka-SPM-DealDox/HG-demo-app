import React, { useState, useEffect } from "react";
import Navbar from "../../layouts/Navbar";
import "../../assets/css/doctype/Doctype.css";
import WriteFlex from "../../components/common/WriteFlex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileWord } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../../config";
import {
  faTrashAlt,
  faClone,
  faCloudArrowUp,
  faX,
  faCloudArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import CatalogSidebar from "../../layouts/CatalogSidebar";
import { Link } from "react-router-dom";
import CustomDropdown from "../../components/common/CustomDropdown";
import HeaderBar from "../../components/common/HeaderBar";
import ErrorMessage from "../../components/common/ErrorMessage";
import DeleteAction from "../../components/addsection/DeleteAction";
import InputTypes from "../../components/common/InputTypes";
import HelpRequest from "../../components/common/HelpRequest";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaInfo, FaInfoCircle, FaTrash, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Doctypes = () => {
  const { user } = useAuthContext();
  const [selectedoption1, setSelectedOption1] = useState(null);
  const [sections, setSections] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [showDownloadCancel, setShowDownloadCancel] = useState(false);
  const [showSaveCancel, setShowSaveCancel] = useState(false);
  const [headerChange, setHeaderChange] = useState("DOCUMENT TYPES");
  const [showUpdateDelete, setShowUpdateDelete] = useState(true);
  const [plusIconClicked, setPlusIconClicked] = useState(false);
  const optionscategory = ["DBA", "DSOM", "DEFAULT", "EDUCATION", "IZOT"];
  const optionscatlogstatus = ["INACTIVE", "IN PROGRESS", "PUBLISHED"];
  const optionspurpose = ["EMAIL", "DOCUMENT"];
  const optionspapersize = [
    "INHERIT FROM WORD TEMPLATE",
    "LETTER",
    "LEGAL",
    "LEGAL LANDSCAPE",
    "A4",
    "A3",
    "LETTER LANDSCAPE",
    "A4 LANDSCAPE",
  ];
  const [fileTypeError, setFileTypeError] = useState(false);
  const [unsupportedTagsError, setUnsupportedTagsError] = useState(false);
  const [, setSearchTerm] = useState("");
  const [uploadedWatermarkFileName, setUploadedWatermarkFileName] =
    useState("");
  const [showWatermarkDownloadCancel, setShowWatermarkDownloadCancel] =
    useState(false);
  const [sectionErrors, setSectionErrors] = useState([]);

  const handleActionSelect1 = (selectedOption) => {
    setCategory(selectedOption);
  };
  const [selectedoption2, setSelectedOption2] = useState(null);
  const handleActionSelect2 = (selectedOption) => {
    setStatus(selectedOption);
  };
  const [selectedoption3, setSelectedOption3] = useState(null);
  const handleActionSelect3 = (selectedOption) => {
    setPurpose(selectedOption);
  };
  const [selectedoption4, setSelectedOption4] = useState(null);
  const handleActionSelect4 = (selectedOption) => {
    setPaper_size(selectedOption);
  };
  const areRequiredFieldsFilled = () => {
    return doc_name && status && purpose;
  };
  const addSection = () => {
    const newSectionId = Date.now();
    const newSection = {
      id: newSectionId,
      section_name: "",
      section_tag: `SECTION_`, // Fix this line
    };
    setSections([...sections, newSection]);
  };
  
  
  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    console.log("Copied to clipboard:", value);
  };
  const handleMoveUp = (id, index) => {
    if (index > 0) {
      const updatedSections = [...sections];
      const currentSection = updatedSections[index];
      const previousSection = updatedSections[index - 1];
      updatedSections[index] = previousSection;
      updatedSections[index - 1] = currentSection;
      setSections(updatedSections);
    }
  };
  const handleMoveDown = (id, index) => {
    if (index < sections.length - 1) {
      const updatedSections = [...sections];
  
      [updatedSections[index], updatedSections[index + 1]] = [
        updatedSections[index + 1],
        updatedSections[index],
      ];
      setSections(updatedSections);
    }
  };

  const handleButtonClick = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };
  const handleUpload = (event) => {
    const fileInput = document.getElementById("fileInput");
    const file = event.target.files[0];
    const fileName = file.name.toLowerCase();
    const extension = fileName.split(".").pop();

    if (extension === "doc" || extension === "docx") {
      setUploadedFileName(fileName);
      setShowDownloadCancel(true);
      setFileTypeError(false);
      setUnsupportedTagsError(checkForUnsupportedTags(file));
      fileInput.value = "";
    } else {
      setFileTypeError(true);
      setUnsupportedTagsError(false);
      setUploadedFileName("");
      setShowDownloadCancel(false);
    }
  };

  const checkForUnsupportedTags = (file) => {
    const content = "";
    if (content.includes("<unsupported>")) {
      return true;
    }
    return false;
  };
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(
      new Blob([], { type: "application/msword" })
    );
    link.download = uploadedFileName;
    link.click();
  };

  const handleCancel = () => {
    setSearchTerm("");
    setUploadedFileName("");
    setShowDownloadCancel(false);
  };
  const handleWatermarkUpload = (event) => {
    const fileInput = document.getElementById("watermarkFileInput");
    const file = event.target.files[0];
    const fileName = file.name.toLowerCase();
    const extension = fileName.split(".").pop();

    if (extension === "jpg" || extension === "jpeg" || extension === "png") {
      setUploadedWatermarkFileName(fileName);
      setShowWatermarkDownloadCancel(true);
      fileInput.value = "";
    } else {
      console.log("Invalid file format. Only JPG and PNG images are allowed.");
    }
  };

  const handleWatermarkDownload = () => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([], { type: "image/*" }));
    link.download = uploadedWatermarkFileName;
    link.click();
  };

  const handleWatermarkCancel = () => {
    setUploadedWatermarkFileName("");
    setShowWatermarkDownloadCancel(false);
  };

  const handleSectionNameChange = (event, index) => {
    const value = event.target.value;
    const updatedErrors = [...sectionErrors];
    const updatedSections = [...sections];
    // updatedSections[index].textsection2 = value;
    updatedSections[index].section_name = value;
    updatedSections[index].section_tag = `SECTION_${value}`;

    setSections(updatedSections);

    const textsection3 = `SECTION_${value}`;
    document.getElementById(`textsection3`).value = textsection3;

    if (value.trim() === "") {
      updatedErrors[index] = "SECTION NAME MAY NOT BE EMPTY";
      event.target.style.outlineColor = "red";
      event.target.style.border = "2px solid red";
    } else {
      updatedErrors[index] = "";
      event.target.style.outlineColor = "#0f6b93";
      //  event.target.style.border = "#0f6b93";
    }
    setSectionErrors(updatedErrors);
  };

  const handleDownloadClick = () => {
    const wordContent = "This is the content of the Word file.";
    const blob = new Blob([wordContent], { type: "application/msword" });
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = "document.doc";
    anchor.click();
    URL.revokeObjectURL(anchor.href);
    anchor.remove();
  };

  // backend code start
  //useState to save data of DB
  const [doctypeId, setDocTypeId] = useState("");
  const [section_name, setSection_name] = useState("");
  const [section_tag, setSection_tag] = useState("");
  const [doc_name, setDoc_name] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [purpose, setPurpose] = useState("");
  const [template_file, setTemplate_file] = useState("");
  const [paper_size, setPaper_size] = useState("");
  const [watermark_file, setWatermark_file] = useState("");
  const [watermark, setWatermark] = useState(false);
  const [toc, setToc] = useState(false);

  //  adding doctype

  const addDoctype = () => {
    if (!doc_name || !status || !purpose) {
      toast.info("Please fill required fields.");
      return;
    }

    const newDocData = {
      doc_name: doc_name,
      category: category,
      status: status,
      purpose: purpose,
      template_file: template_file,
      paper_size: paper_size,
      watermark_file: watermark_file,
      watermark: watermark,
      toc: toc,
      sections: sections,
    };

    fetch(`${baseUrl}/api/doctype/add`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newDocData),
    })
      .then((response) => {
        console.log("Response status:", response.status);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("error adding doctype");
        }
      })
      .then((data) => {
        console.log("Data received:", data);
        if (data.status && data.status === "success") {
          toast.success("Doctype added successfully", {
            icon: (
              <span style={{ color: "rgb(74, 146, 59)" }}>
                <FaUser />
              </span>
            ),
            className: "custom-toast_add",
          });
          console.log("doctype added successfully", data);
          const delay = 1000;
          setTimeout(() => {
            window.location.reload();
          }, delay);
        } else if (data.error && data.error === "DuplicateDoctype") {
          toast.error({
            message: data.message,
            pauseOnHover: true,
            icon: (
              <span style={{ color: "blue" }}>
                <FaTrash />
              </span>
            ),
            className: "custom-toast_delete",
          });
        }
      })

      .catch((error) => {
        console.error("error adding doctype:", error);
        toast.error(`${doc_name} name already exists`);
      });
  };

  // --------------GET DOCTYPE----------------------
  const [dbDoctypeData, setDbDoctypeData] = useState([]);
  console.log(dbDoctypeData);
  useEffect(() => {
    const getDoctypedata = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/doctype/get`, {
          method: "GET",
          headers: {
            "Doctype-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const doctype = await response.json();
          console.log(doctype, "09090900");
          setDbDoctypeData(doctype.data);
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDoctypedata();
  }, [user]);
  let updateToastDisplayed = false;
  // ----------------------UPDATE DOCTYPE-----------------
  const handleUpdateDoctype = () => {
    if (!doc_name || !status || !purpose) {
      toast.info("Please fill required fields.");
      return;
    }
    const newDocData = {
      // section_name: section_name,
      // section_tag: section_tag,
      doc_name: doc_name,
      category: category,
      status: status,
      purpose: purpose,
      template_file: template_file,
      paper_size: paper_size,
      watermark_file: watermark_file,
      watermark: watermark,
      toc: toc,
      sections: sections,
    };

    fetch(`${baseUrl}/api/doctype/update/${doctypeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newDocData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error updating Doctype");
        }
      })
      .then((data) => {
        if (!updateToastDisplayed) {
          toast.info("Doctype Updated successfully");

          console.log("Doctype Updated successfully", data);
          const delay = 4000;
          setTimeout(() => {
            window.location.reload();
          }, delay);
          updateToastDisplayed = true;
        }
      })
      .catch((error) => {
        console.error("Error Updating Doctype", error);
      });
  };
  // -------------------DELETE DOCTYPE--------------------
  let deleteToastDisplayed = false;

  const handleDeleteDoctype = () => {
    fetch(`${baseUrl}/api/doctype/delete/${doctypeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Doctype Deleted successfully!", data);
        if (!deleteToastDisplayed) {
          toast.success("Doctype deleted successfully", {
            icon: (
              <span style={{ color: "red " }}>
                <FaTrash />
              </span>
            ),
            className: "custom-toast_delete",
          });
          deleteToastDisplayed = true;
        }
        const delay = 2000;
        setTimeout(() => {
          window.location.reload();
        }, delay);
      })
      .catch((error) => {
        console.log("Error Deletin Doctype:", error);
      });
  };
  // --------------------------------------
  const resetFields = () => {
    setHeaderChange("ADD DOCUMENT TYPE");
    setDoc_name("");
    setCategory("");
    setStatus("");
    setPurpose("");
    setPaper_size("");
    setWatermark(false);
    setToc(false);
    setTemplate_file("");
    setWatermark_file("");
    setShowSaveCancel(true);
    setShowUpdateDelete(false);
    setSections([]);
    setPlusIconClicked(true);
  };
  // -----------------------------------
  const handleItemSelect = (selectedItem, selectedIndex) => {
    if (selectedIndex >= 0 && selectedIndex < dbDoctypeData.length) {
      const selectedData = dbDoctypeData[selectedIndex];
      setDocTypeId(selectedData._id || "");
      setDoc_name(selectedData.doc_name || "");
      setCategory(selectedData.category || "");
      setStatus(selectedData.status || "");
      setPurpose(selectedData.purpose || "");
      setPaper_size(selectedData.paper_size || "");
      setTemplate_file(selectedData.template_file || "");
      setTemplate_file(selectedData.watermark_file || "");
      setWatermark(selectedData.watermark || false);
      setToc(selectedData.toc || false);
      setSections(selectedData.sections || []);
      setShowSaveCancel(false);
      setShowUpdateDelete(true);
      setHeaderChange("DOCUMENT TYPE");
    }
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
            <Link
              href=""
              className="breadcrumbs--link--active"
            >
              Document types
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <HelpRequest />
      <div className="rowdoctypes">
        <WriteFlex
          data={dbDoctypeData}
          resetFields={resetFields}
          onItemSelect={handleItemSelect}
          dataType="doctype"
          showGrouping={true}
        />
        <div className="rightDoctype">
        <HeaderBar headerlabel={headerChange}>
              <div className="worddownload">
                <span className="wordicon" onClick={handleDownloadClick}>
                  <FontAwesomeIcon
                    icon={faFileWord}
                    className="fas fa-file-word"
                  />
                </span>
                <label id="wordtemplatelabel">BASE TEMPLATE</label>
              </div>
            
          </HeaderBar>
          {dbDoctypeData.length > 0 || plusIconClicked ? (
            <div>
              <div className="containerBV1">
                <ErrorMessage
                  inputValueError={true}
                  showFlaxErrorMessageText={true}
                  errormsg={"DOCUMENT NAME IS A REQUIRED FIELD"}
                  label="DOCUMENT NAME"
                  value={doc_name}
                  onChange={(value) => setDoc_name(value)}
                />
                <CustomDropdown
                  options={optionscategory}
                  onSelect={handleActionSelect1}
                  label="CATALOG CATEGORY"
                  showCancel={true}
                  value={category}
                  onChange={(value) => setSelectedOption1(value)}
                />
                <CustomDropdown
                  options={optionscatlogstatus}
                  onSelect={handleActionSelect2}
                  label="CATALOG STATUS"
                  isBorderVisible={true}
                  showCancel={true}
                  value={status}
                  onChange={(value) => setSelectedOption2(value)}
                />
                <CustomDropdown
                  options={optionspurpose}
                  onSelect={handleActionSelect3}
                  label="PURPOSE"
                  isBorderVisible={true}
                  showCancel={true}
                  value={purpose}
                  onChange={(value) => setSelectedOption3(value)}
                />
              </div>
              <div className="containerBV5">
                <div id="contentBV5">
                  <input
                    type="file"
                    id="fileInput"
                    hidden
                    onChange={handleUpload}
                    accept=".doc, .docx"
                    className={`tempname ${
                      unsupportedTagsError ? "error" : ""
                    }`}
                  />
                  <div className="input-with-icon">
                    <input
                      className={`watermarkifilename ${
                        unsupportedTagsError ? "error" : ""
                      }`}
                      type="text"
                      value={uploadedFileName}
                      readOnly
                    />
                    <div className="upload-icons">
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        id="uploadiconDoctype"
                        onClick={() =>
                          document.getElementById("fileInput").click()
                        }
                      />
                      {fileTypeError && (
                        <div className="error-message">
                          Invalid file format. Only Word files (.doc, .docx) are
                          allowed.
                        </div>
                      )}
                      {unsupportedTagsError && (
                        <div className="error-message red">
                          The template contains unsupported free defined tags.
                        </div>
                      )}
                      {showDownloadCancel && (
                        <>
                          <FontAwesomeIcon
                            icon={faCloudArrowDown}
                            id="dowicondoctype"
                            onClick={handleDownload}
                          />
                          <FontAwesomeIcon
                            icon={faX}
                            id="canceldoctypeicon"
                            onClick={handleCancel}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <label id="templab">TEMPLATE NAME</label>
                </div>
                <CustomDropdown
                  options={optionspapersize}
                  onSelect={handleActionSelect4}
                  label="PAPER SIZE"
                  selectedOption="INHERIT FROM WORD TEMPLATE"
                  value={paper_size}
                  onChange={(value) => setSelectedOption4(value)}
                />
                <div id="contentBV7">
                  <div className="uploadiconDoctypewatermark" id="contentBV5">
                    <input
                      type="file"
                      id="watermarkFileInput"
                      hidden
                      onChange={handleWatermarkUpload}
                      accept=".jpg, .jpeg, .png"
                      className="watermarkifilename"
                      readOnly
                    />
                    <div className="input-with-icon">
                      <input
                        className="watermarkifilename"
                        type="text"
                        value={uploadedWatermarkFileName}
                        readOnly
                      />
                      <div className="upload-icons">
                        <FontAwesomeIcon
                          icon={faCloudArrowUp}
                          id="uploadwatermark"
                          onClick={() =>
                            document
                              .getElementById("watermarkFileInput")
                              .click()
                          }
                        />
                        {showWatermarkDownloadCancel && (
                          <>
                            <FontAwesomeIcon
                              icon={faCloudArrowDown}
                              id="dowicondoctypewatermark"
                              onClick={handleWatermarkDownload}
                            />
                            <FontAwesomeIcon
                              icon={faX}
                              id="canceldoctypeiconwatermark"
                              onClick={handleWatermarkCancel}
                            />
                          </>
                        )}
                      </div>
                    </div>
                    <label id="waterlab">WATERMARK FILE</label>
                  </div>
                </div>
           
                  <div className="watermarkleft"> <InputTypes
                    showFlagCheckBox={true}
                    Checkboxlabel={"WATER MARK"}
                    value={watermark}
                    onChange={(value) => setWatermark(value)}
                  /></div>
        
                 <div className="watermarkright">
                  <InputTypes
                    showFlagCheckBox={true}
                    Checkboxlabel={"TOC"}
                    value={toc}
                    onChange={(value) => setToc(value)}
                  />
                  </div>
                
              </div>
              <div className="sections">
              <HeaderBar headerlabel={"SECTIONS"} /></div>
              <div className="containersection">
                <label id="ReorderSections">Reorder Sections</label>
                <div className="containersection1">
                  <label id="SectionName">Section Name</label>
                </div>
                <div className="containersection2">
                  <label id="SectionTag">Section Tag</label>
                </div>
              </div>
              {sections.map((section, index) => (
                <div key={section.id}>
                  <div className="addsectionbuttoninput">
                    <div>
                      <div id="textsection1">
                        {index > 0 && (
                         <button
                         id="moveupdoctype"
                         onClick={() => handleMoveUp(section.id, index)}
                       >
                         MOVEUP
                       </button>
                        )}
                        {index < sections.length - 1 && (
                         <button
                         id="movedowndoctype"
                         className={index === 0 ? "movedownDoctype" : ""}
                         onClick={() => handleMoveDown(section.id, index)}
                       >
                         MOVEDOWN
                       </button>
                        )}
                      </div>
                    </div>
                    <div id="doctypesectionnmae">
                      <input
                        type="text"
                        id={`textsection2`}
                        onChange={(event) =>
                          handleSectionNameChange(event, index)
                        }
                        value={section.section_name}
                        className={`section-inputerror ${
                          sectionErrors[index] ? "red-outline" : ""
                        }`}
                      />
                      <i
                        className="fa fa-pencil"
                        aria-hidden="true"
                        id="editsectionDctype"
                      />
                      <label
                        htmlFor={`textsection2`}
                        id="sectionNAMElabel21"
                        className={`label ${
                          sectionErrors[index] ? "label-hide" : ""
                        }`}
                      >
                        SECTION NAME
                      </label>

                      {sectionErrors[index] && (
                        <div className="errormessagedoctype">
                          {sectionErrors[index]}
                        </div>
                      )}
                    </div>

                    <div className="input-with-copy">
                      <input
                        type="text"
                        id={`textsection3`}
                        value={section.section_tag}
                      />
                      <label htmlFor="textsection3" id="sectionNAMElabel22">
                        SECTION TAG
                      </label>
                    </div>
                    <div className="cpoybutton">
                      {section.textsection2 && (
                        <button
                          className="copy-buttonsection"
                          onClick={() =>
                            handleCopy(
                              `Value to be copied: ${section.textsection2}`
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faClone} />
                        </button>
                      )}
                    </div>
                    <div>
                      <DeleteAction onDelete={() => handleButtonClick(index)} />
                    </div>
                  </div>
                </div>
              ))}
              <div class="buttonsection">
                <button id="addsectionbuttoncss" onClick={addSection}>
                  + Add Section
                </button>
              </div>
              <div
                className="save_cancel_content"
                style={{ display: showSaveCancel ? "block" : "none" }}
              >
                 <button id="update_data" type="submit" onClick={addDoctype} disabled={!areRequiredFieldsFilled()} style={{width:'70px'}}>
                  CREATE
                </button>
                <button id="reset_data" type="reset" onClick={resetFields}>
                  CANCEL
                </button>
               
              </div>
              <div
                className="delete_update_content"
                style={{ display: showUpdateDelete ? "block" : "none" }}
              >
                <button
                  id="update_data"
                  type="submit"
                  onClick={handleUpdateDoctype}
                >
                  UPDATE
                </button>
                <button
                  id="delete_data"
                  type="reset"
                  onClick={handleDeleteDoctype}
                >
                  REMOVE
                </button>
              </div>
            </div>
          ) : (
            <div id="accessmsgdiv">
              <label id="accessmsg">
                NO DOCTYPE FOUND. PLEASE USE + TO ADD A NEW DOCTYPE
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Doctypes;
