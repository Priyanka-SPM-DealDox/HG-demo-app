import React, { useState, useEffect } from "react";
import "../../assets/css/common/WriteFlex.css";
import { FaPlus, FaSearch } from "react-icons/fa";
import CustomDropdown from "./CustomDropdown";

const WriteFlex = ({
  showGrouping = false,
  resetFields,
  onItemSelect,
  data,
  dataType,
}) => {
  console.log(data);
  const dataSort = data && data.sort((a, b) => {
    if (a.accounts !== b.accounts) {
      return a.accounts.localeCompare(b.accounts);
    } else if (a.role_name !== b.role_name) {
      return a.role_name?.localeCompare(b.role_name);
    } else if (a.title !== b.title) {
      return a.title.localeCompare(b.title);
    } else if (a.content_name !== b.content_name) {
      return a.content_name.localeCompare(b.content_name);
    } else if (a.quote_name !== b.quote_name) {
      return a.quote_name.localeCompare(b.quote_name);
    } else if (a.doc_name !== b.doc_name) {
      return a.doc_name.localeCompare(b.doc_name);
    } else if (a.first_name !== b.first_name) {
      return a.first_name.localeCompare(b.first_name);
    } else if (a.class_name !== b.class_name) {
      return a.class_name.localeCompare(b.class_name);
    }
  });
  console.log(dataSort);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [visibleItems, setVisibleItems] = useState(11);
  const [showAllItems, setShowAllItems] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  console.log(selectedItemIndex);

  useEffect(() => {
    if (dataSort && dataSort.length > 0) {
      // Map items to include both item and its index
      const initialItems = dataSort.map((item, index) => ({
        value: getItemValue(item, dataType),
        index: index,
      }));

      // Sort items alphabetically
      initialItems.sort((a, b) => a.value.localeCompare(b.value));

      setItems(initialItems.map((item) => item.value));

      const storedIndexNumber = localStorage.getItem("indexNumber");
      const indexNumber = storedIndexNumber ? JSON.parse(storedIndexNumber) : 0;
      console.log(indexNumber);
      handleItemClick(indexNumber);
    }
  }, [data, dataType]);

  const getItemValue = (item, type) => {
    if (type === "content" && item.content_name) {
      return item.content_name;
    } else if (type === "account" && item.accounts) {
      return item.accounts;
    } else if (type === "rolesetup" && item.role_name) {
      return item.role_name;
    } else if (type === "people" && item.first_name) {
      return item.first_name + " " + item.last_name;
    } else if (type === "security" && item.role_name) {
      return item.role_name;
    } else if (type === "peopleWithAccess" && item.first_name) {
      return item.first_name + " " + item.last_name;
    } else if (type === "lookups" && item.class_name) {
      return item.class_name;
    } else if (type === "doctype" && item.doc_name) {
      return item.doc_name;
    } else if (type === "template" && item.quote_name) {
      return item.quote_name;
    } else if (type === "setups" && item.title) {
      return item.title;
    }
    return "";
  };

  const handleFilterChange = (event) => {
    const inputValue = event.target.value;
    setFilter(inputValue);

    const filteredItems = dataSort
      .map((item, index) => ({ value: getItemValue(item, dataType), index }))
      .filter((item) =>
        item.value.toUpperCase().includes(inputValue.toUpperCase())
      );

    // Sort filtered items alphabetically
    filteredItems.sort((a, b) => a.value.localeCompare(b.value));

    setItems(filteredItems.map((item) => item.value));
    setVisibleItems(filteredItems.length > 0 ? 8 : 0);
  };

  const handleShowMore = () => {
    setShowAllItems(true);
  };

  const handleShowLess = () => {
    setShowAllItems(false);
  };

  const itemsToDisplay = showAllItems ? items : items.slice(0, visibleItems);

  const handleItemClick = (index) => {
    if (onItemSelect && index >= 0 && index < dataSort.length) {
      console.log(data);
      const selectedItem = dataSort[index];
      onItemSelect(selectedItem, index);

      const originalIndex = data.findIndex(item => item === selectedItem);
      console.log(originalIndex);
      localStorage.setItem("indexNumber", JSON.stringify(originalIndex));
      setSelectedItemIndex(originalIndex);
    }
  };
  const Groupingoptions = ["NO GROUPING", "CATALOG CATEGORY", "CATALOG STATUS"];
  const [, setSelectedOptionGrouping] = useState(null);
  const handleOptionSelect = (selectedOption) => {
    setSelectedOptionGrouping(selectedOption);
  };

  const resetSelection = () => {
    setSelectedItemIndex(-1);
  };
  return (
    <div className="leftwrite">
      {showGrouping && (
        <div className="grouping">
          <CustomDropdown
            options={Groupingoptions}
            onSelect={handleOptionSelect}
            custuminput="writeflexgrouping"
            iconcon="writeflexicon"
            value={"NO GROUPING"}
          />
        </div>
      )}
      <div className="inboxwrite">
        <FaSearch style={{ color: "#216c98" }} />
        <input
          type="text"
          id="mySearchwrite"
          title="type in a category"
          onChange={handleFilterChange}
          value={filter}
        />
      </div>
      <div className="dividewrite">
        <ul id="myMenuwrite">
          {itemsToDisplay.map((item, index) => (
            <li
              key={index}
              className={`writeflexoptions ${selectedItemIndex === index ? "selected" : ""
                }`}
              onClick={() => handleItemClick(index)}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="viewButtons">
          {items.length > 11 &&
            (showAllItems ? (
              <button
                onClick={handleShowLess}
                id="WriteFlex_Less"
                className="WriteFlexViewLess"
              >
                VIEW LESS
              </button>
            ) : (
              <button
                onClick={handleShowMore}
                id="WriteFlex_More"
                className="WriteFlexViewMore"
              >
                VIEW MORE
              </button>
            ))}
        </div>
        <span
        className="plusiconwrite"
        onClick={() => {
          resetFields();
          resetSelection();
        }}
      >
        <FaPlus style={{ width: "100%", textAlign: "center", marginLeft: "65px" }} />
      </span>
      </div>
     
    </div>
  );
};

export default WriteFlex;