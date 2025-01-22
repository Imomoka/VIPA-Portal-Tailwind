document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript file is loaded and running!");
    const npnScreen = document.getElementById("npn-screen");
    const calendarScreen = document.getElementById("calendar-screen");
    const calendar = document.getElementById("calendar");
    const submitNPNButton = document.getElementById("submit-npn");
    const shiftButtons = document.querySelectorAll(".shift-btn");
    const confirmBookingButton = document.getElementById("confirm-booking");

    let selectedShift = "";

    // Check if NPN is already stored
    if (localStorage.getItem("userNPN")) {
        npnScreen.classList.add("hidden");
        calendarScreen.classList.remove("hidden");
        generateCalendar();
    }

    // Validate and store NPN
    submitNPNButton.addEventListener("click", function () {
        const npnInput = document.getElementById("npn-input").value;
        console.log(npnInput);
        const errorMsg = document.getElementById("npn-error");

        if (npnInput.length < 6) {
            errorMsg.classList.remove("hidden");
            return;
        }
        errorMsg.classList.add("hidden");
        localStorage.setItem("userNPN", npnInput);
        npnScreen.classList.add("hidden");
        calendarScreen.classList.remove("hidden");
        generateCalendar();
    });

    // Generate a simple calendar (current month)
    function generateCalendar() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        calendar.innerHTML = ""; // Clear existing days

        for (let day = 1; day <= daysInMonth; day++) {
            const dateBox = document.createElement("div");
            dateBox.className = "p-3 bg-gray-800 text-center rounded cursor-pointer";
            dateBox.textContent = day;
            dateBox.dataset.date = `${currentYear}-${currentMonth + 1}-${day}`;
            dateBox.addEventListener("click", function () {
                selectDate(this.dataset.date);
            });
            calendar.appendChild(dateBox);
        }
    }

    // Handle date selection
    function selectDate(date) {
        document.getElementById("selected-date").textContent = `Booking for ${date}`;
        document.getElementById("booking-form").classList.remove("hidden");
        localStorage.setItem("selectedDate", date);
    }

    // Handle shift selection
    shiftButtons.forEach(button => {
        button.addEventListener("click", function () {
            selectedShift = this.dataset.shift;
            shiftButtons.forEach(btn => btn.classList.remove("bg-gold", "text-black"));
            this.classList.add("bg-gold", "text-black");
        });
    });

    // Confirm booking
    confirmBookingButton.addEventListener("click", function () {
        if (!selectedShift) {
            alert("Please select a shift.");
            return;
        }
        const bookedDate = localStorage.getItem("selectedDate");
        const bookingData = {
            date: bookedDate,
            shift: selectedShift
        };
        localStorage.setItem("booking_" + bookedDate, JSON.stringify(bookingData));

        document.getElementById("confirmation-msg").textContent = `Booking confirmed for ${bookedDate} - ${selectedShift} shift.`;
        document.getElementById("confirmation-msg").classList.remove("hidden");
    });
});
