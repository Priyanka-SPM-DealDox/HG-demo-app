import React, { useState } from "react";
import "../../assets/css/common/BillingAndShippingAddress.css";
import 'font-awesome/css/font-awesome.min.css';
import HeaderBar from "./HeaderBar";

const BillingAndShippingAddress = ({ billingAddress,
  setBillingAddress,
  shippingAddress,
  setShippingAddress,
  readOnly = false }) => {

  // Billing
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleBillingVisibility = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Shipping
  const [isShippingVisible, setShippingVisible] = useState(false);


  const toggleShippingVisibility = () => {
    setShippingVisible(!isShippingVisible);
  };

  return (
    <div className="containerA6">
      <div className="left1a">
        <div onClick={toggleBillingVisibility}>
          <HeaderBar headerlabel={"BILLING ADDRESS"} isButtonVisible={true} isDropdownOpen={isDropdownOpen} />
        </div>
        {isDropdownOpen && (
          <div id="billOne">
            <div className="content9">
              <div className="street1">
                <input
                  autoComplete="off"
                  className="billing"
                  type="text"
                  value={billingAddress.billingStreet1}
                  onChange={(e) =>
                    setBillingAddress({
                      ...billingAddress,
                      billingStreet1: e.target.value,
                    })
                  }
                  readOnly={readOnly}
                />
                <label>STREET-1</label>
              </div>
              <div className="street2">
                <input
                  autoComplete="off"
                  className="billing"
                  type="text"
                  value={billingAddress.billingStreet2}
                  onChange={(e) =>
                    setBillingAddress({
                      ...billingAddress,
                      billingStreet2: e.target.value,
                    })
                  }
                  readOnly={readOnly}
                />
                <label>STREET-2</label>
              </div>
            </div>
            <div className="content9">
              <div className="street1">
                <input
                  autoComplete="off"
                  className="billing"
                  type="text"
                  value={billingAddress.billingCity}
                  onChange={(e) =>
                    setBillingAddress({
                      ...billingAddress,
                      billingCity: e.target.value.replace(/[^A-Za-z\s]/g,''),
                    })
                  }
                  readOnly={readOnly}
                />
                <label>CITY</label>
              </div>
              <div className="street2">
                <input
                  autoComplete="off"
                  className="billing"
                  type="text"
                  value={billingAddress.billingState}
                  onChange={(e) =>
                    setBillingAddress({
                      ...billingAddress,
                      billingState: e.target.value.replace(/[^A-Za-z\s]/g,''),
                    })
                  }
                readOnly={readOnly}
                />
                <label>STATE</label>
              </div>
            </div>
            <div className="content9">
              <div className="street1">
                <input
                  autoComplete="off"
                  className="billing"
                  type="number"
                  value={billingAddress.billingZip}
                  onChange={(e) =>
                    setBillingAddress({
                      ...billingAddress,
                      billingZip: e.target.value,
                    })
                  }
                  readOnly={readOnly}
                />
                <label>ZIP</label>
              </div>
              <div className="street2">
                <input
                  autoComplete="off"
                  className="billing"
                  type="text"
                  value={billingAddress.billingCountry}
                  onChange={(e) =>
                    setBillingAddress({
                      ...billingAddress,
                      billingCountry: e.target.value.replace(/[^A-Za-z\s]/g,''),
                    })
                  }
                  readOnly={readOnly}
                />
                <label>COUNTRY</label>
              </div>
            </div>
            <div className="content9phone">
              <input
                autoComplete="off"
                className="billing"
                type="number"
                value={billingAddress.billingPhone}
                onChange={(e) =>
                  setBillingAddress({
                    ...billingAddress,
                    billingPhone: e.target.value,
                  })
                }
                readOnly={readOnly}
              />
              <label>PHONE</label>
            </div>
          </div>
        )}
      </div>

      {/* Shipping */}
      <div className="right1a">
        <div onClick={toggleShippingVisibility}>
          <HeaderBar headerlabel={"SHIPPING ADDRESS"} isButtonVisible={true} isDropdownOpen={isShippingVisible} />
        </div>
        <div id="ship" className={isShippingVisible ? "" : "hidden"}>
          <div className="content10">
            <div className="street1">
              <input
                autoComplete="off"
                className="shipping"
                type="text"
                value={shippingAddress.shippingStreet1}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    shippingStreet1: e.target.value,
                  })
                }
                readOnly={readOnly}
              />
              <label>STREET-1</label>
            </div>
            <div className="street2">
              <input
                autoComplete="off"
                className="shipping"
                type="text"
                value={shippingAddress.shippingStreet2}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    shippingStreet2: e.target.value,
                  })
                }
                readOnly={readOnly}
              />
              <label>STREET-2</label>
            </div>
          </div>
          <div className="content10">
            <div className="street1">
              <input
                autoComplete="off"
                className="shipping"
                type="text"
                value={shippingAddress.shippingCity}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    shippingCity: e.target.value.replace(/[^A-Za-z\s]/g,''),
                  })
                }
                readOnly={readOnly}
              />
              <label>CITY</label>
            </div>
            <div className="street2">
              <input
                autoComplete="off"
                className="shipping"
                type="text"
                value={shippingAddress.shippingState}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    shippingState: e.target.value.replace(/[^A-Za-z\s]/g,''),
                  })
                }
                readOnly={readOnly}
              />
              <label>STATE</label>
            </div>
          </div>
          <div className="content10">
            <div className="street1">
              <input
                autoComplete="off"
                className="shipping"
                type="number"
                value={shippingAddress.shippingZip}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    shippingZip: e.target.value,
                  })
                }
                readOnly={readOnly}
              />
              <label>ZIP</label>
            </div>
            <div className="street2">
              <input
                autoComplete="off"
                className="shipping"
                type="text"
                value={shippingAddress.shippingCountry}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    shippingCountry: e.target.value.replace(/[^A-Za-z\s]/g,''),
                  })
                }
                readOnly={readOnly}
              />
              <label>COUNTRY</label>
            </div>
          </div>
          <div className="content10phone">
            <input
              autoComplete="off"
              className="shipping"
              type="number"
              value={shippingAddress.shippingPhone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  shippingPhone: e.target.value,
                })
              }
              readOnly={readOnly}
            />
            <label>PHONE</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingAndShippingAddress;
