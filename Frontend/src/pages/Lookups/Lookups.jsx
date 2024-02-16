import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../../layouts/Navbar';
import AdminSidebar from '../../layouts/AdminSidebar';
import WriteFlex from '../../components/common/WriteFlex';
import '../../assets/css/lookups/Lookups.css'
import ErrorMessage from '../../components/common/ErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaEye, FaPlus } from "react-icons/fa";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import HeaderBar from '../../components/common/HeaderBar';
import HelpRequest from "../../components/common/HelpRequest";
import { Link, withRouter, useLocation } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import { baseUrl } from "../../config";
// import { AvForm, AvField } from "availity-reactstrap-validation"
import CustomDropdown from '../../components/common/CustomDropdown';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Lookups = () => {
    const { user } = useAuthContext();
    const [inputSections, setInputSections] = useState([]);
    const [checkedSections, setCheckedSections] = useState([]);
    const [isAddLookupVisible, setAddLookupVisible] = useState(false);
    const [lookupsData, setlookupsData] = useState([]);
    console.log(lookupsData);
    const [lookups_dataData, setlookups_dataData] = useState([]);
    console.log(lookups_dataData);
    var [lookups, set_lookups] = useState({});

    const [class_name, setClassName] = useState("");
    const [lookups_id, setLookups_id] = useState("");
    const [showSaveCancel, setShowSaveCancel] = useState(false);
    const [showCustomDropdown, setShowCustomDropdown] = useState(false);
    const [plusIconClicked, setPlusIconClicked] = useState(false);

    const Data = useLocation();

    const resetFields = () => {
        setDisplayAddLookup(false);
        setClassName("");
        setParentLookUp("");
        setParentLookups("")
        setLookups_id("");
        setPlusIconClicked(true);
        setShowSaveCancel(true);
        setShowCustomDropdown(true);
        setCondition('all');
        setInputSections([]);
        setlookups_dataData([]);
        if (document.querySelector('.inputSection')) {
            document.querySelector('.inputSection').parentElement.innerHTML = "";
        }
        console.log(document.querySelector('.inputSection'))
    };


    useEffect(() => {
        if(lookups_id){
        getLookupsData();
        }
    }, [lookups_id]);
    const handleItemSelect = async (selectedItem, selectedIndex) => {
        await getLookupsData(selectedItem._id, "all");
        console.log(selectedItem._id, "all");
        console.log("========++==========")
        console.log(lookups_dataData);
        console.log(selectedItem);
        console.log(selectedIndex);
        const selectedData = lookupsData[selectedIndex] || lookupsData[0];
        setClassName(selectedItem.class_name);
        setParentLookUp(selectedItem.parent_lookup);
        setLookups_id(selectedItem._id);
        setShowSaveCancel(false);
        setInputSections([]);
        setShowCustomDropdown(true);
        setCondition('all');
        setDisplayAddLookup(true);
    };

    if (Data) {
        if (Data) {
            // // console.log(Data.state)
            if (JSON.stringify(lookups) != JSON.stringify(Data.state)) {
                set_lookups(Data.state)
                setlookups_dataData([]);

                // getLookupsData()
            } else {
                // if(lookupsData[lookupsData.length-1] && (lookups==null || lookups == "")){
                //     set_lookups(lookupsData[lookupsData.length-1])
                // }
            }
        } else {
            if (lookupsData.length > 0) {
                set_lookups(lookupsData[0]);
                setlookups_dataData([]);
                //    getLookupsData();
            }
        }
    } else {
        if (lookupsData.length > 0) {
            set_lookups(lookupsData[0]);
            setlookups_dataData([]);

            //    getLookupsData();
        }
    }

    useEffect(() => {
        if (user != "" && user != null) {
            getLookups();
        }

    }, [user]);

    // lookups api function
    const getLookups = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/lookups/get`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },

            });
            if (response.ok) {
                const lookups = await response.json();
                if (lookups.status == "Success") {
                    setlookupsData(lookups.data);
                    setDisplayAddLookup(true); 
                }
            }
        } catch (error) {
            // console.log(error);
        }
    }

    // lookups data api function
    const getLookupsData = async (id, condition) => {
        try {
            const response = await fetch(`${baseUrl}/api/lookups_data/get`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ lookups_accesskey: id })
            });

            if (response.ok) {
                const lookups = await response.json();
                console.log("@$$");
                console.log(lookups.data);
                setParentDropDown2(lookups.data);
                if (lookups.status === "Success") {
                    const filteredData = lookups.data.filter((item) => {
                        if (condition === "all") {
                            return true;
                        } else if (condition === 'enabled' && item.disable === 1) {
                            return true;
                        } else if (condition === 'disable' && item.disable === 2) {
                            return true;
                        }
                        return false;
                    });
                    console.log(filteredData);
                    setlookups_dataData(filteredData);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };


    const addNewSection = () => {
        setInputSections(prevSections => [
            ...prevSections,
            {
                id: inputSections.length + 1,
            }
        ]);
        // Set isNewLookup to true for new sections
        setIsNewLookup(true);

        // Use parentLookups for a new section
        const parentLookupsInSection = parentLookupsArraySecond[inputSections.length - 1];

        // Update parentLookups with the selected options for the new section
        setParentLookups(parentLookupsInSection);
    };

    const deleteSection = (event, sectionId) => {
        // Remove the section with the given sectionId
        setInputSections((prevSections) =>
            prevSections.filter((section) => section.id !== sectionId)
        );
    };

    const [parentLookups, setParentLookups] = useState("");
    console.log(parentLookups);
    const [parentLookupsArray, setParentLookupsArray] = useState([]);
    console.log(parentLookupsArray);
    const [isNewLookup, setIsNewLookup] = useState(false);
    const [parentLookupsArraySecond, setParentLookupsArraySecond] = useState([]);
    console.log(parentLookupsArraySecond);


    // let lookups_name, code, value1, value2, lookups_accesskeys, disable, parentLookupsInSections;
    const toggleCheckmark = async (event, sectionId) => {

        var node = event.currentTarget.parentNode.parentNode;
        var lookups_name = node.querySelector('input[name="lookups_name"]').value;
        var code = node.querySelector('input[name="code"]').value;

        if (code.length < 3) {
            // alert("Code Length should be atleast 3 characters.")
            toast.info("Code Length should be atleast 3 characters.")
            return
        }
        var value1 = node.querySelector('input[name="value1"]').value;
        var regex = /^[0-9]+$/; // Regular expression to match only numeric characters
        if (!regex.test(value1)) {
            // alert("Value1 should only contain numbers.");
            toast.info("Value1 should only contain numbers.")
            return;
        }

        var value2 = node.querySelector('input[name="value2"]').value;
        var lookups_accesskeys = lookups_id;
        var disable = 1;
        if (node.querySelector('input[name="disable"]').checked == true) {
            disable = 2;
        }
        console.log(parentLookupsArraySecond);
        console.log(sectionId);
        const parentLookupsInSections = parentLookupsArraySecond[sectionId - 1];
        console.log(parentLookupsInSections);
        var lookups_data = {
            lookups_name: lookups_name,
            code: code,
            value1: value1,
            value2: value2,
            disable: disable,
            lookups_accesskey: lookups_accesskeys,
            parent_lookups_data: parentLookupsInSections
        }
        console.log(lookups_data)

        try {
            const response = await fetch(`${baseUrl}/api/lookups_data/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(lookups_data)
            });
            if (response.ok) {
                const lookups = await response.json();
                if (lookups.status == "Success") {
                    // alert(lookups.message)
                    toast.success("Lookup added successfully", {
                        icon: <span style={{ color: 'Green' }}><FaEye /></span>,
                        className: 'custom-toast_add',
                    });
                    const delay = 2000;
                    setTimeout(() => {
                        window.location.reload();
                    }, delay);
                } else {
                    alert(lookups.message)

                }
            } else {
                alert("Failed")

            }
        }
        catch (error) {
            alert(error)
        }
        setCheckedSections((prevCheckedSections) => {
            if (prevCheckedSections.includes(sectionId)) {
                return prevCheckedSections.filter((id) => id !== sectionId);
            } else {
                return [...prevCheckedSections, sectionId];
            }
        });
    };

    // const toggleCheckmark = (sectionId) => {
    //     setCheckedSections((prevCheckedSections) => {
    //         if (prevCheckedSections.includes(sectionId)) {
    //             return prevCheckedSections.filter((id) => id !== sectionId);
    //         } else {
    //             return [...prevCheckedSections, sectionId];
    //         }
    //     });
    // };
    const [displayAddLookup, setDisplayAddLookup] = useState(false);
    const toggleAddLookup = async () => {
        setAddLookupVisible((class_name) => !class_name);

        if (user) {
            // var class_name = document.querySelector('input[name=class_name]').value
            if (class_name) {
                try {
                    const response = await fetch(`${baseUrl}/api/lookups/add`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.token}`,
                        },
                        body: JSON.stringify({
                            class_name: class_name,
                            parent_lookup: parentLookUp,
                        })
                    });
                    if (response.ok) {
                        const lookups = await response.json();
                        if (lookups.status == "Success") {
                            console.log(lookups.data)
                            getLookups();
                            //   alert(lookups.message)
                            document.querySelector('input[name=class_name_id').value = lookups.data._id;
                            setLookups_id(lookups.data._id);
                            // let addLookup = document.getElementById("add_lookup");
                            // let savCan = document.getElementById("removeandadd")
                            // addLookup.style.display = "block";
                            // addLookup.style.marginTop = "50px";
                            // savCan.style.display = "none";
                            setDisplayAddLookup(true); 
                        } else {
                            console.log(1)
                            alert(lookups.message)
                        }
                    } else {
                        console.log(2)
                        alert("Failed to add")
                    }
                } catch (error) {
                    // console.log("+++=============+++")
                    console.log(error)

                    alert(error)
                }
            }
        }
    };

    const [condition, setCondition] = useState("all");
    const handleRadioChange = (condition) => {
        setCondition(condition);
        getLookupsData(lookups_id, condition);

    };
    const handleCheckboxChange = (event, index) => {
        const newValue = event.target.checked ? 2 : 1;
        const updatedLookupsData = [...lookups_dataData];
        updatedLookupsData[index].disable = newValue;
        setlookups_dataData(updatedLookupsData);
    };

    //Function for First Parent DropDown Start
    let lookUpNames = lookupsData.length > 0 ? lookupsData.map(lookups => lookups.class_name) : [];
    const parentLookupdropdown1 = [...lookUpNames]
    const [parentLookUp, setParentLookUp] = useState('');
    console.log(parentLookUp);
    const handelParentLookUp = (selectOptions) => {
        setParentLookUp(selectOptions);
    }


    //End of First Parent DropDown ********************************************************
    //Function for second Parent DropDown Start
    //UseState to get the data of a single LookUp from LookUp Table
    const [singleLookUpData, setSingleLookUpData] = useState([]);
    console.log(singleLookUpData);

    const handleParentLookupOptions = (selectedOptions, sectionIndex) => {
        setParentLookupsArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[sectionIndex] = selectedOptions;
            return newArray;
        });
    }

    const handleParentLookupOptionsSecond = (selectedOptions, sectionIndex) => {
        setParentLookupsArraySecond((prevArray) => {
            const newArray = [...prevArray];
            newArray[sectionIndex] = selectedOptions;
            return newArray;
        });
    }
    const [lookups_accesskey, setLookups_accesskey] = useState('');
    const [parentLookupKey, setParentLookupKey] = useState('');

    const getLookupNames = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/lookups/getClassName`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ class_name: parentLookUp }), // Corrected object syntax
            });
            if (response.ok) {
                const lookups = await response.json();
                console.log(lookups);
                if (lookups.status === "Success") {
                    const codes = lookups.lookups_data.map(item => item.code);
                    console.log(codes);
                    setSingleLookUpData(codes);
                }
                else {
                    console.log('Response not okay:', response.status, response.statusText);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };


    // used to call the function for get the data from the name
    useEffect(() => {
        getLookupNames();
    }, [parentLookUp])

    useEffect(() => {
        if (singleLookUpData && singleLookUpData.length > 0) {
            setParentLookupKey(singleLookUpData[0]?._id || "");
        }
    }, [singleLookUpData]);

    //useState for 2nd ParentLookUpdropDown  
    const [parentDropDown2, setParentDropDown2] = useState([]);

    const updateLookupName = () => {
        console.log(lookups_id);
        console.log(class_name);
        console.log(parentLookUp);
        if(!lookups_id || !class_name){
            return;
        }
        fetch(`${baseUrl}/api/lookups/updateLookupName`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                lookup_accesskey: lookups_id,
                class_name: class_name,
                parent_lookup: parentLookUp
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error Updating Lookup");
                }
            })
            .then((data) => {
                console.log("Lookup Updated Successfully", data);
                getLookups();
            })
            .catch((error) => {
                console.log("Error While Updating the Lookup", error);
            })
    };

    const handleClassNameChange = (value) => {
        setClassName(value);
    };

    const handleParentLookUpChange = (value) => {
        setParentLookUp(value);
    };

    useEffect(() => {
        if (class_name !== '' || parentLookUp !== '' || lookups_id !== '') {
            const delayDebounceFn = setTimeout(() => {
                updateLookupName();
            }, 1000); // Adjust the delay as needed

            return () => clearTimeout(delayDebounceFn);
        }
    }, [class_name, parentLookUp, lookups_id]);

    const [changedData, setChangedData] = useState([]);
    console.log(changedData);

    const updateLookupData = (event, sectionId, i) => {
        console.log("Updating lookup data for sectionId", sectionId, "and i", i);
        var node = document.querySelector(`.inputSection[data-section-id="${i}"]`);
        console.log(node);
        console.log(sectionId);
        var lookups_name = node.querySelector('input[name="lookups_name"]').value;
        console.log(lookups_name);
        var code = node.querySelector('input[name="code"]').value;
        console.log(code);
        // var parentlookup = node.querySelector('input[name="parentlookup"]').value;
        // console.log(parentlookup);

        if (code.length < 3) {
            // alert("Code Length should be atleast 3 characters.")
            toast.info("Code Length should be atleast 3 characters.")
            return
        }
        var value1 = node.querySelector('input[name="value1"]').value;
        var regex = /^[0-9]+$/; // Regular expression to match only numeric characters
        if (!regex.test(value1)) {
            // alert("Value1 should only contain numbers.");
            toast.info("Value1 should only contain numbers.")
            return;
        }

        var value2 = node.querySelector('input[name="value2"]').value;
        var lookups_accesskeys = lookups_id;
        var lookups_data_id = sectionId;
        console.log(lookups_data_id);
        var disable = 1;
        if (node.querySelector('input[name="disable"]').checked == true) {
            disable = 2;
        }
       
        console.log(parentLookupsArraySecond);
        console.log(sectionId);
        const parentLookupsInSections = parentLookupsArray[i];
        console.log(parentLookupsInSections);
        var lookups_data = {
            lookups_data_id: lookups_data_id,
            lookups_name: lookups_name,
            code: code,
            value1: value1,
            value2: value2,
            disable: disable,
            lookups_accesskey: lookups_accesskeys,
            // access_key_id: access_key_id,
            parent_lookups_data: parentLookupsInSections
        }
        console.log(lookups_data)
        fetch(`${baseUrl}/api/lookups_data/updatelookupdata`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`,
            },
            body: JSON.stringify(lookups_data),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error Updating Lookup");
                }
            })
            .then((data) => {
                console.log("Lookup data Updated Successfully", data);
            })
            .catch((error) => {
                console.log("Error While Updating The Lookup Data", error);
            })
    };

    const debounceTimer = useRef(null);

    const handleInputChange = (e, fieldName, lookupDataId, i) => {
        const value = e.target.value;
        console.log("Handling input change for", fieldName, "with value", value);

        setChangedData((prevChangedData) => ({
            ...prevChangedData,
            [fieldName]: value,
        }));

        // Add debouncing to avoid frequent API calls on rapid typing
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            console.log("About to update lookup data for sectionId", lookupDataId, "and i", i);
            updateLookupData(e, lookupDataId, i); // Pass the event here
        }, 5000); // Adjust the debounce time as needed
    };

    const handleCustomDropdownChange = (value, lookupDataId, i) => {
        console.log("CustomDropdown value changed:", value);

        setParentLookups(value);

        // Ensure that updateLookupData is called only if an option is selected
        if (value !== null && value !== undefined && value !== '') {
            console.log("Calling updateLookupData with value:", value);
            updateLookupData(value, lookupDataId, i);
        }
    };

    const areRequiredFieldsFilled = () => {
        return class_name;
      };


    //End of Second Parent DropDown ********************************************************


    return (
        <div>
            <Navbar />
            <AdminSidebar />
            <div className="bread">
                <ul className="breadcrumbs">
                    <li className="breadcrumbs--item">
                        <Link to='/home' className="breadcrumbs--link_mid">Home</Link>
                    </li>
                    <li className="breadcrumbs--item">
                        <Link to='/companyprofile' className="breadcrumbs--link_mid" >Admin</Link>
                    </li>
                    <li className="breadcrumbs--item">
                        <Link to="" className="breadcrumbs--link--active">Lookups</Link>
                    </li>
                </ul>
                <hr className="hr" />
            </div>
            <HelpRequest />
            {/* -------------------------- */}
            <div className="rowlookups">
                <WriteFlex
                    resetFields={resetFields}
                    showGrouping={false}
                    onItemSelect={handleItemSelect}
                    data={lookupsData}
                    dataType='lookups'
                />
                <div className="rightlookups">

                    <input type="hidden" name="class_name_id" id="class_name_id" value={lookups_id} />
                    {/* <AvForm> */}

                    <div id="LookupsShow">
                        {/* -------------creating lookups------------ */}
                        <div id="lookupsradio">
                            <input type="radio" id="all" name="a" value="all" checked={condition === "all"} onChange={() => handleRadioChange('all')} />&nbsp;
                            <label htmlFor="all">ALL</label>
                            <input type="radio" id="enabled" name="a" value="enabled" onChange={() => handleRadioChange('enabled')} />&nbsp;
                            <label htmlFor="enabled">ENABLED</label>
                            <input type="radio" id="disabled" name="a" value="disable" onChange={() => handleRadioChange('disable')} />&nbsp;
                            <label htmlFor="disabled">DISABLED</label>
                        </div>

                        <HeaderBar headerlabel={"LOOKUP"} />

                        {lookupsData.length > 0 || plusIconClicked ? (
                            <div>
                                <div id="lookup_name">
                                    <ErrorMessage
                                        showFlaxErrorMessageText={true}
                                        validationinputcustom={'classlookup_name'}
                                        label="CLASS NAME"
                                        errormsg="CLASS NAME IS A REQUIRED FIELD"
                                        onChange={handleClassNameChange}
                                        value={class_name}
                                    />
                                    {lookupsData.length > 0 && (
                                        <CustomDropdown options={parentLookupdropdown1} label={"PARENT LOOKUP"} name="parentlookup" custuminput={'dropdown_parentlookup'} onSelect={handelParentLookUp} value={parentLookUp} onChange={handleParentLookUpChange} />
                                    )}
                                </div>

                                <div id="removeandadd" style={{ display: showSaveCancel ? "block" : "none" }}>
                                    <button id="delete_data" type="reset" style={{ color: 'red' }}>CANCEL</button>
                                    <button id="save_data" type="submit" style={{ color: 'green', width: '60px' }} onClick={toggleAddLookup} disabled = {!areRequiredFieldsFilled()}>ADD</button>
                                </div>



                                {displayAddLookup && (
                                    <div id="add_lookup">
                                        <div className="lookupscontainer">
                                            <div id="contentL1">
                                                <label className='lookupscontainerlabel'>LOOKUPS</label>
                                            </div>
                                            <div id="contentL2">
                                                <label className='lookupscontainerlabel'>CODE</label>
                                            </div>
                                            <div id="contentL3">
                                                <label className='lookupscontainerlabel'>VALUE1</label>
                                            </div>
                                            <div id="contentL4">
                                                <label className='lookupscontainerlabel'>VALUE2</label>
                                            </div>
                                            <div id="contentL4">
                                                <label className='lookupscontainerlabel'>PARENT LOOKUP</label>
                                            </div>
                                            <div id="contentL4">
                                                <label className='lookupscontainerlabel'>DISABLE</label>
                                            </div>
                                        </div>

                                        <div>
                                            {lookups_dataData.map((lookups_data, i) => (
                                                <div key={i} className="inputSection" data-section-id={i}>
                                                    <input type="text" name="lookups_name" defaultValue={lookups_data.lookups_name} onChange={(e) => handleInputChange(e, 'lookups_name', lookups_data._id, i)} />
                                                    <input type="text" name="code" defaultValue={lookups_data.code} onChange={(e) => handleInputChange(e, 'code', lookups_data._id, i)} />
                                                    <input type="text" name="value1" defaultValue={lookups_data.value1} onChange={(e) => handleInputChange(e, 'value1', lookups_data._id, i)} />
                                                    <input type="text" name="value2" defaultValue={lookups_data.value2} onChange={(e) => handleInputChange(e, 'value2', lookups_data._id, i)} />
                                                    <CustomDropdown
                                                        options={singleLookUpData} name="parentlookup" custuminput={'parent_lookup_dropdown'}
                                                        onSelect={(selectedOptions) => handleParentLookupOptions(selectedOptions, i)} value={parentLookupsArray[i] || lookups_data.parent_lookups_data} onChange={(value) => handleCustomDropdownChange(value, lookups_data._id, i)} />
                                                    <input
                                                        type="checkbox"
                                                        name="disable"
                                                        value={lookups_data.disable === 2}
                                                        checked={lookups_data.disable === 2}
                                                        onChange={(e) => handleCheckboxChange(e, i)}

                                                    />

                                                    {/* <div>
                                                {(lookups_data.disable)}
                                            </div> */}
                                                    <div className='cancel_send'>
                                                        <FontAwesomeIcon
                                                            className='inputSection_cancel'
                                                            icon={faTimes}
                                                            onClick={(event) => deleteSection(event, i)}
                                                            style={{ color: 'red', cursor: 'pointer' }}
                                                        />

                                                        <i className={checkedSections.includes(i) ? 'fa fa-check-circle' : 'fa fa-circle'}
                                                            id="checkmark" onClick={(event) => toggleCheckmark(event, i)}></i>
                                                    </div>

                                                </div>

                                            ))}

                                            {inputSections.map((section, i) => (
                                                <div key={section.id} className="inputSection">
                                                    {/* Render input fields and other elements */}
                                                    <input type="text" name="lookups_name" />
                                                    <input type="text" name="code" />
                                                    <input type="text" name="value1" />
                                                    <input type="text" name="value2" />
                                                    <CustomDropdown options={singleLookUpData} name="parentlookup" custuminput={'parent_lookup_dropdown'}
                                                        onSelect={(selectedOptions) => handleParentLookupOptionsSecond(selectedOptions, i)} value={parentLookupsArraySecond[i]} onChange={(value) => setParentLookups(value)} />
                                                    <input type="checkbox" name="disable" value="1" />
                                                    <div className='cancel_send'>
                                                        <FontAwesomeIcon
                                                            className='inputSection_cancel'
                                                            icon={faTimes}
                                                            onClick={(event) => deleteSection(event, section.id)}
                                                            style={{ color: 'red', cursor: 'pointer' }}
                                                        />

                                                        <i className={checkedSections.includes(section.id) ? 'fa fa-check-circle' : 'fa fa-circle'} id="checkmark" onClick={(event) => toggleCheckmark(event, section.id)}></i>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                        <button id="toggleButton" onClick={addNewSection}><FaPlus /></button>

                                    </div>

                                )}
                            </div>
                        ) : (
                            <div id="accessmsgdiv">
                                <label id="accessmsg">
                                    NO LOOKUPS FOUND. PLEASE USE + TO ADD A NEW LOOKUP
                                </label>
                            </div>
                        )}
                    </div>
                    {/* </AvForm> */}

                </div>

            </div>
        </div>
    )
};

export default Lookups;