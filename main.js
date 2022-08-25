'use strict';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { saveAs } from "file-saver";

const advice = document.querySelector('#advice');
const adviceButton = document.querySelector('#advice-button');
const adviceId = document.querySelector('h1');
const twitter = document.querySelector('.twitter');
const whatsapp = document.querySelector('.whatsapp');
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
