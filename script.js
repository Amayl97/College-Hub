const services = document.querySelectorAll(".service");


services.forEach(service => {
    service.addEventListener("click", () => {
        window.location.href = "./html_pages/" + service.dataset.page;
    })
})