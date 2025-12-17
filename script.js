// Function to check and apply the saved theme mode (dark or light)
let currentMode = localStorage.getItem('mode');

if (!currentMode) {
    localStorage.setItem('mode', 'dark'); 
    document.body.classList.add('dark');  
} else {
    if (currentMode === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    }
}

// Function to toggle between dark and light modes
const toggleMode = () => {
    const isDarkMode = document.body.classList.contains('dark');
    
    if (isDarkMode) {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        localStorage.setItem('mode', 'light');
    } else {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
        localStorage.setItem('mode', 'dark');
    }
};


// Function to toggle the dropdown menu
function myMenuFunction() {
    const navMenu = document.querySelector(".nav-menu");
    const menuList = navMenu.querySelector(".nav_menu_list");

    if (menuList.style.maxHeight && menuList.style.maxHeight !== "0px") {
        menuList.style.maxHeight = "0px";
    } else {
        menuList.style.maxHeight = "500px";
    }
}

// Function to scroll smoothly to the "about" section
document.getElementById("scrollLink").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
});

// Typing effect implementation for text animation
var typingEffect = new Typed(".typedText", {
    strings: ["Industrial Engineering Student", "Continuous Improvement Enthusiast", "Aspiring Lean Data Analyst"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000,
});

// Scroll animations using ScrollReveal
const sr = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 2000,
    reset: true,
});

sr.reveal(".featured-name", {delay: 10});
sr.reveal(".text-info", {delay: 20});
sr.reveal(".text-btn", {delay: 20});
sr.reveal(".social_icons", {delay: 20});
sr.reveal(".featured-image", {delay: 32});
sr.reveal(".top-header", {});

const srLeft = ScrollReveal({
    origin: "left",
    distance: "80px",
    duration: 2000,
    reset: true,
});

srLeft.reveal(".about-info", {delay: 10});
srLeft.reveal(".skill-left", {delay: 10});
srLeft.reveal(".project-card1", {interval: 20});
srLeft.reveal(".project-card3", {interval: 20});
srLeft.reveal(".contact-info", {delay: 10});

const srRight = ScrollReveal({
    origin: "right",
    distance: "80px",
    duration: 2000,
    reset: true,
});

srRight.reveal(".skill-right", {delay: 10});
srRight.reveal(".education-section", {delay: 10});
srRight.reveal(".project-card2", {interval: 20});
srRight.reveal(".project-card4", {interval: 20});

// Function to update the active link in the navigation bar based on scroll position
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

function scrollActive() {
    let scrollY = window.scrollY;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 60;
        const sectionId = current.getAttribute("id");

        const link = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(nav => nav.classList.remove("active-link"));
            link.classList.add("active-link");
        }
    });
}

// Event listener for smooth scrolling and updating active links on click
navLinks.forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 50,
            behavior: "smooth",
        });

        navLinks.forEach(nav => nav.classList.remove("active-link"));
        this.classList.add("active-link");
    });
});

window.addEventListener("scroll", scrollActive);

// Function to flip cards (Learn More/Return to Front functionality)
const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
const returnButtons = document.querySelectorAll('.return-btn');

learnMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
        const cardInner = button.closest('.card-front').parentElement;
        cardInner.classList.add('flipped');
    });
});

returnButtons.forEach(button => {
    button.addEventListener('click', () => {
        const cardInner = button.closest('.card-back').parentElement;
        cardInner.classList.remove('flipped');
    });
});

// Function to handle the submission of the contact form via email
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    
    const templateParams = {
        user_name: formData.get("user_name"),
        user_email: formData.get("user_email"),
        user_subject: formData.get("user_subject"),
        user_message: formData.get("user_message"),
    };

    emailjs.send('service_um8wecb', 'template_xa9kb2s', templateParams, 'jT79bK9MHavkjxZiq')
        .then(() => {
            contactMessage.textContent = 'Message sent successfully!';
            contactMessage.className = 'green';

            setTimeout(() => {
                contactMessage.textContent = '';
                contactMessage.className = '';
            }, 5000);

            contactForm.reset();
        })
        .catch((error) => {
            console.error("Failed to send message:", error);
            contactMessage.textContent = 'Failed to send message. Please try again.';
            contactMessage.className = 'red';
        });
};

// Event listener for contact form submission
contactForm.addEventListener('submit', sendEmail);
