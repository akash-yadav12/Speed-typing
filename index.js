const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const toggleBtn = document.querySelector('#toggle-btn')
const refreshBtn = document.querySelector('#refresh')

refreshBtn.addEventListener('click',()=>{
    refreshBtn.style.animation = "reload .5s"
    setTimeout(()=>{
        location.reload()
    },500)
})

quoteInputElement.addEventListener('input', ()=>{
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    let correct = true
    arrayQuote.forEach((charSpan,index) =>{
        const char = arrayValue[index]
        if (char == null){
            charSpan.classList.remove('incorrect')
            charSpan.classList.remove('correct')
            correct = false
        }
        else if (char === charSpan.innerText){
            charSpan.classList.add('correct')
            charSpan.classList.remove('incorrect')
        }else{
            charSpan.classList.remove('correct')
            charSpan.classList.add('incorrect')
            correct = false
        }
    })
    if (correct){
        renderNewQuote()
    }
})

toggleBtn.addEventListener('click',()=>{
    document.body.classList.toggle('light')
})

function getRandomQuote(){
    return fetch(RANDOM_QUOTE_API_URL)
            .then(response => response.json())
            .then(data => data.content)
}

async function renderNewQuote(){
    const quote = await getRandomQuote()
    quoteDisplayElement.innerText = ''
    quote.split('').forEach(character =>{
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    startTimer()
}

let startTime
function startTimer(){
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(()=>{
        // timerElement.innerText = Number(timerElement.innerText) + 1
        timerElement.innerText = getTimerTime()
    },1000)
}

function getTimerTime(){
    return Math.floor((new Date()-startTime)/1000)
}

renderNewQuote()