const hearts = document.querySelectorAll(".heart");

hearts.forEach((heart) => {

  heart.addEventListener("click", () => {

    heart.classList.toggle("active");

    const icon = heart.querySelector("i");

    icon.classList.toggle("fa-regular");
    icon.classList.toggle("fa-solid");

  });

});