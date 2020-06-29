const addUserButton = document.getElementById('add-user')
const doubleMoneyButton = document.getElementById('double-money')
const showOnlyMillionariesButton = document.getElementById('show-only-millionaries')
const sortByRichestButton = document.getElementById('sort-by-richest')
const userContainer = document.querySelector('.user-container')

let users = [] // [[userName, money]]

function updateUserContainer(){
  while(userContainer.firstChild){
    userContainer.firstChild.remove()
  }
  for(let user of users){
    userContainer.insertAdjacentHTML('beforeend', 
      `<div class="user">
        <strong>${user[0]}</strong>
        <span>${formatMoney(user[1])}</span>
      </div>`)
  }
}

function formatMoney(money) {
  return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

async function addUser(){
  const response = await fetch('https://randomuser.me/api')
  const res = await response.json()
  const user = res.results[0]
  const userName = user.name.first + ' ' + user.name.last
  const money = Math.floor(Math.random() * 1000000)
  users.push([userName, money])
  updateUserContainer()
}


function doubleMoney(){
  users = users.map(user => [user[0], user[1] * 2])
  updateUserContainer()
}

function showOnlyMillionaries(){
  users = users.filter(user => user[1] >= 1000000)
  updateUserContainer()
}

function sortByRichest(){
  users = users.sort((a, b) => b[1] - a[1])
  updateUserContainer()
}

addUserButton.onclick = addUser
doubleMoneyButton.onclick = doubleMoney
showOnlyMillionariesButton.onclick = showOnlyMillionaries
sortByRichestButton.onclick = sortByRichest

// async function debug(){
//   await addUser()
//   await addUser()
//   doubleMoney()
// }
// debug()