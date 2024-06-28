document.addEventListener('DOMContentLoaded', function() {
    const seatMapContainer = document.querySelector('.seat-map-container');
    const movieSelect = document.getElementById('movieSelect');
    const selectedSeatsInput = document.getElementById('selectedSeats');
    const totalCostInput = document.getElementById('totalCost');
    const bookingForm = document.getElementById('bookingForm');
    const bookingPopup = document.getElementById('bookingPopup');
    const popupMovie = document.getElementById('popupMovie');
    const popupSeats = document.getElementById('popupSeats');
    const popupCost = document.getElementById('popupCost');
    
    let movieCost = 0;
    let selectedSeats = [];

    // Event listener for movie selection
    movieSelect.addEventListener('change', function() {
        movieCost = parseInt(movieSelect.value);
        updateTotalCost();
    });

    // Create seats dynamically
    const createSeats = () => {
        const rows = ['A', 'B', 'C', 'D', 'E', 'F']; // Update with more rows as needed
        const seatsPerRow = 6; // Update with more seats per row as needed

        rows.forEach(row => {
            const seatRow = document.createElement('div');
            seatRow.classList.add('seat-row');
            for (let i = 1; i <= seatsPerRow; i++) {
                const seat = document.createElement('div');
                seat.classList.add('seat', 'available');
                seat.textContent = row + i;
                seat.dataset.seat = row + i;
                seat.dataset.row = row; // Store row information in dataset
                seatRow.appendChild(seat);
            }
            seatMapContainer.appendChild(seatRow);
        });

        // Event listeners for seat selection
        seatMapContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('seat') && e.target.classList.contains('available')) {
                e.target.classList.toggle('selected');
                updateSelectedSeats();
                updateTotalCost();
            }
        });
    };

    // Function to update selected seats
    const updateSelectedSeats = () => {
        selectedSeats = [];
        const selectedSeatsElements = document.querySelectorAll('.seat.selected');
        selectedSeatsElements.forEach(seat => {
            selectedSeats.push(seat.dataset.seat);
        });
        selectedSeatsInput.value = selectedSeats.join(', ');
    };

    // Function to update total cost based on selected seats and movie
    const updateTotalCost = () => {
        const numSeats = selectedSeats.length;
        const totalCost = numSeats * movieCost;
        totalCostInput.value = '$' + totalCost.toFixed(2);
    };

    // Handle form submission
    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Update popup content
        const selectedMovie = movieSelect.options[movieSelect.selectedIndex].text;
        popupMovie.textContent = selectedMovie;
        popupSeats.textContent = selectedSeats.join(', ');
        popupCost.textContent = '$' + totalCostInput.value;

        // Display popup
        bookingPopup.style.display = 'block';
    });

    // Close popup function
    function closePopup() {
        bookingPopup.style.display = 'none';
    }

    // Initialize seat map
    createSeats();
});
