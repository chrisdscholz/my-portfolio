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

    let colors = d3.scaleOrdinal(d3.schemeTableau10);

    export let selectedIndex = -1;

    function toggleWedge(index, event) {
        if (!event.key || event.key === 'Enter'){
            selectedIndex = selectedIndex === index ? -1 : index;
        }
    }
</script>

<div class="containter">
    <svg viewBox="-50 -50 100 100">
        {#each arcs as arc, i}
        <path d={arc} style="
            --start-angle: { arcData[i]?.startAngle }rad;
            --end-angle: { arcData[i]?.endAngle }rad;"
        fill={ colors(i) } 
        class:selected={selectedIndex === i} on:click={e => toggleWedge(i, e)} on:keyup={e => toggleWedge(i, e)} 
        tabindex="0" role="button" aria-label="pie slice"
        />
        {/each}
    </svg>

    <ul class="legend">
        {#each data as d, index}
        <li style="--color: { colors(index) }" class:selected={selectedIndex === index}>
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

    svg:has(path:hover, path:focus-visible) {
        path:not(:hover, :focus-visible) {
            opacity: 50%;
        }
    }

    path {
        --angle: calc(var(--end-angle) - var(--start-angle));
        --mid-angle: calc(var(--start-angle) + var(--angle) / 2);
        
    &.selected {
        transform: rotate(var(--mid-angle)) translateY(-6px) scale(1.1) rotate(calc(-1 * var(--mid-angle)));
    }
        transform: rotate(var(--mid-angle)) translateY(0) rotate(calc(-1 * var(--mid-angle)));
        transition: 300ms;
        outline: none;
    }

    .selected {
        --color: oklch(60% 45% 0) !important;
        &:is(path) {
            fill: var(--color);
        }
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