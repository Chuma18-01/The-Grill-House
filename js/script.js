// The Grill House

document.addEventListener("DOMContentLoaded", function () {

  const enquiryForm = document.getElementById("enquiryForm");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (event) {

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

      const response = type === "menu"
            ? "Please visit our menu page for more information."
            : type === "group" || type === "birthday" || type === "event"
            ? "Thank you! Our team will need to go confirm availability and pricing for your event."
            : "Thank you! Your enquiry details have been checked.";

     result.textContent = response +
            "This is a demo response. No enquiry has been sent.";

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
