<script>
import {
    Button, Card, CardBody, CardFooter, CardHeader,
    CardImg, CardSubtitle, CardText, CardTitle, Col,Container,Row
  } from "sveltestrap";



export let displayName;
export let photoURL;
export let uid;


</script>


<Card class="mb-3">

<CardHeader>
<CardTitle>Welcome {displayName}</CardTitle>
</CardHeader>
<CardBody>
<CardText>
<Row>
    <Col xs="auto"> <img src={photoURL} width="100"></Col>
    <Col xs="auto">User ID : {uid}</Col>
</Row>
</CardText>
<Button color="dark">Edit Profile</Button>
</CardBody>
</Card>



<style></style>
