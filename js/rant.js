const rantPaper = document.querySelector(".rant-paper");

const rantWriting = document.querySelector(".rant-writing");
const rantReady = document.querySelector(".rant-ready");
const rantFinished = document.querySelector(".rant-finished");

const doneBtn = document.querySelector(".done-btn");
const flyBtn = document.querySelector(".fly-btn");
const againBtn = document.querySelector(".again-btn");

const rantInput = document.querySelector(".rant-input");


// DONE → show the "Feel Better?" state

doneBtn.addEventListener("click", () => {

  rantWriting.style.display = "none";
  rantReady.style.display = "flex";

});


// FLY AWAY → send the paper away

flyBtn.addEventListener("click", () => {

  rantReady.style.display = "none";

  rantPaper.classList.add("flying-away");

  setTimeout(() => {

    // Delete the rant
    rantInput.value = "";

    // Remove the animation class
    rantPaper.classList.remove("flying-away");

    // Show the final state
    rantFinished.style.display = "flex";

  }, 1400);

});


// WRITE ANOTHER → return to writing

againBtn.addEventListener("click", () => {

  rantFinished.style.display = "none";
  rantWriting.style.display = "flex";

});