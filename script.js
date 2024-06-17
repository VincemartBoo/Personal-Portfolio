/* ------------------------------ toggle icon navbar ------------------------------ */
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
};

/* ------------------------------ scroll section active link ------------------------------ */
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove("active");
                document.querySelector('header nav a[href*=' + id + ']').classList.add("active");
            });
        };
    });
    /* ------------------------------ sticky navbar ------------------------------ */
    let header = document.querySelector("header");

    header.classList.toggle("sticky", window.scrollY > 100);

    /* ------------------------------ remove toggle icon and navbar when click navbar link ------------------------------ */
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
};

/* ------------------------------ scroll reveal ------------------------------ */
ScrollReveal({ 
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200 
})

ScrollReveal().reveal('.home-img, .heading', { origin: 'top' });

ScrollReveal().reveal('.home-content, .about-content, .services-container, .projects-container, form', { origin: 'bottom' });

ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'right' });

/* ------------------------------ typed js ------------------------------ */
const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Backend Developer', 'Full-stack Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/* ------------------------------ script for contact ------------------------------ */
const form = document.querySelector("form");
const fullName = document.getElementById("name");
const mobile = document.getElementById("mobile");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const msg = document.getElementById("message");

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br> Mobile Number: ${mobile.value}<br> Email Address: ${email.value}<br> Message: ${msg.value}<br>`;

    Email.send({
        SecureToken : "646fce9d-5747-46bc-99dd-b760a6724ff6",
        To : 'boovincemart@gmail.com',
        From : "boovincemart@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
        message => {
            if (message == "OK") {
                Swal.fire({
                    title: "Success",
                    text: "Message sent successfully!",
                    icon: "success"
                });
            }
        }
    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if (items[2].value != "") {
            checkEmail();
        }

        items[2].addEventListener("keyup", () => {
            checkEmail();
        });

        item.addEventListener("keyup", () => {
             if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    const errorTxtEmail = document.querySelector(".error-txt.email");

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value != "") {
            errorTxtEmail.innerText = "Enter a valid Email Address";
        }
        else {
            errorTxtEmail.innerText = "Email Address can't be blank";
        }
    }
    else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !mobile.classList.contains("error") && !email.classList.contains("error") && !subject.classList.contains("error") && !msg.classList.contains("error")) {
        sendEmail();

        form.reset();
        return false;
    }
    
});