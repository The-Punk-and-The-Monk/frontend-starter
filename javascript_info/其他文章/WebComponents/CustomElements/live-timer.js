class LiveTimer extends HTMLElement {

  /* your code here */
  connectedCallback(){
    let timeFormater = document.createElement('time-formatted')
    timeFormater.setAttribute('datetime', new Date())
    timeFormater.setAttribute('hour', 'numeric')
    timeFormater.setAttribute('minute', 'numeric')
    timeFormater.setAttribute('second', 'numeric')

    this.append(timeFormater)
    this.timer = setInterval(()=>{
      let now = new Date()
      timeFormater.setAttribute('datetime', now)
      this.dispatchEvent(new CustomEvent('tick', {
        detail: now
      }))
    }, 1000)
  }

  disconnectedCallback(){
    clearInterval(this.timer)
  }

}

customElements.define("live-timer", LiveTimer);