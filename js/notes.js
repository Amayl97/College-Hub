const dropDownDivs = document.querySelectorAll(".dropdown");
const radios = document.querySelectorAll('input[name="department"]');
const para = document.querySelectorAll(".emptyRes")
// For getting JSON
let collegeData;
fetch("./../collegeData.json")
  .then((response) => response.json())
  .then((data) => {
    collegeData = data;
  });

dropDownDivs.forEach((dropDownDiv) => {
  dropDownDiv.addEventListener("click", () => openDropDown(dropDownDiv));
});

radios.forEach((radio) => {
  radio.addEventListener("change", () => selectDepartment(radio));
});


function openDropDown(dropDownDiv) {
  console.log("hello");
  const optionsList = dropDownDiv.querySelector(".options");
  if (
    optionsList.style.display === "none" ||
    optionsList.style.display === ""
  ) {
    optionsList.style.display = "block";
  } else if (optionsList.style.display === "block") {
    optionsList.style.display = "none";
  }
}

function selectDepartment(radio) {
  const label = document.querySelector(`label[for="${radio.id}"]`);

  const dropdown = radio.closest(".dropdown");
  const title = dropdown.querySelector(".title");

  title.textContent = label.textContent;
  // Reset subject selection
  const subjectDropdown = document.getElementById("subjectDropdown");
  const subjectTitle = subjectDropdown.querySelector(".title");

  subjectTitle.textContent = "Choose Subject";
  // Clear previous resources
  document.querySelectorAll(".res").forEach(res => {
    res.remove();
  });

   
  // Load new subjects
  loadSubjects(radio.value);

  // Enable subject dropdown
  subjectDropdown.classList.remove("disabled");
}

function loadSubjects(departmentId) {
  const department = collegeData.departments.find(
    (department) => department.id === departmentId,
  );

  const subjectOptions = document.getElementById("subjectOptions");
  subjectOptions.innerHTML = "";

  if (department.subjects.length === 0) {
    const div = document.createElement("div");
    div.classList.add("inp");

    div.innerHTML = `
            <p>No subjects</p>
        `;

    subjectOptions.appendChild(div);
    
  } else {
    department.subjects.forEach((subject) => {
      const div = document.createElement("div");
      div.classList.add("inp");

      div.innerHTML = `
                <input type="radio" name="subject" value="${subject.id}" id="${subject.id}">
                <label for="${subject.id}">${subject.name}</label>
            `;

      const radio = div.querySelector("input");
      radio.addEventListener("change", () => selectSubject(radio));
      subjectOptions.appendChild(div);
    });
  }
}

function selectSubject(radio) {
  const label = document.querySelector(`label[for="${radio.id}"]`);

  const dropdown = radio.closest(".dropdown");
  const title = dropdown.querySelector(".title");

  title.textContent = label.textContent;

   document.querySelectorAll(".res").forEach(res => {
    res.remove();
});
   document.querySelectorAll(".emptyRes p").forEach(p => {
      p.remove()
    })
    

  loadResources(radio.value);
  
}

function loadResources(subjectId) {
  para.forEach(p => {
    p.classList.add("hide")
  })
 const department = collegeData.departments.find(
    department => department.subjects.some(
        subject => subject.id === subjectId
    )
);

const subject = department.subjects.find(
    subject => subject.id === subjectId
);
  
  const notesSectiion = document.querySelector(".notesSection");
  const outlineDiv = document.querySelector(".outline");
  const notesPdf = document.querySelector(".notes");
  const slidesDiv = document.querySelector(".slides");
  const labMaterial = document.querySelector(".labMaterial");

 if (subject.outline.file === "") {
    const res = emptyData();

    outlineDiv.append(res);
    outlineDiv.classList.add("resources");
    notesSectiion.append(outlineDiv);

} else {

    const outline = subject.outline;

    const res = createResources(outline);

    outlineDiv.append(res);

    outlineDiv.classList.add("resources");

    notesSectiion.append(outlineDiv);
}

  if (subject.notes.length === 0) {
   const res = emptyData();
    notesPdf.append(res);
    notesPdf.classList.add("resources")
    notesSectiion.append(notesPdf);
  } else {
 
    subject.notes.forEach((note) => {
     const res = createResources(note);
      notesPdf.append(res);
      notesPdf.classList.add("resources")
      notesSectiion.append(notesPdf);
    });
  }

  if (subject.slides.length === 0) {
     const res = emptyData();
   slidesDiv.append(res);
    slidesDiv.classList.add("resources")
    notesSectiion.append(slidesDiv);
  } else {
    subject.slides.forEach((slide) => {
    const res =  createResources(slide);
       slidesDiv.append(res);
       slidesDiv.classList.add("resources")
    notesSectiion.append(slidesDiv);
    });
   
  }
  if (subject.labMaterial.length === 0) {
  const res =  emptyData();
    labMaterial.append(res);
    labMaterial.classList.add("resources")
    notesSectiion.append(labMaterial);
  } else {
    subject.labMaterial.forEach((lab) => {
    const res =   createResources(lab);
       labMaterial.append(res);
    labMaterial.classList.add("resources")
    notesSectiion.append(labMaterial);
    });
   
  }

}

function createResources(resource) {
    const res = document.createElement("div");

    res.classList.add("res");

    res.innerHTML = `
        <div class="resDetail">
            <h3 class="resTitle">${resource.title}</h3>
            <p class="resDesc">${resource.description}</p>
        </div>

        <a href="${resource.file}" download class="downloadBtn">
            Download
        </a>
    `;

    return res;
}

function emptyData() {
  const res = document.createElement("div");
    
    res.classList.add("emptyRes");

    res.innerHTML = `
       <p>There is nothing to show.</p>
    `;

    return res;
}
