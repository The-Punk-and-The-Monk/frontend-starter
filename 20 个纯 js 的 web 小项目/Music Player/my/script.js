let allMusic = ['hey', 'summer', 'ukulele']

let audio = document.querySelector('audio')
let audioSource = document.querySelector('audio source')
let playToggleButton = document.querySelector('#play-toggle')
let previousButton = document.querySelector('#previous-song')
let nextButton = document.querySelector('#next-song')
let musicName = document.querySelector('.music-name')
let progress = document.querySelector('.progress')
let coverImg = document.querySelector('.cover img')
let musicInfo = document.querySelector('.music-info')


let curMusic = 0
coverImg.src = `../origin/images/${allMusic[curMusic]}.jpg`


function play(song=-1){
  if(song != -1){
    coverImg.src = `../origin/images/${allMusic[song]}.jpg`
    audioSource.src = `../origin/music/${allMusic[song]}.mp3`
    musicName.innerText = allMusic[song]
    audio.load()
  }

  audio.play()
  musicInfo.classList.add('show')
  coverImg.classList.add('animation-running')
  playToggleButton.firstElementChild.classList.add('fa-pause')
  playToggleButton.firstElementChild.classList.remove("fa-play")
}

function pause(){
  audio.pause()
  musicInfo.classList.remove('show')
  coverImg.classList.remove('animation-running')
  playToggleButton.firstElementChild.classList.remove('fa-pause')
  playToggleButton.firstElementChild.classList.add('fa-play')
}

playToggleButton.onclick = (e) => {
  if(audio.paused){
    if(audio.currentTime == 0){
      play(curMusic)
    }else{
      play()
    }
  }else{
    pause()
  }
}

previousButton.onclick = (e) => {
  curMusic = curMusic - 1
  curMusic = curMusic >= 0? curMusic : 2
  play(curMusic)
}

nextButton.onclick = (e) => {
  curMusic = (curMusic + 1) % 3
  play(curMusic)
}

audio.ontimeupdate = (e) => {
  if(audio.ended){
    nextButton.click()
  }else{
    let value = audio.currentTime / audio.duration * 100
    progress.style.setProperty('--progress-track-value', value + '%')
  }
}

progress.addEventListener('input', (e)=>{
  let value = progress.value
  audio.currentTime = value * audio.duration / 100 
  progress.style.setProperty('--progress-track-value', value + '%')
})

document.body.onclick = (e)=>{
  console.log(e.target)
}


