<script>
    export let data = {};
    export let hLevel = 2;
</script>

<article>
    {#if hLevel === 1}
    <h1>{data.title}</h1>
    {:else if hLevel === 2}
    <h2>{data.title}</h2>
    {:else if hLevel === 3}
    <h3>{data.title}</h3>
    {:else if hLevel === 4}
    <h4>{data.title}</h4>
    {:else if hLevel === 5}
    <h5>{data.title}</h5>
    {:else if hLevel === 6}
    <h6>{data.title}</h6>
    {/if}
    <svelte:element this={'h' + hLevel}>{data.title}</svelte:element>
    <p>{data.year}</p>
    <img src={data.image} alt="" class="responsive_image">
    <p>{data.description}</p>
</article>

<style>
    article {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 4;
    margin: 0;
    }

    .responsive_image {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
</style>