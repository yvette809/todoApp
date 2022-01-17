

const form = document.getElementById('form')
const textInput = document.getElementById('text')
const todoButton = document.getElementById('btn')
const result = document.getElementById('result')
const formControl = document.getElementById('formControl')

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
        <p>${todo.title}</p>
       <i class="fas fa-trash " onclick="deleteTodo(${todo.id})"></i>
        ${todo.completed ? `<i class="far fa-check-circle "></i>` : `<i class="fas fa-times "></i>`}
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
            })
        getTodos()


    }


}


// delete todo

async function deleteTodo(id) {

    let todos = document.querySelectorAll('li')
    let todosArray = Array.from(todos)
    console.log(todosArray)
    const foundTodo = todosArray.find(todo => todo.id)
    console.log(foundTodo)
    foundTodo.remove()

}




// event listeners

todoButton.addEventListener('click', e => {
    e.preventDefault()
    addTodos(textInput.value)

})

