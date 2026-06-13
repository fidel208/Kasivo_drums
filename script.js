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

      const matchingLink = document.querySelector(
        `nav a[href$="${activeId}"]`,
      );
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
