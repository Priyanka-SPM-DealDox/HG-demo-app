import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillHome, } from 'react-icons/ai';
import { FaBullhorn, FaEye, FaFileImport, FaGlobe,FaLock, FaStamp, FaUserCircle, } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
const AdminSidebar = ({ children }) => {
    const menuItem = [

        {
            path: "/home",
            name: <span style={{ marginLeft: "4px" }}>HOME</span>,
            icon: <AiFillHome style={{ marginLeft: '5px' }} />
        },
        {
            path:'/companyprofile',
            name: <span style={{ marginLeft: "-2px" }}>COMPANY</span>,
            icon: <FaGlobe  style={{ marginLeft: '-3px'}}/>

        },
        {
            path: "/companyprofile",
            name: <span style={{ marginLeft: "2px" }}>PROFILE</span>

        },
        {
            path: "/companyorgs",
            name: <span style={{ marginLeft: "5px" }}>ORGS</span>,

        },
        {
            path: "/people",
            name: <span style={{ marginLeft: "2px" }}>PEOPLE</span>,
            icon: <FaUserCircle style={{ marginLeft: '3px'}}/>
        },
        {
            path: "/access",
            name: <span style={{ marginLeft: "2px" }}>ACCESS</span>,
            icon: <FaStamp />
        },
        {
            path: "/config",
            name: <span style={{ marginLeft: "3px" }}>CONFIG</span>,
            icon: <FiSettings />
        },
        {
            path: "/lookups",
            name: <span style={{ marginLeft: "-2px" }}>LOOKUPS</span>,
            icon: <FaEye />
        },
        
        {
            path: "/security",
            name: <span style={{ marginLeft: "-2px" }}>SECURITY</span>,
            icon: <FaLock style={{ marginLeft: '-4px' }} />,
        },
        {
            path: "/alert",
            name: <span style={{ marginLeft: "2px" }}>ALERT</span>,
            icon: <FaBullhorn style={{ marginLeft: '5px' }} />,
        },
        {
            path: "/imports",
            name: <span style={{ marginLeft: "-2px" }}>IMPORTS</span>,
            icon: <FaFileImport style={{ marginLeft: '-4px' }} />,
        },
    ];

    return (

        <div className='container'>
            <div className='sidebarfix'>
                <div className="sidebar">
                    {
                        menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index} className="link" activeClassName="active">
                                <div className="link_text">
                                    <div className='icon'>{item.icon}</div>
                                    <div className='link_text'>{item.name}</div>
                                </div>
                            </NavLink>
                        ))
                    }
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
}

export default AdminSidebar;
