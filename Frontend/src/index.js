import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import GC from "@grapecity/spread-sheets";
GC.Spread.Sheets.LicenseKey = 'www.devqa.dealdox.io,515561624192531#B1rVnGlEcrMEa9J5YrAnRoV4L9lVWBFGcyFHU52UTMZWYIp6d0x6RNxkNzIzQa3CO6gWQp3Sby2ybWNTdT54KpNmMzRVb5tSTxFWUaRmUiV5d6ZlYoBzT9kVYzpEb5IlSFdUOplmcyhFMx9kSzADdiVFcvkTMvREVzYVY5Fjdkt4TRBFd9YzUItmSF54dwxEc5tmMQZlavkkMy36K6kGZrZUdWl5RsJlNNtEZWtESJtUQvVDT4pmT4NmeysEbE9ES4BzYhNHZycjVEt4RzQ4anVFUrU4S4Y5U6M4aBFnN7FDdw34YahDSWZHUMJEO8MjRHp4T5glQDpmI0IyUiwiIwUUM8AjN4cjI0ICSiwCM9MTOzIzNzcTM0IicfJye&Qf35VficFVDplI0IyQiwiI6EjL6ByUKBCZhVmcwNlI0IiTis7W0ICZyBlIsICNygDM7ADI7IjMxMjMwIjI0ICdyNkIsIybp9CevRGbhVGZuEWc6VGZuc7d7JiOiMXbEJCLiMXZpd6bs3mboNWZUBCbhJ6bsdEINB5UiojIh94QiwiIxMTNykTM4IjNxYTN5ETNiojIklkIs4XXbpjInxmZiwSZzxWYmpjIyNHZisnOiwmbBJye0ICRiwiI34TUplkVOt4cLJHNxMXdyk4Z8k4RXVUbxsUNnZWSLtmW5p6KLBTdlJDRJRDbY9ma8czRwcXTq5mVlJnNqRmdTRFbU9UOvcHN8YmaQllQENDc7IERLdXSyRFcVFXUYCG8y';
window.GC = GC;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
