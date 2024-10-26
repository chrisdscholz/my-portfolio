<script>
    import { page } from '$app/stores';
    import '../style.css';

    let pages = [
        {url: './', title: 'Home'},
        {url: 'projects', title: 'Projects'},
        {url: 'contact', title: 'Contact'},
        {url: 'resume', title: 'Resume'},
        {url: 'https://github.com/chrisdscholz', title: 'My GitHub Profile'},
    ];
</script>

<nav>
    <ul>
        {#each pages as p}
            {#if p.url === './'}
                <a href={p.url} class:current={$page.route.id === '/' && p.url === './'} target={ p.url.startsWith("http") ? "_blank" : null}>
                    {p.title}
                </a>
            {:else}
                <a href={p.url} class:current={$page.route.id === ('/' + p.url)} target={ p.url.startsWith("http") ? "_blank" : null}>
                    {p.title}
                </a>            
            {/if}
        {/each}
    </ul>
</nav>

<style>
    nav {
        display: flex;
        margin-bottom: 0.5em;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        /*border-bottom-color:oklch(80% 3% 200);*/
        border-bottom-color: var(--border-color);
    }

    nav ul {
        display: contents;
    }

    nav li {
        display: contents;
    }

    nav a {
        flex: 1;
        text-decoration: none;
        color: inherit;
        text-align: center;
        padding: 0.5em;
    }

    nav a.current {
        border-bottom-width: 0.4em;
        border-bottom-style: solid;
        border-bottom-color: var(--border-color);
    }

    nav a:hover {
        /*background-color: oklch(from var(--color-accent) 95% 5% h);*/
        background-color: color-mix(in oklch, var(--color-accent), canvas 85%);
        border-bottom-width: 0.4em;
        border-bottom-style: solid;
        border-bottom-color: var(--color-accent);
    }
</style>

<slot />