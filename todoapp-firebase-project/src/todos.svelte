<script>
import ToDoItem from './todoItem.svelte';
import {db} from './firebase';
import {collectionData} from 'rxfire/firestore';

import {startWith} from 'rxjs/operators';

import  {Col,Row,Container,Button} from 'sveltestrap'

export let uid;

let text=''
let idEditing = false;


const query = db.collection('task').where('uid','==',uid).orderBy('created')

const todos= collectionData(query,'id').pipe(startWith([]))

function add()
{
    db.collection('task').add({
        uid,text,done:false,created:Date.now()
    })

    text=''
}

function removeTask(event)
{   
const {id} = event.detail;

    db.collection('task').doc(id).delete();
}
function updateStatus(event)
{
    const {id,newStatus} = event.detail;

    db.collection('task').doc(id).update({done:newStatus})
    
}

function editTask(event)
{
    const {id,text} = event.detail;

    db.collection('task').doc(id).update({text:text})
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
        {#each $todos as todo}
            <ToDoItem {...todo} on:remove={removeTask} on:toggle={updateStatus} on:edit={editTask}/>
        {/each}
    </ul>
</div>

<style>

.inner-container{
    margin-top: 10px;
}
</style>