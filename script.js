const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

const observerOptions = {
  root: null,
  threshold: 0.6,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const activeId = entry.target.getAttribute("id");

      navLinks.forEach((link) => link.classList.remove("active"));

      const matchingLink = document.querySelector(`nav a[href$="${activeId}"]`);
      if (matchingLink) {
        matchingLink.classList.add("active");
      }
    }
  });
}, observerOptions);

sections.forEach((section) => sectionObserver.observe(section));

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

const selection = document.getElementById("choose");
const choseOne = document.getElementById("chose-one");
const choseTwo = document.getElementById("chose-two");

selection.addEventListener("change", function () {
  if (selection.value === "more") {
    choseOne.style.display = "none";
    choseTwo.style.display = "flex";
  } else {
    choseTwo.style.display = "none";
    choseOne.style.display = "flex";
  }
});

const cont = document.querySelector(".video-cont");
const slides = document.querySelectorAll(".video-slide");
const prevBtn = cont.querySelector(".fa-angle-left");
const nextBtn = cont.querySelector(".fa-angle-right");
const total = slides.length;
let current = 0;

const track = document.querySelector(".video-track");
const inner = document.createElement("div");
inner.classList.add("video-track-inner");
slides.forEach((slide) => inner.appendChild(slide));
track.appendChild(inner);

const dotsWrapper = document.createElement("div");
dotsWrapper.classList.add("video-dots");
cont.insertAdjacentElement("afterend", dotsWrapper);

const dots = Array.from({ length: total }, (_, i) => {
  const btn = document.createElement("button");
  btn.setAttribute("aria-label", `Go to video ${i + 1}`);
  btn.addEventListener("click", () => goTo(i));
  dotsWrapper.appendChild(btn);
  return btn;
});

function goTo(index) {
  document.querySelectorAll(".video-slide video").forEach((v) => v.pause());

  current = (index + total) % total;
  inner.style.transform = `translateX(-${current * 100}%)`;

  dots.forEach((d, i) => d.classList.toggle("active", i === current));
}

prevBtn.addEventListener("click", () => goTo(current - 1));
nextBtn.addEventListener("click", () => goTo(current + 1));

goTo(0);

const contactForm = document.querySelector("form");
const formStatus = document.getElementById("confirm");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    formStatus.textContent = "";
    formStatus.style.opacity = "1";

    emailjs
      .sendForm("service_uu5o7u7", "template_houqf9x", this)
      .then(() => {
        formStatus.style.color = "#10b981";
        formStatus.textContent =
          "Message sent successfully! Thank you for reaching out.";

        contactForm.reset();
      })
      .catch((error) => {
        console.error("Mail Delivery Failure:", error);
        formStatus.style.color = "#ef4444";
        formStatus.textContent =
          "Failed to send message. Please try again or email me directly.";
      })
      .finally(() => {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;

        setTimeout(() => {
          formStatus.style.opacity = "0";
          setTimeout(() => {
            formStatus.textContent = "";
          }, 300);
        }, 5000);
      });
  });
}
