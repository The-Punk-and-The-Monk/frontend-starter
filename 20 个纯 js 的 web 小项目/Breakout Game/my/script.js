let rule = document.querySelector('div.rule')
let showRuleButton = document.querySelector('button.show-rule')
let closeRuleButton = document.querySelector('button.close-rule')

showRuleButton.onclick = () => {
  rule.classList.add('show')
}

closeRuleButton.onclick = () => {
  rule.classList.remove('show')
}