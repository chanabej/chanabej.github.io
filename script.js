const toggleButton = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  toggleButton.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

// Pour le slider : 

let position = 0;
const slides = document.querySelector('.slides');

function swipe(direction) {
  const width = document.querySelector('.slides img').clientWidth;
  const totalSlides = document.querySelectorAll('.slides img').length;
  if (direction === 'left' && position < totalSlides - 1) {
    position++;
  } else if (direction === 'left' && position === totalSlides - 1) {
    position = 0;
  } else if (direction === 'right' && position > 0) {
    position--;
  } else if (direction === 'right' && position === 0) {
    position = totalSlides - 1;
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

