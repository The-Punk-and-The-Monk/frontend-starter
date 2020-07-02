## 改动

使用 flex 布局而不是 grid 布局展示菜品
点击菜品自动滚动到详细介绍, scrollIntoView({behavior:'smooth'})
用 setTimeout() 来处理连续两次没结果时, 结果提示应该"闪烁一下", 已提醒用户. (宏任务与微任务)