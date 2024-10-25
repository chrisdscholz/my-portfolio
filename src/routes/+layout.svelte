YOLO <slot />
<script>
    let pages = [
        {url: './', title: 'Home'},
        {url: 'projects', title: 'Projects'},
        {url: 'contact', title: 'Contact'},
        {url: 'resume', title: 'Resume'},
        {url: 'https://github.com/chrisdscholz', title: 'My GitHub Profile'},
    ];
</script>

<nav>
    {#each pages as p}
    href={p.url};
    textContent={p.title};
    {/each}
</nav>