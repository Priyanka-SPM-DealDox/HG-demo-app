// BID ESTIMATION JS (POPUP SCREEN)

export function openPopup() {
  var popupBackdrop = document.getElementById("myPopupBackdrop");
  let conten = document.getElementById("content");
  // conten.style.zIndex = 0;
  var popup = document.getElementById("myPopup");
  popupBackdrop.style.display = "block";
  popup.style.display = "block";
}
export function closePopup() {
  var popupBackdrop = document.getElementById("myPopupBackdrop");
  var popup = document.getElementById("myPopup");
  let conten = document.getElementById("content");
  // conten.style.zIndex = 2;
  popupBackdrop.style.display = "none";
  popup.style.display = "none";
}

export function hiddenPopup() {
  var element = document.getElementById("containerPopup");
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

export function hiddenPopupTable(tbvalue) {
  var element = document.getElementById(tbvalue);
  if (element.style.display === "block") {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}

export function hiddenPopupServiceTable(servicevalue) {
  var element = document.getElementById(servicevalue);
  if (element.style.display === "block") {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}

export function myfunctionBill(address) {
  var element = document.getElementById(address);
  if (element.style.display === "block") {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}

export function myfunctionShipOne(shipTable) {
  var element = document.getElementById(shipTable);
  if (element.style.display === "block") {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}

export function myfunctionBillOne(billTable) {
  var element = document.getElementById(billTable);
  if (element.style.display === "block") {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}

export function openCSAM(opportunity) {
  var element = document.getElementById(opportunity);
  if (element.style.display === "block") {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}

export function myOpportunity(csamData) {
  var element = document.getElementById(csamData);
  if (element.style.display === "block") {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}

// $('#proffessionalCircle').click(function (){
//   var iconChange = $(this).find('i');
//   if(iconChange.hasClass('fa-circle-thin')){
//     iconChange.removeClass('fa-circle-thin');
//     iconChange.html('<i class ="fa-solid fa-check"></i>');
//     iconChange.css('color', '#045679');
//   }
//   else{

//     iconChange.addClass('fa-circle-thin');
//     iconChange.html('');

//   }
// });

// $('#managementCircle').click(function (){
//   var iconChange = $(this).find('i');
//   if(iconChange.hasClass('fa-circle-thin')){
//     iconChange.removeClass('fa-circle-thin');
//     iconChange.html('<i class ="fa-solid fa-check"></i>');
//     iconChange.css('color', '#045679');
//   }
//   else{
//     iconChange.addClass('fa-circle-thin');
//     iconChange.html('');

//   }
// });

// Table constant data
// const role =  document.querySelectorAll("#guideRole");
// const col2 = document.querySelectorAll("#col2");

// role.addEventListener("change", function(){
//   const selectedValue = role.value;
//   col2.textContent = selectedValue;
// });

const dropdowns = document.querySelectorAll(".guideRole");
dropdowns.forEach((guideRole) => {
  guideRole.addEventListener("change", function () {
    const selectedValue = guideRole.value;
    const column2 = guideRole.parentNode.nextElementSibling;
    column2.textContent = selectedValue;
  });
});

// js for not to send data automatically without clicking submit
// const formButton = document.getElementById('applybtnid');
// formButton.addEventListener('submit', (event) =>{
//   event.preventDefault();
// });
