const card = document.querySelector(".card");
const flipButton = document.querySelector(".flip-btn");

flipButton.addEventListener("click", () => {
    card.classList.toggle("flipped");
});