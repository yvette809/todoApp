

const form = document.getElementById('form')
const textInput = document.getElementById('text')
const todoButton = document.getElementById('btn')
const result = document.getElementById('result')
const formControl = document.getElementById('formControl')

const apiURL = 'https://jsonplaceholder.typicode.com/todos'


// fetch todos from data base

// 
const getTodos = async () => {
    let response = await fetch(apiURL)
    let todos = await response.json()
    todos.map(todo => {
        displayTodo(todo)
    })

}

getTodos()

// show todos in the dom
function displayTodo(todo) {
    result.innerHTML += `
        <li id=${todo.id}>
        <p>${todo.title}</p>
       <i class="fas fa-trash "></i>
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

async function addTodos(todo) {

    if (todo.value.trim() === "") {

        showError(textInput, 'Text field cannot be empty')
    } else {
        const todo = {
            id: Math.floor(Math.random() * 1000),
            title: textInput.value,
            completed: Boolean
        }

        await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(todo)
        })
            .then(res => res.json())
            .then(todo => {
                console.log(todo)
                displayTodo(todo)
            })


    }


    todo.value = ""
}


// event listeners

todoButton.addEventListener('click', e => {
    e.preventDefault()
    addTodos(textInput)

})

