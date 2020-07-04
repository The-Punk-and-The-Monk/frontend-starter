学到了 drag 事件的处理
1. 被拖动的对象: dragstart, drag, dragend
2. 目的地对象: dragenter, dragover, dragleave, drop
3. dragenter, dragover 默认会阻止元素上 drop 事件的触发, 所以要对这两个事件 e.preventDefault()
4. 所有 drag 事件都会带有 dataTransfer 对象

https://juejin.im/post/5a169d08518825592c07c666

其他跳过.