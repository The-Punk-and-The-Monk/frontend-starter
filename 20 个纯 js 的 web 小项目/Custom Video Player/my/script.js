// container player controls play stop progress timestamp

function secondsToString(seconds){
  let mins = Math.floor(seconds / 60)
  mins = mins < 10 ? '0' + mins : mins
  let secs = Math.floor(seconds % 60)
  secs = secs < 10 ? '0' + secs : secs
  return mins + ":" + secs
}

function togglePlay(){
  if(player.paused){
    player.play()
    playButton.className = 'pause'
  }else{
    player.pause()
    playButton.className = 'play'
  }
}

player.onclick = togglePlay
playButton.onclick = togglePlay

stopButton.onclick = () => {
  player.pause()
  player.currentTime = 0
  playButton.className = 'play'
}

player.ontimeupdate = ()=>{
  progress.value = player.currentTime / player.duration * 100
  timestamp.innerText = secondsToString(player.currentTime)
}

progress.onchange = (e)=>{
  player.currentTime = parseFloat(progress.value) / 100 * player.duration
}

