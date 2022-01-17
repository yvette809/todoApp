

const form = document.getElementById('form')
const textInput = document.getElementById('text')
const todoButton = document.getElementById('btn')
const result = document.getElementById('result')
const formControl = document.getElementById('formControl')

const apiURL = 'https://jsonplaceholder.typicode.com/todos'


// fetch todos from data base

// 
const getTodos = async () => {
    try {
        let response = await fetch(apiURL)
        let todos = await response.json()
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

 function addTodos(todo) {

    if (todo.value.trim() === "") {

        showError(textInput, 'Text field cannot be empty')
    } else {
        const todo = {
            id: Math.floor(Math.random() * 1000),
            title: textInput.value,
            completed: Boolean
        }

        return fetch(apiURL, {
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


// delete todo

 async function deleteTodo (todoId){

    const res = await  fetch(`${apiURL}/${todoId}`,{
        method:"DELETE"
    })
    const todo = await res.json()

    console.log('clicked todo', todoId)


}


// event listeners

todoButton.addEventListener('click', e => {
    e.preventDefault()
    addTodos(textInput)

})

