const leftBtn = document.getElementById("leftBtn")
const rightBtn = document.getElementById("rightBtn")
const leftPage = document.getElementById("leftPage")
const rightPage = document.getElementById("rightPage")
const leftContent = leftPage.querySelector(".content")
const rightContent = rightPage.querySelector(".content")


let currentSpread = 0;
let selectedData = null;
let selectedDepartment = null;
let selectedYear = null;

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

  const selectedDepartment = document.querySelector(
    'input[name="department"]:checked'
  );

  const selectedYear = document.querySelector(
    'input[name="year"]:checked'
  );

  // Don't open unless both are selected
  if (!selectedDepartment || !selectedYear) {
    alert("Please select a department and year.");
    return;
  }

  const department = selectedDepartment.value;
  const year = selectedYear.value;

  // Find the selected department
  const departmentData = collegeData.departments.find(
    dept => dept.id === department
  );

  // Get the selected year
  selectedData = departmentData.years[year];

  // Start from the first spread
  currentSpread = 0;

  // Display Resources pages
  renderSpread();

  // Open the book
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

  selectedDepartment = radio.value;
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
  selectedYear = radio.value;

}

// For displaying resources on the pages.
function createResourcesPage(resources) {
  return resources.map(resource => `
    <div class="res">
      <h3>${resource.title}</h3>

      <p>
        ${resource.description}
      </p>

      <a href="${resource.url}" target="_blank">
        Explore →
      </a>
    </div>
  `).join("");
}

// For displaying tools page
function createToolsPage(tools) {
  return tools.map(tool => `
    <div class="res">
      <h3>${tool.title}</h3>

      <p>
        ${tool.description}
      </p>

      <a href="${tool.url}" target="_blank">
        Explore →
      </a>
    </div>
  `).join("");
}


// For displaying must have resources page
function createMusthavePage(mustHave) {
  return mustHave.map(item => `
    <div class="res">
      <h3>${item.title}</h3>

      <p>
        ${item.description}
      </p>

      <a href="${item.url}" target="_blank">
        Explore →
      </a>
    </div>
  `).join("");

}

// For creating of new pages
function renderSpread() {

  if (currentSpread === 0) {

    leftContent.innerHTML = `
      <h2 class="heading">Resources</h2>
      ${createResourcesPage(selectedData.resources.page1)}
    `;

    rightContent.innerHTML = `
      <h2 class="heading">Resources</h2>
      ${createResourcesPage(selectedData.resources.page2)}
    `;

  } else if (currentSpread === 1) {

    leftContent.innerHTML = `
      <h2 class="heading">Tools</h2>
      ${createToolsPage(selectedData.tools)}
    `;

    rightContent.innerHTML = `
      <h2 class="heading">Must Have</h2>
      ${createMusthavePage(selectedData.mustHave)}
    `;
  }
}

leftBtn.addEventListener("click", () => {
  console.log("left")
  if (currentSpread > 0) {

    currentSpread--;

    renderSpread();

  }

});
rightBtn.addEventListener("click", () => {
  console.log("right")

  if (currentSpread < 1) {

    currentSpread++;

    renderSpread();

  }

});