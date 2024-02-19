const buyTicketsBtn = document.getElementById("buy-ticket-btn");
const seatContainerSection = document.getElementById("seat-container-box");

buyTicketsBtn.addEventListener("click", function () {
	seatContainerSection.scrollIntoView({ behavior: "smooth" });
});

const continueBtn = document.getElementById("continue-btn");
const headerID = document.getElementById("header-id");

continueBtn.addEventListener("click", function () {
	headerID.scrollIntoView({ behavior: "smooth" });
});
