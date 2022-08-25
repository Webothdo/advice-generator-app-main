'use strict';

import { toJpeg } from "html-to-image";

const advice = document.querySelector('#advice');
const adviceButton = document.querySelector('#advice-button');
const adviceId = document.querySelector('h1');
const twitter = document.querySelector('.twitter');
const whatsapp = document.querySelector('.whatsapp');
const saveImage = document.querySelector('.save');
const divider = document.querySelector('#divider')
const url = 'https://api.adviceslip.com/advice';

let text;

async function getAdvice() {
    try {
        let response = await fetch(url);
        let data = await response.json();
        advice.innerHTML = 'Loading Advice'
        adviceId.innerHTML = `advice # ${data.slip.id}`
        setTimeout(() => {
            advice.innerHTML = data.slip.advice
        }, 2000)
    } catch (error) {
        advice.innerHTML = error
    }
}

adviceButton.addEventListener('click', () => {
    getAdvice()
    let text = advice.innerHTML;
    twitter.setAttribute('href', `https://twitter.com/intent/tweet?text=${text}`)
})

twitter.addEventListener('click', () => {
    let text = advice.innerHTML;
    twitter.setAttribute('href', `https://twitter.com/intent/tweet?text=${text}`)
})

whatsapp.addEventListener('click', () => {
    let text = advice.innerHTML;
    whatsapp.setAttribute('href', `whatsapp://send?text=${text}`)
})


saveImage.addEventListener('click', () => {
    divider.style.display = 'none'
    saveImageFunc()

    setTimeout(() => {
        divider.style.display = 'block'
    }, 100);
})

const saveImageFunc = () => {
    toJpeg(document.querySelector('#container'), { quality: 0.95 })
        .then(function (dataUrl) {
            const link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.href = dataUrl;
            link.click();
            link.remove();
        });
}                            