import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { IoBook } from "react-icons/io5";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdSupervisorAccount } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useAuthContext } from "../hooks/useAuthContext";
import { baseUrl } from "../config";

const Sidebar = ({ children }) => {

  const { user } = useAuthContext();
  console.log(user);


  const location = useLocation();

  let securityRole;

  securityRole = user?.securityRole;
  console.log(securityRole);

  securityRole = user?.people?.securityRole;
  console.log(securityRole);


  //API to get the data of the Security Role\
  const [securityRoleData, setSecurityRoleData] = useState([]);
  useEffect(() => {
    if (securityRole) {
      getSecurityRoleData();
    } else {
      console.log("No SecurityRole Mentioned!");
    }
  }, [user])
  const getSecurityRoleData = async () => {
    try {
      let response = await fetch(`${baseUrl}/api/security/getSpecificRoleData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ role: securityRole })
      });

      const json = await response.json();
      console.log(json);
      if (json) {
        setSecurityRoleData(json.data);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };



  console.log("@#$%");
  console.log(securityRoleData);

  const account = securityRoleData.length > 0 && securityRoleData ? securityRoleData[0].account : "";
  const opportunity = securityRoleData.length > 0 && securityRoleData ? securityRoleData[0].opportunity : "";
  const oppor_stage = securityRoleData.length > 0 && securityRoleData ? securityRoleData[0].oppor_stage : "";
  const quote = securityRoleData.length > 0 && securityRoleData ? securityRoleData[0].quote : "";
  const quote_add =securityRoleData.length > 0 && securityRoleData ? securityRoleData[0].quote_add : "";
  const quote_guideSel_ans = securityRoleData.length > 0 && securityRoleData ? securityRoleData[0].quote_guideSel_ans : "";
  const catalog = securityRoleData.length > 0 && securityRoleData ? securityRoleData[0].catalog : "";
  const catalog_roles = securityRoleData.length > 0 && securityRoleData ? securityRoleData[0].catalog_roles : "";

  console.log("!@#$%^" + account, opportunity, oppor_stage, quote, quote_add, quote_guideSel_ans, catalog, catalog_roles);



  const isAccountHidden = securityRoleData.length > 0 && securityRoleData ? securityRoleData[0].account === "none" : "";
  const isQuoteHidden = securityRoleData.length > 0 && securityRoleData ? securityRoleData[0].quote === "none" : "";
  const isCatalogHidden = securityRoleData.length > 0 && securityRoleData ? securityRoleData[0].catalog === "none" : "";




  const menuItem = [
    {
      path: "/home",
      name: <span style={{ marginLeft: "5px" }}>HOME</span>,
      icon: <AiFillHome style={{ marginLeft: "5px" }} />,
    },
    {
      path: `/account?permission=${account}&oppPermission=${opportunity}&quote_add=${quote_add}`,
      name: <span style={{ marginLeft: "-5px" }}>ACCOUNTS</span>,
      icon: <IoBook style={{ marginLeft: "-4px" }} />,
      hidden: isAccountHidden,
    },
    {
      path: "/quotes",
      name: "QUOTES",
      icon: <AiFillDollarCircle />,
      hidden: isQuoteHidden
    },
    {
      path: "/demand",
      name: "DEMAND",
      icon: <MdSupervisorAccount />,
      hidden: isCatalogHidden
    },
    {
      path: "/forecast",
      name: <span style={{ marginLeft: "-3px" }}>FORECAST</span>,
      icon: <GoGraph />,
      hidden: isCatalogHidden
    },

    {
      path: "/rolessetup",
      name: "CATALOG",
      icon: <FaEye />,
      hidden: isCatalogHidden

    },
    // Conditionally add the "ADMIN" item based on isAdminUser
    {
      path: "/companyprofile",
      name: <span style={{ marginLeft: "5px" }}>ADMIN</span>,
      icon: <FiSettings style={{ marginLeft: "5px" }} />,
      hidden: isCatalogHidden,
    },
  ];
  const isActive = (path) => {
    if (location.pathname === path) {
      return true;
    }

    if (

      (location.pathname === "/opportunities" && path === "/account") ||
      (location.pathname === "/opportunities" && path === `/account?permission=${account}&oppPermission=${opportunity}&quote_add=${quote_add}`) ||
      (location.pathname === "/opportunitiesdata" && path === "/account") ||
      (location.pathname === "/opportunitiesdata" && path === `/account?permission=${account}&oppPermission=${opportunity}&quote_add=${quote_add}`) ||
      (location.pathname === "/guidedselling" && path === `/guidedselling?guidedAnswerPermission=${quote_add}`) ||
      (location.pathname === "/guidedselling" && path === `/account?permission=${account}&oppPermission=${opportunity}&quote_add=${quote_add}`) ||
      (location.pathname === "/quotecreation" && path === `/account?permission=${account}&oppPermission=${opportunity}&quote_add=${quote_add}`)
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className="container">
      <div className="sidebarfix">
        <div className="sidebar">
          {menuItem.map((item, index) => (
            !item.hidden && (
              <NavLink
                to={item.path}
                key={index}
                className={`link ${isActive(item.path) ? "active" : ""}`}
                activeClassName="active"
              >
                <div className="link_text">
                  <div className="icon">{item.icon}</div>
                  <div className="link_text">{item.name}</div>
                </div>
              </NavLink>
            )
          ))}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
