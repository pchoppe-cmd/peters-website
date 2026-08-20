// Highlights the clicked top-nav bubble in yellow, and outlines the entire
// matching section with a subtle yellow glow, to show which tool you jumped to.

const bubbleLinks = document.querySelectorAll('nav.bubble-nav a');
const toolSections = document.querySelectorAll('.tool-section');

bubbleLinks.forEach((link) => {
  link.addEventListener('click', () => {
    bubbleLinks.forEach((l) => l.classList.remove('nav-active'));
    link.classList.add('nav-active');

    toolSections.forEach((section) => section.classList.remove('section-active'));
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.classList.add('section-active');
  });
});
