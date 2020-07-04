倒计时的实现

~~~javascript
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);
const currentTime = new Date();
const diff = newYearTime - currentTime;

const d = Math.floor(diff / 1000 / 60 / 60 / 24);
const h = Math.floor(diff / 1000 / 60 / 60) % 24;
const m = Math.floor(diff / 1000 / 60) % 60;
const s = Math.floor(diff / 1000) % 60;
~~~

其他的跳过
