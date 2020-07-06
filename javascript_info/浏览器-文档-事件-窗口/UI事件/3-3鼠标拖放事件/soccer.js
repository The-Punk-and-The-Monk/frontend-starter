let body = document.body
let draggableElem = document.getElementsByClassName('draggable')
Array.from(draggableElem).forEach(elem => {
  elem.ondragstart = function(){
    return false;
  }
})
let isDragging = false
body.addEventListener('mousedown', (e)=>{
  e.preventDefault();
  let target = e.target 
  if(!target.classList.contains('draggable')){
    return;
  }
  
  let shiftX = e.clientX - target.getBoundingClientRect().left;
  let shiftY = e.clientY - target.getBoundingClientRect().top;


  body.addEventListener('mousemove', onMouseMove);
  body.addEventListener('mouseup', onMouseUp);


  function onMouseMove(e) {
    if(!isDragging){
      startDrag(e)
    }else{
      moveTo(e)
    }
    
    function startDrag(e){
      if(isDragging){
        return;
      }
      isDragging = true;
      target.style.position = 'fixed'
      moveTo(e)
    }

    function moveTo(e){
      let newLeft = e.clientX - shiftX;
      let newTop = e.clientY - shiftY;
  
      let newBottom = newTop + target.offsetHeight;
  
      if(newBottom >= document.documentElement.clientHeight){
        let docBottom = document.documentElement.getBoundingClientRect().bottom;
        let scrollY = Math.min(docBottom - newBottom, 10)
        if(scrollY < 0){
          scrollY = 0
        }
        window.scrollBy(0, scrollY)
        newTop = Math.min(newTop, document.documentElement.clientHeight - target.offsetHeight)
      }

      if(newTop < 0){
        let scrollY = Math.min(-newTop, 10);
        if(scrollY < 0) scrollY = 0;
        window.scrollBy(0, -scrollY);
        newTop = Math.max(newTop, 0)
      }

      if (newLeft < 0){
        let scrollX = Math.min(-newLeft, 10);
        if(scrollX < 0) scrollX = 0;
        window.scrollBy(-scrollX, 0);
        newLeft = Math.max(newLeft, 0)
      }

      let newRight = newLeft + target.offsetWidth;
      if(newRight > document.documentElement.clientWidth){
        let docRight = document.documentElement.getBoundingClientRect().right;
        let scrollX = Math.min(docRight - newRight, 10)
        if(scrollX < 0){
          scrollX = 0;
        }
        window.scrollBy(scrollX, 0)
        newLeft = Math.min(newLeft, document.documentElement.clientWidth - target.offsetWidth)
      }
      target.style.left = newLeft + 'px';
      target.style.top = newTop + 'px';
    }
  }

  function stopDrag(e){
    if(!isDragging){
      return;
    }
    isDragging = false;
    target.style.position = 'absolute';
    target.style.top = parseInt(target.style.top) + window.pageYOffset + 'px'
    target.style.left = parseInt(target.style.left) + window.pageXOffset + 'px'
  }

  function onMouseUp(e){
    stopDrag(e)
    body.removeEventListener('mousemove', onMouseMove)
    body.removeEventListener('mouseup', onMouseUp)
  }
})



// let isDragging = false;

// document.addEventListener('mousedown', function(event) {

//   let target = event.target.closest('.draggable');

//   if (!target) return;

//   event.preventDefault();

//   target.ondragstart = function() {
//       return false;
//   };

//   let coords, shiftX, shiftY;

//   startDrag(target, event.clientX, event.clientY);

//   function onMouseUp(event) {
//     finishDrag();
//   };

//   function onMouseMove(event) {
//     moveAt(event.clientX, event.clientY);
//   }

//   // 在拖动开始时：
//   //   记住初始的移位
//   //   将元素设置为 position:fixed，并将此元素移动到作为 body 的直接子元素
//   function startDrag(element, clientX, clientY) {
//     if(isDragging) {
//       return;
//     }

//     isDragging = true;

//     document.addEventListener('mousemove', onMouseMove);
//     element.addEventListener('mouseup', onMouseUp);

//     shiftX = clientX - element.getBoundingClientRect().left;
//     shiftY = clientY - element.getBoundingClientRect().top;

//     element.style.position = 'fixed';

//     moveAt(clientX, clientY);
//   };

//   // 在最后，转换到绝对（absolute）坐标，以将元素固定在文档中
//   function finishDrag() {
//     if(!isDragging) {
//       return;
//     }

//     isDragging = false;

//     target.style.top = parseInt(target.style.top) + window.pageYOffset + 'px';
//     target.style.position = 'absolute';

//     document.removeEventListener('mousemove', onMouseMove);
//     target.removeEventListener('mouseup', onMouseUp);
//   }

//   function moveAt(clientX, clientY) {
//     // 新的窗口相对坐标
//     let newLeft = clientX - shiftX;
//     let newTop = clientY - shiftY;

//     // 检查新坐标是否在底部窗口边缘以下
//     let newBottom = newTop + target.offsetHeight; // new bottom

//     // 在窗口边缘以下？让我们滚动此页面
//     if (newBottom > document.documentElement.clientHeight) {
//       // 文档末端的窗口相对坐标
//       let docBottom = document.documentElement.getBoundingClientRect().bottom;

//       // 将文档向下滚动 10px 有一个问题
//       // 它可以滚动到文档末尾之后
//       // Math.min(how much left to the end, 10)
//       let scrollY = Math.min(docBottom - newBottom, 10);

//       // 计算是不精确的，可能会有舍入误差导致页面向上滚动
//       // 这是不应该出现，我们在这儿解决它
//       if (scrollY < 0) scrollY = 0;

//       window.scrollBy(0, scrollY);

//       // 快速移动鼠标将指针移至文档末端的外面
//       // 如果发生这种情况 ——
//       //  使用最大的可能距离来限制 newTop（就是文档末端到顶端的距离）
//       newTop = Math.min(newTop, document.documentElement.clientHeight - target.offsetHeight);
//     }

//     // 检查新坐标是否在顶部窗口边缘上方（类似的逻辑）
//     if (newTop < 0) {
//       // scroll up
//       let scrollY = Math.min(-newTop, 10);
//       if (scrollY < 0) scrollY = 0; // 检查精度损失

//       window.scrollBy(0, -scrollY);
//       // 快速移动鼠标可以使指针超出文档的顶端
//       newTop = Math.max(newTop, 0); // newTop 不得小于 0
//     }


//     // 将 newLeft 限制在窗口范围内
//     // 这里没有滚动，所以它很简单
//     if (newLeft < 0) newLeft = 0;
//     if (newLeft > document.documentElement.clientWidth - target.offsetWidth) {
//       newLeft = document.documentElement.clientWidth - target.offsetWidth;
//     }

//     target.style.left = newLeft + 'px';
//     target.style.top = newTop + 'px';
//   }

// });