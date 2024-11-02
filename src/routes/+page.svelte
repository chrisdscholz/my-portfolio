<script>
    import projects from '$lib/projects.json';
    import Project from '$lib/Project.svelte';


</script>
    
    <h4>Menu</h4>

    <h1>Chris Scholz</h1>
    <p>Data science student at UCSD</p>
    <img
    class="fit-picture"
    src="images/mantis.jpg"
    alt="Mantis blending in with the leaves of an apple tree" />

    <h2>Latest Projects</h2>
    <div class="projects">
        {#each projects.slice(0, 3) as p}
            <Project data={p} hLevel=3 />
        {/each}
    </div>

    <h2>My GitHub Stats</h2>

    {#await fetch("https://api.github.com/users/chrisdscholz") }
    <p>Loading...</p>
    {:then response} {#await response.json()}
    <p>Decoding...</p>
    {:then data}
    <section class="API_stats">
        <dl>
            <dt>Followers: </dt>
            <dd>{ JSON.stringify(data.followers) }</dd>

            <dt>Following: </dt>
            <dd>{ JSON.stringify(data.following) }</dd>

            <dt>Public Repos: </dt>
            <dd>{ JSON.stringify(data.public_repos) }</dd>

            <dt>Public Gists: </dt>
            <dd>{ JSON.stringify(data.public_gists) }</dd>
        </dl>
    </section>
    {:catch error}
    <p class="error">Something went wrong: {error.message}</p>
    {/await} {:catch error}
    <p class="error">Something went wrong: {error.message}</p>
    {/await}

<!--     <link href="style.css"
    rel="stylesheet" /> -->
<!--     <script src="global.js"
    type="module"></script> -->