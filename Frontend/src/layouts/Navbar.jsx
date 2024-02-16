import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaClock, FaBell, FaUser } from "react-icons/fa";
import "../assets/css/layout/layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../config";
import { useAuthContext } from "../hooks/useAuthContext";
import DImage from "../assets/Images/DImage.png";
 
const Navbar = () => {
  const { user } = useAuthContext();
  console.log(user);
  const [searchActive, setSearchActive] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOptionGrouping07, setSelectedOptionGrouping07] =
    useState(null);
  const dropdownRef = useRef(null);
 
  const handleIconClick = () => {
    setSearchActive(!searchActive);
  };
 
  const handleClearClick = () => {
    const input = document.getElementById("mysearch");
    if (input) {
      input.value = "";
    }
  };
 
  const handleDropdownClick = () => {
    setDropdownVisible(!dropdownVisible);
  };
 
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };
 
  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  // get image from company profile
  const [dbCompanyData, setDbCompanyData] = useState([]);
  useEffect(() => {
    const getcompanydata = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/company/get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const company = await response.json();
          console.log(company);
          console.log(company.data);
          if (company.data[0].companyLogo) {
            setDbCompanyData(company.data[0]);
          }
          if (dbCompanyData == null) {
            try {
              const compDaata = company.data;
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
    if (dbCompanyData) {
      getcompanydata();
    }
  }, [user]);
  // get config data to navbar
 
  const [dbConfigData, setDbConfigData] = useState([]);
 
  console.log("!@#$%^&*");
 
  console.log(dbConfigData);
 
  useEffect(() => {
    const getconfigdata = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/config/get`, {
          method: "POST",
 
          headers: {
            "Content-Type": "application/json",
          },
        });
 
        if (response.ok) {
          const config = await response.json();
 
          if (config && config.data && config.data.length > 0) {
            setSelectedOptionGrouping07(config.data[0].value7);
            console.log("inputValue7 set to------:", config.data[0].value1);
          }
 
          console.log(config);
 
          console.log(config.data);
 
          setDbConfigData(config.data);
 
          if (dbConfigData == null) {
            try {
              const confDaata = config.data;
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
 
    if (dbConfigData) {
      getconfigdata();
    }
  }, []);
 
  const renderCompanyImage = () => {
    if (selectedOptionGrouping07 === "YES" && dbCompanyData.companyLogo) {
      return (
        <div className="logo_image" id="image_add">
          <>
            <img
              src={dbCompanyData.companyLogo}
              style={{
                maxWidth: "45px",
                maxHeight: "20px",
                marginRight: "10px",
              }}
              alt=""
            />
 
            <p
              style={{
                color: "whitesmoke",
                marginTop: "1px",
                display: "contents",
              }}
            >
               <span
              style={{
                fontSize: "18px",
                marginRight: "10px",
                marginTop: "8px",
                color: "white",
              }}
            >
              Powered by
            </span>
              <img
              src={DImage}
              alt=""
              id="Dimage"
              style={{
                maxWidth: "45px",
                maxHeight: "20px",
                marginRight: "10px",
              }}
            />
            </p>
          </>
 
          <FontAwesomeIcon
            icon={faUserCircle}
            style={{
              width: "20px",
              height: "20px",
              color: "gray",
              display: "none",
            }}
          />
        </div>
      );
    }
 
    return null;
  };
  return (
    <div>
      <div className="navandbread">
        <nav>
          <div className={`search ${searchActive ? "active" : ""}`}>
            <div className="icon" onClick={handleIconClick}>
              <FaSearch
                id="fasearchicon"
                style={{
                  color: searchActive ? "#216c98" : "black",
                  marginBottom: "4px",
                }}
              />
            </div>
            <div className="input">
              <input type="text" placeholder="Search..." id="mysearch" />
            </div>
            <span className="clear" onClick={handleClearClick}></span>
          </div>
          {renderCompanyImage()}
          <div className="navset">
            <div className="dropdown" ref={dropdownRef}>
              <FaUser
                onClick={handleDropdownClick}
                id="profile"
                className="fa fa-user"
                style={{
                  fontSize: "20px",
                  color: dropdownVisible ? "#216c98" : "white",
                  marginRight: "20px",
                  color: "azure",
                }}
              />
              {dropdownVisible && (
                <div className="dropdown-content_navbar">
                  <Link to="/myprofile">My Profile</Link>
                  {/* <Link to="">What's New?</Link> */}
                  <Link to="/">Logout DealDox</Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
 
export default Navbar;