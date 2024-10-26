<script>
    import { page } from '$app/stores';

    let pages = [
        {url: './', title: 'Home'},
        {url: 'projects', title: 'Projects'},
        {url: 'contact', title: 'Contact'},
        {url: 'resume', title: 'Resume'},
        {url: 'https://github.com/chrisdscholz', title: 'My GitHub Profile'},
    ];
</script>

{
    JSON.stringify($page)
}

<nav>
    <ul>
        {#each pages as p}
            <a href={p.url} class:current={'.' + $page.route.id === p.url}>
                {p.title}
            </a>
        {/each}
    </ul>
</nav>

<slot />