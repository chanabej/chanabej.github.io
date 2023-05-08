const toggleButton = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

toggleButton.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Slider : 

const slides = document.querySelector('.slides');
let position = 0;

function swipe(direction) {
  const width = slides.querySelector('img').clientWidth;
  const totalSlides = document.querySelectorAll('.slides img').length;

  if (direction === 'left') {
    position = (position + 1) % totalSlides;
  } else if (direction === 'right') {
    position = (position - 1 + totalSlides) % totalSlides;
  }

  slides.style.transform = `translateX(-${position * width}px)`;
}

slides.addEventListener('touchstart', e => {
  const touchStartX = e.touches[0].clientX;
  let touchEndX = 0;

  slides.addEventListener('touchend', function swipeOnTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    const direction = touchStartX > touchEndX ? 'left' : 'right';
    swipe(direction);
    slides.removeEventListener('touchend', swipeOnTouchEnd);
  });
});

if (!("ontouchstart" in document.documentElement)) {
  let mouseDownX = 0;
  let mouseUpX = 0;

  slides.addEventListener('mousedown', e => {
    mouseDownX = e.clientX;
  });

  slides.addEventListener('mouseup', e => {
    mouseUpX = e.clientX;
    const direction = mouseDownX > mouseUpX ? 'left' : 'right';
    swipe(direction);
  });
}

const leftArrow = document.querySelector('.slider-navigation__left-arrow');
const rightArrow = document.querySelector('.slider-navigation__right-arrow');

leftArrow.addEventListener('click', () => swipe('right'));
rightArrow.addEventListener('click', () => swipe('left'));

