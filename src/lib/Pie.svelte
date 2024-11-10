<script>
    import * as d3 from 'd3';

    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

    export let data = [];

    // let data = [
    //     { value: 1, label: 'apples' },
    //     { value: 2, label: 'oranges' },
    //     { value: 3, label: 'mangos' },
    //     { value: 4, label: 'pears' },
    //     { value: 5, label: 'limes' },
    //     { value: 5, label: 'cherries' }
    // ];

    let sliceGenerator = d3.pie().value((d) => d.value);

    let arcData;
    let arcs;

    $: {
        arcData = {};
        arcs = {};

        arcData = sliceGenerator(data);
        arcs = arcData.map((d) => arcGenerator(d));
    }

    // let arcData = sliceGenerator(data);

    // let arcs = arcData.map((d) => arcGenerator(d));

    let colors = d3.scaleOrdinal(d3.schemeTableau10);
</script>

<div class="containter">
    <svg viewBox="-50 -50 100 100">
        {#each arcs as arc, i}
        <path d={arc} fill={ colors(i) } />
        {/each}
    </svg>

    <ul class="legend">
        {#each data as d, index}
        <li style="--color: { colors(index) }">
            <span class="swatch"></span>
            {d.label} <em>({d.value})</em>
        </li>
        {/each}
    </ul>
</div>

<style>
    div {
        display: flex;
        align-items: center;
        gap: 2em;
    }

    svg {
        max-width: 20em;
        margin-block: 2em;

        overflow: visible;
    }

    ul {
        display: grid;
        flex: 1;
        grid-template-columns: repeat(auto-fill, minmax(9em, 1fr));
        align-items: center;
        border-width: 1px;
        border-color: darkgrey;
        border-style: solid;
    }

    ul li {
        display: flex;
        align-items: center;
        gap: 1em;
    }

    ul li span {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: var(--color);
    }
</style>