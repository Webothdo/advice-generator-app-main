'use strict';

const advice = document.querySelector('#advice');
const adviceButton = document.querySelector('#advice-button');
const adviceId = document.querySelector('h1');
const url = 'https://api.adviceslip.com/advice';

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
})