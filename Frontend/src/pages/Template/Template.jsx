import React, { useState, useEffect } from "react";
import Navbar from "../../layouts/Navbar";
import CatalogSidebar from "../../layouts/CatalogSidebar";
import WriteFlex from "../../components/common/WriteFlex";
import "../../assets/css/template/Template.css";
import TemplateGuided from "../../components/templateComps/TemplateGuided";
import CustomDropdown from "../../components/common/CustomDropdown";
import SidePanel from "../../components/common/SidePanel";
import GuidedListing from "../../components/templateComps/GuidedListing";
import { Link } from "react-router-dom";
import HeaderBar from "../../components/common/HeaderBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGreaterThan, FaLessThan, FaTrash, } from "react-icons/fa";
import ErrorMessage from "../../components/common/ErrorMessage";
import InputTypes from "../../components/common/InputTypes";
import { baseUrl } from "../../config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faAngleLeft,
  faAngleUp,
  faAngleDown,
  faPenToSquare,
  faFileInvoice,
  faFileExcel
} from "@fortawesome/free-solid-svg-icons";

import { FaUser } from "react-icons/fa";

const Templates = () => {
  const { user } = useAuthContext();
  console.log(user);
  const [plusIconClicked, setPlusIconClicked] = useState(false);
  const [isGuideVisible, setGuideVisible] = useState(true);
  const [isGuideVisiblebtn, setGuideVisiblebtn] = useState(true);
  const [showlistingtemplate, setshowlistingtemplate] = useState(false);
  const [iconClass, setIconClass] = useState(faAngleDown);
  const [headerTemplateMsgVisible, setHeaderTemplateMsgVisible] =
    useState(true);
  const [Plusiconclick, setPlusiconclick] = useState(false);
  const [Writeflexvisible, setWriteflexvisible] = useState(true);
  const [showTemplateplusmessage, setshowTemplateplusmessage] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [doc_tempData, setDocTempData] = useState([]);
  const [selectedOptionsContentdoctype, setSelectedOptionsContentdoctype] =
    useState([]);
  const [isHighlighted, setIsHighlighted] = useState(true);
  const [isHighlightedFile, setIsHighlightedFile] = useState(false);

  const updateDocTempData = (newData) => {
    setDocTempData(newData);
  };
  const handleOpenSideBar = () => {
    setAccountOpen(!accountOpen);
  };
  const filteredsummery = [
    "SUMMARY",
    "STAGES",
    "WEEK",
    "MONTHS",
    "YEARS",
    "CONTRACT YEARS",
  ];
  const filteredpricemodel = [
    "FIXED PRICE",
    "MARGIN TARGET",
    "SERVICE LEVEL",
    "TIME AND MATERIALS",
  ];
  const salesorg = [
    "AFRICA",
    "ALL OTHER AP",
    "AP-AUS/JP",
    "AP-CHINA",
    "AP INDIA",
    "ARGENTINA",
    "AUSTRIA",
  ];
  const catalogstatus = ["INACTIVE", "IN PROCESS", "PUBLISHED"];
  const filteredcatagory = ["DBA", "DSOM", "DEFAULT", "EDUCATION", "IZOT"];
  const toggleGuidebtn = () => {
    setGuideVisiblebtn(!isGuideVisiblebtn);
    setIconClass(isGuideVisiblebtn ? faAngleDown : faAngleUp);
  };
  // const [isTemplateVisible, setTemplateVisible] = useState(false);
  const [selectedOptionTemplate, setSelectedOptionTemplate] = useState("");
  const [selectedoption1, setSelectedOption1] = useState(null);
  const handleOptionSelect = (selectedOption) => {
    setSelectedOptionTemplate(selectedOption);
  };

  const scrolllistingicon = () => {
    setshowlistingtemplate(true);
    setGuideVisible(false);
    setHeaderTemplateMsgVisible(false);
    setIsHighlightedFile(true);
    setIsHighlighted(false);

    // setTemplateVisible(false);
  };

  const toggleTempDetailspen = () => {
    setshowlistingtemplate(false);
    setGuideVisible(true);
    setHeaderTemplateMsgVisible(true);
    setIsHighlighted(true);
    setIsHighlightedFile(false);

    // setTemplateVisible(true);
  };
  const resetTemplateFields = () => {
    // Assuming dbTemplateData is an array of templates fetched from the database
    const templateCount = dbTemplateData.length;

    // Increment the template count and format it with leading zeros
    const incrementedValue = String(templateCount + 1).padStart(3, "0");

    // Construct the new quote_name value
    const newQuoteName = `${incrementedValue}`;

    // Update the state
    setQuote_name(newQuoteName);
    setDocTempData([]);
    setSelectedOptionsContentdoctype([]);
    setWriteflexvisible(true);
    setPlusIconClicked(true);
    setMode("create"); // Set mode to 'create'
    setMode1("cancel");
  };

  const handleBlankQuoteClick = () => {
    setQuote_name(""); // Optionally clear quote_name if needed
    setGuideVisible(true);
    setWriteflexvisible(true);
    setPlusiconclick(false);
    setshowTemplateplusmessage(false);
    setshowlistingtemplate(false);
    setMode("create"); // Set mode to 'create'
    setMode1("cancel");
    setDocTempData([]);
    setSelectedOptionsContentdoctype([]);
  };
  const resetTemplate = () => {
    setQuote_name("");
  };
  // adding template

  const [mode, setMode] = useState("create"); // Initially set to 'create'
  const [mode1, setMode1] = useState("cancel");
  const [quote_name, setQuote_name] = useState("");

  // useEffect(() => {
  //   const modifiedSelectedArray = selectedOptionsContentdoctype.map(selectedDoc => {
  //     const docExists = doc_tempData.some(doc => doc.doc_name === selectedDoc);
  //     return docExists ? doc_tempData.find(doc => doc.doc_name === selectedDoc) : { doc_name: selectedDoc, sections: [] };
  //   });

  //   //const updatedDoc_tempData = doc_tempData.filter(doc => modifiedSelectedArray.some(selectedDoc => selectedDoc.doc_name === doc.doc_name));
  //   //console.log("uuuu", updatedDoc_tempData)
  //   console.log("mmmmmmm", modifiedSelectedArray);
  //   setDocTempData(modifiedSelectedArray);
  // }, [selectedOptionsContentdoctype])

  console.log("dddd", doc_tempData);
  let saveToastDisplayed = false;
  let requiredFieldToast = false;

  const addTemplate = () => {
    if (!requiredFieldToast) {
      if (!quote_name) {
        toast.info("Please fill required fields.");
        requiredFieldToast = true;
        return;
      }
    }
    const modifiedSelectedArray = selectedOptionsContentdoctype.map(
      (selectedDoc) => {
        const docExists = doc_tempData.some(
          (doc) => doc.doc_name === selectedDoc
        );
        return docExists
          ? doc_tempData.find((doc) => doc.doc_name === selectedDoc)
          : { doc_name: selectedDoc, sections: [] };
      }
    );

    const newTempData = {
      quote_name: quote_name,
      doc_tempData: modifiedSelectedArray,
    };
    console.log("newtemp", newTempData);

    fetch(`${baseUrl}/api/template/add`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newTempData),
    })
      .then((response) => {
        console.log("Response status:", response.status);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("error adding template");
        }
      })
      .then((data) => {
        console.log("Data received:", data);
        if (data.success && data.success === "Success") {
          toast.success("Template added successfully", {
            icon: (
              <span style={{ color: "rgb(74, 146, 59)" }}>
                <FaUser />
              </span>
            ),
            className: "custom-toast_add",
          });
          console.log("Template added successfully", data);
          const delay = 1000;
          setTimeout(() => {
            window.location.reload();
          }, delay);
        } else if (data.error && data.error === "existingTemplate") {
          toast.error({
            message: data.message,
            icon: (
              <span style={{ color: "rgb(74, 146, 09)" }}>
                <FaUser />
              </span>
            ),
          });
        }
      })

      .catch((error) => {
        console.error("error adding template:", error);
        if (!saveToastDisplayed) {
          toast.error(`${quote_name} name already exists`);
          saveToastDisplayed = true;
        }
      });
  };

  // get template data

  const [templateId, setTemplateId] = useState("");
  const [dbTemplateData, setDbTemplateData] = useState([]);
  const [doctypePublished, setDoctypePublished] = useState([]);
  console.log("!@#$%^&*");
  console.log("db", dbTemplateData);

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
          // setDbDoctypeData(doctype.data);
          console.log(
            doctype.data.filter((item) => item.status === "PUBLISHED")
          );
          setDoctypePublished(
            doctype.data.filter((item) => item.status === "PUBLISHED")
          );
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDoctypedata();
  }, [user]);

  useEffect(() => {
    const gettemplatedata = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/template/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const template = await response.json();
          console.log(template);
          console.log(template.data);
          setDbTemplateData(template.data);

          if (dbTemplateData == null) {
            try {
              const tempDaata = template.data;
              console.log(tempDaata);
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

    gettemplatedata();
  }, [user]);

  const handleItemSelect = (selectedItem, selectedIndex) => {
    if (selectedIndex >= 0 && selectedIndex < dbTemplateData.length) {
      const selectedData = dbTemplateData[selectedIndex];
      setMode("update"); // If data exists, switch to 'update' mode
      setMode1("delete");
      setTemplateId(selectedData._id || "");
      setQuote_name(selectedData.quote_name || "");
      setDocTempData(selectedData.doc_tempData || []);
      console.log(
        "ppp",
        doctypePublished.map((item) => item.doc_name)
      );
      const commonItems = selectedData.doc_tempData
        .map((item) => item.doc_name)
        .filter((doc) => doctypePublished.map((i) => i.doc_name).includes(doc));

      setSelectedOptionsContentdoctype(commonItems);
    }
    setPlusIconClicked(true);
  };

  // update template data
  let updateToastDisplayed = false;
  let requiredFieldUpdateToast = false;

  const handleUpdateTemplate = () => {
    if (!requiredFieldUpdateToast) {
      if (!quote_name) {
        toast.info("Please fill required fields.");
        requiredFieldToast = true;
        return;
      }
    }
    const modifiedSelectedArray = selectedOptionsContentdoctype.map(
      (selectedDoc) => {
        const docExists = doc_tempData.some(
          (doc) => doc.doc_name === selectedDoc
        );
        return docExists
          ? doc_tempData.find((doc) => doc.doc_name === selectedDoc)
          : { doc_name: selectedDoc, sections: [] };
      }
    );

    const newTempData = {
      quote_name: quote_name,
      //doc_tempData: doc_tempData.filter(item => selectedOptionsContentdoctype.includes(item.doc_name)),
      doc_tempData: modifiedSelectedArray,
    };

    fetch(`${baseUrl}/api/template/update/${templateId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newTempData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error adding Template");
        }
      })
      .then((data) => {
        if (!updateToastDisplayed) {
          toast.info("Template Updated Successfully");
          console.log("Template Updated successfully!", data);
          const delay = 1000;
          setTimeout(() => {
            window.location.reload();
          }, delay);
          updateToastDisplayed = true;
        }
      })

      .catch((error) => {
        console.error("Error Updating Template:", error);
      });
  };
  let deleteToastDisplayed = false;
  //API FOR template DELETE FUNCTION
  const handelDeleteTemplate = () => {
    fetch(`${baseUrl}/api/template/delete/${templateId}`, {
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
          throw new Error("Error Deleteing template");
        }
      })
      .then((data) => {
        if (!deleteToastDisplayed) {
          toast.success("Template deleted successfully", {
            icon: (
              <span style={{ color: "red " }}>
                <FaTrash />
              </span>
            ),
            className: "custom-toast_delete",
          });
          deleteToastDisplayed = true;
        }
        console.log("Template Deleted successfully!", data);
        const delay = 2000;
        setTimeout(() => {
          window.location.reload();
        }, delay);
      })
      .catch((error) => {
        console.error("Error Deleting template:", error);
      });
  };

  const updateOptionsDoctype = (data) => {
    setSelectedOptionsContentdoctype(data);
  };
  const handleDownloadExcelClick = () => {
    // Create a sample Excel content (you can replace this with your actual Excel data)
    const excelContent = "Excel\tContent\n1\tHello\n2\tWorld";
 
    // Convert the Excel content to a Blob
    const blob = new Blob([excelContent], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
 
    // Create an anchor element to trigger the download
    const anchor = document.createElement("a");
 
    // Set the download attributes
    anchor.href = URL.createObjectURL(blob);
    anchor.download = "document.xlsx";
 
    // Trigger a click on the anchor element
    anchor.click();
 
    // Revoke the object URL to free up resources
    URL.revokeObjectURL(anchor.href);
 
    // Remove the anchor element from the DOM
    anchor.remove();
  };
  return (
    <div>
      <Navbar />
      <CatalogSidebar />
      <div className="bread">
        <ul className="breadcrumbs">
          <li className="breadcrumbs--item">
            <Link to="/home" className="breadcrumbs--link_mid">
              Home
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="/rolessetup" className="breadcrumbs--link_mid">
              Catalog
            </Link>
          </li>
          <li className="breadcrumbs--item">
            <Link to="" className="breadcrumbs--link--active">
              Template
            </Link>
          </li>
          <ol style={{ float: "right", listStyle: "none" }}>
            <Link to="" className="breadcrumbs--link breadcrumbs--link--active">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className={`accountpen ${isHighlighted ? "highlighted" : ""}`}
                style={{
                  backgroundColor: isHighlighted ? "#046088" : "transparent",
                  color: isHighlighted ? "white" : "black",
                  fontSize: "15px",
                  marginRight: "10px",
                  padding: "7px",
                  marginBottom: "-7px",
                  marginTop: "-4px",
                }}
                onClick={toggleTempDetailspen}
              />
            </Link>
            <Link
              to=""
              className="breadcrumbs--link breadcrumbs--link--active"
              onClick={scrolllistingicon}
            >
              <FontAwesomeIcon
                icon={faFileInvoice}
                className={`file ${isHighlightedFile ? "highlighted" : ""}`}
                style={{
                  backgroundColor: isHighlightedFile
                    ? "#046088"
                    : "transparent",
                  color: isHighlightedFile ? "white" : "black",
                  fontSize: "15px",
                  marginRight: "10px",
                  padding: "7px",
                  marginBottom: "-7px",
                  marginTop: "-4px",
                }}
                onClick={scrolllistingicon}
              />
            </Link>
            {/* <Link to="" className="breadcrumbs--link breadcrumbs--link--active">
              <i
                className="fa fa-table"
                style={{ fontSize: "15px", marginRight: "10px" }}
              />
            </Link> */}
          </ol>
        </ul>
        <hr className="hr" />
      </div>
      <div className="rowtemplate">
        {Writeflexvisible && (
          <WriteFlex
            showGrouping={true}
            resetFields={resetTemplateFields}
            data={dbTemplateData}
            onItemSelect={handleItemSelect}
            dataType="template"
          />
        )}
        {Plusiconclick && (
          <div id="hidetempluicon">
            <div className="dotswriteblank">
              <div className="tempmaindiv">
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className="newtemplateicon"
                  id="faangletemplateleft"
                />
                <label id="newtwmplabel">NEW TEMPLATE</label>
              </div>
              <ul id="myMenuwriteblank">
                <li>
                  <Link to="#">TEMPLATE</Link>
                </li>
                <li>
                  <Link to="#">PREVIOUS QUOTE</Link>
                </li>
                <li to="#" onClick={handleBlankQuoteClick}>
                  <Link to="#">BLANK QUOTE</Link>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div
          className="righttemplate"
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
            {accountOpen ? <FaGreaterThan /> : <FaLessThan />}
          </button>
          <div id="headerTempaltes">
            {headerTemplateMsgVisible && (
              <HeaderBar headerlabel={"QUOTE TEMPLATE"}>
                <div className="exceldownload">
                  <span
                    className="excelicon"
                    onClick={handleDownloadExcelClick }
                  >
                    <FontAwesomeIcon
                      icon={faFileExcel}
                      className="fas fa-file-excel"
                    />
                  </span>
                  <label id="exceltemplatelabel">DOWNLOAD</label>
                </div>
              </HeaderBar>
            )}
            {showTemplateplusmessage && (
              <div id="accessmsgdiv">
                <label id="accessmsg">
                  PICK FROM THE LISTED OPTIONS TO START YOUR QUOTE
                </label>
              </div>
            )}
          </div>

          {dbTemplateData.length > 0 || plusIconClicked ? (
            <div>
              <div>
                {showlistingtemplate && (
                  <div className="showlisticonclick">
                    <GuidedListing
                      showFlagHeader={true}
                      showFlagButton={false}
                      options={selectedOptionsContentdoctype}
                      doctypePublished={doctypePublished}
                      doc_tempData={doc_tempData}
                      updateDocTempData={updateDocTempData}
                    />
                  </div>
                )}

                {isGuideVisible && (
                  <div id="Amul">
                    <div className="tempdeatails">
                      <div className="buttontemp">
                        <button
                          type="button"
                          className="tempbttn"
                          id="clickmetemp"
                          onClick={toggleGuidebtn}
                        >
                          <FontAwesomeIcon
                            icon={iconClass}
                            aria-hidden="true"
                            id="saa"
                          />
                        </button>
                      </div>

                      {isGuideVisiblebtn && (
                          <div className="quotempid">
                            <div className="quotempid2">
                            <div className="templeft">
                                <div className="containertemp1">
                                  <div id="contenttemp1">
                                    <ErrorMessage
                                      showFlaxErrorMessageText={true}
                                      label={"QUOTE NAME"}
                                      errormsg="QUOTE NAME IS A REQUIRED FIELD"
                                      value={quote_name}
                                      onChange={(value) => setQuote_name(value)}
                                    />
                                  </div>
                                  <div id="contenttemp2">
                                    <CustomDropdown
                                      options={filteredpricemodel}
                                      label={"PRICE MODEL"}
                                      onSelect={handleOptionSelect}
                                    />
                                  </div>
                                </div>
                                <div className="containertemp2">
                                  <div id="contentdownb1">
                                    <CustomDropdown
                                      options={filteredcatagory}
                                      label={"CATEGORY"}
                                      onSelect={handleOptionSelect}
                                    />
                                  </div>
 
                                  <div id="contentdownb2">
                                    <CustomDropdown
                                      options={salesorg}
                                      label={"SALES ORG"}
                                      onSelect={handleOptionSelect}
                                    />
                                  </div>
 
                                  <div id="contentdownb3">
                                    <CustomDropdown
                                      label={"STATUS"}
                                      options={catalogstatus}
                                      onSelect={handleOptionSelect}
                                    />
                                  </div>
                                  <div id="contentdownb4">
                                    <InputTypes
                                      NumberLabel="CURRENCY"
                                      showFlagNumber={true}
                                      onSelect={handleOptionSelect}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="tempright">
                                <div className="containerquoteGuide1">
                                  <div id="listpricedd">
                                    <InputTypes
                                      NumberLabel="LIST PRICE"
                                      numberplaceholder={"$0.00"}
                                      showFlagNumber={true}
                                    />
                                  </div>
                                  <div id="discountdd">
                                    <InputTypes
                                      NumberLabel="DISCOUNT"
                                      numberplaceholder={"0%"}
                                      showFlagNumber={true}
                                    />
                                  </div>
                                  <div id="netpricedd">
                                    <InputTypes
                                      NumberLabel="NET PRICE"
                                      numberplaceholder={"$0.00"}
                                      showFlagNumber={true}
                                    />
                                  </div>
                                </div>
                                <div className="containerqoute2">
                                  <div id="expensesdd">
                                    <InputTypes
                                      NumberLabel="EXPENSES"
                                      showFlagNumber={true}
                                    />
                                  </div>
                                  <div id="margindd">
                                    <InputTypes
                                      NumberLabel="MARGIN"
                                      numberplaceholder={"0%"}
                                      showFlagNumber={true}
                                    />
                                  </div>
                                  <div id="costdd">
                                    <InputTypes
                                      NumberLabel="COST"
                                      showFlagNumber={true}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="contentqtemp">
                              <textarea />
                              <label>DESCRIPTION</label>
                            </div>

                            {isGuideVisible && (
                              <div id="contentsum">
                                <CustomDropdown
                                  label={"SUMMARY"}
                                  options={filteredsummery}
                                  custuminput={"summaryinput"}
                                  onSelect={handleOptionSelect}
                                  // showCancel={true}
                                  // value={selectedOptionTemplate}
                                  // onChange={(value) => setSelectedOption1(value)}
                                />
                              </div>
                            )}

                            <div className="delete_update_template">
                              <button
                                id="update_data"
                                onClick={
                                  mode === "create"
                                    ? addTemplate
                                    : handleUpdateTemplate
                                }
                              >
                                {mode === "create" ? "CREATE" : "UPDATE"}
                              </button>
                              <button
                                id="delete_data"
                                onClick={
                                  mode1 === "cancel"
                                    ? resetTemplate
                                    : handelDeleteTemplate
                                }
                              >
                                {mode1 === "cancel" ? "CANCEL" : "DELETE"}
                              </button>
                            </div>
                          </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div id="accessmsgdiv">
              <label id="accessmsg">
                NO TEMPLATE FOUND. PLEASE USE + TO ADD A NEW TEMPLATE
              </label>
            </div>
          )}
        </div>
        <div
          className="sidepanel"
          style={{ width: accountOpen ? "20%" : "0%" }}
        >
          <SidePanel
          
            showFlagTimeStamp={true}
            showFlagExchangeRates={true}
            showFlagDoctypeAll={true}
            showFlagDocumentExport={true}
            showFlagWorddocument={true}
            showFlagPdfdocument={true}
            doctypePublished={doctypePublished}
            updateOptionsDoctype={updateOptionsDoctype}
            selectedOptionsContentdoctype={selectedOptionsContentdoctype}
            showFlagExternal={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Templates;
