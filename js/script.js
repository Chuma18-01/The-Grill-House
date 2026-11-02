// The Grill House

document.addEventListener("DOMContentLoaded", function () {

  const enquiryForm = document.getElementById("enquiryForm");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", async function (event) {

      // Stop the page from refreshing
      event.preventDefault();

      const name = document.getElementById("enquiry-name").value.trim();
      const email = document.getElementById("enquiry-email").value.trim();
      const phone = document.getElementById("enquiry-phone").value.trim();
      const type = document.getElementById("enquiry-type").value;
      const message = document.getElementById("enquiry-message").value.trim();

      const error = document.getElementById("enquiryError");
      const result = document.getElementById("enquiryResult");

      error.textContent = "";
      result.textContent = "";

      if(name.length < 2){
         error.textContent = "Please enter your full name.";
         return;
      }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        error.textContent = "Please enter a valid email address.";
        return;
      }
      if(phone && !/^[+\d\s()-]{7,20}$/.test(phone)){
        error.textContent = "Please enter a valid phone number.";
        return;
      }
      if(!type){
        error.textContent = "Please select an enquiry type";
        return;
      }
      if(message.length < 10){
        error.textContent = "Your message must contain at least 10 characters.";
        return;
      }

  const submitButton = enquiryForm.querySelector('button[type="submit"]');

  submitButton.disabled = true;
  result.textContent = "Sending your enquiry...";

  try {
      const response = await fetch(enquiryForm.action, {
          method: "POST",
          body: new FormData(enquiryForm),
          headers: {
              "Accept": "application/json"
          }
      });

      if (response.ok) {
          const messages = {
              menu: "Thank you! Your menu enquiry has been submitted.",
              group: "Thank you! Your group booking enquiry has been submitted. Availability and pricing still need confirmation.",
              birthday: "Thank you! Your birthday celebration enquiry has been submitted. Arrangements still need confirmation.",
              event: "Thank you! Your special event enquiry has been submitted. Our team will need to confirm availability and pricing.",
              other: "Thank you! Your enquiry has been submitted successfully."
          };

          result.textContent = messages[type] || messages.other;
          enquiryForm.reset();
      } else {
          result.textContent = "";
          error.textContent = response.status === 429
              ? "Too many submissions. Please try again later."
              : "Your enquiry could not be sent. Please try again.";
      }
  } catch (err) {
      result.textContent = "";
      error.textContent =
          "Connection error. Please check your internet and try again.";
  } finally {
      submitButton.disabled = false;
  }
    });
  }
});

// Booking Form - The Grill House
document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById("bookingForm");

    if (!bookingForm) return;

    const error = document.getElementById("bookingError");
    const result = document.getElementById("bookingResult");
    const dateInput = bookingForm.querySelector("#date");

    // Prevent selecting past dates
    const today = new Date();
    const localToday = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    dateInput.min = localToday;

    bookingForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        error.textContent = "";
        result.textContent = "";

        const name = bookingForm.elements["name"].value.trim();
        const email = bookingForm.elements["email"].value.trim();
        const phone = bookingForm.elements["phone"].value.trim();
        const date = bookingForm.elements["date"].value;
        const time = bookingForm.elements["time"].value;
        const guests = bookingForm.elements["guests"].value;

        if (name.length < 2) {
            error.textContent = "Please enter your full name.";
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            error.textContent = "Please enter a valid email address.";
            return;
        }

        if (!/^\d{10}$/.test(phone.replace(/\s/g, ""))) {
            error.textContent = "Please enter a valid 10-digit phone number.";
            return;
        }

        if (!date || date < localToday) {
            error.textContent = "Please select a valid future booking date.";
            return;
        }

        if (!time) {
            error.textContent = "Please select a booking time.";
            return;
        }

        if (!guests) {
            error.textContent = "Please select the number of guests.";
            return;
        }

        const submitButton = bookingForm.querySelector(
            'button[type="submit"]'
        );

        submitButton.disabled = true;
        result.textContent = "Sending your booking request...";

        try {
            const response = await fetch(bookingForm.action, {
                method: "POST",
                body: new FormData(bookingForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                result.textContent =
                    "Thank you! Your booking request has been sent. " +
                    "Our team will need to confirm availability.";

                bookingForm.reset();
            } else {
                result.textContent = "";
                error.textContent =
                    "Your booking request could not be sent. Please try again.";
            }
        } catch (err) {
            result.textContent = "";
            error.textContent =
                "Connection error. Please check your internet and try again.";
        } finally {
            submitButton.disabled = false;
        }
    });
});

