const buyTicketsBtn = document.getElementById("buy-ticket-btn");
const seatContainerSection = document.getElementById("seat-container-box");

buyTicketsBtn.addEventListener("click", function () {
	// console.log(buyTicketsBtn);
	// console.log(ticketSection);
	seatContainerSection.scrollIntoView({ behavior: "smooth" });
});
