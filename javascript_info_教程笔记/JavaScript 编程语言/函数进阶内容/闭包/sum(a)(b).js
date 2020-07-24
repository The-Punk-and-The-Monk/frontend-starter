function sum(a){
  return function(b){
    return a + sum(b)
  }
}

console.log(sum(1)(2))