// Contact Form Validation
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
       contactForm.addEventListener("submit", async function (event) {
          event.preventDefault();

          const name = document.getElementById("contact-name").value.trim();
          const email = document.getElementById("contact-email").value.trim();
          const type = document.getElementById("contact-type").value;
          const message = document.getElementById("contact-message").value.trim();

          const error = document.getElementById("contactError");
          const result = document.getElementById("contactResult");

           error.textContent = "";
           result.textContent = "";

           if(name.length < 2){
              error.textContent = "Please enter your full name.";
              return;
           }
           if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
             error.textContent = "Please enter a valid email address.";
             return;
           }
           if(!type){
             error.textContent = "Please select a message type";
             return;
           }
           if(message.length < 10){
                  error.textContent = "Your message must contain at least 10 characters.";
                  return;
          }
          const submitButton = contactForm.querySelector('button[type="submit');

          submitButton.disabled = true;
          result.textContent = "Sending your message...";

          try{
             const response = await fetch(contactForm.action, {
                  method: "POST",
                  body: new FormData(contactForm),
                  headers: {
                       "Accept": "application/json"
                  }
             });

             if (response.ok) {
                result.textContent =
                      "Thank you! Your message has been submitted successfully.";

                contactForm.reset();
                }else{
                 result.textContent = "";
                 error.textContent =
                     "Your message could not be sent. Please check your details and try again.";
                }
          } catch (err) {
            result.textContent = "";
            error.textContent =
               "Connection error. Please check your internet and try again.";

          } finally {
            submitButton.disabled = false;
          }
      });
    }
});

 // Interactive Map - The Grill House
 document.addEventListener("DOMContentLoaded", function () {
     const mapContainer = document.getElementById("restaurantMap");

     if (mapContainer && typeof L !== "undefined") {
         // Example location: central Cape Town
         const location = [-33.9249, 18.4241];

         const map = L.map("restaurantMap").setView(location, 13);

         L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
             attribution: '&copy; OpenStreetMap contributors',
             maxZoom: 19
         }).addTo(map);

         L.marker(location)
             .addTo(map)
             .bindPopup("Cape Town City Centre - Example Location")
             .openPopup();
     }
 });

 // Food Gallery Lightbox
 document.addEventListener("DOMContentLoaded", function () {
     const images = document.querySelectorAll(".gallery-image");
     const lightbox = document.getElementById("lightbox");
     const lightboxImage = document.getElementById("lightboxImage");
     const closeButton = document.getElementById("closeLightbox");

     if (!lightbox || !lightboxImage || !closeButton) return;

     let previousFocus = null;

     function openLightbox(image) {
         previousFocus = document.activeElement;
         lightboxImage.src = image.src;
         lightboxImage.alt = image.alt;
         lightbox.hidden = false;
         closeButton.focus();
     }

     function closeLightbox() {
         lightbox.hidden = true;
         lightboxImage.removeAttribute("src");
         if (previousFocus) previousFocus.focus();
     }

     images.forEach(function (image) {
         image.addEventListener("click", function () {
             openLightbox(image);
         });

         image.addEventListener("keydown", function (event) {
             if (event.key === "Enter" || event.key === " ") {
                 event.preventDefault();
                 openLightbox(image);
             }
         });
     });

     closeButton.addEventListener("click", closeLightbox);

     lightbox.addEventListener("click", function (event) {
         if (event.target === lightbox) closeLightbox();
     });

     document.addEventListener("keydown", function (event) {
         if (!lightbox.hidden && event.key === "Escape") {
             closeLightbox();
         }
         if (!lightbox.hidden && event.key === "Tab") {
             event.preventDefault();
             closeButton.focus();
         }
     });
 });

// Dynamic Menu Search and Filter
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("menuSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const results = document.getElementById("menuResults");
    const count = document.getElementById("searchCount");

    if (!searchInput || !categoryFilter || !results || !count) {
        return;
    }

    const menuItems = [
        { name: "Classic Beef Burger", price: 95, category: "burgers" },
        { name: "Grilled Chicken Burger", price: 90, category: "burgers" },
        { name: "Cheese Burger", price: 105, category: "burgers" },
        { name: "Grilled Steak", price: 210, category: "grill" },
        { name: "BBQ Ribs", price: 195, category: "grill" },
        { name: "Grilled Chicken", price: 180, category: "grill" },
        { name: "Chicken Wings", price: 85, category: "sides" },
        { name: "Loaded Fries", price: 70, category: "sides" },
        { name: "Side Salad", price: 50, category: "sides" },
        { name: "Soft Drinks", price: 30, category: "drinks" },
        { name: "Fruit Mocktails", price: 55, category: "drinks" },
        { name: "Cocktails", price: 120, category: "drinks" },
        { name: "Wines", price: 145, category: "drinks" },
        { name: "Beers", price: 65, category: "drinks" },
        { name: "Milkshakes", price: 50, category: "drinks" }
    ];

    function displayMenu() {
        const search = searchInput.value.trim().toLowerCase();
        const category = categoryFilter.value;

        const filteredItems = menuItems.filter(function (item) {
            const matchesSearch = item.name.toLowerCase().includes(search);
            const matchesCategory =
                category === "all" || item.category === category;

            return matchesSearch && matchesCategory;
        });

        results.replaceChildren();

        filteredItems.forEach(function (item) {
            const card = document.createElement("article");
            card.className = "menu-result-card";

            const heading = document.createElement("h3");
            heading.textContent = item.name;

            const price = document.createElement("p");
            price.textContent = "R" + item.price;

            card.append(heading, price);
            results.appendChild(card);
        });

        count.textContent = filteredItems.length +
            " menu item(s) found.";

        if (filteredItems.length === 0) {
            const message = document.createElement("p");
            message.textContent = "No matching dishes found.";
            results.appendChild(message);
        }
    }

    searchInput.addEventListener("input", displayMenu);
    categoryFilter.addEventListener("change", displayMenu);

    displayMenu();
});
