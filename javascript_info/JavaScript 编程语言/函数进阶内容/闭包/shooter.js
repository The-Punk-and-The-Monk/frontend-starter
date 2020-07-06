function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // shooter 函数
      alert( i ); // 应该显示其编号
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 编号为 0 的 shooter 值为 10
army[5](); // 编号为 5 的 shooter 值也是 10……
// ... 所有的 shooter 的值都是 10，而不是他们的编号 0, 1, 2, 3...
//

/** !!!!!!!!!!!!!!!!1 */
// 把 while 改成 for,因为每次执行代码块 for (let i=0...) {...} 中的代码时，
// 都会为其创建一个新的词法环境，其中具有对应的 i 值