1. 用input[type='range'] 和 css 来修改进度条样式

~~~css
.progress {
  -webkit-appearance: none;   /* 清除浏览器默认样式 */
  border-radius: 5px;
  width: 100%;
  outline:none;
  margin-bottom: 10px;
}
.progress::-webkit-slider-runnable-track{  /* 进度条 */
  -webkit-appearance: none;   
  border-radius: 5px;
  height: 5px;
  background-image: linear-gradient(to right, rgba(64, 140, 233, 0.5) 0%, rgba(64, 140, 233, 0.5) var(--progress-track-value), white var(--progress-track-value)); 
}

.progress::-webkit-slider-thumb {   /* 滑块 */
  -webkit-appearance: none;   /* 这里也得写, 不写没办法清除 */
  height: 0px;    /* 必须随便设置点属性, 要不然无法触发 input 事件 */
  width: 0px;
}
~~~

2. z-index
首先, 如果不考虑 css3, z-index 在元素设置了 position 才会生效
z-index=0, 与 z-index = -1 不是简单的差了1, 关键词"层叠水平" "层叠上下文"
https://zhuanlan.zhihu.com/p/33984503

3. 点击 margin 会不会触发事件?
https://zhuanlan.zhihu.com/p/74579830
不会, 在 border(包含 border)之内
即使 z-index 高的元素的 margin 也不会挡住事件