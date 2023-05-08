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

const slider = document.querySelector('.slider');
const dotsContainer = slider.querySelector('.slider-dots');
let activeSlide = 0;

// Boucle à travers chaque image
slides.forEach((slide, index) => {
  // Crée un point avec la classe 'slider-dot'
  const dot = document.createElement('div');
  dot.classList.add('slider-dot');
  
  // Ajoute la classe 'active' au point correspondant à l'image active
  if (index === activeSlide) {
    dot.classList.add('active');
  }
  
  // Ajoute un écouteur d'événements pour changer d'image lorsque le point est cliqué
  dot.addEventListener('click', () => {
    activeSlide = index;
    moveSlide();
  });
  
  // Ajoute le point au conteneur de points
  dotsContainer.appendChild(dot);
});

function moveSlide() {
  // Déplace le slider vers l'image active
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(-${activeSlide * 100}%)`;
  });
  
  // Met à jour la classe 'active' du point correspondant à l'image active
  dotsContainer.querySelectorAll('.slider-dot').forEach((dot, index) => {
    if (index === activeSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Appelle moveSlide() pour afficher l'image initiale
moveSlide();


// Vérifie si l'utilisateur accède au site depuis un téléphone mobile
if (/Mobile/.test(navigator.userAgent)) {
  // Crée une pastille pour chaque image
  slides.forEach((slide, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot-mobile');
    if (index === activeSlide) {
      dot.classList.add('active');
    }
    dot.addEventListener('click', () => {
      activeSlide = index;
      moveSlide();
    });
    // Ajoute la pastille au conteneur des pastilles mobiles
    dotsMobileContainer.appendChild(dot);
  });

  // Met à jour la pastille active
  function updateActiveDotMobile() {
    dotsMobileContainer.querySelectorAll('.slider-dot-mobile').forEach((dot, index) => {
      if (index === activeSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Ajoute un écouteur d'événement pour mettre à jour la pastille active
  slider.addEventListener('scroll', () => {
    activeSlide = Math.round(slider.scrollLeft / slider.clientWidth);
    updateActiveDotMobile();
  });

  // Appelle updateActiveDotMobile() pour afficher la pastille initiale
  updateActiveDotMobile();
}

