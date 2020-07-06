/**
 * 疑问:
 * 1, 为什么点击 form 区域提交的是 submit 事件
 * 2. 为 todolist 的整个区域添加 eventListener 是给他所有的子节点一起添加了吗? 如果不是,event.target 是怎么确定的?
 */

class Model {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || []
    }

    update(){
        localStorage.setItem('todos', JSON.stringify(this.todos))
        this.onTodoListChanged(this.todos)
        
    }


    addTodo(todo) {
        this.todos = [...this.todos, todo]
        this.update()
    }

    editTodo(id, updatedText) {
        this.todos = this.todos.map(todo => {
            return todo.id === id ? {
                id: todo.id,
                text: updatedText,
                complete: todo.complete
            } : todo
        })
        this.update()
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)
        this.update()
    }

    toggleTodo(id) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? {
                id: todo.id,
                text: todo.text,
                complete: !todo.complete
            } : todo)
        this.update()
    }

    bindEvents(controller){
        this.onTodoListChanged = controller.onTodoListChanged
    }
}

class View {
    constructor() {
        this.app = this.getElemet('#root')

        this.title = this.createElement('h1')
        this.title.textContent = 'Todos'

        this.form = this.createElement('form')

        this.input = this.createElement('input')
        this.input.type = "text"
        this.input.placeholder = "Add Todo"
        this.input.name = "todo"

        this.submitButton = this.createElement('button')
        this.submitButton.textContent = 'Submit'

        this.todoList = this.createElement('ul', 'todo-list')

        this.form.append(this.input, this.submitButton)
        this.app.append(this.title, this.form, this.todoList)
    }

    getTodoText() {
        return this.input.value
    }

    resetInput() {
        this.input.value = ''
    }

    displayTodos(todos) {
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild)
        }
        if (todos.length === 0) {
            const p = this.createElement('p')
            p.textContent = 'Nothing to do! Add a task?'
            this.todoList.append(p)
        } else {
            todos.forEach(todo => {
                const li = this.createElement('li')
                li.id = todo.id
                const checkbox = this.createElement('input')
                checkbox.type = 'checkbox'
                checkbox.checked = todo.complete

                const span = this.createElement('span')
                span.contentEditable = true
                span.classList.add('editable')

                if (todo.complete) {
                    const strike = this.createElement('s')
                    strike.textContent = todo.text
                    span.append(strike)
                } else {
                    span.textContent = todo.text
                }

                const deleteButton = this.createElement('button', 'delete')
                deleteButton.textContent = 'Delete'
                li.append(checkbox, span, deleteButton)
                this.todoList.append(li)
            })
        }
    }

    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className);
        return element
    }

    getElemet(selector) {
        const element = document.querySelector(selector);

        return element;
    }

    bindEvents(controller){
        this.form.addEventListener('submit', controller.handleAddTodo)  // 如果换成 click 会怎么样
        this.todoList.addEventListener('click', controller.handleDeleteTodo)
        this.todoList.addEventListener('change', controller.handleToggle)
        this.todoList.addEventListener('focusout', controller.handleEditTodoComplete)
        this.todoList.addEventListener('input', controller.handleEditTodo)
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.onTodoListChanged(this.model.todos)
        this.view.bindEvents(this)
        this.model.bindEvents(this)
        this.temporaryEditValue
    }

    onTodoListChanged = todos => {
        this.view.displayTodos(todos)
    }

    handleEditTodo = event => {
        if(event.target.className === 'editable'){
            this.temporaryEditValue = event.target.innerText
        }
    }

    handleEditTodoComplete = event => {
        if(this.temporaryEditValue){    // 为什么这里不用验证 event.target的类型
            const id = parseInt(event.target.parentElement.id)
            this.model.editTodo(id, this.temporaryEditValue)
            this.temporaryEditValue = ''
        }
    }

    handleAddTodo = event => {
        event.preventDefault()

        if(this.view.getTodoText()){    // 为什么这里不用验证 event.target 的类型
            const todo = {
                id:this.model.todos.length > 0 ? this.model.todos[this.model.todos.length - 1].id + 1:1,
                text: this.view.getTodoText(),
                complete: false,
            }
            this.model.addTodo(todo)
            this.view.resetInput()
        }

    }

    handleDeleteTodo = event => {
        if(event.target.className === 'delete'){
            const id = parseInt(event.target.parentElement.id)
            this.model.deleteTodo(id)
        }
    }

    handleToggle = event => {
        if(event.target.type === 'checkbox'){
            const id = parseInt(event.target.parentElement.id)
            this.model.toggleTodo(id)
        }
    }
}

const model = new Model();

const view = new View();
const controller = new Controller(model, view);