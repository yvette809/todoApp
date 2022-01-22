

const form = document.getElementById('form')
const textInput = document.getElementById('text')
const todoButton = document.getElementById('btn')
const result = document.getElementById('result')
const formControl = document.getElementById('formControl')
// let alert = document.querySelector('.alert')
const formContainer = document.querySelector('.form-container')


const apiURL = 'https://jsonplaceholder.typicode.com/todos'

let todos = []

// fetch todos from data base

// 
const getTodos = async () => {
    try {
        const response = await fetch(apiURL)
        const data = await response.json()
        todos = data
        todos.map(todo => {
            displayTodo(todo)
        })

    } catch (error) {
        console.log(error)
    }


}

getTodos()

// show todos in the dom
function displayTodo(todo) {
    result.innerHTML += `
         <li id=${todo.id}>
       
         <p>${todo.title.charAt(0).toUpperCase() + todo.title.slice(1)}</p>
         <button class="delete-btn" onclick=${todo.completed ? `deleteTodo(${todo.id})` : "showAlert('cannot delete todo', 'danger')"}>X</button>
         <input type="checkbox" id="myCheck" >
        
       
        </span>
        </li>   
        
       
   `

}



// error message

function showError(input, message) {
    const parent = input.parentElement
    parent.classList.add('error')
    parent.classList.remove('success')
    const small = parent.querySelector('small')
    small.innerText = message
    setTimeout(() => {
        small.remove()
        parent.classList.remove('error')
    }, 3000)
}


// add todos

function addTodos(title) {

    if (textInput.value.trim() === "") {

        showError(textInput, 'Text field cannot be empty')
    } else {
        const todo = {
            id: Math.floor(Math.random() * 1000),
            title,
            completed: false
        }

        return fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Accept': 'application/json',
            },
            body: JSON.stringify(todo)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                todos.unshift(data)
                displayTodo(data)
                textInput.value = ""
                showAlert('Todo Added', 'success')
            })


        getTodos()


    }


}


// delete todo

async function deleteTodo(id) {
    let todos = document.querySelectorAll('li')
    let todosArray = Array.from(todos)
    const foundTodo = todosArray.find(todo => todo.id)
    foundTodo.remove()
    window.confirm('are you sure?')
    if (window.confirm) {
        // alert('Todo deleted')
        showAlert('Todo deleted!', 'success')
    }

}




function showAlert(message, className) {
    const div = document.createElement('div')
    div.className = className
    // div.appendChild(document.createTextNode(message))
    div.innerText = message
    const container = document.querySelector('.container')
    container.insertBefore(div, formContainer)

    //disappear in 3 seconds
    setTimeout(() => {
        div.remove()

    }, 3000)
}



// event listeners

todoButton.addEventListener('click', e => {
    e.preventDefault()
    addTodos(textInput.value)

})


// Toggle todo

result.addEventListener('click', e => {
    if (e.target.tagName === 'INPUT') {
        e.target.parentElement.classList.toggle('completed')

    }

})
