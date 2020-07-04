let ul = document.querySelector('ul')

ul.ondragstart = (e) => {
  e.dataTransfer.setData('text/plain', cssPath(e.target))
  console.log(e.target)
  console.log(e.dataTransfer)
  console.log(e)
  // e.preventDefault()
}

ul.addEventListener('dragenter', (e)=>{
  e.preventDefault()
  e.target.classList.toggle('drag-over')
})

ul.addEventListener('dragleave', (e)=>{
  e.preventDefault()
  e.target.classList.toggle('drag-over')
})

ul.addEventListener('dragover', (e)=>{
  e.preventDefault()
})


ul.addEventListener('drop',(e)=>{
  console.log(e.target)
  let draggedElemCss = e.dataTransfer.getData('text/plain')
  let draggedElem = document.querySelector(draggedElemCss)
  let target = e.target
  let tmp = draggedElem.innerText
  draggedElem.innerText = target.innerText
  target.innerText = tmp
  e.preventDefault()
})

var cssPath = function(el) {
  if (!(el instanceof Element)) 
      return;
  var path = [];
  while (el.nodeType === Node.ELEMENT_NODE) {
      var selector = el.nodeName.toLowerCase();
      if (el.id) {
          selector += '#' + el.id;
          path.unshift(selector);
          break;
      } else {
          var sib = el, nth = 1;
          while (sib = sib.previousElementSibling) {
              if (sib.nodeName.toLowerCase() == selector)
                 nth++;
          }
          if (nth != 1)
              selector += ":nth-of-type("+nth+")";
      }
      path.unshift(selector);
      el = el.parentNode;
  }
  return path.join(" > ");
}