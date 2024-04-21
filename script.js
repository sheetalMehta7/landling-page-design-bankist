'use strict';

// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section = document.querySelectorAll('.section');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

const operationsTabContainer = document.querySelector(
  '.operations__tab-container'
);
const operationsTabs = document.querySelectorAll('.operations__tab');
const operationsTabContent = document.querySelectorAll('.operations__content');
const imageTarget = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const sliderBtnLeft = document.querySelector('.slider__btn--left');
const sliderBtnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(item => item.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//btn scroll to section 1
btnScrollTo.addEventListener('click', e => {
  //oe way of scrolling to a particular position
  // const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1coords.left+window.scrollX ,
  //   top:  s1coords.top+window.scrollY,
  //   behavior: "smooth"
  // });

  //mordern way of scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});

//scroll to particular section
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //matching  strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//tabbed components
operationsTabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  //Gaurd clause
  if (!clicked) return;

  //Remove active classes
  operationsTabs.forEach(el => el.classList.remove('operations__tab--active'));
  operationsTabContent.forEach(el =>
    el.classList.remove('operations__content--active')
  );
  //Add active class
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//hover effect on links(fade animation)
function hoverEffect(e) {
  if (e.target.classList.contains('nav__link')) {
    const sibling = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = e.target.closest('.nav').querySelector('img');
    sibling.forEach(li => {
      if (li !== e.target) {
        li.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
}
nav.addEventListener('mouseover', hoverEffect.bind(0.5));
nav.addEventListener('mouseout', hoverEffect.bind(1));

//sticky Navigation using intersection observer API
const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//reveal sections as we scroll
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
section.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazing Loading Images
const lazyFun = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(lazyFun, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imageTarget.forEach(img => imageObserver.observe(img));

//slider using transform approach.
function slider() {
  let currSlide = 0;
  let totalSlide = slides.length;

  const goToSlide = slideNum => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slideNum)}%)`)
    );
  };

  const createDots = () => {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide=${i}></button>`
      );
    });
  };

  const activateDot = slide => {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const init = () => {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  const leftSlide = () => {
    if (currSlide === 0) {
      currSlide = totalSlide - 1;
    } else currSlide--;
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const rightSlide = () => {
    if (currSlide === totalSlide - 1) {
      currSlide = 0;
    } else currSlide++;
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  sliderBtnLeft.addEventListener('click', leftSlide);
  sliderBtnRight.addEventListener('click', rightSlide);

  //change slides on keystroke.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') rightSlide();
    if (e.key === 'ArrowLeft') leftSlide();
  });

  dotsContainer.addEventListener('click', function (e) {
    if (!e.target.classList.contains('dots__dot')) return;
    const clickedDot = e.target.dataset.slide;
    goToSlide(clickedDot);
    activateDot(clickedDot);
  });
}

slider();



//slider (my-approach)
// let activeSlide = 1;
// (function () {
//   slides.forEach((slide, index) => {
//     if (index === 0) return;
//     slide.style.opacity = 0;
//     slide.style.visibility = 'hidden';
//   });
// })();
// function changeSlide(prevSlide) {
//   slides[prevSlide - 1].style.opacity = 0;
//   slides[prevSlide - 1].visibility = 'hidden';
//   slides[activeSlide - 1].style.opacity = 1;
//   slides[activeSlide - 1].style.visibility = 'visible';
// }

// sliderBtnLeft.addEventListener('click', function () {
//   const prevSlide = activeSlide;
//   if (activeSlide === 1) {
//     activeSlide = slides.length;
//   } else activeSlide--;
//   changeSlide(prevSlide);
// });
// sliderBtnRight.addEventListener('click', function () {
//   const prevSlide = activeSlide;
//   if (activeSlide === slides.length) {
//     activeSlide = 1;
//   } else activeSlide++;
//   changeSlide(prevSlide);
// });

//code to understand event propagation
// function setColor(min, max) {
//   return (Math.floor((Math.random() * (max -min +1 )) + min));
// }

// document.querySelectorAll('.nav__link').forEach(item =>item.addEventListener(
//   'click',
//   function(e){
//     console.log(this, "LINK");
//     console.log(e.target, e.currentTarget);
//     e.target.style.backgroundColor = `rgb(${setColor(0, 255)}, ${setColor(0, 255)}, ${setColor(0, 255)})`;
//   },
//   false
// ));

// document.querySelectorAll('.nav__links').forEach(item =>item.addEventListener(
//   'click',
//   function(e){
//     console.log(this, "CONTAINER");
//     console.log(e.target, e.currentTarget);
//    this.style.backgroundColor = `rgb(${setColor(0, 255)}, ${setColor(0, 255)}, ${setColor(0, 255)})`;
//   })
// );

// document.querySelectorAll('.nav').forEach(item =>item.addEventListener(
//   'click',
//   function(e){
//     console.log(this, "NAV");
//     console.log(e.target, e.currentTarget);
//    this.style.backgroundColor= `rgb(${setColor(0, 255)}, ${setColor(0, 255)}, ${setColor(0, 255)})`;
//   }
// ))

//event delegation
// document.querySelectorAll('.nav__link').forEach(link =>
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     //this is not the optimize way of handling this event, as multiple copies of this call back fun will be created for each element
//     //therefore event delegation is used which uses the concept of event bubbling and only one event is attached to the main common parent element where we will attach the event listener
//   })
// );

// //DOM Traversing
// const h1 = document.querySelector("h1");

// //Going downwards: child
// console.log(h1.querySelectorAll(".highlight"));

// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);

// //Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// console.log(h1.closest(".header"));

// //Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.parentElement.children)

//this is my approach of solving the problem of tabbed components
// operationsTabContainer.addEventListener("click", function(e){
// if(e.target.classList.contains("operations__tab")){
//   const currentab = e.target.getAttribute("data-tab");
//   document.querySelector(`.operations__content--${currentab}`).classList.remove("operations__content--active");
//   const previousTab = [...operationsTabContainer.children].filter(el=>el.classList.contains("operations__tab--active"));
//   const previousTabContent = [...operationsTabContent].filter(el=>el.classList.contains("operations__content--active"));

//   //remove the active class from tab and content
//   previousTab[0].classList.remove("operations__tab--active");
//   previousTabContent[0].classList.remove("operations__content--active");

//   //add the active class the target tab and content
//   const tabNum = e.target.getAttribute("data-tab");
//   console.log(tabNum);
//   e.target.classList.add("operations__tab--active");
//   const activeContent = document.querySelector(`.operations__content--${tabNum}`);
//   activeContent.classList.add("operations__content--active");
// }
// });

//hover effect on links(fade animation)
// nav.addEventListener('mouseover', function (e) {
//   if(e.target.classList.contains("nav__link")){
//    const sibling = e.target.closest(".nav").querySelectorAll(".nav__link");
//    const logo = e.target.closest(".nav").querySelector("img");
//    sibling.forEach(li=>{if(li !== e.target){li.style.opacity = "0.5"}});
//    logo.style.opacity = "0.5";
//   }
// });
// nav.addEventListener('mouseout', function (e) {
//   if(e.target.classList.contains("nav__link")){
//     const sibling = e.target.closest(".nav").querySelectorAll(".nav__link");
//     const logo = e.target.closest(".nav").querySelector("img");
//     sibling.forEach(li=>{if(li !== e.target){li.style.opacity = "1"}});
//     logo.style.opacity = "1";
//   }
// });

//sticky Navigation
// window.addEventListener('scroll', function () {
//   const yCoords = section1.getBoundingClientRect().y;
//   // if (yCoords <= 0) {
//   //   nav.classList.add('sticky');
//   // } else {
//   //   nav.classList.remove('sticky');
//   // }

//   if(window.screenY >= yCoords) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');

//   //not an optimize way of handling this
// });

//use of interection observer API
// const obsCallBack = function(entries, observer){
//   entries.forEach(entry=>console.log(entry));
// };

// const obsOptions = {
//   root: null, // null here refers to view port, the interaction is observed b/w vwh and section1
//   threshold: 0.1,// tells about interaction in %, it can accept array as well
//   rootMargin: 0 //in px margin for target element, can -, +
// }
// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);


//dummy slider
// function dummySlider() {
//   const slides = document.querySelectorAll('.slider-item');
//   const sliderBtnLeft = document.querySelector('.slider__btn--left1');
//   const sliderBtnRight = document.querySelector('.slider__btn--right1');

//   let currSlide = 0;
//   let totalSlide = slides.length;

//   const goToSlide = slideNum => {
//     slides.forEach((s, i) => {
//       const slideWidth = slides[i].getBoundingClientRect().width;
//       s.style.transform = `translateX(calc(${100 * (i - slideNum)}% + ${10 * i}%))`;
//     });
//   };

//   const init = () => {
//     goToSlide(0);
//   };

//   init();

//   const leftSlide = () => {
//     if (currSlide === 0) {
//       currSlide = totalSlide - 1;
//     } else currSlide--;
//     goToSlide(currSlide);
//   };

//   const rightSlide = () => {
//     if (currSlide === totalSlide - 1) {
//       currSlide = 0;
//     } else currSlide++;
//     goToSlide(currSlide);
//   };

//   sliderBtnLeft.addEventListener('click', leftSlide);
//   sliderBtnRight.addEventListener('click', rightSlide);
// }

// dummySlider();