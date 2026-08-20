// Highlights the clicked top-nav bubble in yellow, and outlines the matching
// input box with a subtle yellow border, to show which section you jumped to.

const bubbleLinks = document.querySelectorAll('nav.bubble-nav a');

const cardForSection = {
  '#scrambler': 'scrambler-card',
  '#currency': 'currency-card',
  '#measurement': 'measurement-card',
};

const allCards = Object.values(cardForSection)
  .map((id) => document.getElementById(id))
  .filter(Boolean);

bubbleLinks.forEach((link) => {
  link.addEventListener('click', () => {
    bubbleLinks.forEach((l) => l.classList.remove('nav-active'));
    link.classList.add('nav-active');

    allCards.forEach((card) => card.classList.remove('box-active'));
    const targetHref = link.getAttribute('href');
    const cardId = cardForSection[targetHref];
    const card = cardId && document.getElementById(cardId);
    if (card) card.classList.add('box-active');
  });
});
