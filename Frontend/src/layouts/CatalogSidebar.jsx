import React from "react";
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import {
  FaBook,
  FaClipboard,
  FaClone,
  FaEye,
  FaPenSquare,
  FaShoppingCart,
  FaStamp,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

const CatalogSidebar = ({ children }) => {
  const [showRolesMenu, setShowRolesMenu] = useState(false);
  const location = useLocation();

  const menuItem = [
    {
      path: "/home",
      name: <span style={{ marginLeft: "4px" }}>HOME</span>,
      icon: <AiFillHome style={{ marginLeft: "5px" }} />,
    },
    {
      name: <span style={{ marginLeft: "5px" }}>ROLES</span>,
      icon: <FaStamp style={{ marginLeft: "2px" }} />,
      onClick: () => setShowRolesMenu(!showRolesMenu),
      active:
        location.pathname === "/rolessetup" ||
        location.pathname === "/rolesratecards" ||
        location.pathname === "/rolesexchange",
    },
    {
      path: "/rolessetup",
      name: <span style={{ marginLeft: "5px" }}>SETUP</span>,
      hidden: !showRolesMenu,
    },
    {
      path: "/rolesratecards",
      name: <span style={{ marginLeft: "-5px" }}>RATECARDS</span>,
      hidden: !showRolesMenu,
    },
    {
      path: "/rolesexchange",
      name: <span style={{ marginLeft: "-5px" }}>EXCHANGE</span>,
      hidden: !showRolesMenu,
    },
    {
      path: "/items",
      name: <span style={{ marginLeft: "5px" }}>ITEMS</span>,
      icon: <FaShoppingCart style={{ marginLeft: "2px" }} />,
    },
    {
      path: "/content",
      name: <span style={{ marginLeft: "-1px" }}>CONTENT</span>,
      icon: <FaEye style={{ marginLeft: "-1px" }} />,
    },
    {
      path: "/asset",
      name: <span style={{ marginLeft: "6px" }}>ASSET</span>,
      icon: <FaClipboard style={{ marginLeft: "3px" }} />,
    },
    {
      path: "/templates",
      name: <span style={{ marginLeft: "-6px" }}>TEMPLATES</span>,
      icon: <FaClone style={{ marginLeft: "-7px" }} />,
    },
    {
      path: "/setup",
      name: <span style={{ marginLeft: "-1px" }}>SURVEYS</span>,
      icon: <FaPenSquare style={{ marginLeft: "-1px" }} />,
    },
    {
      path: "/setup",
      name: <span style={{ marginLeft: "4px", marginTop: "20px" }}>SETUP</span>,
      active: location.pathname === "/setup",
    },
    {
      path: "/whereused",
      name: <span style={{ marginLeft: "1px" }}>WHERE USED</span>,
    },
    {
      path: "/doctypes",
      name: <span style={{ marginLeft: "-4px" }}>DOCTYPES</span>,
      icon: <FaBook style={{ marginLeft: "-5px" }} />,
    },
  ];

  return (
    <div className="container">
      <div className="sidebarfix">
        <div className="sidebar">
          <div className="top-section"></div>
          {menuItem.map((item, index) => {
            if (item.hidden) {
              return null;
            }
            if (item.onClick) {
              return (
                <div
                  key={index}
                  className={`link ${item.active ? "active" : ""}`}
                  onClick={item.onClick}
                >
                  <div className="link_text">
                    <div className="icon">{item.icon}</div>
                    <div className="link_text">{item.name}</div>
                  </div>
                </div>
              );
            } else {
              return (
                <NavLink
                  to={item.path}
                  key={index}
                  className={`link ${item.active ? "active" : ""}`}
                  activeClassName="active"
                >
                  <div className="link_text">
                    <div className="icon">{item.icon}</div>
                    <div className="link_text">{item.name}</div>
                  </div>
                </NavLink>
              );
            }
          })}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default CatalogSidebar;
