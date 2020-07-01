let slider = document.querySelector('div.slider')
let modal = document.querySelector('div.modal')
let pageContainer = document.querySelector('div.page-container')
let divMain = document.querySelector('div.main')
let pageHeader = document.querySelector('div.page-header')
let description = document.querySelector('.description')

let sliderToggle = document.querySelector('.slider-button')
let signUpButton = document.querySelector("#sign-up-button")
let submitButton = document.querySelector("#submit-button")
let closeFormButton = document.querySelector(".close-form-button")

sliderToggle.onclick = () => {
  slider.classList.toggle('hide')
  description.classList.toggle('margin-collapse')
}

signUpButton.onclick = () => {
  modal.style.display = 'flex'
}

submitButton.onclick = () => {
  modal.style.display = 'none'
}

closeFormButton.onclick = () => {
  modal.style.display = 'none'
}