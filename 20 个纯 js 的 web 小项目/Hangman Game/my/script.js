let wordContainer = document.querySelector('div.word-container');
let wrongLetterContainer = document.querySelector('div.wrong-letter-container');
let notification = document.querySelector('div.notification-container');
let figureParts = document.querySelectorAll('.figure-part')
let modal = document.querySelector('div.modal');
let finalMessage = document.querySelector('.final-message')
let finalMessageRevealWord = document.querySelector('.final-message-reveal-word')
let playButton = document.querySelector('.play-button')

let word = ''
let letterToSpanMap = new Map()
let enteredLetter = new Set()
let remainingLetter = new Set()
let wrongCnt = 0

function getLetterSpan(c){
  let span = document.createElement('span')
  span.classList.add('letter')
  span.innerText = c 
  return span
}

async function refresh(){
  wrongLetterContainer.classList.add('hide')
  modal.classList.add('hide')
  while(wordContainer.firstChild){
    wordContainer.firstChild.remove()
  }
  for(let part of figureParts){
    part.classList.add('figure-part')
  }
  wrongLetterContainer.lastElementChild.innerText = ''
  word = ''
  letterToSpanMap.clear()
  enteredLetter.clear()
  remainingLetter.clear()
  wrongCnt = 0

  let response = await fetch('https://random-word-api.herokuapp.com/word?number=1')
  let data = await response.json()
  word = data[0].toLowerCase()
  for(let c of word){
    let span = getLetterSpan('')
    wordContainer.appendChild(span)
    if(!letterToSpanMap.has(c)){
      letterToSpanMap.set(c, [])
    }
    letterToSpanMap.get(c).push(span)
    remainingLetter.add(c)
  }
  document.body.onkeydown = checkKey
}

function checkKey(e){
  let key = e.key.toLowerCase()
  if(!e.repeat && key >= 'a' && key <= 'z'){
    if(enteredLetter.has(key)){
      notification.classList.remove('hidden')
      setTimeout(()=>{
        notification.classList.add('hidden')
      }, 500)
    }else if(remainingLetter.has(key)){
      enteredLetter.add(key)
      remainingLetter.delete(key)
      for(let span of letterToSpanMap.get(key)){
        span.innerText = key
      }
      if(remainingLetter.size == 0){
        finalMessage.innerText = 'You just win the game'
        finalMessageRevealWord.innerText = '...the word is ' + word
        modal.classList.remove('hide')
        document.body.onkeydown = null
      }
    }else{
      enteredLetter.add(key)
      wrongLetterContainer.classList.remove('hide')

      if(wrongLetterContainer.lastElementChild.innerText){
        wrongLetterContainer.lastElementChild.innerText += ',' + key
      }else{
        wrongLetterContainer.lastElementChild.innerText = key
      }
      
      figureParts[wrongCnt].classList.remove('figure-part')
      wrongCnt += 1
      if(wrongCnt == figureParts.length){
        finalMessage.innerText = 'Sorry, you have lost the game'
        finalMessageRevealWord.innerText = '...the word is ' + word
        modal.classList.remove('hide')
        document.body.onkeydown = null
      }
    }
  }else{
    return false
  }
}

playButton.onclick = refresh
refresh()