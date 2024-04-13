'use strict';

// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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
