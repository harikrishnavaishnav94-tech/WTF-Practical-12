
// ==================================
// SPORTIFY - MAIN JAVASCRIPT
// ==================================

// 1. Mobile Navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks?.classList.remove("active");
    });
});


// 2. Dark Mode Toggle
const themeToggle = document.querySelector("#theme-toggle");

if (themeToggle) {
    const savedTheme = localStorage.getItem("sportify-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const currentTheme =
            document.body.classList.contains("dark-mode")
                ? "dark"
                : "light";

        localStorage.setItem("sportify-theme", currentTheme);
    });
}


// 3. News Search
const newsSearch = document.querySelector("#newsSearch");
const newsCards = document.querySelectorAll(".news-card");

if (newsSearch) {
    newsSearch.addEventListener("input", () => {
        const searchValue = newsSearch.value.toLowerCase();

        newsCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();

            card.style.display =
                cardText.includes(searchValue) ? "" : "none";
        });
    });
}


// 4. Match Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const matchCards = document.querySelectorAll(".match-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const selectedSport = button.dataset.filter;

        matchCards.forEach(card => {
            const cardSport = card.dataset.sport;

            if (
                selectedSport === "all" ||
                selectedSport === cardSport
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
});


// 5. Player Favourite System
const favoriteButtons = document.querySelectorAll(".favorite-btn");

let favorites = JSON.parse(
    localStorage.getItem("sportify-favorites") || "[]"
);

favoriteButtons.forEach((button, index) => {

    const playerName =
        button.closest(".player-card")
            ?.querySelector("h3")?.textContent.trim()
        || `player-${index}`;

    button.textContent = favorites.includes(playerName)
        ? "❤️ Added"
        : "♡ Favourite";

    button.addEventListener("click", () => {

        if (favorites.includes(playerName)) {

            favorites = favorites.filter(
                name => name !== playerName
            );

            button.textContent = "♡ Favourite";

        } else {

            favorites.push(playerName);
            button.textContent = "❤️ Added";
        }

        localStorage.setItem(
            "sportify-favorites",
            JSON.stringify(favorites)
        );
    });
});


// 6. Contact Form Validation
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = contactForm.querySelector(
            'input[name="name"]'
        );

        const email = contactForm.querySelector(
            'input[name="email"]'
        );

        const message = contactForm.querySelector(
            "textarea"
        );

        if (!name || !email || !message) {
            alert("Please check the contact form fields.");
            return;
        }

        if (
            name.value.trim() === "" ||
            email.value.trim() === "" ||
            message.value.trim() === ""
        ) {
            alert("Please fill all fields.");
            return;
        }

        if (!email.checkValidity()) {
            alert("Please enter a valid email address.");
            return;
        }

        alert(
            "Thank you, " +
            name.value +
            "! Your message has been received."
        );

        contactForm.reset();
    });
};


// 7. Current Year in Footer
const yearElement = document.querySelector("#year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

console.log("SPORTIFY Website Loaded Successfully!");