let roundedText = document.querySelectorAll('.char');
let roundedText2 = document.querySelectorAll('.char2')

const roundText = () => {
    for ( i = 0; i < roundedText.length; i++){
        let rotation = i * (360/roundedText.length);
        gsap.set(roundedText[i], {rotate : rotation, transformOrigin: '0px 100px', x: 0, y: -100})
    }
}

const roundText2 = () => {
    for ( i = 0; i < roundedText2.length; i++){
        let rotation = i * (360/roundedText2.length);
        gsap.set(roundedText2[i], {rotate : rotation, transformOrigin: '0px 70px', x: 0, y: -70})
    }
}

const init = () => {
    roundText();
    roundText2();
}

window.addEventListener('load', init())