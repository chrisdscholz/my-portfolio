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

<!--     <link href="style.css"
    rel="stylesheet" /> -->
<!--     <script src="global.js"
    type="module"></script> -->