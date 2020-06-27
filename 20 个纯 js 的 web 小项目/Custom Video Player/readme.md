### 遇到的问题
~~~
player.ontimeupdate = ()=>{
  progress.value = player.currentTime / player.duration * 100
  timestamp.innerText = secondsToString(player.currentTime)
}

progress.onchange = (e)=>{
  player.currentTime = parseFloat(progress.value) / 100 * player.duration
}
~~~

用 onchange 事件监听用户对进度条的操作会导致"在播放状态下, 点击进度条看脸调进度"的情况, 原因是input[type=range]上的事件的触发顺序是 onmousedown -> oninput -> onmouseup -> onchange, 而 player的 ontimeupdate 事件是根据性能在播放时不定时触发的, 但是间隔很小, 所以会导致以下这种情况: 当鼠标 down 后, progress.value 被默认事件处理修改了, 但是鼠标还没放开, ontimeupdate 触发了, progress.value 又被修改了, 最后鼠标放开, 等到 onchange触发, progress.value 已经不是鼠标按下的地方的 value 了.\
解决方法就是把 onchange 改成 oninput