<script>
    import { page } from '$app/stores';
    import '../style.css';

    let pages = [
        {url: './', title: 'Home'},
        {url: 'projects', title: 'Projects'},
        {url: 'contact', title: 'Contact'},
        {url: 'resume', title: 'Resume'},
        {url: 'meta', title: 'Meta'},
        {url: 'https://github.com/chrisdscholz', title: 'My GitHub Profile'},
    ];

    //color scheme switch
    let colorScheme = 'light dark';

    let root = globalThis?.document?.documentElement;

    $: root?.style.setProperty('color-scheme', colorScheme);

    let localStorage = globalThis.localStorage ?? {};

    if (localStorage.colorScheme) {
        colorScheme = localStorage.colorScheme;
    }

    $: localStorage.colorScheme = colorScheme;
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

<label class="color-scheme">
    Theme:
    <select bind:value={ colorScheme } id="selector">
        <option value="auto">Automatic</option>
        <option value="light dark">Light Dark</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
    </select>
</label>

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

    label.color-scheme {
        position:absolute;
        top: 1rem;
        right: 1rem;
        font-size: 80%;
        font-family: inherit;
    }

</style>

<slot />