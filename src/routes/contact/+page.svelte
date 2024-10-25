<svelte:head>
    <title>Contact</title>
</svelte:head>

<h4>Menu</h4>

<h1>Contact</h1>

<form id="eContact" action="mailto:cscholz@ucsd.edu" method="GET">
    <label for="email">
        Email
        <input name="email", type="email"/>
    </label>
    <label for="subject">
        Subject
        <input name="subject"/>
    </label>
    <label for="body">
        Body
        <textarea name="body"></textarea>
    </label>
    <button>Submit</button>
</form>

<link href="../style.css"
rel="stylesheet" />
<script src="../global.js"
type="module"></script>