const seatButtons = document.getElementsByClassName("seat-btn");
// get the seatNumber ID
const seatNumber = document.getElementById("seat-number");
const seatNumberTable = document.getElementById("seat-number-table");
let selectedCount = 0; // Counter to track the number of selected elements
let seatCount = seatButtons.length;

// Function to update the seat number table
function updateSeatNumberTable() {
	seatNumberTable.innerText = selectedCount;
	seatNumber.innerText = seatCount;
}

// Loop through each seat button and add event listener
for (let i = 0; i < seatButtons.length; i++) {
	const seatButton = seatButtons[i];
	seatButton.addEventListener("click", function () {
		if (selectedCount < 4 || this.classList.contains("bg-green-500")) {
			// Toggle between the two sets of classes
			this.classList.toggle("bg-slate-100");
			this.classList.toggle("text-gray-500");
			this.classList.toggle("bg-green-500");
			this.classList.toggle("text-white");

			// Adjust the selected count based on the button's current state
			if (this.classList.contains("bg-green-500")) {
				selectedCount++; // If the button is selected
				seatCount--;
			} else {
				selectedCount--; // If the button is deselected
				seatCount++;
			}

			// Update the seat number table
			updateSeatNumberTable();
		} else {
			alert("You can't select more than 4 seats!");
			return;
		}
	});
}

// Initial update of the seat number table
updateSeatNumberTable();

// Add event listeners to buttons
const tableBody = document.getElementById("table-body");
for (let i = 0; i < seatButtons.length; i++) {
	seatButtons[i].addEventListener("click", function () {
		const seat = this.textContent; // Get the seat from button text
		addToTableRow(seat);
	});
}

// Track the number of selected seats
let selectedSeatCount = 0;

// Object to track selected seats
const selectedSeatMap = {};

// Function to update base total price
function updateTotalPrice() {
	const totalPriceElement = document.getElementById("base-total-price");
	const grandTotalPrice = document.getElementById("grand-total-price");
	const totalPrice = selectedSeatCount * 550;
	totalPriceElement.innerText = totalPrice;
	grandTotalPrice.innerText = totalPrice;
	return parseInt(totalPrice);
}

// addToTableRow function
function addToTableRow(seat) {
	const newRow = document.createElement("tr");

	// Check if seat is already selected
	if (selectedSeatMap[seat]) {
		// If seat is already selected, remove the corresponding row
		const existingRow = document.getElementById(`row-${seat}`);
		existingRow.remove();
		// Update selectedSeatMap object and decrement selectedSeatCount
		delete selectedSeatMap[seat];
		selectedSeatCount--;
	} else if (selectedSeatCount < 4) {
		// If seat is not selected and selectedSeatCount is less than 5, add new row
		newRow.id = `row-${seat}`;
		newRow.innerHTML = `
            <td>${seat}</td>
            <td>Economy</td>
            <td>550</td>`;
		tableBody.appendChild(newRow);
		// Update selectedSeatMap object and increment selectedSeatCount
		selectedSeatMap[seat] = true;
		selectedSeatCount++;
	}

	// Update total price after any changes to selectedSeatCount
	updateTotalPrice();
}

// discount section
const applyBtn = document.getElementById("apply-btn");

applyBtn.addEventListener("click", function () {
	const coupon1 = "NEW 15";
	const coupon2 = "Couple 20";
	const couponField = document.getElementById("coupon-field");
	const couponValue = couponField.value;
	const couponInputField = document.getElementById("apply-coupon-input-field");
	let discountedPrice;

	if (couponValue === coupon1) {
		// Apply 15% discount for coupon1
		discountedPrice = updateTotalPrice() * 0.85; // 15% off
		couponInputField.remove();
	} else if (couponValue === coupon2) {
		// Apply 20% discount for coupon2
		discountedPrice = updateTotalPrice() * 0.8; // 20% off
		couponInputField.remove();
	} else {
		alert("Not a valid coupon. Please try again.");
	}

	// Update total price after applying the discount
	const totalPriceElement = document.getElementById("grand-total-price");
	totalPriceElement.innerText = discountedPrice || updateTotalPrice();

	couponField.value = "";
});
