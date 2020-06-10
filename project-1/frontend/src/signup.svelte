<script>
// import {auth,googleProvider} from './firebase';
// import {authState} from 'rxfire/auth';
import Profile from './profile.svelte'
import ToDos from './todos.svelte'


import {
    Button, Card, CardBody, CardFooter, CardHeader,
    CardImg, CardSubtitle, CardText, CardTitle
  } from "sveltestrap";


  let user;
  

function signup()
{
	let username = document.getElementById("username");
	let email = document.getElementById("email");
	let password = document.getElementById("password");

	const body = {
		username: username.value,
		email: email.value,
		password: password.value
	}
	fetch("https://sveltecourse-todoapp.herokuapp.com/api/v1/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	})
	.then(response => response.json())
	.then(data => {
		localStorage.setItem("token", data.token);
		localStorage.setItem("uid", data.uid);
		localStorage.setItem("displayName", data.displayName);
		localStorage.setItem("photoURL", data.photoURL);
		location.reload();
	}).catch(err => {
		console.error(err);
		alert("Error signing up")
	})
	.catch(err => {
		console.error(err);
		alert("Error signing up")
	})
}

function logout() {
	localStorage.clear();	
	location.reload();
}


function login() {

	let email = document.getElementById("email");
	let password = document.getElementById("password");

	const body = {
		email: email.value,
		password: password.value
	}
	fetch("https://sveltecourse-todoapp.herokuapp.com/api/v1/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	})
	.then(response => response.json())
	.then(data => {
		localStorage.setItem("token", data.token);
		localStorage.setItem("uid", data.uid);
		localStorage.setItem("displayName", data.displayName);
		localStorage.setItem("photoURL", data.photoURL);
		location.reload();
	}).catch(err => {
		console.error(err);
		alert("Error logging in")
	})
	.catch(err => {
		console.error(err);
		alert("Error logging in")
	})
}

</script>


<Card class="mb-3">
{#if localStorage.getItem("uid")}
<CardHeader>
<!--<CardTitle>To Do List | <button class="log-out-btn" on:click={() => auth.signOut()}>Log Out</button> </CardTitle> -->

</CardHeader>

<CardBody>
<Profile displayName={localStorage.getItem("displayName")} photoURL={localStorage.getItem("photoURL")} uid={localStorage.getItem("uid")} />
    <hr>
	<ToDos uid={localStorage.getItem("uid")} />
</CardBody>


<button class="log-out-btn" on:click={logout}>Logout</button>

{:else}
<CardHeader>
<CardTitle>To Do List |Login</CardTitle>

</CardHeader>

<CardBody>
<input id="username" name="username" placeholder="username" required/>
<input id="email" name="email" placeholder="email" required />
<input id="password" name="password" placeholder="password" type="password" required/>
<button class="log-out-btn" on:click={login}>Log in</button>
<button class="log-out-btn" on:click={signup}>Sign up</button>
</CardBody>

{/if}

<CardFooter>Made with ❤️ for this Course</CardFooter>

</Card>

<style></style>
