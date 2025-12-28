// Main JavaScript file for Bdhotels

// Set minimum date for check-in to today
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    const checkInInput = document.getElementById('check_in');
    const checkOutInput = document.getElementById('check_out');
    
    if (checkInInput) {
        checkInInput.setAttribute('min', today);
        checkInInput.addEventListener('change', function() {
            const checkInDate = new Date(this.value);
            checkInDate.setDate(checkInDate.getDate() + 1);
            const minCheckOut = checkInDate.toISOString().split('T')[0];
            if (checkOutInput) {
                checkOutInput.setAttribute('min', minCheckOut);
            }
        });
    }
    
    // Load featured hotels on homepage
    if (document.getElementById('featuredHotels')) {
        loadFeaturedHotels();
    }
});

// Load featured hotels
function loadFeaturedHotels() {
    fetch('php/get-featured-hotels.php')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('featuredHotels');
            if (data.success && data.hotels.length > 0) {
                container.innerHTML = data.hotels.map(hotel => `
                    <div class="hotel-card" onclick="viewHotel(${hotel.id})">
                        <img src="${hotel.image_url}" alt="${hotel.name}">
                        <div class="hotel-info">
                            <h3>${hotel.name}</h3>
                            <p class="hotel-location">📍 ${hotel.location}</p>
                            <div class="hotel-rating">
                                <span class="rating-badge">${hotel.rating}</span>
                                <span>${getRatingText(hotel.rating)}</span>
                            </div>
                            <p class="hotel-price">৳${hotel.price_per_night} <span>/ night</span></p>
                        </div>
                    </div>
                `).join('');
            } else {
                container.innerHTML = '<p>No featured hotels available at the moment.</p>';
            }
        })
        .catch(error => {
            console.error('Error loading hotels:', error);
        });
}

// Get rating text based on score
function getRatingText(rating) {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Average';
    return 'Fair';
}

// View hotel details
function viewHotel(hotelId) {
    window.location.href = `hotel-details.php?id=${hotelId}`;
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Process bKash payment
function processBkashPayment(bookingId, amount) {
    openModal('paymentModal');
    
    // Update payment details in modal
    document.getElementById('paymentAmount').textContent = `৳${amount}`;
    
    // Store booking ID for payment completion
    document.getElementById('completePaymentBtn').onclick = function() {
        completeBkashPayment(bookingId);
    };
}

// Complete bKash payment
function completeBkashPayment(bookingId) {
    const transactionId = 'TRX' + Date.now();
    
    fetch('php/complete-payment.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            booking_id: bookingId,
            transaction_id: transactionId
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Payment completed successfully! Your booking is now pending admin approval.');
            closeModal('paymentModal');
            window.location.href = 'user-bookings.php';
        } else {
            alert('Payment failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during payment.');
    });
}

// Search hotels
function searchHotels() {
    const location = document.getElementById('searchLocation').value;
    const checkIn = document.getElementById('searchCheckIn').value;
    const checkOut = document.getElementById('searchCheckOut').value;
    const rooms = document.getElementById('searchRooms').value;
    
    const params = new URLSearchParams({
        location: location,
        check_in: checkIn,
        check_out: checkOut,
        rooms: rooms
    });
    
    window.location.href = `search-hotels.php?${params.toString()}`;
}

// Admin functions
function approveBooking(bookingId) {
    if (confirm('Are you sure you want to approve this booking?')) {
        updateBookingStatus(bookingId, 'approved');
    }
}

function rejectBooking(bookingId) {
    if (confirm('Are you sure you want to reject this booking?')) {
        updateBookingStatus(bookingId, 'rejected');
    }
}

function updateBookingStatus(bookingId, status) {
    fetch('php/update-booking-status.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            booking_id: bookingId,
            status: status
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Booking status updated successfully!');
            location.reload();
        } else {
            alert('Failed to update booking status: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
    });
}

// Delete hotel (admin)
function deleteHotel(hotelId) {
    if (confirm('Are you sure you want to delete this hotel? This action cannot be undone.')) {
        fetch('php/delete-hotel.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hotel_id: hotelId
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Hotel deleted successfully!');
                location.reload();
            } else {
                alert('Failed to delete hotel: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred.');
        });
    }
}

// Reply to review (admin)
function replyToReview(reviewId) {
    const reply = prompt('Enter your reply to this review:');
    if (reply) {
        fetch('php/reply-review.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                review_id: reviewId,
                reply: reply
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Reply posted successfully!');
                location.reload();
            } else {
                alert('Failed to post reply: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred.');
        });
    }
}

// Form validation
function validateBookingForm() {
    const checkIn = document.getElementById('check_in').value;
    const checkOut = document.getElementById('check_out').value;
    
    if (!checkIn || !checkOut) {
        alert('Please select check-in and check-out dates.');
        return false;
    }
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    if (checkOutDate <= checkInDate) {
        alert('Check-out date must be after check-in date.');
        return false;
    }
    
    return true;
}

// Handle form submissions
function handleFormSubmit(event, formId) {
    event.preventDefault();
    const form = document.getElementById(formId);
    if (form) {
        form.submit();
    }
}
