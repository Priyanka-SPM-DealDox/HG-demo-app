import React, { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFilter,
  faArrowUp,
  faArrowDown,
  faAlignJustify,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/pcrGrid/PcrGrid.css";
import { baseUrl } from "../../config";
import PcrGridDownload from "../../components/quoteGrid/PcrGridDownload";
import { Link, useLocation, useNavigate } from "react-router-dom";

const QuoteGrid = () => {
  const { user } = useAuthContext();
  console.log(user);

  const tableRef = useRef(null);
  const MIN_COLUMN_WIDTH = 250;
  let draggedColumnIndex = null;

  useEffect(() => {
    const headerCells = tableRef.current.querySelectorAll("th");

    headerCells.forEach((cell) => {
      const resizeHandle = document.createElement("div");
      resizeHandle.classList.add("resize-handle");
      cell.appendChild(resizeHandle);
      resizeHandle.addEventListener("mousedown", handleMouseDown);

      function handleMouseDown(event) {
        event.stopPropagation();

        const columnIndex = Array.from(cell.parentNode.children).indexOf(cell);
        const columnElements = tableRef.current.querySelectorAll(
          `tbody > tr > *:nth-child(${columnIndex + 1})`
        );

        const startingWidth = cell.offsetWidth;
        const startX = event.clientX;

        function handleMouseMove(event) {
          const deltaX = event.clientX - startX;
          const newWidth = startingWidth + deltaX;

          // Apply a minimum width of 200px to the header cell
          if (newWidth >= 250) {
            cell.style.width = `${newWidth}px`;

            const tableWidth = tableRef.current.offsetWidth;
            const remainingWidth = tableWidth - newWidth;

            columnElements.forEach((element) => {
              element.style.maxWidth = `${remainingWidth}px`;
              element.style.overflow = "auto";
            });
          }
        }

        function handleMouseUp() {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }

      // adding eventhandler over each of  header (cell here)
      // clicking over the header and dragging it makes it draggable
      cell.addEventListener("mousedown", handleMouseDownColumn);

      function handleMouseDownColumn(event) {
        event.preventDefault();
        const eventPos = event.clientX;
        const columnIndex =
          Array.from(headerCells).filter(
            (e) => e.getBoundingClientRect().left < eventPos
          ).length - 1;
        draggedColumnIndex = columnIndex;
        setDraggedColumnX(event.clientX); // Set the initial X-coordinate of the dragged column
        document.addEventListener("mousemove", handleMouseMoveColumn);
        document.addEventListener("mouseup", handleMouseUpColumn);
      }

      function handleMouseMoveColumn(event) {
        const eventPos = event.clientX;
        const columnIndex =
          Array.from(headerCells).filter(
            (e) => e.getBoundingClientRect().left < eventPos
          ).length - 1;
        if (columnIndex !== draggedColumnIndex) {
          setDraggedColumnX(event.clientX); // Update the X-coordinate of the dragged column
          shiftColumns(draggedColumnIndex, columnIndex);
          draggedColumnIndex = columnIndex;
        }
      }

      function handleMouseUpColumn() {
        document.removeEventListener("mousemove", handleMouseMoveColumn);
        document.removeEventListener("mouseup", handleMouseUpColumn);
        draggedColumnIndex = null;
      }

      const shiftColumns = (startIndex, endIndex) => {
        if (startIndex === endIndex) {
          return;
        }

        const tableRows = tableRef.current.querySelectorAll("tr");

        tableRows.forEach((row) => {
          const columns = Array.from(row.children);
          const draggedColumn = columns[startIndex];
          const placeholderColumn = document.createElement("td");
          placeholderColumn.style.visibility = "hidden";

          if (startIndex < endIndex) {
            row.insertBefore(placeholderColumn, columns[endIndex + 1]);
            row.insertBefore(draggedColumn, placeholderColumn);
          } else {
            row.insertBefore(placeholderColumn, columns[endIndex]);
            row.insertBefore(draggedColumn, placeholderColumn);
          }

          setTimeout(() => {
            row.removeChild(placeholderColumn);
          }, 0);
        });
      };
    });
  }, []);
  //=====================================

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPinColumnOptionsVisible, setIsPinColumnOptionsVisible] =
    useState(false);
  const [popupColumnIndex, setPopupColumnIndex] = useState(null);
  const [draggedColumnX, setDraggedColumnX] = useState(null);

  const handleIconClick = (columnIndex) => {
    setSelectedOption1("");
    setFilterSearchValue("");
    setFilterSearchAndOrValue("");
    setSelectedOption2("");
    if (popupColumnIndex === columnIndex) {
      setIsPopupOpen(!isPopupOpen);
      setItembarsDiv(true);
      setIsColumnBarsVisible(true);
      setIsFilterContentVisible(false);
      setColumnsHeaderVisiblee(false);
      setNumericalFilterContentVisible(false);
      setIsTemplateFilterContentVisible(false);
      setFiltericonDiv(false);
      SetVerticaliconDiv(false);
    } else {
      setIsPopupOpen(true);
      setItembarsDiv(true);
      setItemBarsStyle({
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderBottom: "0px solid #ccc",
      });
      setItemBarsIconStyle({
        color: "#216c98",
        borderBottom: "3px solid #216c98",
      });
      setFilterStyle({
        backgroundColor: "#f5f5f5",
        border: "none",
        borderBottom: "1px solid #ccc",
      });
      setFilterIconStyle({ color: "grey", borderBottom: "none" });

      setVerticalStyle({
        backgroundColor: "#f5f5f5",
        border: "none",
        borderBottom: "1px solid #ccc",
      });
      setVerticalIconStyle({ color: "grey", borderBottom: "none" });

      setBarsPopUpOverFlowX("hidden");
      setBarsPopUpOverFlow("hidden");

      setIsColumnBarsVisible(true);

      setIsFilterContentVisible(false);
      setColumnsHeaderVisiblee(false);
      setNumericalFilterContentVisible(false);
      setIsTemplateFilterContentVisible(false);
    }

    setPopupColumnIndex(columnIndex);
    setIsPinColumnOptionsVisible(true);
  };

  const eSortOrder = {
    ASCENDING: "ascending",
    DESCENDING: "descending",
    NONE: "none", // Use 'none' to represent the initial unsorted state
    MIXED: "mixed", // Use 'mixed' to represent columns with mixed data types
  };

  const dateComparator = (a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA - dateB;
  };
  const numberComparator = (num1, num2) => {
    return num1 - num2;
  };
  const [columns, setColumns] = useState([
    {
      field: "ACCOUNT",
      pinned: null,
      width: 100,
      icon: faBars,
      originalIndex: 0,
      showFilter: true,
    },
    {
      field: "ACCOUNT_OWNER",
      pinned: null,
      icon: faBars,
      originalIndex: 1,
      showFilter: true,
    },
    {
      field: "OPPORTUNITY",
      pinned: null,
      icon: faBars,
      originalIndex: 2,
      showFilter: true,
    },
    {
      field: "OPPORTUNITY_START_DATE",
      pinned: null,
      icon: faBars,
      originalIndex: 3,
      showNumericalFilter: true,
    },
    {
      field: "OPPORTUNITY_END_DATE",
      pinned: null,
      icon: faBars,
      originalIndex: 4,
      showNumericalFilter: true,
    },
    {
      field: "STAGE",
      pinned: null,
      icon: faBars,
      originalIndex: 5,
      showFilter: true,
    },
    {
      field: "QUOTE_NAME",
      pinned: null,
      icon: faBars,
      originalIndex: 6,
      showNumericalFilter: true,
    },
    {
      field: "NetPrice",
      pinned: null,
      icon: faBars,
      originalIndex: 7,
      showNumericalFilter: true,
    },
    {
      field: "ListPrice",
      pinned: null,
      icon: faBars,
      originalIndex: 8,
      showNumericalFilter: true,
    },
    {
      field: "Cost",
      pinned: null,
      icon: faBars,
      originalIndex: 9,
      showNumericalFilter: true,
    },
    {
      field: "Margin",
      pinned: null,
      icon: faBars,
      originalIndex: 9,
      showNumericalFilter: true,
    },
    {
      field: "Expenses",
      pinned: null,
      icon: faBars,
      originalIndex: 9,
      showNumericalFilter: true,
    },
  ]);

  // Function to autosize all columns to the minimum width
  const handleAutosizeAllColumns = () => {
    const headerCells = tableRef.current.querySelectorAll("th");

    headerCells.forEach((cell) => {
      // Set the width of each header cell to the minimum width
      cell.style.width = `${MIN_COLUMN_WIDTH}px`;
    });

    const bodyCells = tableRef.current.querySelectorAll("td");
    bodyCells.forEach((cell) => {
      // Set the max-width of each body cell to the minimum width
      cell.style.maxWidth = `${MIN_COLUMN_WIDTH}px`;
      // Add overflow: auto to allow scrolling for larger content
      cell.style.overflow = "auto";
    });
    setIsPopupOpen(false);
  };
  const handleAutosizeColumn = (index) => {
    const updatedColumns = [...columns];
    const column = updatedColumns[index];
    const headerCell = tableRef.current.querySelector(
      `th:nth-child(${index + 1})`
    );
    const bodyCells = tableRef.current.querySelectorAll(
      `td:nth-child(${index + 1})`
    );

    // Reset the width to the minimum value
    column.width = MIN_COLUMN_WIDTH;

    // Set the width of the header cell
    headerCell.style.width = `${MIN_COLUMN_WIDTH}px`;

    // Set the max-width of the body cells and add overflow: auto to allow scrolling for larger content
    bodyCells.forEach((cell) => {
      cell.style.maxWidth = `${MIN_COLUMN_WIDTH}px`;
      cell.style.overflow = "auto";
    });

    setColumns(updatedColumns);
    setIsPopupOpen(false);
  };
  // reset columns
  const [showPinOptions, setShowPinOptions] = useState(false);
  let updatedColumns = [...columns];
  useEffect(() => {
    let pinnedElements = tableRef.current.querySelectorAll("th");

    // Add the event listener to each <th> element with className "pinned-null"
    pinnedElements.forEach((thElement) => {
      thElement.addEventListener("mousedown", handleMouseDownColumn);
    });
    // }

    let initialX;
    var startData;
    var endData;
    var endIndex;
    var startIndex;

    function handleMouseDownColumn(event) {
      event.preventDefault();
      var targetNew = event.target.closest("th");
      console.log(targetNew);
      if (targetNew) {
        draggedColumnIndex = updatedColumns.findIndex(
          (item) => item.field === targetNew.textContent
        );
        startIndex = draggedColumnIndex;
        startData = updatedColumns[draggedColumnIndex];
        setDraggedColumnX(event.clientX);
        console.log("called");
        document.addEventListener("mousemove", handleMouseMoveColumn);
        document.addEventListener("mouseup", handleMouseUpColumn);
      }
    }

    const handleMouseMoveColumn = (event) => {
      const columnData = event.target.closest("th");
      //console.log(columnData);
      if (columnData) {
        let eventPos = event.clientX;
        endData = updatedColumns.find(
          (item) => item.field === columnData.textContent
        );
        endIndex = updatedColumns.findIndex(
          (item) => item.field === endData.field
        );
        //let startData = updatedColumns[draggedColumnIndex];
        console.log(startIndex, endIndex, startData, endData);
        if (startData.field !== endData.field && startIndex !== endIndex) {
          // if (draggedColumnIndex !== endIndex) {
          shiftColumn(startData, endData);
        }
      }
    };

    console.log(columns);

    function handleMouseUpColumn() {
      document.removeEventListener("mousemove", handleMouseMoveColumn);
      document.removeEventListener("mouseup", handleMouseUpColumn);
      draggedColumnIndex = null;
    }

    const shiftColumn = (startData, endData) => {
      //console.log(updatedColumns, columns);
      startIndex = updatedColumns.findIndex(
        (item) => item.field === startData.field
      );
      const endIndex = updatedColumns.findIndex(
        (item) => item.field === endData.field
      );
      console.log(startIndex, endIndex);

      if (endData.pinned !== startData.pinned) {
        startData.pinned = endData.pinned;
      }

      const updateCol = [...updatedColumns];
      if (endIndex > startIndex) {
        const columnToShift = updateCol.splice(startIndex, 1);
        updateCol.splice(endIndex, 0, startData);
        startData = endData;
      } else if (endIndex < startIndex) {
        const columnToShift = updateCol.splice(endIndex, 1);
        updateCol.splice(startIndex, 0, endData);
        startData = endData;
      } else if (startIndex === endIndex) {
        return;
      }
      updatedColumns = [...updateCol];
      //console.log(updateCol, updatedColumns);
      console.log(startData, endData);
      setColumns(updatedColumns);
    };
  });

  // Add two new state variables for managing visibility of columnbars and filtercontent
  const [isColumnBarsVisible, setIsColumnBarsVisible] = useState(true);

  const [isColumnsHeaderVisiblee, setColumnsHeaderVisiblee] = useState(false);

  const [itembarsDiv, setItembarsDiv] = useState(true);
  const [filtericonDiv, setFiltericonDiv] = useState(true);
  const [verticaliconDiv, SetVerticaliconDiv] = useState(true);

  const [itemBarsStyle, setItemBarsStyle] = useState({
    backgroundColor: "white",
    // border: "1px solid #ccc",
    // borderBottom: "none",
  });

  const [itemBarsIconStyle, setItemBarsIconStyle] = useState({
    // color: "#216c98",
    // borderBottom: "3px solid #216c98",
  });

  const [filterStyle, setFilterStyle] = useState({
    backgroundColor: "f5f5f5",
    border: "none",
    borderBottom: "1px solid #ccc",
  });
  const [filterIconStyle, setFilterIconStyle] = useState({
    color: "grey",
    borderBottom: "none",
  });

  const [verticalStyle, setVerticalStyle] = useState({
    backgroundColor: "f5f5f5",
    border: "none",
    borderBottom: "1px solid #ccc",
  });
  const [verticalIconStyle, setVerticalIconStyle] = useState({
    color: "grey",
    borderBottom: "none",
  });

  const [barsPopUpOverFlow, setBarsPopUpOverFlow] = useState("scroll");
  const [barsPopUpOverFlowX, setBarsPopUpOverFlowX] = useState("hidden");
  //   const [barsPopUpHeight, setBarsPopUpHeight] = useState("auto");

  const [isFilterContentVisible, setIsFilterContentVisible] = useState(false);
  // Function to toggle the visibility of columnbars and filtercontent
  const toggleColumnBars = () => {
    setIsColumnBarsVisible(!isColumnBarsVisible);
    setIsColumnBarsVisible(true);
    setIsFilterContentVisible(false);
    setColumnsHeaderVisiblee(false);
    setNumericalFilterContentVisible(false);
    setIsTemplateFilterContentVisible(false);
    setIsPopupOpen(!isColumnBarsVisible);
    // setBarsPopUpHeight("auto");
    setItemBarsStyle({
      backgroundColor: "white",
      border: "1px solid #ccc",
      borderBottom: "none",
    });
    setItemBarsIconStyle({
      color: "#216c98",
      borderBottom: "3px solid #216c98",
    });

    setFilterStyle({
      backgroundColor: "#f5f5f5",
      border: "none",
      borderBottom: "1px solid #ccc",
    });
    setFilterIconStyle({ color: "grey", borderBottom: "none" });

    setVerticalStyle({
      backgroundColor: "#f5f5f5",
      border: "none",
      borderBottom: "1px solid #ccc",
    });
    setVerticalIconStyle({ color: "grey", borderBottom: "none" });

    setBarsPopUpOverFlowX("hidden");
    setBarsPopUpOverFlow("hidden");
  };

  const toggleFilterContent = () => {
    setIsFilterContentVisible(!isFilterContentVisible);
    setIsColumnBarsVisible(false);
    setColumnsHeaderVisiblee(false);
    setIsFilterContentVisible(true);
    setNumericalFilterContentVisible(true);
    setIsTemplateFilterContentVisible(true);

    setItemBarsStyle({
      backgroundColor: "#f5f5f5",
      border: "none",
      borderBottom: "1px solid #ccc",
    });
    setItemBarsIconStyle({
      color: "grey",
      borderBottom: "none",
    });

    setVerticalStyle({
      backgroundColor: "#f5f5f5",
      border: "none",
      borderBottom: "1px solid #ccc",
    });
    setVerticalIconStyle({ color: "grey", borderBottom: "none" });

    setFilterStyle({
      backgroundColor: "white",
      border: "1px solid #ccc",
      borderBottom: "0px solid #ccc",
    });
    setFilterIconStyle({ color: "#216c98", borderBottom: "3px solid #216c98" });

    setBarsPopUpOverFlowX("hidden");
    setBarsPopUpOverFlow("hidden");
    // Use the columnIndex to update the filter options for that column
  };
  const verticalColumnbars = () => {
    setColumnsHeaderVisiblee(!isColumnsHeaderVisiblee);
    setColumnsHeaderVisiblee(true);
    setIsPopupOpen(!isColumnsHeaderVisiblee);
    setIsFilterContentVisible(false);
    setIsColumnBarsVisible(false);
    setNumericalFilterContentVisible(false);
    setIsTemplateFilterContentVisible(false);

    setItemBarsStyle({
      backgroundColor: "#f5f5f5",
      border: "none",
      borderBottom: "1px solid #ccc",
    });
    setItemBarsIconStyle({
      color: "grey",
      borderBottom: "none",
    });
    setFilterStyle({
      backgroundColor: "#f5f5f5",
      border: "none",
      borderBottom: "1px solid #ccc",
    });
    setFilterIconStyle({ color: "grey", borderBottom: "none" });

    setVerticalStyle({
      backgroundColor: "white",
      border: "1px solid #ccc",
      borderBottom: "0px solid #ccc",
    });
    setVerticalIconStyle({
      color: "#216c98",
      borderBottom: "3px solid #216c98",
    });

    setBarsPopUpOverFlow("scroll");
    setBarsPopUpOverFlowX("hidden");
  };
  // backend start
  const navigate = useNavigate();

  const [dbAccountData, setDbAccountData] = useState([]);
  console.log("accountsName", dbAccountData);
  const [initialData, setInitialData] = useState([]);

  console.log(initialData);
  const handleColumnSort = (field) => {
    setData((prevData) => {
      const sortedData = [...prevData];

      // Determine the new sort order based on the current status
      const currentSortOrder = columns.find(
        (col) => col.field === field
      ).sortOrder;
      let newSortOrder;
      if (currentSortOrder === eSortOrder.ASCENDING) {
        newSortOrder = eSortOrder.DESCENDING;
      } else if (currentSortOrder === eSortOrder.DESCENDING) {
        newSortOrder = eSortOrder.NONE;
        return initialData;
      } else {
        newSortOrder = eSortOrder.ASCENDING;
      }

      // Sort the data based on the selected column and sort order
      sortedData.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        // Handle the date column separately using the dateComparator
        if (field === "Date") {
          return newSortOrder === eSortOrder.DESCENDING
            ? dateComparator(bValue, aValue)
            : dateComparator(aValue, bValue);
        }
        // Handle numeric columns using numberComparator
        if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
          return newSortOrder === eSortOrder.DESCENDING
            ? numberComparator(parseFloat(bValue), parseFloat(aValue))
            : numberComparator(parseFloat(aValue), parseFloat(bValue));
        }

        // For other columns, handle non-string values by converting them to strings
        const stringA = String(aValue);
        const stringB = String(bValue);

        if (newSortOrder === eSortOrder.DESCENDING) {
          return stringB.localeCompare(stringA);
        } else {
          return stringA.localeCompare(stringB);
        }
      });

      return sortedData;
    });

    setColumns((prevColumns) => {
      // Update the sort order for the selected column
      const updatedColumns = prevColumns.map((col) => {
        if (col.field === field) {
          return {
            ...col,
            sortOrder:
              col.sortOrder === eSortOrder.ASCENDING
                ? eSortOrder.DESCENDING
                : col.sortOrder === eSortOrder.DESCENDING
                ? eSortOrder.NONE
                : eSortOrder.ASCENDING,
          };
        }
        return {
          ...col,
          sortOrder:
            col.sortOrder === eSortOrder.MIXED
              ? eSortOrder.NONE
              : eSortOrder.MIXED,
        };
      });

      return updatedColumns;
    });
  };

  // State variables for managing filter options and search value

  const [data, setData] = useState(initialData);

  const [checkboxSearchValue, setCheckboxSearchValue] = useState("");

  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleCheckBoxSearch = (event) => {
    const value = event.target.value;
    setCheckboxSearchValue(value);
  };

  const [columnVisibility, setColumnVisibility] = useState({});

  const toggleCheckbox = (field) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  };

  const barsRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (barsRef.current && !barsRef.current.contains(e.target)) {
        setIsPopupOpen(false);
        setIsColumnBarsVisible(false);
        setIsFilterContentVisible(false);
        setColumnsHeaderVisiblee(false);
        setNumericalFilterContentVisible(false);
        setIsTemplateFilterContentVisible(false);
        setNumericalFilterContentVisible(false);
        setItemBarsStyle({
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderBottom: "0px solid #ccc",
        });
        setItemBarsIconStyle({
          color: "#216c98",
          borderBottom: "3px solid #216c98",
        });
        setFilterStyle({
          backgroundColor: "#f5f5f5",
          border: "none",
          borderBottom: "1px solid #ccc",
        });
        setFilterIconStyle({ color: "grey", borderBottom: "none" });

        setVerticalStyle({
          backgroundColor: "#f5f5f5",
          border: "none",
          borderBottom: "1px solid #ccc",
        });
        setVerticalIconStyle({ color: "grey", borderBottom: "none" });

        setBarsPopUpOverFlowX("hidden");
        setBarsPopUpOverFlow("hidden");
      }
    };
    if (isPopupOpen) {
      window.addEventListener("mousedown", handler);
    }
    return () => {
      window.removeEventListener("mousedown", handler);
    };
  }, [isPopupOpen]);
  // Helper function to check if a cell value matches a filter condition
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    const getQuoteGridData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/quoteGrid/getgriddata`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log(response);
        if (response.ok) {
          const quotegridd = await response.json();
          console.log(quotegridd);
          console.log(quotegridd.data);

          // Create and display Quantity objects based on the length of account.data
          const updatedinitialData = quotegridd.data.flatMap(
            (QuoteGridData) => {
              console.log("QuoteGridData:", QuoteGridData);

              if (QuoteGridData.Opportunities.length > 0) {
                return QuoteGridData.Opportunities.flatMap((opportunity) => {
                  console.log("Opportunity:", opportunity);
                  console.log("Quotes Array:", opportunity.Quotes);
                  if (opportunity.Quotes && opportunity.Quotes.length > 0) {
                    return opportunity.Quotes.map((quote) => {
                      console.log("Quote:", quote);
                      // Rest of the code...

                      return {
                        ACCOUNT_ID: QuoteGridData._id,
                        ACCOUNT: QuoteGridData.accounts,
                        ACCOUNT_OWNER: QuoteGridData.owner,
                        OPPORTUNITY_ID: opportunity._id,
                        OPPORTUNITY: opportunity.opportunity_name,
                        OPPORTUNITY_START_DATE: opportunity.start,
                        OPPORTUNITY_END_DATE: opportunity.close,
                        STAGE: opportunity.stage,
                        QUOTE_ID: quote._id,
                        QUOTE_NAME: quote.quotes_name,
                        TEMPLATE_TYPE:quote.template_type

                        // Add other quote properties as needed
                      };
                    });
                  } else {
                    // If there are no quotes
                    console.log("No Quotes for Opportunity");
                    return {
                      ACCOUNT_ID: QuoteGridData._id,
                      ACCOUNT: QuoteGridData.accounts,
                      ACCOUNT_OWNER: QuoteGridData.owner,
                      OPPORTUNITY_ID: opportunity._id,
                      OPPORTUNITY: opportunity.opportunity_name,
                      OPPORTUNITY_START_DATE: opportunity.start,
                      OPPORTUNITY_END_DATE: opportunity.close,
                      STAGE: opportunity.stage,
                      QUOTE_ID: " ",
                      QUOTE_NAME: " ",
                      TEMPLATE_TYPE:" "

                      // Add other quote properties as needed
                    };
                  }
                });
              } else {
                // If there are no opportunities
                console.log("No Opportunities");
                return {
                  ACCOUNT_ID: QuoteGridData._id,
                  ACCOUNT: QuoteGridData.accounts,
                  ACCOUNT_OWNER: QuoteGridData.owner,
                  OPPORTUNITY_ID: " ",
                  OPPORTUNITY: " ",
                  OPPORTUNITY_START_DATE: " ",
                  OPPORTUNITY_END_DATE: " ",
                  STAGE: " ",
                  QUOTE_ID: " ",
                  QUOTE_NAME: " ",
                  TEMPLATE_TYPE:" "
                  // Add other quote properties as needed
                };
              }
            }
          );

          console.log("updatedInitialData:", updatedinitialData);

          setDbAccountData(quotegridd.data);
          setFilteredData(updatedinitialData);

          // console.log("acckey", account.data.length > 0 ? account.data[0]._id : null);
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getQuoteGridData();
  }, [user]);

  // ====================================

  const [isVariableListVisible1, setVariableFilterVisible1] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState([]);
  const [filterSearchValue, setFilterSearchValue] = useState("");
  const [filterSearchAndOrValue, setFilterSearchAndOrValue] = useState("");
  const [selectedOption2, setSelectedOption2] = useState([]);
  const [isVariableListVisible2, setVariableFilterVisible2] = useState(false);
  const [selectedAndOr, setSelectedAndOr] = useState("and");

  const toggleVaraiableList1 = () => {
    setVariableFilterVisible1(!isVariableListVisible1);
  };

  const handleOptionClick1 = (filterOption) => {
    setSelectedOption1(filterOption);
    setVariableFilterVisible1(false);
  };
  const variableAndOrVisibility1 = (event) => {
    const value = event.target.value;
    setFilterSearchValue(value);
    if (value === "") {
      setFilteredData(initialData);
    }
  };
  // 2nd variable filter
  const toggleVaraiableList2 = () => {
    setVariableFilterVisible2(!isVariableListVisible2);
  };
  const handleOptionClick2 = (filterOption2) => {
    setSelectedOption2(filterOption2);
    setVariableFilterVisible2(false);
  };
  const variableAndOrVisibility2 = (event) => {
    const value2 = event.target.value;
    setFilterSearchAndOrValue(value2);
    if (value2 === "") {
      setFilteredData(initialData);
    }
  };
  const filterMatches = (cellValue, filterValue, filterType) => {
    switch (filterType) {
      case "Contains":
        return cellValue.includes(filterValue);
      case "Not Contains":
        return !cellValue.includes(filterValue);
      case "Start With":
        return cellValue.startsWith(filterValue);
      case "End With":
        return cellValue.endsWith(filterValue);
      default:
        return true;
    }
  };

  useEffect(() => {
    const newData = filteredData.filter((item) => {
      // Use the columnIndex to get the filter options for the current column
      if (selectedOption1 && filterSearchValue) {
        const cellValue = item[columns[popupColumnIndex].field]
          .toString()
          .toLowerCase();
        const searchValueLowerCase = filterSearchValue.toLowerCase();
        const filterSearchAndOrValueLowerCase =
          filterSearchAndOrValue.toLowerCase();

        switch (selectedAndOr) {
          case "and":
            return (
              filterMatches(cellValue, searchValueLowerCase, selectedOption1) &&
              filterMatches(
                cellValue,
                filterSearchAndOrValueLowerCase,
                selectedOption2
              )
            );
          case "or":
            return (
              filterMatches(cellValue, searchValueLowerCase, selectedOption1) ||
              filterMatches(
                cellValue,
                filterSearchAndOrValueLowerCase,
                selectedOption2
              )
            );
          default:
            return true;
        }
      }
      if (numericalFilterOption && numericalSearchValue) {
        return (
          item,
          numericalFilterOption,
          numericalSearchValue,
          numericalAndOrFilterOption,
          numericalFilterAndOrSearchValue,
          columns,
          popupColumnIndex
        );
      }

      console.log(filterMatches);
      return true;
    });
    setFilteredData(newData);
    console.log("newData", newData);
  }, [filterSearchValue, filterSearchAndOrValue]);

  console.log("filterdata", filteredData);
  console.log("data", data);
  const acc_opp_ids = filteredData.map((row) => {
    return {
      acc_id: row.ACCOUNT_ID,
      opp_id: row.OPPORTUNITY_ID,
      quote_id: row.QUOTE_ID,
      template: row. TEMPLATE_TYPE,
      quotes:row.QUOTE_NAME,
    };
  });
  console.log(acc_opp_ids);
  // numerical filter
  // templete
  const [TemplateCheckBoxSearchValue, setTemplateCheckBoxSearchValue] =
    useState("");
  const [isTemplateFilterContentVisible, setIsTemplateFilterContentVisible] =
    useState(false);

  const handleTemplateSearchBox = (event) => {
    const value = event.target.value;
    setTemplateCheckBoxSearchValue(value);
  };
  // numerical filter
  const [isNumericalFilterContentVisible, setNumericalFilterContentVisible] =
    useState(false);
  const [isNumericalListVisible1, setNumericalListVisible1] = useState(false);
  const [isNumericalListVisible2, setNumericalListVisible2] = useState(false);
  const [numericalFilterOption, setNumericalFilterOption] = useState("equals");
  const [numericalSearchValue, setNumericalSearchValue] = useState("");
  const [NumericalselectedAndOr, setNumericalSelectedAndOr] = useState("and");
  const [numericalAndOrFilterOption, setNumericalAndOrFilterOption] =
    useState("equals");
  const [numericalFilterAndOrSearchValue, setNumericalFilterAndOrSearchValue] =
    useState("");

  const toggleNumericalList1 = () => {
    setNumericalListVisible1(true);
  };

  const handleNumericalFilterOptionChange = (filterOption) => {
    setNumericalFilterOption(filterOption);
    setNumericalListVisible1(false);
  };
  const numericalVisibility1 = (event) => {
    const value = event.target.value;
    setNumericalSearchValue(value);
  };
  // 2nd and ornumeric filter
  const toggleNumericalList2 = () => {
    setNumericalListVisible2(true);
  };

  const handleNumericalAndOrOptionVisible = (filterOption) => {
    setNumericalAndOrFilterOption(filterOption);
    setNumericalListVisible2(false);
  };
  const numericalVisibility2 = (event) => {
    const value = event.target.value;
    setNumericalFilterAndOrSearchValue(value);
  };

  function applyFilterCondition(filterOption, cellValuee, filterValuee) {
    switch (filterOption) {
      case "Equals":
        return cellValuee === filterValuee;
      case "Not Equals":
        return cellValuee !== filterValuee;
      case "Less Than":
        return cellValuee < filterValuee;
      case "Less Than or Equals":
        return cellValuee <= filterValuee;
      case "Greater Than":
        return cellValuee > filterValuee;
      case "Greater Than or Equals":
        return cellValuee >= filterValuee;

      default:
        return true;
    }
  }

  useEffect(() => {
    const newData = filteredData.filter((item) => {
      if (numericalFilterOption && numericalSearchValue) {
        const cellValue = parseFloat(item[columns[popupColumnIndex].field]);
        const numericalFilterValue = parseFloat(numericalSearchValue);

        if (
          NumericalselectedAndOr === "and" &&
          numericalFilterAndOrSearchValue
        ) {
          const numericalFilterAndOrValue = parseFloat(
            numericalFilterAndOrSearchValue
          );

          return (
            applyFilterCondition(
              numericalFilterOption,
              numericalFilterValue,
              cellValue,
              popupColumnIndex,
              columns
            ) &&
            applyFilterCondition(
              numericalAndOrFilterOption,
              numericalFilterAndOrValue,
              cellValue,
              popupColumnIndex,
              columns
            )
          );
        } else if (
          NumericalselectedAndOr === "or" ||
          numericalFilterAndOrSearchValue
        ) {
          const numericalFilterAndOrValue = parseFloat(
            numericalFilterAndOrSearchValue
          );

          return (
            applyFilterCondition(
              numericalFilterOption,
              cellValue,
              numericalFilterValue
            ) ||
            applyFilterCondition(
              numericalAndOrFilterOption,
              cellValue,
              numericalFilterAndOrValue,
              popupColumnIndex,
              columns
            )
          );
        } else {
          // Apply the main filter condition
          return applyFilterCondition(
            numericalFilterOption,
            cellValue,
            numericalFilterValue,
            popupColumnIndex,
            columns
          );
        }
      }
      return true;
    });
    setFilteredData(newData);
  }, [numericalSearchValue, numericalFilterAndOrSearchValue]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlepin = () => {
    setShowPinOptions(!showPinOptions);
    setShowPinOptions(true);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleResetAllColumns = () => {
    const updatedColumns = columns.map((item) => {
      if (item.originalIndex !== null) {
        return { ...item, pinned: null };
      }
      return item;
    });

    updatedColumns.sort((a, b) => {
      if (a.originalIndex === null && b.originalIndex === null) {
        return 0;
      }
      if (a.originalIndex === null) {
        return 1;
      }
      if (b.originalIndex === null) {
        return -1;
      }
      return a.originalIndex - b.originalIndex;
    });
    setColumns(updatedColumns);
    setIsPopupOpen(false);
    setIsPinColumnOptionsVisible(false);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div class="PcrGridQuotedDownload">
        <PcrGridDownload data={filteredData} />
      </div>
      <div className="table-container">
        <table ref={tableRef} className="myTable">
          <thead>
            <tr className="myTableTr">
              {columns.map((column, index) => (
                <th
                  className="myTableTh"
                  key={column.field}
                  style={{
                    display: columnVisibility[column.field]
                      ? "none"
                      : "table-cell",
                  }}
                >
                  {column.field}
                  <button
                    class="ascendingbutton"
                    onClick={() => handleColumnSort(column.field)}
                  ></button>

                  {column.sortOrder === eSortOrder.ASCENDING && (
                    <FontAwesomeIcon icon={faArrowUp} />
                  )}
                  {column.sortOrder === eSortOrder.DESCENDING && (
                    <FontAwesomeIcon icon={faArrowDown} id="downArrow" />
                  )}
                  <FontAwesomeIcon
                    icon={column.icon}
                    id="upArrow"
                    className="fa-solid icon-hover"
                    onClick={() => handleIconClick(index)}
                    style={{ display: "block" }}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody id="myTable_tbody">
  {filteredData.map((row, rowIndex) => (
    <tr key={rowIndex} className="myTableTr">
      {columns.map((column, columnIndex) => {
        if (column.field === 'ACCOUNT') {
          // Link for ACCOUNT field
          return (
            <td className="myTableTd" key={columnIndex}>
              <Link to={`/accounts/${row.ACCOUNT_ID}`} className="hover-link">
                {row.ACCOUNT}
              </Link>
            </td>
          );
        } else if (column.field === 'OPPORTUNITY') {
          // Link for OPPORTUNITY field
          return (
            <td className="myTableTd" key={columnIndex}>
              <Link to={`/opportunitiesdata?oppID=${row.OPPORTUNITY_ID}`} className="hover-link">
                {row.OPPORTUNITY}
              </Link>
            </td>
          );
        } else if (column.field === 'QUOTE_NAME') {
          // Link for QUOTE_NAME field
          return (
            <td className="myTableTd" key={columnIndex}>
              <Link to={`/guidedselling/${row.QUOTE_ID}`} state={{ accountIDs: row.ACCOUNT_ID, opp_ids: row.OPPORTUNITY_ID, Quote_id: row.QUOTE_ID, template: row.TEMPLATE_TYPE, quotes: row.QUOTE_NAME }} className="hover-link">
                {row.QUOTE_NAME}
              </Link>
            </td>
          );
        } else {
          // Display other fields in their respective positions
          return (
            <td
              className="myTableTd"
              key={columnIndex}
              style={{
                display: columnVisibility[column.field]
                  ? "none"
                  : "table-cell",
              }}
            >
              {row[column.field]}
            </td>
          );
        }
      })}
    </tr>
  ))}
</tbody>

        </table>
        {columns.map((column, columnIndex) => (
          <React.Fragment key={column.field}>
            {isPopupOpen && popupColumnIndex !== null && (
              <div
                className="barspopupquote"
                style={{
                  left: `${popupColumnIndex * 250}px`,
                  // height: barsPopUpHeight,
                  overflowY: barsPopUpOverFlow,
                  overflowX: barsPopUpOverFlowX,
                }}
                ref={barsRef}
              >
                {/* Your content for the popup */}

                <div class="icondiv">
                  <div
                    className="itembarsDiv"
                    style={{
                      display: itembarsDiv,
                      backgroundColor: itemBarsStyle.backgroundColor,
                      border: itemBarsStyle.border,
                      borderBottom: itemBarsStyle.borderBottom,
                    }}
                    onClick={toggleColumnBars}
                  >
                    <FontAwesomeIcon
                      icon={faBars}
                      className="itembars"
                      style={{
                        color: itemBarsIconStyle.color,
                        borderBottom: itemBarsIconStyle.borderBottom,
                      }}
                    />
                  </div>
                  <div
                    className="horizpontalfiltericonDiv"
                    style={{
                      display: filtericonDiv,
                      backgroundColor: filterStyle.backgroundColor,
                      border: filterStyle.border,
                      borderBottom: filterStyle.borderBottom,
                    }}
                    onClick={toggleFilterContent}
                  >
                    <FontAwesomeIcon
                      icon={faFilter}
                      id="horizpontalfiltericon"
                      style={{
                        color: filterIconStyle.color,
                        borderBottom: filterIconStyle.borderBottom,
                      }}
                    />
                  </div>
                  <div
                    className="verticaliconDiv"
                    style={{
                      display: verticaliconDiv,
                      backgroundColor: verticalStyle.backgroundColor,
                      border: verticalStyle.border,
                      borderBottom: verticalStyle.borderBottom,

                      // backgroundColor: verticalbgColor,
                      // border: verticalBorder,
                      // borderBottom: verticalBorderBtm,
                    }}
                    onClick={verticalColumnbars}
                  >
                    <FontAwesomeIcon
                      icon={faAlignJustify}
                      id="verticalicon"
                      style={{
                        color: verticalIconStyle.color,
                        borderBottom: verticalIconStyle.borderBottom,
                      }}
                    />
                  </div>
                </div>
                {isPinColumnOptionsVisible && (
                  <div
                    className="columnbars"
                    style={{ display: isColumnBarsVisible ? "block" : "none" }}
                  >
                    <button
                      className="autosizebuttons"
                      onClick={handleAutosizeAllColumns}
                    >
                      Autosize All Columns
                    </button>
                    <button
                      className="autosizethiscolumn"
                      onClick={() => handleAutosizeColumn(popupColumnIndex)}
                    >
                      Autosize This Columns
                    </button>
                    <button className="pincolumns" onClick={handlepin}>
                      Pin Columns
                    </button>
                    <hr class="columnsresethr"></hr>
                    <button
                      className="resetbutton"
                      onClick={handleResetAllColumns}
                    >
                      Reset Columns
                    </button>
                  </div>
                )}

                <div
                  class="checkboxverticalicon"
                  style={{
                    display: isColumnsHeaderVisiblee ? "block" : "none",
                  }}
                >
                  <div id="girdsearch">
                    <input
                      type="text"
                      placeholder="Search..."
                      class="checkboxsearch"
                      value={checkboxSearchValue}
                      onChange={handleCheckBoxSearch}
                    />
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      class="defalutallcheckbox"
                      checked={selectAllChecked}
                      onChange={() => {
                        setSelectAllChecked(!selectAllChecked);
                        const updatedColumnVisibility = {};
                        columns.forEach((column) => {
                          updatedColumnVisibility[column.field] =
                            !selectAllChecked;
                        });
                        setColumnVisibility(updatedColumnVisibility);
                      }}
                    />

                    <span></span>
                  </div>
                  {columns
                    .filter((column) =>
                      column.field
                        .toLowerCase()
                        .includes(checkboxSearchValue.toLowerCase())
                    )
                    .map((column, index) => (
                      <div key={index}>
                        <input
                          type="checkbox"
                          id={`checkbox-${column.field}`}
                          checked={!columnVisibility[column.field]}
                          onChange={() => toggleCheckbox(column.field)}
                        />
                        <label
                          htmlFor={`checkbox-${column.field}`}
                          className="columnsnames"
                        >
                          {column.field}
                        </label>
                      </div>
                    ))}
                </div>
                {columns[popupColumnIndex].showFilter && (
                  <div
                    className="filter_content"
                    style={{
                      display: isFilterContentVisible ? "block" : "none",
                    }}
                  >
                    <div>
                      <input
                        className="listselection"
                        onClick={toggleVaraiableList1}
                        value={selectedOption1}
                      />
                      {isVariableListVisible1 ? (
                        <FontAwesomeIcon
                          icon={faCaretUp}
                          id="fa_Caret_Up_grid"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          id="fa_Caret_Up_grid"
                        />
                      )}
                      <input
                        className="filtersearch"
                        type="text"
                        placeholder="Filter..."
                        value={filterSearchValue}
                        onChange={variableAndOrVisibility1}
                      />
                    </div>
                    <div className="clearbuttondiv">
                      <button class="clearbutton">CLEAR</button>
                    </div>
                    {isVariableListVisible1 && (
                      <ul className="variable_Filter_1">
                        <li
                          className="contains"
                          value="Contains"
                          onClick={() => handleOptionClick1("Contains")}
                        >
                          Contains
                        </li>
                        <li
                          className="notcontains"
                          value="Not Contains"
                          onClick={() => handleOptionClick1("Not Contains")}
                        >
                          Not Contains
                        </li>
                        <li
                          className="startwith"
                          value="Start With"
                          onClick={() => handleOptionClick1("Start With")}
                        >
                          Start with
                        </li>
                        <li
                          className="endwith"
                          value="End With"
                          onClick={() => handleOptionClick1("End With")}
                        >
                          End with
                        </li>
                      </ul>
                    )}

                    <div
                      class="andorinput"
                      style={{ display: filterSearchValue ? "block" : "none" }}
                    >
                      <div class="radiobtndiv">
                        <input
                          type="radio"
                          name="andorGroup1"
                          value="and"
                          className="andbutton"
                          checked={selectedAndOr === "and"} // Set checked based on state
                          onChange={() => setSelectedAndOr("and")} // Update state on change
                        />

                        <label class="andlabel">AND</label>
                        <input
                          type="radio"
                          name="andorGroup1"
                          value="OR"
                          className="orbutton"
                          checked={selectedAndOr === "or"} // Set checked based on state
                          onChange={() => setSelectedAndOr("or")} // Update state on change
                        />
                        <label class="orlabel">OR</label>
                      </div>
                      <div>
                        <input
                          className="listselectionandor"
                          onClick={toggleVaraiableList2}
                          value={selectedOption2}
                        />
                        {isVariableListVisible2 ? (
                          <FontAwesomeIcon
                            icon={faCaretUp}
                            id="fa_Caret_Up_grid"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faCaretDown}
                            id="fa_Caret_Up_grid"
                          />
                        )}
                        <input
                          className="filtersearchandor"
                          type="text"
                          placeholder="Filter..."
                          value={filterSearchAndOrValue}
                          onChange={variableAndOrVisibility2}
                        />
                      </div>
                      {isVariableListVisible2 && (
                        <ul className="variable_Filter_2">
                          <li
                            className="contains"
                            value="Contains"
                            onClick={() => handleOptionClick2("Contains")}
                          >
                            Contains
                          </li>
                          <li
                            className="notcontains"
                            value="Not Contains"
                            onClick={() => handleOptionClick2("Not Contains")}
                          >
                            Not Contains
                          </li>
                          <li
                            className="startwith"
                            value="Start With"
                            onClick={() => handleOptionClick2("Start With")}
                          >
                            Start with
                          </li>
                          <li
                            className="endwith"
                            value="End With"
                            onClick={() => handleOptionClick2("End With")}
                          >
                            End with
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                )}

                {/*NUMERICAL FILTER  */}
                {columns[popupColumnIndex].showNumericalFilter && (
                  <div
                    className="numerical_filter_content"
                    style={{
                      display: isNumericalFilterContentVisible
                        ? "block"
                        : "none",
                    }}
                  >
                    <div>
                      <input
                        className="numerical_list_Selection"
                        onClick={toggleNumericalList1}
                        value={numericalFilterOption}
                      ></input>
                      {isNumericalListVisible1 ? (
                        <FontAwesomeIcon
                          icon={faCaretUp}
                          id="fa_Caret_Up_grid"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          id="fa_Caret_Up_grid"
                        />
                      )}
                      <input
                        className="numerical_filter_search"
                        type="number"
                        placeholder="Filter..."
                        value={numericalSearchValue}
                        onChange={numericalVisibility1}
                      ></input>
                      {isNumericalListVisible1 && (
                        <ul class="Numericaldropdownlist">
                          <li
                            className="equals"
                            value="Equals"
                            onClick={() =>
                              handleNumericalFilterOptionChange("Equals")
                            }
                          >
                            Equals
                          </li>
                          <li
                            className=" Notequals"
                            value=" Not Equals"
                            onClick={() =>
                              handleNumericalFilterOptionChange("Not Equals")
                            }
                          >
                            Not Equals
                          </li>
                          <li
                            className="Lessthan"
                            value="Less Than"
                            onClick={() =>
                              handleNumericalFilterOptionChange("Less Than")
                            }
                          >
                            Less than
                          </li>
                          <li
                            className="Lessthanorequals"
                            value="Less Than or Equals"
                            onClick={() =>
                              handleNumericalFilterOptionChange(
                                "Less Than or Equals"
                              )
                            }
                          >
                            Less Than or Equals
                          </li>
                          <li
                            className="Greaterthan"
                            value="Greater Than"
                            onClick={() =>
                              handleNumericalFilterOptionChange("Greater Than")
                            }
                          >
                            Greater than
                          </li>
                          <li
                            className="Greaterthanorequals"
                            value="Greater Than or Equals"
                            onClick={() =>
                              handleNumericalFilterOptionChange(
                                "Greater Than or Equals"
                              )
                            }
                          >
                            Greater than or equals
                          </li>
                          <li
                            className="inrange"
                            value="inrange"
                            onClick={() =>
                              handleNumericalFilterOptionChange("In range")
                            }
                          >
                            In range
                          </li>
                        </ul>
                      )}
                    </div>

                    <div
                      class="numericalandorinput"
                      style={{
                        display: numericalSearchValue ? "block" : "none",
                      }}
                    >
                      <div class="numericalradiobtndiv">
                        <input
                          type="radio"
                          name="andorGroup1"
                          value="and"
                          className="numericalandbutton"
                          checked={NumericalselectedAndOr === "and"}
                          onChange={() => setNumericalSelectedAndOr("and")} // Update state on change
                        />

                        <label class="numericalandlabel">AND</label>
                        <input
                          type="radio"
                          name="andorGroup1"
                          value="OR"
                          className="numericalorbutton"
                          checked={NumericalselectedAndOr === "or"} // Set checked based on state
                          onChange={() => setNumericalSelectedAndOr("or")} // Update state on change
                        />
                        <label class="numericalorlabel">OR</label>
                      </div>
                      <input
                        className="Numericafilterinputvalue"
                        type="number"
                        value={numericalAndOrFilterOption}
                        onClick={toggleNumericalList2}
                      />
                      {isNumericalListVisible2 ? (
                        <FontAwesomeIcon
                          icon={faCaretUp}
                          id="fa_Caret_Up_grid"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          id="fa_Caret_Up_grid"
                        />
                      )}
                      <input
                        className="numerical_list_Selection2"
                        placeholder="Filter..."
                        value={numericalFilterAndOrSearchValue}
                        onChange={numericalVisibility2}
                      />

                      {isNumericalListVisible2 && (
                        <ul
                          className="numericalfilterandoroperator"
                          id="numericalfilterandor"
                        >
                          <li
                            className="equals"
                            value="Equals"
                            onClick={() =>
                              handleNumericalAndOrOptionVisible("Equals")
                            }
                          >
                            Equals
                          </li>
                          <li
                            className="Notequals"
                            value=" Not Equals"
                            onClick={() =>
                              handleNumericalAndOrOptionVisible("Not Equals")
                            }
                          >
                            Not Equals
                          </li>
                          <li
                            className="Lessthan"
                            value="Less Than"
                            onClick={() =>
                              handleNumericalAndOrOptionVisible("Less Than")
                            }
                          >
                            Less than
                          </li>
                          <li
                            className="Lessthanorequals"
                            value="Less Than or Equals"
                            onClick={() =>
                              handleNumericalAndOrOptionVisible(
                                "Less Than or Equals"
                              )
                            }
                          >
                            Less than or equals
                          </li>
                          <li
                            className="Greaterthan"
                            value="Greater than"
                            onClick={() =>
                              handleNumericalAndOrOptionVisible("Greater Than")
                            }
                          >
                            Greater than
                          </li>
                          <li
                            className="Greaterthanorequals"
                            value="Greater Than or Equals"
                            onClick={() =>
                              handleNumericalAndOrOptionVisible(
                                "Greater Than or Equals"
                              )
                            }
                          >
                            Greater than or equals
                          </li>
                          <li
                            className="inrange"
                            value="inrange"
                            onClick={() =>
                              handleNumericalAndOrOptionVisible("In range")
                            }
                          >
                            In range
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                )}
                {/*  */}
                {columns[popupColumnIndex].showTemplateFilter && (
                  <div
                    className="templatefilter"
                    style={{
                      display: isTemplateFilterContentVisible
                        ? "block"
                        : "none",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      class="templatefiltercheckbox"
                      value={TemplateCheckBoxSearchValue}
                      onChange={handleTemplateSearchBox}
                    />

                    <div className="templatesubfilter">
                      <input type="checkbox"></input>
                      <label className="templatefilterselectlabel">
                        Select All
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
export default QuoteGrid;
