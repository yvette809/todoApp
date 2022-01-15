

const form = document.getElementById('form')
const textInput = document.getElementById('text')
const todoButton = document.getElementById('btn')
const result = document.getElementById('result')
const formControl = document.getElementById('formControl')

const apiURL = 'https://jsonplaceholder.typicode.com/todos'


// fetch todos from data base

const getTodos = async () => {
    let response = await fetch(apiURL)
    let todos = await response.json()
    displayTodos(todos)
}

getTodos()

// show todos in the dom
function displayTodos(todos) {
    todos.map(todo => {
        result.innerHTML += `
        <li id=${todo.id}>
        <p>${todo.title}</p>
       <i class="fas fa-trash "></i>
        ${todo.completed ? `<i class="far fa-check-circle "></i>` : `<i class="fas fa-times "></i>`}
        </li>
        
   `
    }).join('')
}


// error message

function showError(input, message) {
    const parent = input.parentElement
    parent.classList.add('error')
    parent.classList.remove('success')
    const small = parent.querySelector('small')
    small.innerText = message

}

// add todos

function addTodos(textInput) {

    if (textInput.value === "") {
        alert('todos cannnot be empty')
        // showError(textInput.value, 'todos cant be empty')
    } else {
        const todo = {
            id: Math.floor(Math.random() * 1000),
            title: textInput.value,
            completed: Boolean
        }
    }

    getTodos()

    textInput.value = ""
}


// event listeners

todoButton.addEventListener('click', e => {
     e.preventDefault()
     addTodos(textInput.value)
   
 

})

