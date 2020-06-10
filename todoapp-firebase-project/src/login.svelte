<script>
import {auth,googleProvider} from './firebase';
import {authState} from 'rxfire/auth';
import Profile from './profile.svelte'
import ToDos from './todos.svelte'


import {
    Button, Card, CardBody, CardFooter, CardHeader,
    CardImg, CardSubtitle, CardText, CardTitle
  } from "sveltestrap";


  let user;
  
  let unsubscribed = authState(auth).subscribe(u => user = u)


function login()
{
    auth.signInWithPopup(googleProvider);
    
}

</script>






<Card class="mb-3">
{#if user}
<CardHeader>
<CardTitle>To Do List | <button class="log-out-btn" on:click={() => auth.signOut()}>Log Out</button> </CardTitle>

</CardHeader>

<CardBody>
    <Profile {...user} />
    <hr>
    <ToDos uid={user.uid}/>
</CardBody>

{:else}
<CardHeader>
<CardTitle>To Do List |Login</CardTitle>

</CardHeader>

<CardBody>
<button class="log-out-btn" on:click={login}>Sign in with Google</button>
</CardBody>

{/if}

<CardFooter>Made with ❤️ for this Course</CardFooter>

</Card>

<style></style>