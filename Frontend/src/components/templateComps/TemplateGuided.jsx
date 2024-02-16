import React, { useState, useEffect } from "react";
import CustomDropdown from "../common/CustomDropdown";
import ErrorMessage from "../common/ErrorMessage";
import InputTypes from "../common/InputTypes";
import "../../assets/css/templatecomps/TemplateGuided.css";
import { baseUrl } from "../../config";

const TemplateGuided = ({
  templateToggleBtnVisible,
  guidedSellingtogglebtn,
  surveykeyTemplate,
  quoteName,
  readOnly = false,
  netPrice,
  listPrice,
  cost,
  discount,
  margin
}) => {
  console.log(margin,"opopopo");
  console.log(readOnly);
  const filteredpricemodel = [
    "APPROVELS",
    "SALES",
    "BID TEAM MEMBER",
    "MANAGEMENT",
    "DELIVARY",
    "DELIVARY OWNER",
    "PRACTICE",
  ];
  const salesorg = ["INACTIVE", "IN PROGRESS", "PUBLISHED"];
  const catalogstatus = ["INACTIVE", "IN PROGRESS", "PUBLISHED"];
  const filteredcatagory = ["DBA", "DSOM", "DEFAULT", "PEDUCATION", "IZOT"];
  const [, setSelectedTemplate] = useState("");
  const handleOptionSelect = (selectedOption) => {
    setSelectedTemplate(selectedOption);
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const { token } = user;
  const [surveyKeyTemplate, setSurveyKeyTemplate] = useState("");

  useEffect(() => {
    setSurveyKeyTemplate(surveykeyTemplate);
  }, []);
  console.log("surveyKeyTemplate", surveyKeyTemplate);

 
  const [priceModel, setPriceModel] = useState("");
  const [avgRateExpenses] = useState({
    avgRate: "0.00",
    expenses: "0.00",
    duration: "0.00",
    salesOrg: "DEFAULT",
  });


  return (
    <div>
      {templateToggleBtnVisible && (
        <div className="quotempid">
          <div className="quotempid2">
            <div className="templeft">
              <div className="containertemp1">
                <div id="contenttemp1">
                  <ErrorMessage
                    showFlaxErrorMessageText={true}
                    label={"QUOTE NAME"}
                    errormsg="QUOTE NAME IS A REQUIRED FIELD"
                    readOnly = {readOnly}
                  />
                </div>
                <div id="contenttemp2">
                  <CustomDropdown
                    options={filteredpricemodel}
                    label={"PRICE MODEL"}
                    onSelect={handleOptionSelect}
                    value={priceModel}
                    onChange={(value) => setPriceModel(value)}
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
                    readOnly = {readOnly}
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
                    showFlagNumber={true}
                    numberplaceholder="$0.00"
                  />
                </div>
                <div id="discountdd">
                  <InputTypes
                    NumberLabel="DISCOUNT"
                    showFlagNumber={true}
                    numberplaceholder="$0.00"
                  />
                </div>
                <div id="netpricedd">
                  <InputTypes
                    NumberLabel="NET PRICE"
                    showFlagNumber={true}
                    numberplaceholder="$0.00"
                  
                  />
                </div>
              </div>
              <div className="containerqoute2">
                <div id="expensesdd">
                  <InputTypes
                    NumberLabel="EXPENSES"
                    showFlagNumber={true}
                    numberplaceholder="$0.00"
                  />
                </div>
                <div id="margindd">
                  <InputTypes
                    NumberLabel="MARGIN"
                    showFlagNumber={true}
                    numberplaceholder="$0.00"
                  />
                </div>
                <div id="costdd">
                  <InputTypes
                    NumberLabel="COST"
                    showFlagNumber={true}
                    numberplaceholder="$0.00"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div id="contentqtemp">
            <textarea />
            <label>DESCRIPTION</label>
          </div> */}
          <div>
            <button id="dele">DELETE TEMPLATE</button>
          </div>
        </div>
      )}
      {/*------------------------- guided selling ----------------------------- */}
      {guidedSellingtogglebtn && (
        <div className="quotempid">
          <div className="quotempid2">
            <div className="templeft">
              <div className="containertemp1">
                <div id="contenttemp1">
                  <InputTypes
                    showFlagText={true}
                    TextLabel="QUOTE NAME"
                    value={quoteName}
                    readOnly
                  />
                </div>
              </div>
              <div className="containertemp2">
                <div id="contentdownb1">
                  <InputTypes
                    showFlagText={true}
                    TextLabel="SALES ORG"
                    value={avgRateExpenses.salesOrg}
                    readOnly = {readOnly}
                  />
                </div>

                <div id="contentdownb2">
                  <InputTypes showFlagText={true} TextLabel="CURRENCY" readOnly = {readOnly}/>
                </div>

                <div id="contentdownb3">
                  <InputTypes
                    showFlagText={true}
                    TextLabel="DURATION"
                    value={avgRateExpenses.duration}
                    readOnly = {readOnly}
                  />
                </div>
                <div id="contentdownb4">
                  <InputTypes
                    showFlagText={true}
                    TextLabel="AVG RATE"
                    value={avgRateExpenses.avgRate}
                    readOnly = {readOnly}
                  />
                </div>
              </div>
            </div>
            <div className="tempright">
              <div className="containerquoteGuide1">
                <div id="listpricedd">
                <InputTypes
                    NumberLabel="LIST PRICE"
                    showFlagNumber={true}
                    value={listPrice.toFixed(2)}
                  />
                </div>
                <div id="discountdd">
                <InputTypes
                      TextLabel="DISCOUNT"
                      showFlagText={true}
                      value={`${discount}%`}
                      readOnly
                    />
                </div>
                <div id="netpricedd">
                <InputTypes
                    NumberLabel="NET PRICE"
                    showFlagNumber={true}
                    value={netPrice.toFixed(2)}
                  />
                </div>
              </div>
              <div className="containerqoute2">
                <div id="expensesdd">
                  <InputTypes
                    NumberLabel="EXPENSES"
                    showFlagNumber={true}
                    value={avgRateExpenses.expenses}
                    readOnly = {readOnly}
                  />
                </div>
                <div id="margindd">
                <InputTypes
                    TextLabel="MARGIN"
                    showFlagText={true}
                    value={`${margin}%`}
                    readOnly = {readOnly}
                  />
                </div>
                <div id="costdd">
                <InputTypes
                    NumberLabel="COST"
                    showFlagNumber={true}
                    value={cost.toFixed(2)}
                    readOnly = {readOnly}
                  />
                </div>
              </div>
            </div>
          </div>  
        </div>
      )}
    </div>
  );
};

export default TemplateGuided;
