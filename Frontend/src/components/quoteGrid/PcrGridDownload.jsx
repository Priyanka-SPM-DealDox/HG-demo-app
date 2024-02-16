import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
// import '../../assets/css/quotes/Quotes.css';

const PcrGridDownload = ({ data }) => {
  const handleExcelDownload = () => {
    if (data && data.length > 0) {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "table_data.xlsx");
    } else {
      console.error("Data is empty or undefined.");
    }
  };
  return (
    <div>
      <button className="xlbuttnpeople" onClick={handleExcelDownload}>
        <FontAwesomeIcon icon={faFileExcel} id="downloadpeople" />
        <span id="xlpeopledowlabel">DOWNLOAD</span>
      </button>
    </div>
  );
};

export default PcrGridDownload;
