<script>
import {createEventDispatcher} from 'svelte';
import {Col,Row,Container} from 'sveltestrap';

const dispatch = createEventDispatcher();



export let id;
export let text;
export let done;
let isEditing = false


function updateTask()
{
    isEditing = !isEditing;
}

function edit()
{
    isEditing = !isEditing;
    dispatch('edit',
    {
        id,
        text
    }
    )
}

function remove()
{
    dispatch('remove',
    {
        id
    })
}

function toggleStatus()
{
    let newStatus = !done
    dispatch('toggle',
    {
        id,
        newStatus
    })
}

</script>


<li>
    <Container>
    <Row>
        {#if !isEditing}
        <Col xs="auto"><button on:click={updateTask}>✏️</button></Col>
        {:else}
           <Col xs="auto"><button on:click={edit}>💾</button></Col>  
        {/if}


         <Col xs="auto"><button on:click={remove}>🗑</button></Col>


{#if done}

       <Col xs="auto"><button on:click={toggleStatus}>✅</button></Col>
       <Col sm="6">
       <span class="is-complete">{text}</span>
       </Col>
{:else}

        <Col xs="auto"><button on:click={toggleStatus}>❌</button></Col>
        {#if !isEditing}
       <Col sm="7">
       <span>{text}</span>
       </Col>
       {:else}
    <Col sm="7">
       <span><input type="text" bind:value={text}></span>
       </Col>
       {/if}


{/if}


    </Row>
    </Container>
<hr>
</li>


<style>
.is-complete{
    text-decoration: line-through;
    color: gray;
}

button{
    background-color: transparent;
    border: 0px;
}

li{
    list-style-type: none;
}


</style>
