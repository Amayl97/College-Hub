const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const leftPage = document.getElementById("leftPage");
const rightPage = document.getElementById("rightPage");

let pages = [];
let currentPage = 0;
let selectedData = null;
let selectedDepartment = null;
let selectedYear = null;

// =========================
// ELEMENTS
// =========================

const dropDownDivs = document.querySelectorAll(".dropdown");

const departmentRadios = document.querySelectorAll('input[name="department"]');

const yearRadios = document.querySelectorAll('input[name="year"]');

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

  if (!selectedDepartment || !selectedYear) {
    alert("Please select a department and year.");
    return;
  }

  book.classList.add("open");

  setTimeout(() => {
    document.querySelector(".closedBook").classList.add("finished");
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
  const label = document.querySelector(`label[for="${radio.id}"]`);
selectedDepartment = radio.value;
  const dropdown = radio.closest(".dropdown");

  const title = dropdown.querySelector(".title");

  // Change department dropdown text
  title.textContent = label.textContent;
  openDropDown(dropdown);

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
  const label = document.querySelector(`label[for="${radio.id}"]`);
 selectedYear = radio.value; 

  const dropdown = radio.closest(".dropdown");

  const title = dropdown.querySelector(".title");

  // Change year dropdown text
  title.textContent = label.textContent;

  // Close the drop down
  openDropDown(dropdown);

  // Now create pages for all the resources
  renderData(selectedYear);
}

// Render Data
function renderData(year) {
  const departmentData = collegeData.departments.find(
    (dept) => dept.id === selectedDepartment
  );
 if (!departmentData.years) {
    pages = [`
      <div class="emptyPage">
        <h2>No resources available</h2>
        <p>
          Resources for this department haven't been added yet.
        </p>
      </div>
    `];

    currentPage = 0;
    renderSpread();
    return;
  }

  const yearData = departmentData.years[year];

  pages = createPages(yearData);

  currentPage = 0;

  renderSpread();
}

// 
function renderSpread() {

  leftPage.innerHTML = pages[currentPage] || "";

  rightPage.innerHTML = pages[currentPage + 1] || "";

}

// Create pages function
function createPages(yearData) {
const pages = []
const hasData = Object.values(yearData).some(
    (data) => data.length > 0
  );

  if (!hasData) {
    pages.push(`
      <div class="emptyPage">
        <h2>No resources available</h2>
        <p>
          We don't have any resources, tools, or must-have items
          for this department and year yet.
        </p>
      </div>
    `);

    return pages;
  }
  else{
 Object.entries(yearData).forEach(([key, data]) => {
    data.forEach((resource) => {
      // create page here
      const page = `
  <h2 class="heading">${key}</h2>

  <img src="../imgs/sticker.jpg" alt="" class="sticker">

  <div class="res">
    <h3>${resource.title}</h3>

    <p>
      ${resource.description}
    </p>

    <a href="${resource.url}" target="_blank">
      Explore →
    </a>
  </div>

  <div class="photo">
    <img
      src="../imgs/study core.jpg"
      alt=""
      class="scrapPhoto"
    >
  </div>
`;

      pages.push(page);
    });
  });
  }
  return pages;
}

leftBtn.addEventListener("click", () => {

  if (currentPage >= 2) {
    changePage(-2);
    return;
  }

  closeBook();

});

rightBtn.addEventListener("click", () => {

  if (currentPage + 2 < pages.length) {
    changePage(2);
  }

});

function changePage(direction) {

  leftPage.classList.add("pageChanging");
  rightPage.classList.add("pageChanging");

  setTimeout(() => {

    currentPage += direction;

    renderSpread();

    leftPage.classList.remove("pageChanging");
    rightPage.classList.remove("pageChanging");

  }, 225);
}

function closeBook() {
  const closedBook = document.querySelector(".closedBook");

  // Show the cover
  closedBook.classList.remove("finished");

  // Start closing animation
  book.classList.remove("open");

  // Wait until the cover is completely closed
  setTimeout(() => {
    book.classList.remove("pages-ready");
  }, 200);
}