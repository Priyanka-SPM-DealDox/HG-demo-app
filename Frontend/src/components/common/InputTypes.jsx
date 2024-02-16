import React from "react";
import "../../assets/css/common/InputTypes.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

function NumberInput({
  value, onChange,
  NumberLabel,
  TextLabel,
  numberinputcustom,
  textinputcustom,
  textlabelcustom,
  numberplaceholder,
  textplaceholder,
  Checkboxlabel,
  showFlagText,
  showFlagNumber,
  showFlagCheckBox,
  showFlagCalender,
  CalenderLabel,
  selectedDate,
  onCalendarChange,
  placeholder,
  passwordLabel,
  showFlagPassword,
  passwordinputcustom,
  passwordplaceholder,
  paswordlabelcustom,
  showFlagEmail,
  Emailinputcustom,
  Emailplaceholder,
  EmailLabel,
  emaillabelcustom,
  textareaInput,
  textareaplaceholder,
  TextareaLabel,
  textarealabelcustom,
  showFlagTextarea,
  readOnly = false,
}) {
 

  return (
    <>
      {/* number */}
      {showFlagNumber && (
        <div id="contentquote">
          <input
            autoComplete="off"
            className={`numberinput ${numberinputcustom}`}
            name="number"
            type="number"
            placeholder={numberplaceholder}
            value={value} onChange={(e) => onChange(e.target.value)}
            readOnly={readOnly}
          />
          <label className="numberlabel">{NumberLabel}</label>
        </div>
      )}
      {/* email */}
      {showFlagEmail && (
        <div id="contentquote">
          <input
            autoComplete="off"
            className={`emailinput ${Emailinputcustom}`}
            name="Email"
            type="Email"
            placeholder={Emailplaceholder}
            value={value} onChange={(e) => onChange(e.target.value)}
            readOnly={readOnly}
          />

          <label className={`emaillabel ${emaillabelcustom}`}>
            {EmailLabel}
          </label>
        </div>
      )}
      {/* text */}
      {showFlagText && (
        <div id="contentquote">
          <input
            autoComplete="off"
            className={`textinput ${textinputcustom}`}
            name="text"
            type="text"
            placeholder={textplaceholder}
            value={value} onChange={(e) => onChange(e.target.value)}
            readOnly={readOnly}
          />
          <label className={`textlabel ${textlabelcustom}`}>{TextLabel}</label>
        </div>
      )}
{/* textarea */}
{showFlagTextarea && (
        <div id="contentTextarea">
          <textarea
            autoComplete="off"
            className={`textareainput ${textareaInput}`}
            name="textarea"
            placeholder={textareaplaceholder}
            value={value} onChange={(e) => onChange(e.target.value)}
            readOnly={readOnly}
          />
          <label className={`textarealabel ${textarealabelcustom}`}>{TextareaLabel}</label>
        </div>
      )}
      {/* checkbox */}
      {showFlagCheckBox && (
         <label className="custom-checkbox">
         <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)}  readOnly={readOnly}/>
         <span className="checkmarkbox"></span>
         <label className="checkboxlabel">{Checkboxlabel}</label>
       </label>
      )}
      {/* calender */}
      {showFlagCalender && (
        <>
          <Datetime
            value={selectedDate}
            readOnly={readOnly}
            onChange={(date) => {
              onCalendarChange(date);
              
            }}
            dateFormat="MMMM D, YYYY"
            timeFormat={false}
            inputProps={{
              id: "calender-input",
              placeholder: placeholder || "",
              className: "calendercsscomp",
              style: {
                borderLeft: selectedDate
                  ? "0.1px solid rgb(218, 217, 217)"
                  : "3px solid #216c98",
              },
            }}
            input={true}
          />
          <label htmlFor="calender-input" className="labelcalender">
            {CalenderLabel}
          </label>
        </>
      )}

      {/* password */}
      {showFlagPassword && (
        <div id="contentquote">
          <input
            autoComplete="off"
            className={`passwordinput ${passwordinputcustom}`}
            name="text"
            type="password"
            placeholder={passwordplaceholder}
            readOnly={readOnly}
          />
          <label className={`textlabel ${paswordlabelcustom}`}>
            {passwordLabel}
          </label>
        </div>
      )}
    </>
  );
}

export default NumberInput;