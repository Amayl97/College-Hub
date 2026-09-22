// =========================
// ELEMENTS
// =========================

const dropDownDivs = document.querySelectorAll(".dropdown");

const departmentRadios = document.querySelectorAll(
  'input[name="department"]'
);

const yearRadios = document.querySelectorAll(
  'input[name="year"]'
);

const openButton = document.querySelector(".btnOpen");

const book = document.querySelector(".book");


// =========================
// COLLEGE DATA
// =========================

let collegeData;

fetch("./../collegeData.json")
  .then((response) => response.json())
  .then((data) => {
    collegeData = data;
    console.log("College data loaded:", collegeData);
  })
  .catch((error) => {
    console.error("Error loading college data:", error);
  });


// =========================
// DROPDOWN EVENTS
// =========================

dropDownDivs.forEach((dropDown) => {

  const titleIcon = dropDown.querySelector(".titleIcon");

  titleIcon.addEventListener("click", () => {
    openDropDown(dropDown);
  });

});


// =========================
// DEPARTMENT EVENTS
// =========================

departmentRadios.forEach((radio) => {

  radio.addEventListener("change", () => {
    selectDepartment(radio);
  });

});


// =========================
// YEAR EVENTS
// =========================

yearRadios.forEach((radio) => {

  radio.addEventListener("change", () => {
    selectYear(radio);
  });

});


// =========================
// OPEN BOOK
// =========================

openButton.addEventListener("click", () => {

  // Start opening the book
  book.classList.add("open");

  // Wait for the cover animation to finish
  setTimeout(() => {

    // Hide the closed cover
    document.querySelector(".closedBook").classList.add("finished");

    // Now allow the left page to appear
    book.classList.add("pages-ready");

  }, 200);

});

// =========================
// OPEN / CLOSE DROPDOWN
// =========================

function openDropDown(dropDownDiv) {

  const optionsList = dropDownDiv.querySelector(".options");

  if (
    optionsList.style.display === "none" ||
    optionsList.style.display === ""
  ) {

    optionsList.style.display = "block";

  } else {

    optionsList.style.display = "none";

  }

}


// =========================
// SELECT DEPARTMENT
// =========================

function selectDepartment(radio) {

  const label = document.querySelector(
    `label[for="${radio.id}"]`
  );

  const dropdown = radio.closest(".dropdown");

  const title = dropdown.querySelector(".title");

  // Change department dropdown text
  title.textContent = label.textContent;


  // Find year dropdown
  const yearDropdown = document.getElementById("yearDropdown");

  const yearTitle = yearDropdown.querySelector(".title");


  // Reset year
  yearTitle.textContent = "Select Year";


  // Enable year dropdown
  yearDropdown.classList.remove("disabled");

}


// =========================
// SELECT YEAR
// =========================

function selectYear(radio) {

  const label = document.querySelector(
    `label[for="${radio.id}"]`
  );

  const dropdown = radio.closest(".dropdown");

  const title = dropdown.querySelector(".title");

  // Change year dropdown text
  title.textContent = label.textContent;

}