function checkUserName(name){
  if(!name){
    return 'required'
  }
  if(name.length > 15){
    return 'username should be less than 15 characters'
  }
  if(name.match(/[^\w]/)){
    return 'username should only contain alphanumeric characters'
  }
  return 'ok'
}

function checkEmail(email){
  if(!email){
    return 'required'
  }
  if(!email.match(/[-.\w]+@([\w-]+\.)+[\w-]+/)){
    return 'wrong email address'
  }
  return 'ok'
}

function checkPassword(password){
  if(!password){
    return 'required'
  }
  if(password.match(/[^\w]/)){
    return 'password should only contain alphanumeric characters'
  }
  return 'ok'
}

function confirmPassword(password1, password2){
  if(password1 !== password2){
    return "password don't match"
  }
  return 'ok'
}

let hints = []

function check(target, checkRes){
  if(checkRes != 'ok'){
    let hint = document.createElement('small')
    hint.innerText = checkRes
    target.after(hint)
    hints.push(hint)
    target.classList.add('error')
    return false
  }else{
    target.classList.remove('error')
    return true
  }

}
let registerForm = document.getElementById('registerForm')
registerForm.onsubmit = (e)=>{
  for(let hint of hints){
    hint.remove()
  }
  hint = []
  let final = true
  final = check(username, checkUserName(username.value)) && final
  final = check(email, checkEmail(email.value)) && final
  final = check(password, checkPassword(password.value)) && final
  final = check(confirmpassword, confirmPassword(password.value,confirmpassword.value)) && final
  if(!final){
    e.preventDefault()
  }
}