const dropDownDivs = document.querySelectorAll(".dropdown")
const radios = document.querySelectorAll('input[name="department"]')



// For getting JSON
let collegeData;
fetch("./../collegeData.json")
    .then(response => response.json())
    .then(data => {
        collegeData = data;
    });


dropDownDivs.forEach(dropDownDiv => {
    dropDownDiv.addEventListener("click", () => openDropDown(dropDownDiv))
})

radios.forEach(radio => {
    radio.addEventListener("change", () => selectDepartment(radio))
})


function openDropDown(dropDownDiv) {
    console.log("hello")
    const optionsList = dropDownDiv.querySelector(".options")
    if(optionsList.style.display === "none" || optionsList.style.display === "" ){
        optionsList.style.display = "block";
    }
    else if(optionsList.style.display === "block"){
        optionsList.style.display = "none";
    }
}

function selectDepartment(radio) {
    const label = document.querySelector(`label[for="${radio.id}"]`)
    
    const dropdown = radio.closest(".dropdown")
    const title = dropdown.querySelector(".title")

    title.textContent = label.textContent
    // Reset subject selection
    const subjectDropdown = document.getElementById("subjectDropdown")
    const subjectTitle = subjectDropdown.querySelector(".title")

    subjectTitle.textContent = "Choose Subject"

    // Load new subjects
    loadSubjects(radio.value)

    // Enable subject dropdown
    subjectDropdown.classList.remove("disabled")
    
     
}


function loadSubjects(departmentId) {
    
    const department = collegeData.departments.find(
        department => department.id === departmentId
    )

      console.log("departmentId:", departmentId)
      console.log("department:", department)
    const subjectOptions = document.getElementById("subjectOptions")
    subjectOptions.innerHTML = ""

    if (department.subjects.length === 0) {

        const div = document.createElement("div")
        div.classList.add("inp")

        div.innerHTML = `
            <p>No subjects</p>
        `

        subjectOptions.appendChild(div)
    }
    else {

        department.subjects.forEach(subject => {

            const div = document.createElement("div")
            div.classList.add("inp")

            div.innerHTML = `
                <input type="radio" name="subject" value="${subject.id}" id="${subject.id}">
                <label for="${subject.id}">${subject.name}</label>
            `

             const radio = div.querySelector("input")
            radio.addEventListener("change", () => selectSubject(radio))
            subjectOptions.appendChild(div)
        })
    }
}

function selectSubject(radio) {
    const label = document.querySelector(`label[for="${radio.id}"]`)

    const dropdown = radio.closest(".dropdown")
    const title = dropdown.querySelector(".title")

    title.textContent = label.textContent
}