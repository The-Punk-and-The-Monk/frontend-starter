let table = document.getElementById('bagua-table');
let editing = false;

let okButton = document.createElement('button')
okButton.innerText = 'OK'
let cancelButton = document.createElement('button')
cancelButton.innerText = 'CANCEL'
let buttonDiv = document.createElement('div')
buttonDiv.append(okButton, cancelButton)
buttonDiv.style.position = 'absolute'
// buttonDiv.style.alignItems = 'left'

let textarea = document.createElement('textarea')

textarea.className = 'edit'

let editTd = document.createElement('td')
editTd.classList.add('mytd')
editTd.append(textarea, buttonDiv)

table.addEventListener('click', (e)=>{
  if(!e.target.closest('td') || editing){
    return;
  }
  editing = true;
  let td = e.target
  textarea.value = td.innerHTML
  originInnerHTML = td.innerHTML
  textarea.style.width = td.clientWidth + 'px'
  textarea.style.height = td.clientHeight + 'px'
  td.replaceWith(editTd)
  textarea.focus()

  okButton.onclick = (e)=>{
    td.innerHTML = textarea.value
    editing = false
    editTd.replaceWith(td)
    e.stopPropagation()
  }
  cancelButton.onclick = (e)=>{
    td.innerHTML = originInnerHTML
    editing = false
    editTd.replaceWith(td)
    e.stopPropagation()
  }

})