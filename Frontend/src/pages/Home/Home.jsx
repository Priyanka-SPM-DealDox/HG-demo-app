import React, { useState, useEffect } from "react";
import Sidebar from "../../layouts/Sidebar.jsx";
import Navbar from "../../layouts/Navbar.jsx";
import { Link } from "react-router-dom";
import "../../assets/css/home/Home.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { baseUrl } from "../../config";
import SidePanel from "../../components/common/SidePanel.jsx";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

const Home = () => {
  const [, setProjectOpen] = useState(false);
  const [, setOpportunitiesOpen] = useState(false);

  const [homeSideBar, sethomeSidebar] = useState(false);
  // const [accountsOpen, setAccountsOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("MY RECENT QUOTES");
  const [activeButton1, setActiveButton1] = useState("REQUEST MY APPROVAL");
  const handleToggle = (setter, className) => {
    setter((prev) => !prev);
    setActiveButton(className);
  };
  const handleToggle1 = (setter, className) => {
    setter((prev) => !prev);
    setActiveButton1(className);
  };

  const [tableData, setTableData] = useState([]);

  const [tablesecondData, setTablesecondData] = useState([]);
  const [dbRecentData, setDbdRecentData] = useState([]);
  console.log("recentdata", dbRecentData);
  const { user } = useAuthContext();
  console.log(user);
  console.log("xyz", tableData);
  const acc_opp_ids = tableData.map((row) => {
    return {
      acc_id: row.ACCOUNT_ID,
      opp_id: row.OPPORTUNITY_ID,
      quote_id: row.QUOTE_ID,
      template: row.TEMPLATE_TYPE,
      quotes: row.QUOTE_NAME,
    };
  });
  console.log(acc_opp_ids);
  // ========================================================================================

  // Assuming this is part of your React component
  useEffect(() => {
    const getRecentQuotesData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/quoteGrid/getgridrecentdata`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.ok) {
          const recentquote = await response.json();
          console.log("recentquote", recentquote);

          // Assuming data.data is an array of recent quotes with associated accounts and opportunities
          const updatedinitialData = recentquote.data.map((item) => ({
            ACCOUNT_ID: item.ACCOUNT_ID || item.Account?._id,
            ACCOUNT: item.ACCOUNT || item.Account?.accounts.toUpperCase(),
            OPPORTUNITY_ID: item.OPPORTUNITY_ID || item.Opportunity?._id,
            OPPORTUNITY: item.OPPORTUNITY || item.Opportunity?.opportunity_name,
            QUOTE_ID: item._id || item.quote?._id,
            QUOTE_NAME: item.quotes_name || item.quote?.quotes_name,
            TEMPLATE_TYPE: item.template_type || item.quote?.template_type,

            // Add other quote properties as needed
          }));

          console.log("Updated Initial Data:", updatedinitialData);

          setDbdRecentData(updatedinitialData);
          setTableData(updatedinitialData);
          // Assuming setDbAccountData is used for recent quotes data
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getRecentQuotesData(); // Call the function once the component mounts
  }, [user]);
  // =========================================================

  useEffect(() => {
    const getRecentOpportunitiesData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/quoteGrid/getopportunityrecentdata`,
          {
            method: "Get",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(response);
        if (response.ok) {
          const recentopp = await response.json();
          console.log("recentopp", recentopp);
          const RecentOpportunitiesData = recentopp.data.map((item) => ({
            ACCOUNT_ID: item.ACCOUNT_ID || item.Account?._id,
            ACCOUNT: item.ACCOUNT || item.Account?.accounts.toUpperCase(),
            OPPORTUNITY_ID: item._id || item.Opportunity?._id,
            OPPORTUNITY:
              item.opportunity_name || item.Opportunity?.opportunity_name,

            // Add other quote properties as needed
          }));

          console.log("Updated Initial Data:", RecentOpportunitiesData);

          setDbdRecentData(RecentOpportunitiesData);
          setTablesecondData(RecentOpportunitiesData);
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getRecentOpportunitiesData();
  }, [user]);

  const handleOpenHomeSideBar = () => {
    sethomeSidebar(!homeSideBar);
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="bread">
        <ul className="breadcrumbs">
          <li className="breadcrumbs--item">
            <Link to="./" className="breadcrumbs--link--active">
              Home
            </Link>
          </li>
        </ul>
        <hr className="hr" />
      </div>
      <div
        className="containerhome"
        style={{
          width: homeSideBar ? "80%" : "100%",
          borderRight: homeSideBar ? "3px solid #216c98" : "none",
        }}
      >
        <button
          id="openbtn"
          onClick={handleOpenHomeSideBar}
          style={{ marginRight: homeSideBar ? "20%" : "0%" }}
        >
          {homeSideBar ? <FaGreaterThan /> : <FaLessThan />}
        </button>

        <div className="main-contenthome">
          <div id="grid">
            <div className="home_grid1">
              <div className="btn">
                <button
                  className={`bt ${
                    activeButton === "MY RECENT QUOTES" ? "activeH" : ""
                  }`}
                  style={{ marginLeft: "30px" }}
                  onClick={() =>
                    handleToggle(setProjectOpen, "MY RECENT QUOTES")
                  }
                >
                  MY RECENT QUOTES
                </button>
                <button
                  className={`bt ${
                    activeButton === "ALL RECENT" ? "activeH" : ""
                  }`}
                  onClick={() => handleToggle(setProjectOpen, "ALL RECENT")}
                >
                  ALL RECENT
                </button>
              </div>
              <div className="textData">
                <table className="myHome">
                  <tbody id="myHome_Tbody">
                    {tableData.map((row, index) => (
                      <tr key={index}>
                        <td className="myHomeTd">
                          <Link
                            to={`/guidedselling/${row.QUOTE_ID}`}
                            state={{
                              accountIDs: row.ACCOUNT_ID,
                              opp_ids: row.OPPORTUNITY_ID,
                              Quote_id: row.QUOTE_ID,
                              template: row.TEMPLATE_TYPE,
                              quotes: row.QUOTE_NAME,
                            }}
                            className="hover-link"
                          >
                            {row.QUOTE_NAME}
                          </Link>{" "}
                          <br />{" "}
                          <span style={{ color: "#216c98", fontWeight: "600" }}>
                            {row.ACCOUNT} {row.OPPORTUNITY}
                          </span>
                        </td>
                        {/* Add more columns based on your data structure */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="home_grid2">
              <div className="btn">
                <button className="btn2">ALERTS</button>
              </div>
              <div className="textData">
                <textarea
                  name="recent"
                  id="box-2"
                  cols={30}
                  rows={15}
                  defaultValue={""}
                  readOnly
                />
              </div>
            </div>
            <div className="home_grid3">
              <div className="btn">
                <button
                  className={`bts ${
                    activeButton1 === "REQUEST MY APPROVAL" ? "activ" : ""
                  }`}
                  style={{ marginLeft: "20px" }}
                  onClick={() =>
                    handleToggle1(setOpportunitiesOpen, "REQUEST MY APPROVAL")
                  }
                >
                  REQUEST MY APPROVAL
                </button>
                <button
                  className={`bts ${
                    activeButton1 === "MY SUBMISSIONS" ? "activ" : ""
                  }`}
                  onClick={() =>
                    handleToggle1(setOpportunitiesOpen, "MY SUBMISSIONS")
                  }
                >
                  MY SUBMISSIONS
                </button>
              </div>
              <div className="textData">
                <textarea
                  name="recent"
                  id="box-3"
                  cols={30}
                  rows={15}
                  defaultValue={""}
                  readOnly
                />
              </div>
            </div>
            <div className="home_grid4">
              <div className="btn">
                <button className="btn2">MY RECENT OPPORTUNITIES</button>
              </div>
              <div className="textData">
                <table className="myHomeopp">
                  <tbody id="myHomeopp_Tbody">
                    {tablesecondData.map((row, index) => (
                      <tr key={index}>
                        <td className="myHomeoppTd">
                          <div>
                          
                            <Link
                              to={`/opportunitiesdata?oppID=${row.OPPORTUNITY_ID}`}
                              className="hover-link"
                            >
                              {row.OPPORTUNITY}
                            </Link>
                    
                            <br />
                            <span
                              style={{ color: "#216c98", fontWeight: "600" }}
                            >
                              {" "}
                              {row.ACCOUNT}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidepanel" style={{ width: homeSideBar ? "20%" : "0%" }}>
        <SidePanel />
      </div>
    </div>
  );
};

export default Home;
