import React, { useEffect, useRef, useCallback, useState } from "react";
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css";
import GC from "@grapecity/spread-sheets";
// import './styles.css';
import Cookies from "js-cookie";

// import { useAuthContext } from '../hooks/useAuthContext';
import {
  SpreadSheets,
  Worksheet,
  Column,
} from "@grapecity/spread-sheets-react";
import { baseUrl } from "../../config";
import { FaCalculator } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
window.GC = GC;

const SpreadSheet = (survey_id) => {
  // {resetSpreadsheet, dataArray }
  console.log(GC.Spread.Sheets.LicenseKey);
  const [surveyId, setSurveyId] = useState("");
  console.log(surveyId);
  const [surveyKey, setSurveyKey] = useState("");
  console.log(surveyKey);
  const [sheetNames, setSheetNames] = useState([]);
  const [sheetRefresh, setSheetRefresh] = useState(false);

  console.log(survey_id.survey_id);
  useEffect(() => {
    setSurveyKey(survey_id.survey_id);
  }, [survey_id.survey_id]);

  let hostStyle = {
    width: "100%",
    height: "400px",
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const { token } = user;

  const spreadRef = useRef(null);

  // var spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"), {
  //   sheetCount: 3,
  // });

  // console.log(spread);
  // var hostSpread = spread.getHost();
  // console.log(hostSpread);
  // var activeSheet = spread.getActiveSheet();
  // if (activeSheet) {
  //   activeSheet.autoGenerateColumns = true;
  // }
  // activeSheet.autoGenerateColumns = true;


  const fetchData = async (position) => {
    try {
      const response = await fetch(
        `${baseUrl}/api/spread/display/question/${position}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            survey_key: survey_id.survey_id,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        return data;
      } else {
        console.error("Error fetching data:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const fetchAnsById = async (questionKey) => {
    try {
      if(!questionKey){
        return null;
      }
      const response = await fetch(
        `${baseUrl}/api/spread/display/answer/${questionKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            survey_key: survey_id.survey_id,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();

        if (result.data && result.data.length > 0) {
          const answerData = result.data[0];
          console.log(answerData);
          // Parse the data field from JSON string to object
          const parsedData = JSON.parse(answerData.data);
          console.log(parsedData);
          // Access the question_val property

          return parsedData;
        } else {
          console.log("No data found in the response");
          return null;
        }
      } else {
        console.log("Error fetching data:", response.status);
        return null;
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      return null;
    }
  };

  // QUESTION_INDEX CUSTOM FUNCTION
  const QuestionIndexFunction = function () {
    this.typeName = "QUESTION_INDEX";
  };
  QuestionIndexFunction.prototype =
    new GC.Spread.CalcEngine.Functions.AsyncFunction("QUESTION_INDEX", 1, 1, {
      name: "QUESTION_INDEX",
      description: "Returns The Question From Value By Index",
    });
  QuestionIndexFunction.prototype.evaluate = async (context, position) => {
    console.log("Position parameter:", position);
    try {
      const data = await fetchData(position);
      if (data && data.data && data.data[0]) {
        context.setAsyncResult(
          data.data[0].survey_questions_num +
          "  " +
          data.data[0].survey_questions_name
        );
        setSurveyId(data.data[0].survey_key);
      } else {
        context.setAsyncResult(``);
      }
    } catch (error) {
      context.setAsyncResult(`Error: ${error}`);
    }
  };

  // GET_QUESTION_ID CUSTOM FUNCTION

  const GetQuestionIdFunction = function () {
    this.typeName = "GET_QUESTION_ID";
  };

  GetQuestionIdFunction.prototype =
    new GC.Spread.CalcEngine.Functions.AsyncFunction("GET_QUESTION_ID", 1, 1, {
      name: "GET_QUESTION_ID",
      description: "Returns Question ID From Value By Index",
    });

  // Inside GetQuestionId custom function
  GetQuestionIdFunction.prototype.evaluate = async (context, position) => {
    try {
      const data = await fetchData(position);
      if (data && data.data && data.data[0]) {
        context.setAsyncResult(data.data[0]._id);
      } else {
        context.setAsyncResult(``);
      }
    } catch (error) {
      context.setAsyncResult(`Error: ${error}`);
    }
  };

  // returns the default value for the formula
  QuestionIndexFunction.prototype.defaultValue = () => {
    return "Loading...";
  }

  const AnswerByIdFunction = function () {
    this.typeName = "ANSWER_BY_ID";
  };

  AnswerByIdFunction.prototype =
    new GC.Spread.CalcEngine.Functions.AsyncFunction("ANSWER_BY_ID", 1, 1, {
      name: "ANSWER_BY_ID",
      description: "Returns Answer From Question ID",
    });

  AnswerByIdFunction.prototype.evaluate = async (context, questionKey) => {
    try {
      const data = await fetchAnsById(questionKey);
      console.log("Fetched Data:", data);

      if (data && data.length > 0) {
        for (const section of data) {
          const matchingData = section.question_data.find(
            (entry) => entry.question_key === questionKey
          );
          if (matchingData) {
            const answerEntry = matchingData;
            console.log("Answer Entry:", answerEntry);

            // Log before setting result
            console.log("Setting Result:", answerEntry.question_val);

            // Set result and log after setting result
            context.setAsyncResult(answerEntry.question_val);
            console.log("Result Set:", answerEntry.question_val);
            return;
          }
        }
        context.setAsyncResult(``);
      } else {
        context.setAsyncResult(``);
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
      context.setAsyncResult(`Error: ${error}`);
    }
  };

  const initSpread = useCallback((spread) => {
    spreadRef.current = spread;
    var sheet = spread.getSheet(0);

    const sheetCount = spread.getSheetCount();
    const sheetInfo = [];

    for (let i = 0; i < sheetCount; i++) {
      const sheet = spread.getSheet(i);
      const sheetName = sheet.name();
      const cellRange = getSheetCellRange(sheet); // Function to get the cell range
      sheetInfo.push({ sheetName, cellRange });
    }

    setSheetNames(sheetInfo);
    Cookies.set("sheetNames", JSON.stringify(sheetInfo));
    console.log("Sheet names set:", sheetInfo);

    // Extend the Paste Range if the Paste Range is not enough for pasting
    if (spread) {
      // var sheetCount = spread.getSheetCount();
      if (sheetCount > 0) {
        console.log("Spreadsheet initialized successfully.");

        var activeSheet = spread.getActiveSheet();

        if (activeSheet) {
          console.log("Active sheet retrieved successfully.");

          // Your existing code...

          // Extend the Paste Range if the Paste Range is not enough for pasting
          spread.options.allowExtendPasteRange = true;

          // Else you could bind the Clipboard Pasting Event
          spread.bind(
            GC.Spread.Sheets.Events.ClipboardPasting,
            function (sender, args) {
              console.log("Clipboard Pasting Event");
              console.log(args);
              // Add Rows/Column Here before pasting
            }
          );

          // Add your custom function to each sheet
          const questionIndex = new QuestionIndexFunction();
          const getQuestionID = new GetQuestionIdFunction();
          const ansById = new AnswerByIdFunction();

          spreadRef.current.addCustomFunction(questionIndex);
          spreadRef.current.addCustomFunction(getQuestionID);
          spreadRef.current.addCustomFunction(ansById);

        } else {
          console.log("ActiveSheet is null. Unable to get row count.");
        }
      } else {
        console.log("No sheets found in the workbook.");
      }
    } else {
      console.log("Spread object is null.");
    }
  }, []);



  // override to get type
  const oldFun = GC.Spread.Sheets.getTypeFromString;
  // Private types can not be accessed from window, so override getTypeFromString method.
  GC.Spread.Sheets.getTypeFromString = function (typeString) {
    switch (typeString) {
      case "QUESTION_INDEX":
        return QuestionIndexFunction;

      case "GET_QUESTION_ID":
        return GetQuestionIdFunction;

      case "ANSWER_BY_ID":
        return AnswerByIdFunction;
      default:
        return oldFun.apply(this, arguments);
    }
  };

  // Function to get the cell range of a sheet
  const getSheetCellRange = (sheet) => {
    const startRow = 1; // Change this to the starting row of your sheet
    const endRow = sheet.getRowCount();
    const startColumn = 1; // Change this to the starting column of your sheet
    const endColumn = sheet.getColumnCount();

    return `${getColumnName(startColumn)}${startRow}:${getColumnName(
      endColumn
    )}${endRow}`;
  };

  // Function to convert column index to Excel-style column name (A, B, ..., Z, AA, AB, ...)
  const getColumnName = (column) => {
    let columnName = "";
    while (column > 0) {
      const remainder = (column - 1) % 26;
      columnName = String.fromCharCode(65 + remainder) + columnName;
      column = Math.floor((column - 1) / 26);
    }
    return columnName;
  };

  // SAVE DATA TO DATABASE ${baseUrl}/api/spread/display/addcalc

  const addCalcData = async () => {
    let calc = spreadRef.current;
    console.log(calc);
    let calcData = calc.toJSON();
    console.log(calcData);
    console.log("s", calcData.sheets.Sheet1);

    try {
      const response = await fetch(
        `${baseUrl}/api/spread/display/data/addcalc`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            spreadsheetData: calcData,
            survey_key: survey_id.survey_id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error saving data: ${response.status}`);
      }

      const result = await response.json();
      console.log("Data saved successfully:", result);
      toast.success("Calc Saved Successfully", {
        icon: (
          <span style={{ color: "rgb(74, 146, 59) " }}>
            <FaCalculator />
          </span>
        ),
        className: "custom-toast_add",
      });
      // initSpread(calc);
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
  };

  const getCalcData = async () => {
    const calc = spreadRef.current;
    // const survey_key = surveyKey;
    console.log("survey_key:", survey_id.survey_id);
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
            survey_key: survey_id.survey_id,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("responseData:", responseData);

        // Check if responseData.data is an array
        if (Array.isArray(responseData.data)) {
          if (responseData.data.length === 0) {
            console.log("No data available.");
            setSheetRefresh(true);
   
          } else {
            const calcData = responseData.data[0]; // Access the first element
            console.log("calcData:", calcData);

            // Check if the data contains the sheets you expect
            if (calcData && calcData.data) {
              setSurveyKey(survey_id.survey_id);
              calc.fromJSON(JSON.parse(calcData.data));
              // initSpread(calc);
            } else {
              console.error(
                'Invalid data format. Missing "data" property:',
                calcData
              );
            }
          }
        } else {
          console.error(
            "Invalid data format. Not an array:",
            responseData.data
          );
        }
      } else {
        console.error("Error fetching data:", response.status);
        // You might want to handle this error case more gracefully
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };

  // useEffect(() => {
  //   initSpread(spreadRef.current);
  //   // fetchData();
  // }, [initSpread]);

  useEffect(() => {
    // initSpread(spreadRef.current);
    getCalcData();
  }, [surveyKey]);

  return (
    <>
      <button
        onClick={addCalcData}
        className="resumecalc"
        style={{
          position: "relative",
          top: "-102px",
          left: "240px",
          width: "80px",
          height: "25px",
          color: "rgb(71, 196, 246)",
          border: "2px solid skyblue",
          backgroundColor: "rgb(247, 247, 247)",
          fontSize: "10px",
          fontWeight: "bold",
        }}
      >
        SAVE
      </button>

      <div className="sample-tutorial">
        <div className="sample-spreadsheets" >
          <SpreadSheets workbookInitialized={initSpread} hostStyle={hostStyle}>
            {/* <Worksheet /> */}
          </SpreadSheets>
        </div>
      </div>

    </>
  );
};

export default SpreadSheet;
