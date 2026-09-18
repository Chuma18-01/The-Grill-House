// The Grill House

document.addEventListener("DOMContentLoaded", function () {

  const enquiryForm = document.getElementById("enquiryForm");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (event) {

      // Stop the page from refreshing
      event.preventDefault();

      // Show confirmation message
      alert("Thank you! Your enquiry has been submitted successfully.");

      //Clear the form
      enquiryForm.reset();
    });
  }
});

// Booking Form

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    alert("Thank you! Your table booking request has been submitted successfully.");

    bookingForm.reset();

  });
}
