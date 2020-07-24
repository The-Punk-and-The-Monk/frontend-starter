//简单但是错误的方法
function randomInt(min, max){
    let rand = min + Math.random() * (max - min)
    return Math.round(rand)
    /**
     * min = 1, max = 3
     * values from 1    ... to 1.4999999999  become 1
        values from 1.5  ... to 2.4999999999  become 2
        values from 2.5  ... to 2.9999999999  become 3
     */
}

// 正确做法
function randomInt(min, max){
    let rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
//     values from 1  ... to 1.9999999999  become 1
// values from 2  ... to 2.9999999999  become 2
// values from 3  ... to 3.9999999999  become 3
}



