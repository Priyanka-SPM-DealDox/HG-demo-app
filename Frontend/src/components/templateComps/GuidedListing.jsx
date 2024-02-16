
import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/templatecomps/GuidedListing.css";
import CustomDropdown from "../common/CustomDropdown";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import { FROALA_LICENSE_KEY } from "../../config";
import CatalogPopup from "../../components/templateComps/CatalogPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import HeaderBar from "../common/HeaderBar";
import { saveAs } from "file-saver";
import { asBlob } from "html-docx-ts";
import { useAuthContext } from "../../hooks/useAuthContext";
import { baseUrl } from "../../config";
 
function GuidedListing({
  showFlagButton,
  showFlagHeader,
  options,
  doctypePublished,
  doc_tempData,
  updateDocTempData,
  survey_key,
  sKey,
}) {
  const { user } = useAuthContext();
  console.log(user);
  console.log("op", options, survey_key, doctypePublished, doc_tempData);
  console.log(sKey);
  const [inputFields, setInputFields] = useState([]);
  const [, setIsOpen] = useState(false);
  const dropdownRefcatalogbtn = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [secName, setSecName] = useState("");
  const [selectedOptionTemplate, setSelectedOptionTemplate] = useState("");
  const [selectedoption1, setSelectedOption1] = useState(null);
 
  const handleActionSelect1 = (selectedOption) => {
    setSelectedOptionTemplate(selectedOption);
  };
  console.log("ss", selectedOptionTemplate);
 
  const editorConfig = {
    key: FROALA_LICENSE_KEY,
    charCounterCount: false,
    toolbarInline: true,
    alwaysVisible: true,
    toolbarVisibleWithoutSelection: true,
    placeholderText: "",
    multiLine: true,
    align: "left",
    imageOutputSize: true,
    tableCellMultipleStyles: true,
    imageMove: true,
    tableStyles: {
      class1: "Class_1",
    },
    tableResizer: true,
    tableColors: ["#61BD6D", "#1ABC9C", "#54ACD2", "REMOVE"],
    toolbarButtons: [
      [
        "fontFamily",
        "fontSize",
        "textColor",
        "backgroundColor",
        "bold",
        "italic",
        "underline",
        "formatOL",
        "formatUL",
        "paragraphFormat",
        "paragraphStyle",
        "align",
        "alignLeft",
        "alignCenter",
        "alignRight",
        "insertLink",
        "insertImage",
        "table",
        "specialCharacters",
        "print",
        "insertTable",
        "clearFormatting",
        "undo",
        "redo",
        "html",
      ],
    ],
    events: {
      initialized: function () {
        const toolbar = document.querySelector(".fr-toolbar");
        if (toolbar) {
          toolbar.style.height = "180px";
          toolbar.style.width = "360px";
          const editor = this;
          editor.$el[0].setAttribute("style", "text-align: left");
        }
      },
    },
  };
 
  useEffect(() => {
    const handleOutsideClickcatalogbtn = (event) => {
      if (
        dropdownRefcatalogbtn.current &&
        !dropdownRefcatalogbtn.current.contains(event.target) &&
        !event.target.classList.contains("popup")
      ) {
        setIsOpen(false);
      }
    };
 
    window.addEventListener("click", handleOutsideClickcatalogbtn);
 
    return () => {
      window.removeEventListener("click", handleOutsideClickcatalogbtn);
    };
  }, []);
 
  const handleAddField = () => {
    setInputFields([...inputFields, ""]);
    // setHighlightedIndex(-1);
    setHighlightedIndex(null);
    setSecName("");
  };
  const handleAddField1 = (doc_name, section_name) => {
    console.log("dddddddddd", doc_name, section_name);
    // if (doc_tempData.length === 0) {
    //   setDocTempData([...doc_tempData,
    //   {
    //     doc_name: doc_name,
    //     sections: [
    //       {
    //         sec_name: sec_name,
    //         sec_value : []
    //       }
    //     ]
    //   }])
    // }else{
    //   const doc = doc_tempData.find(item=>item.doc_name === doc_name)
    //   if(doc){
    //     //const newDoc
    //   }
    // }
    // setInputFields([...inputFields, {}]);
    const existingDoc = doc_tempData.find((doc) => doc.doc_name === doc_name);
 
    // If the document doesn't exist, create a new one
    if (!existingDoc) {
      const newDoc = { doc_name, sections: [] };
      doc_tempData.push(newDoc);
    }
 
    // Find the document again (either existing or newly created)
    const targetDoc = doc_tempData.find((doc) => doc.doc_name === doc_name);
 
    // Check if a section with the given section_name exists in the document
    const existingSection = targetDoc.sections.find(
      (section) => section.section_name === section_name
    );
 
    // If the section doesn't exist, create a new one
    if (!existingSection) {
      const newSection = {
        section_name,
        section_value: [{ key: 0, value: "" }],
      };
      targetDoc.sections.push(newSection);
    } else {
      existingSection.section_value.push({
        key: existingSection.section_value.length,
        value: "",
      });
    }
    //updateDocTempData(newData);
    updateDocTempData((prevDoctype) =>
      prevDoctype.map((doc) => (doc.doc_name === doc_name ? targetDoc : doc))
    );
    //setHighlightedIndex(-1);
    setHighlightedIndex(null);
    setSecName("");
  };
 
  console.log("doctemp", doc_tempData);
  console.log("input", inputFields);
  const handleToggleEditor = (index, sectionName) => {
    if (highlightedIndex === index) {
      handleDeleteField(index, sectionName);
    } else {
      setHighlightedIndex(index);
      setSecName(sectionName);
    }
  };
  const handleDeleteField = (index, sectionName) => {
    // const newInputFields = [...inputFields];
    // newInputFields.splice(index, 1);
    // setInputFields(newInputFields);
    const updatedDocData = doc_tempData.map((doc) => {
      if (doc.doc_name === selectedOptionTemplate) {
        doc.sections.forEach((section) => {
          if (section.section_name === sectionName) {
            section.section_value.splice(index, 1);
          }
        });
      }
      return doc;
    });
    updateDocTempData(updatedDocData);
    //setHighlightedIndex(-1);
    setHighlightedIndex(null);
    setSecName("");
  };
 
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.classList.contains("deincatanewGuide")) {
        // setHighlightedIndex(-1);
        setHighlightedIndex(null);
        setSecName("");
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);
// to download pdf file which we are not yet functioned
  const handleDownloadPdf = () => {
    const pdfContent = "binaryDataOfYourPdfFile";
    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = "document.pdf";
    anchor.click();
    URL.revokeObjectURL(anchor.href);
    anchor.remove();
  };
 
  // fully functioning word document function
  const handleDownloadWord = () => {
    console.log(
      doc_tempData.filter((item) => item.doc_name === selectedOptionTemplate)
    );
    const { HEADER, FOOTER, otherData } = doc_tempData
      .filter((item) => item.doc_name === selectedOptionTemplate)[0]
      .sections.reduce(
        (acc, item) => {
          if (item.section_name.toUpperCase() === "HEADER") {
            // acc.HEADER = item.valueHtml;
            acc.HEADER = item.section_value.map((section) => section.value);
          } else if (item.section_name.toUpperCase() === "FOOTER") {
            acc.FOOTER = item.section_value.map((section) => section.value);
          } else {
            item.section_value.forEach((section) => {
              acc.otherData.push(section.value);
            });
          }
          return acc;
        },
        { otherData: [] }
      );
 
    // Helper function to convert blob URLs to data URLs
    const convertBlobToDataURL = async (html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
 
      const imgElements = doc.querySelectorAll('img[src^="blob:"]');
 
      for (const img of imgElements) {
        img.style.maxWidth = "100%"; // Add this line to set max-width
        const blobUrl = img.src;
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        const dataUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
        img.src = dataUrl;
      }
 
      return doc.documentElement.outerHTML;
    };
 
    console.log(HEADER, FOOTER, otherData);
 
    const HtmlStr = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
          <meta http-equiv="Pragma" content="no-cache" />
          <meta http-equiv="Expires" content="0" />
          <title>testTitle</title>
        <body>
          <div>
            ${otherData.map((item) => item).join("")}
          </div>  
        </body >
        </html >`;
 
    const option = { orientation: "portrait", margins: {} };
    const headerText = [];
    HEADER?.map((item) => {
      const tempHeader = document.createElement("div");
      tempHeader.innerHTML = item;
      headerText.push(tempHeader.textContent);
    });
    console.log("headerText", headerText);
 
    const footerText = [];
    FOOTER?.map((item) => {
      const tempHeader = document.createElement("div");
      tempHeader.innerHTML = item;
      footerText.push(tempHeader.textContent);
    });
 
    const headerConfig = {
      //leftStr: 'headera',
      centerStr: headerText.join("\n"),
      //rightStr: 'headerb',
    };
    // const headerConfig = {HEADER}
    const footerConfig = {
      //leftStr: 'footerLeft',
      centerStr: footerText.join("\n"),
      //rightStr: 'pageNum',//param equal to 'pageNum', that will show the page numbers
    };
 
    // Convert blob URLs to data URLs in HTML content
    convertBlobToDataURL(HtmlStr).then((htmlWithDataURL) => {
      // Generate and download the DOCX document
      asBlob(htmlWithDataURL, option, headerConfig, footerConfig).then(
        (blobData) => {
          saveAs(blobData, `GeneratedTemplate.docx`);
        }
      );
    });
  };
  const fetchImageAsBase64 = async (imgSrc) => {
    const response = await fetch(imgSrc);
    const blob = await response.blob();
 
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };
 
  // Define the function to get cell value from a sheet
  const getCellValueFromSheet = (sheetName, cellReference) => {
    const sheet = spreadRef.current && spreadRef.current[sheetName];
 
    console.log("dfghj", sheet);
    if (sheet && sheet[cellReference]) {
      return sheet[cellReference].value;
    }
 
    return ""; // Return an empty string if cell not found
  };
 
  // handleEditorChange function
  const handleEditorChange = async (newValue, sectionName, itemIndex) => {
    const updatedDocTempData = [...doc_tempData];
    const field = updatedDocTempData.find(
      (item) => item.doc_name === selectedOptionTemplate
    );
 
    if (field) {
      const section = field.sections.find(
        (item) => item.section_name === sectionName
      );
 
      if (section) {
        // CALC_SHEET_CELL formulas
        const cellFormulaRegex = /#{CALC_SHEET_CELL\((.*?),\s*(.*?)\)}#/g;
        let cellMatch;
        while ((cellMatch = cellFormulaRegex.exec(newValue)) !== null) {
          const sheetName = cellMatch[1].trim();
          const cellReference = cellMatch[2].trim();
          console.log(sheetName);
          console.log(cellReference);
 
          // Find the corresponding value in the sheetArray
          const cellValueObj = sheetArray[sheetName]?.find(
            (cellObj) => cellObj.cell === cellReference
          );
 
          // Replace the formula with the cell value
          if (cellValueObj) {
            newValue = newValue.replace(cellMatch[0], cellValueObj.value);
          } else {
            // Handle the case where the cell value is not found
            console.warn(`Cell value not found for formula: ${cellMatch[0]}`);
          }
        }
 
 
 
 
        // Replace CALC_SHEET_TABLE formulas
        const tableFormulaRegex = /#{CALC_SHEET_TABLE\((.*?),\s*(.*?)\s*(?:,\s*rer)?\s*(?:,\s*rec)?\)}#/g;
        let tableMatch;
        while ((tableMatch = tableFormulaRegex.exec(newValue)) !== null) {
          const sheetName = tableMatch[1].trim();
          const range = tableMatch[2].trim();
          const removeEmptyRows = !/REMOVE_EMPTY_ROWS/.test(tableMatch[0]);
          const removeEmptyCols = !/REMOVE_EMPTY_COLUMNS/.test(tableMatch[0]);
          // Extract the start and end cell references from the range
          const [startCell, endCell] = range
            .split(",")
            .map((cell) => cell.trim());
          // Check if the formula syntax is correct
          if (!(sheetName && startCell && endCell)) {
            console.warn(`Invalid table formula syntax: ${tableMatch[0]}`);
            continue; // Skip the invalid formula and move to the next match
          }
          // Find the corresponding values in the sheetArray for the specified range
          const tableValues = sheetArray[sheetName]
            ?.filter((cellObj) =>
              isCellInRange(cellObj.cell, startCell, endCell)
            )
            .reduce((acc, cellObj) => {
              const cellColumn = cellObj.cell.match(/[A-Z]+/)[0].charCodeAt(0);
              const cellRow = parseInt(cellObj.cell.match(/\d+/)[0]);
              const startColumn = startCell.match(/[A-Z]+/)[0].charCodeAt(0);
              const startRow = parseInt(startCell.match(/\d+/)[0]);
              const rowIndex = cellRow - startRow;
              const colIndex = cellColumn - startColumn;
              acc[
                rowIndex *
                  (endCell.match(/[A-Z]+/)[0].charCodeAt(0) -
                    startCell.match(/[A-Z]+/)[0].charCodeAt(0) +
                    1) +
                  colIndex
              ] = cellObj.value;
              return acc;
            }, []);
       
          // Replace the formula with the table structure
          if (tableValues) {
            const numRows = endCell.match(/\d+/)[0] - startCell.match(/\d+/)[0] + 1;
            const numCols =
              endCell.match(/[A-Z]+/)[0].charCodeAt(0) -
              startCell.match(/[A-Z]+/)[0].charCodeAt(0) +
              1;
       
            let tableStructure =
              '<table border="1" style="border-collapse: collapse; border-spacing: 0; width: 100%;">';
       
            // Track non-empty rows and columns
            const nonEmptyRows = new Set();
            const nonEmptyCols = new Set();
       
            // Check and record non-empty rows and columns
            for (let i = 0; i < numRows; i++) {
              for (let j = 0; j < numCols; j++) {
                const cellIndex = i * numCols + j;
                const cellValue = tableValues[cellIndex] || "";
                if (cellValue) {
                  nonEmptyRows.add(i);
                  nonEmptyCols.add(j);
                }
              }
            }
       
            // Add non-empty rows to the table structure
            for (let i = 0; i < numRows; i++) {
              if (removeEmptyRows || nonEmptyRows.has(i)) {
                tableStructure += "<tr>";
                for (let j = 0; j < numCols; j++) {
                  if (removeEmptyCols || nonEmptyCols.has(j)) {
                    const cellIndex = i * numCols + j;
                    const cellValue = tableValues[cellIndex] || "";
                    const cellWidth = cellValue ? "" : "39.11px";
                    const cellHeight = cellValue ? "" : "14.4px";
                    tableStructure += `<td style="width: ${cellWidth}; height: ${cellHeight};">${cellValue}</td>`;
                  }
                }
                tableStructure += "</tr>";
              }
            }
       
            tableStructure += "</table>";
       
            newValue = newValue.replace(tableMatch[0], tableStructure);
          } else {
            // Handle the case where the table values are not found
            console.warn(`Table values not found for formula: ${tableMatch[0]}`);
          }
        }
       
       
 
       
       
        // Fetch and replace image sources
        const imgElements = newValue.match(/<img[^>]+src="([^">]+)"/g) || [];
        for (const imgElement of imgElements) {
          const imgSrcMatch = /src="([^">]+)"/.exec(imgElement);
          if (imgSrcMatch) {
            const imgSrc = imgSrcMatch[1];
            const base64Data = await fetchImageAsBase64(imgSrc);
            newValue = newValue.replace(imgSrc, base64Data);
          }
        }
 
        // Update the Froala Editor content
        section.section_value[itemIndex].value = newValue;
 
        // Force Froala Editor to re-render
        const froalaEditorElement = document.getElementById(
          `froala_editor_${sectionName}_${itemIndex}`
        );
        if (froalaEditorElement) {
          froalaEditorElement.innerHTML = newValue;
        }
      }
    }
    updateDocTempData(updatedDocTempData);
  };
 
 
  // Function to check if a cell is within the specified range
  function isCellInRange(cell, startCell, endCell) {
    // Assuming cell references are in the format A1, B2, etc.
    const cellColumn = cell.match(/[A-Z]+/)[0];
    const cellRow = parseInt(cell.match(/[0-9]+/)[0]);
 
    const startColumn = startCell.match(/[A-Z]+/)[0];
    const startRow = parseInt(startCell.match(/[0-9]+/)[0]);
 
    const endColumn = endCell.match(/[A-Z]+/)[0];
    const endRow = parseInt(endCell.match(/[0-9]+/)[0]);
 
    return (
      cellColumn >= startColumn &&
      cellColumn <= endColumn &&
      cellRow >= startRow &&
      cellRow <= endRow
    );
  }
 
  // api to get calcdata to guided listing
  const spreadRef = useRef(null);
  const [sheetArray, setSheetArray] = useState([]);
  const getCalcData = async () => {
    const calc = spreadRef.current;
    const surveykey = survey_key;
    console.log("survey_key:", surveykey);
 
    try {
      const response = await fetch(
        `${baseUrl}/api/spread/display/data/getcalc`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            survey_key: survey_key,
          }),
        }
      );
 
      if (response.ok) {
        const responseData = await response.json();
        console.log("responseData:", responseData);
  // Set the selected option after fetching data (on coming to page data was not displaying had to change to other option and display it)
  setSelectedOptionTemplate(options[0] || "");
        if (Array.isArray(responseData.data) && responseData.data.length > 0) {
          const calcData = responseData.data[0];
          console.log("calcData:", calcData);
 
          if (calcData && calcData.data) {
            console.log("Data received:", calcData.data);
 
            // Parse JSON data
            const jsonData = JSON.parse(calcData.data);
 
            // Get sheet names
            const sheetNames = Object.keys(jsonData.sheets);
            console.log(sheetNames);
            // Initialize an object to store cell values by sheet name
            const cellValuesBySheet = {};
 
            // Iterate through sheets
            sheetNames.forEach((sheetName) => {
              // Get sheet data
              const sheetData = jsonData.sheets[sheetName].data.dataTable;
 
              // Extract cell values with spreadsheet-style cell references
              const cellValues = Object.entries(sheetData)
                .map(([row, row_data]) =>
                  Object.entries(row_data).map(([col, cell_value]) => ({
                    cell: `${String.fromCharCode(65 + parseInt(col))}${
                      parseInt(row) + 1
                    }`,
                    value: cell_value.value,
                  }))
                )
                .flat();
              console.log(cellValues);
              // Store cell values in the object
              cellValuesBySheet[sheetName] = cellValues;
            });
            // Log or process cell values as needed
            console.log("Cell values by sheet:", cellValuesBySheet);
            setSheetArray(cellValuesBySheet);
 
            // Now you can use cellValuesBySheet object as needed
 
            // Optionally, update the spreadsheet
            calc.fromJSON(jsonData);
            // initSpread(calc);
          } else {
            console.error(
              'Invalid data format. Missing "data" property:',
              calcData
            );
          }
        } else {
          console.error("Invalid or empty data array:", responseData.data);
        }
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };
 
  useEffect(() => {
    getCalcData();
  }, [survey_key]);
 
 
  console.log(sheetArray);
 
  return (
    <div>
      <div id="headerTempaltesListing">
        <div className="pdfdowWrapper">
          <span className="pdfdowListing" onClick={handleDownloadPdf}>
            <FontAwesomeIcon icon={faFilePdf} id="iconpdf" />
            <label className="pdfdowlabelListing">GENERATE</label>
          </span>
          <span className="worddowListing" onClick={handleDownloadWord}>
            <i className="fa fa-file-word-o" id="iconword"></i>
            <label className="worddowlabelListing">GENERATE</label>
          </span>
        </div>
        {showFlagHeader ? (
          <div className="centered-content2">
            <div className="guideapproveGuided">
              <HeaderBar headerlabel={"QUOTE TEMPLATE"} />
            </div>
          </div>
        ) : showFlagButton ? (
          <div className="centered-content1">
            <div className="guideapproveGuided">
              <button className="approveguideGuided">
                &nbsp;&nbsp;SUBMIT FOR APPROVAL&nbsp;&nbsp;
              </button>
            </div>
          </div>
        ) : null}
        <div className="dropdownDoctype">
          <span className="right-align">DOCTYPE</span>
          <div className="customdoctype">
            <CustomDropdown
              custuminput="guidedlistiput"
              options={options}
              onSelect={handleActionSelect1}
              showCancel={true}
              value={selectedOptionTemplate}
              onChange={(value) => setSelectedOption1(value)}
              doctypePublished={doctypePublished}
            />
          </div>
        </div>
      </div>
      <div className="squareboxguide">
        <div>
          {doctypePublished
            .filter((item) => item.doc_name === selectedOptionTemplate)
            .map((template) => (
              <>
                {template.sections?.map((section, index) => (
                  <div key={index} className="squarebox">
                    <div
                      className="headerclass-template"
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        background: "#216c98;",
                        marginBottom: "25px",
                      }}
                    >
                      {section.section_name}
                    </div>
                    {doc_tempData
                      .filter(
                        (item) => item.doc_name === selectedOptionTemplate
                      )
                      .map((field, index1) => (
                        <div key={index1}>
                          {field.sections
                            .filter(
                              (item) =>
                                item.section_name === section.section_name
                            )
                            .map((field_sec, i) => (
                              <div key={i}>
                                {field_sec.section_value.map(
                                  (sec_item, ind) => (
                                    <div id="froala_delete" key={ind}>
                                      <div className="froalacomp">
                                      {sec_item.value !== null && sec_item.value !== undefined && (
                                        <FroalaEditorComponent
                                          config={editorConfig}
                                          model={String(sec_item.value)} 
                                          onModelChange={(newValue) =>
                                            handleEditorChange(
                                              newValue,
                                              section.section_name,
                                              ind
                                            )
                                          }
                                        />
                                        )}
                                      </div>
                                      <div className="dlefrola">
                                        <button
                                          id={`delete-button-${ind}`}
                                          className={`deincatanewGuide ${
                                            highlightedIndex === ind &&
                                            secName === section.section_name
                                              ? "deincatanewGuidehighlight"
                                              : ""
                                          }`}
                                        >
                                          <FontAwesomeIcon
                                            icon={faTrashAlt}
                                            id="deleteFreoala"
                                            aria-hidden="true"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleToggleEditor(
                                                ind,
                                                section.section_name
                                              );
                                            }}
                                          />
                                        </button>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            ))}
                        </div>
                      ))}
                    <div className="temp_froala">
                      <div>
                        <CatalogPopup />
                      </div>
                      <div>
                        <button
                          className="newbtn"
                          onClick={() =>
                            handleAddField1(
                              template.doc_name,
                              section.section_name
                            )
                          }
                        >
                          + NEW
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ))}
        </div>
      </div>
    </div>
  );
}
export default GuidedListing;
 