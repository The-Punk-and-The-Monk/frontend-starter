let [selector1, selector2] = document.querySelectorAll('.currency-selector')
let [number1, number2] = document.querySelectorAll("input[type='number']")
let swap = document.querySelector('.swap-button')
let rateHint = document.querySelector('.rate')


// 初始化支持的货币 options
fetch('https://open.exchangerate-api.com/v6/latest')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    if(data.result != "success"){
      alert("The exchangerate-api doesn't work'")
    }
    let supportedCurrencies = Array.from(Object.keys(data.rates)).sort()
    for(let currency of supportedCurrencies){
      let option = document.createElement('option')
      option.value = currency
      option.innerText = currency
      let optionCopy = option.cloneNode(true)
      selector1.append(option)
      selector2.append(optionCopy)
    }
    update()
  })

// 以 number1, selector1的值为基准进行更新
function update(){
  fetch(`https://api.exchangerate-api.com/v4/latest/${selector1.value}`)
  .then(res => res.json())
  .then(data => {
    let rate = data.rates[selector2.value]
    rateHint.innerText = `1 ${selector1.value} = ${rate} ${selector2.value}`
    number2.value = (number1.value * rate).toFixed(2)
  })
}

function swapAndUpdate(){
  [selector1.value, selector2.value] = [selector2.value, selector1.value]
  update();
}

number1.oninput = update
number2.oninput = update
selector1.onchange = update
selector2.onchange = update
swap.onclick = swapAndUpdate


