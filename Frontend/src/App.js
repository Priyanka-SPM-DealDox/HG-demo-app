import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { useEffect } from "react";
import Login from "./loginSetups/Login";
import Register from "./loginSetups/Register";
import Home from "./pages/Home/Home";
import Account from "./pages/Accounts/Accounts";
import Access from "./pages/Access/Access";
import Opportunities from "./pages/Opportunity/Opportunities";
import OpportunitiesData from "./pages/Opportunity/OpportunitiesData";
import Quotes from "./pages/Quotes/Quotes";
import Demand from "./pages/Demand/Demand";
import Forecast from "./pages/Forecast/Forecast";
import Rolessetup from "./pages/Roles/Rolessetup";
import CompanyProfile from "./pages/Company/CompanyProfile";
import CompanyOrgs from "./pages/Company/CompanyOrgs";
import Content from "./pages/Content/Content";
import Doctype from "./pages/Doctypes/Doctype";
import Template from "./pages/Template/Template";
import Surveysetup from "./pages/Survey/SurveySetup";
import People from "./pages/People/People";
import Config from "./pages/Config/Config";
import Auth from "./loginSetups/Auth";
import Logout from "./loginSetups/Logout";
import Asset from "./pages/Assets/Asset";
import QuoteCreation from "./pages/QuoteCreation/QuoteCreation";
import GuidedSelling from "./pages/GuidedSelling/GuidedSelling";
import Alert from "./pages/Alert/Alert";
import Myprofile from "./components/myprofile/Myprofile";
import Items from "./pages/Items/Items";
import WhereUsed from "./pages/Survey/WhereUsed";
import Security from "./pages/Security/Security";
import Lookups from "./pages/Lookups/Lookups";
import RegSuccess from "./loginSetups/RegSuccess";
import SetPassword from './pages/SetPassword/SetPassword';
import ForgotPassword from "./loginSetups/ForgotPassword";
import LogAccount from "./loginSetups/LogAccount";
import ResetPassword from "./loginSetups/ResetPassword";
import { ToastContainer } from "react-toastify";

function App() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";


  const location = useLocation();
  console.log(location);

  useEffect(() => {

    const currentPath = location.pathname;

    // Get the stored path
    const storedPath = localStorage.getItem('currentPath');

    // If the stored path is different from the current path, remove the indexNumber
    if (storedPath !== currentPath) {
      localStorage.removeItem('indexNumber');
    }

    // Store the current path for future comparisons
    localStorage.setItem('currentPath', currentPath);

  }, [location.pathname]);


  return (
    // <BrowserRouter>
      <>
        <ToastContainer />
        <Routes>
          <Route path="/auth" element={user ? <Auth /> : <Login />} />
          <Route
            path="/logout"
            element={user ? <Logout /> : <Navigate to="/" />}
          />
          <Route
            path="/auth"
            element={user ? <Navigate to="/home" /> : <Auth />}
          />
          <Route path="/" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/logaccount" element={<LogAccount />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
          <Route
            path="/account"
            element={user ? <Account /> : <Navigate to="/" />}
          />
          <Route path="/accounts/:accountIds" element={user ? <Account /> : <Navigate to="/" />} />
          <Route path="/access" element={<Access />} />
          <Route path="/access" element={<Access />} />
          <Route path="/myprofile" element={<Myprofile />} />
          <Route
            path="/opportunities"
            element={user ? <Opportunities /> : <Navigate to="/" />}
          />
          <Route
            path="/opportunitiesdata"
            element={user ? <OpportunitiesData /> : <Navigate to="/" />}
          />
          <Route path="/opportunitiesdata/:oppId" element={user ? <OpportunitiesData /> : <Navigate to="/" />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="quotecreation" element={<QuoteCreation />} />
          <Route path="/guidedselling" element={<GuidedSelling />} />
          <Route path="/guidedselling/:quoteId" element={user ? <GuidedSelling /> : <Navigate to="/" />} />
          <Route path="/demand" element={<Demand />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route
            path="/rolessetup"
            element={user ? <Rolessetup /> : <Navigate to="/" />}
          />
          <Route
            path="/companyprofile"
            element={user ? <CompanyProfile /> : <Navigate to="/" />}
          />
          <Route path="/companyorgs" element={<CompanyOrgs />} />
          <Route path="/alert" element={<Alert />} />
          <Route
            path="/content"
            element={user ? <Content /> : <Navigate to="/" />}
          />
          <Route path="/doctypes" element={<Doctype />} />
          <Route path="/templates" element={<Template />} />
          <Route path="/setup" element={<Surveysetup />} />
          <Route path="/whereused" element={<WhereUsed />} />
          <Route
            path="/people"
            element={user ? <People /> : <Navigate to="/" />}
          />
          <Route path="/config" element={<Config />} />
          <Route path="/lookups" element={<Lookups />} />
          <Route path="/security" element={<Security />} />
          <Route path="/items" element={<Items />} />
          <Route path="/regsuccess" element={<RegSuccess />} />
          <Route path='/setPassword' element={<SetPassword />} />
        </Routes>
      </>
    // </BrowserRouter>
  );
}
export default App;
