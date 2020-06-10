<script>
import ToDoItem from './todoItem.svelte';
// import {db} from './firebase';
// import {collectionData} from 'rxfire/firestore';

import {startWith} from 'rxjs/operators';

import  {Col,Row,Container,Button} from 'sveltestrap'

import todoStore from './store.js'

export let uid;

let text=''
let idEditing = false;


let todos

todoStore.subscribe(td => {
	todos = td
})

fetch("https://sveltecourse-todoapp.herokuapp.com/api/v1/todo/", {
	headers: {
		"Authorization": localStorage.getItem("token")
	}
}).then(res => res.json()
).then(result => {
	let newTodos = []
	for (let todo of result.todos) {
		newTodos.push({id: todo._id, text: todo.text,
			done: todo.done})
	}
	todoStore.set(newTodos)
}).catch(console.error)

function add()
{
	fetch("https://sveltecourse-todoapp.herokuapp.com/api/v1/todo/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": localStorage.getItem("token")
		},
		body: JSON.stringify({text})
	}).then(res => res.json()
	).then(result => {
		console.log(result)
		let newTodos = []
		for (let todo of result.todos) {
			newTodos.push({id: todo._id, text: todo.text,
				done: todo.done})
		}
		todoStore.set(newTodos)
	}).catch(console.error)
}

function removeTask(event)
{   
const {id} = event.detail;


	fetch(`https://sveltecourse-todoapp.herokuapp.com/api/v1/todo/?id=${id}`, {
		method: "DELETE",
		headers: {
			"Authorization": localStorage.getItem("token")
		}
	}).then(res => res.json()
	).then(result => {
		let newTodos = []
		for (let todo of result.todos) {
			if (todo._id == id) {
				continue
			}
			newTodos.push({id: todo._id, text: todo.text,
				done: todo.done})
		}
		todoStore.set(newTodos)
	}).catch(console.error)
}


function updateStatus(event)
{
    const {id,newStatus} = event.detail;

	fetch(`https://sveltecourse-todoapp.herokuapp.com/api/v1/todo/?id=${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"Authorization": localStorage.getItem("token")
		},
		body: JSON.stringify({is_done: newStatus})
	}).then(res => res.json()
	).then(result => {
		let newTodos = []
		for (let todo of result.todos) {
			if (todo._id == id) {
				todo.done = newStatus
			}
			newTodos.push({id: todo._id, text: todo.text,
				done: todo.done})
		}
		todoStore.set(newTodos)
	}).catch(console.error)
    
}

function editTask(event)
{
    const {id,text} = event.detail;

	fetch(`https://sveltecourse-todoapp.herokuapp.com/api/v1/todo/updatetext/?id=${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"Authorization": localStorage.getItem("token")
		},
		body: JSON.stringify({text})
	}).then(res => res.json()
	).then(result => {
		let newTodos = []
		for (let todo of result.todos) {
			if (todo._id == id) {
				todo.text = text
			}
			newTodos.push({id: todo._id, text: todo.text,
				done: todo.done})
		}
		todoStore.set(newTodos)
	}).catch(console.error)
}

</script>

<Row>
<Col xs='auto'>
<input bind:value={text} placeholder="Enter the New Task...">
</Col>

<Col xs='auto'>
<Button color="warning" on:click={add}>Add Task</Button>
</Col>
</Row>

<div class="inner-container">

    <ul>
        {#each todos as todo}
            <ToDoItem {...todo} on:remove={removeTask} on:toggle={updateStatus} on:edit={editTask}/>
        {/each}
    </ul>
</div>

<style>

.inner-container{
    margin-top: 10px;
}
</style>
