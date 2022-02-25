// round text at header
let roundedText = document.querySelectorAll('.text-showreel > div > .char');
let roundedText2 = document.querySelectorAll('.text-showreel > div > .char2');


const roundText = () => {
    for ( i = 0; i < roundedText.length; i++){
        let rotation = i * (360/roundedText.length);
        gsap.set(roundedText[i], {rotate : rotation, transformOrigin: '0px 90px', x: 0, y: -90})
    }
}

const roundText2 = () => {
    for ( i = 0; i < roundedText2.length; i++){
        let rotation = i * (360/roundedText2.length);
        gsap.set(roundedText2[i], {rotate : rotation, transformOrigin: '0px 60px', x: 0, y: -60})
    }
}

let roundedTextMobile = document.querySelectorAll('.text-showreel-mobile > div > .char');
let roundedText2Mobile = document.querySelectorAll('.text-showreel-mobile > div > .char2');

const roundTextMobile = () => {
    for ( i = 0; i < roundedTextMobile.length; i++){
        let rotation = i * (360/roundedTextMobile.length);
        gsap.set(roundedTextMobile[i], {rotate : rotation, transformOrigin: '0px 60px', x: 0, y: -60})
    }
}

const roundText2Mobile = () => {
    for ( i = 0; i < roundedText2Mobile.length; i++){
        let rotation = i * (360/roundedText2Mobile.length);
        gsap.set(roundedText2Mobile[i], {rotate : rotation, transformOrigin: '0px 40px', x: 0, y: -40})
    }
}

const init = () => {
    roundText();
    roundText2();
    roundTextMobile();
    roundText2Mobile();
}

window.addEventListener('load', init())

// toggle nav open and close
let mobileNav = document.querySelector('.mobile-nav');
let navMenu = document.querySelector('.nav-ul')

mobileNav.addEventListener('click', () => {
    if (navMenu.classList.contains('active')){
        navMenu.classList.remove('active')
    }else{
        navMenu.classList.add('active')
    }
})

// implementing smoothscroll
gsap.registerPlugin(ScrollTrigger);

// setting up locomotive scroll
const locoScroll = new LocomotiveScroll({
    el: document.querySelector('.smooth-scroll'),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".smooth-scroll", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
  });



// page animation
let hero_tl = gsap.timeline({defaults: {ease: "power4.inOut", duration: 2}});

hero_tl
.from('.text-left h2', {opacity: 0, yPercent: 100})
.from('.text-right', {opacity: 0, yPercent: 100}, '-=1.6')
.from('.text-left p', {opacity: 0, yPercent: 100}, '-=1.6')
.from('.text-showreel', {opacity: 0, rotate: 360, scale: .5}, '-=2s')

// load screen animation
// disable scroll
locoScroll.stop()
hero_tl.pause()
// remove loader
window.addEventListener('load', () => {
    // remove loader animation
    setTimeout(() => {
    gsap.to('#preloader', {yPercent: -110, duration: 1.5});
    hero_tl.paused(false)
    }, 2000)
    // restart scroll
    locoScroll.start()
}) 
// enable scroll



let s1_tl = gsap.timeline({defaults: {ease: 'power4.inOut'}, scrollTrigger: {trigger: '.section1', scroller: '.smooth-scroll', start: 'top bottom', toggleActions: "play none none reset"}})

s1_tl.from('.section1 h2', {opacity: 0, yPercent: 100, duration: 1.5})
.to('.services h3', {clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", y: 0, opacity: 1, scrollTrigger: {
    scroller: '.smooth-scroll',
    scrub: true
}}, '-=1')
.to('.services ul li', {clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", stagger: .1, y:0, opacity: 1}, '-=1')
.to('.desc', { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", y: 0, opacity: 1, duration: 1.5}, '-=1')

// let project_tl = gsap.timeline({defaults: {ease: 'power4.inOut'}, scrollTrigger:{trigger: ".section2", scrub: 1, pin: ".section2 h2"}});

gsap.to('.section2 h2', { scrollTrigger:{
    trigger: '.section2', scrub: 1, pin:'.section2 h2', start: 'top top', end: '+=1300px'
}})


gsap.from('.section3 h2', {opacity: 0, yPercent: 100, duration: 1, stagger: .2, ease: 'power4.inOut', scrollTrigger: {
    trigger: ".section3",
    scroll: '.smooth-scroll',
    toggleActions: 'play none none reset'
}})

let footer_tl = gsap.timeline({defaults :{duration: 1.5, ease: "power4.inOut"},scrollTrigger: {
    trigger: 'footer', toggleActions: "play none none reset"
}})

footer_tl.from('footer h2', {opacity: 0, yPercent: 100})
.from('footer div', {opacity: 0, y:50, stagger: .5}, "-=1.2")
.from('footer ul', {opacity: 0, y: 50}, "-=1.2 " )
  
  
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

  // setting up parallax scroll
  const parallax = document.querySelectorAll(".projects");
parallax.forEach(elem => {
  gsap.to(elem, {
    scrollTrigger: {
      trigger: elem,
      scrub: true,
      scroller: ".smooth-scroll",
    }, 
    y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
    ease: "power4.inOut"
  });
});

const parallax2 = document.querySelectorAll(".parallax-elem");
parallax2.forEach(elem => {
  gsap.to(elem, {
    scrollTrigger: {
      trigger: elem,
      scrub: true,
      scroller: ".smooth-scroll",
    }, 
    y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
    ease: "power4.inOut"
  });
});

