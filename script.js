'use strict';

// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const operationsTabContainer = document.querySelector(".operations__tab-container");
const operationsTabs = document.querySelectorAll(".operations__tab");
const operationsTabContent = document.querySelectorAll(".operations__content");

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
document.querySelector('.nav__links').addEventListener("click", function(e){
  e.preventDefault();
  //matching  strategy
  if(e.target.classList.contains("nav__link")){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });  
  }
});

//tabbed components
operationsTabContainer.addEventListener("click", function(e){
  const clicked = e.target.closest(".operations__tab");
  //Gaurd clause
  if(!clicked) return;

  //Remove active classes
  operationsTabs.forEach(el=>el.classList.remove("operations__tab--active"));
  operationsTabContent.forEach(el=>el.classList.remove("operations__content--active"));
  //Add active class
  clicked.classList.add("operations__tab--active");
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
});







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