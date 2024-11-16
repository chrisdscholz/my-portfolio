<script>
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    import { computePosition, autoPlacement, offset } from '@floating-ui/dom';
    import Pie from '$lib/Pie.svelte';

    let data = [];

    let commits = [];

    let maxD = [];
    let avgD = [];

    let maxL = [];

    let files = [];

    let dateRange = [];

    let width = 1000,
        height = 600;

    let margin = { top: 10, right: 10, bottom: 30, left: 20};

    let usableArea = {
        top: margin.top,
        right: width - margin.right,
        bottom: height - margin.bottom,
        left: margin.left,
    };

    usableArea.width = usableArea.right - usableArea.left;
    usableArea.height = usableArea.bottom - usableArea.top;

    let yAxisGridlines;

    onMount(async () => {
        data = await d3.csv('loc.csv', (row) => ({
            ...row,
            line: Number(row.line),
            depth: Number(row.depth),
            length: Number(row.length),
            date: new Date(row.date + 'T00:00' + row.timezone),
            datetime: new Date(row.datetime),
        }));

        commits = d3
            .groups(data, (d) => d.commit)
            .map(([commit, lines]) => {
                let first = lines[0];
                let { author, date, time, timezone, datetime } = first;
                let ret = {
                    id: commit,
                    url: 'https://github.com/chrisdscholz/my-portfolio/commit/' + commit,
                    author,
                    date,
                    time,
                    timezone,
                    datetime,
                    hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
                    totalLines: lines.length,
                };

                Object.defineProperty(ret, 'lines', {
                    value: lines,
                    configurable: true,
                    writable: true,
                    enumerable: false,
                });

                return ret;
            });

        maxL = d3.max(data, d => d.line);
        maxD = d3.max(data, d => d.depth);
        avgD = d3.mean(data, d => d.depth);
        files = d3.group(data, d => d.file);
        dateRange = d3.extent(commits, d => d.datetime);
    });

    $: yScale = d3.scaleLinear()
        .domain([0, 24])
        .range([usableArea.bottom, usableArea.top]);
    
    $: xScale = d3.scaleUtc()
        .domain([dateRange[0], dateRange[1]])
        .range([usableArea.left, usableArea.right])
        .nice();

    let xAxis, yAxis;

    $: {
        d3.select(xAxis).call(d3.axisBottom(xScale));
        d3.select(yAxis).call(
            d3
            .axisLeft(yScale)
        .tickFormat((d) => String(d % 24).padStart(2, 0) + ':00')
        );
    }

    $: {
        d3.select(yAxisGridlines).call(
            d3.axisLeft(yScale).tickFormat('').tickSize(-usableArea.width),
        );
    }

    let hoveredIndex = -1;
    $: hoveredCommit = commits[hoveredIndex] ?? hoveredCommit ?? {};

    // let cursor = { x: 0, y: 0 };

    let commitTooltip;
    let tooltipPosition = { x: 0, y: 0};

    async function dotInteraction(index, evt) {
        let hoveredDot = evt.target;

        if (evt.type === 'mouseenter' || evt.type === 'focus') {
            hoveredIndex = index;
            // cursor = {x: evt.x, y: evt.y}
            tooltipPosition = await computePosition(hoveredDot, commitTooltip, {
                strategy: 'fixed',
                middleware: [
                    offset(5),
                    autoPlacement(),
                ],
            });
        }
        else if (evt.type === 'mouseleave' || evt.type === 'blur') {
            hoveredIndex = -1
        }

    }

    let svg;
    let brushSelection;

    function brushed(evt) {
            brushSelection = evt.selection;
        }

    $: {
        d3.select(svg).call(d3.brush().on('start brush end', brushed));
        d3.select(svg).selectAll('.dots, .overlay ~ *').raise();
    }

    $: {

    }
</script>

<h1>Meta</h1>
<p>This page includes stats about the code of this website</p>

<p>{brushSelection}</p>

<h2>Codebase stats</h2>
<section class="code_stats">
    <dl>
        <dt>Total <abbr title="Lines of code">LOC</abbr></dt>
        <dd>{data.length}</dd>
        
        <dt>Commits </dt>
        <dd>{commits.length}</dd>

        <dt>Files </dt>
        <dd>{files.size}</dd>

        <dt>Maximum Depth </dt>
        <dd>{maxD}</dd>

        <dt>Longest Line </dt>
        <dd>{maxL}</dd>
    </dl>
</section>

<svg viewBox="0 0 {width} {height}" bind:this={svg}>
    <g 
        class="gridlines"
        transform="translate({usableArea.left}, 0)"
        bind:this="{yAxisGridlines}"
    
    />
    <g transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
    <g transform="translate({usableArea.left}, 0)" bind:this={yAxis} />
    <g class="dots">
        {#each commits as commit, index}
        <circle
        cx={
        xScale(commit.datetime)
        }
        cy={
        yScale(commit.hourFrac)
        }
        r="7"
        fill="steelblue"
        on:mouseenter={evt => dotInteraction(index, evt)}
        on:mouseleave={evt => dotInteraction(index, evt)}
        tableindex="0"
        aria-describedby="commit-tooltip"
        role="tooltip"
        aria-haspopup="true"
        on:focus={evt => dotInteraction(index, evt)}
        on:blur={evt => dotInteraction(index, evt)}
        />
        {/each}
    </g>
</svg>

<dl id="commit-tooltip" class="info tooltip" hidden={hoveredIndex === -1} 
    style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px" bind:this="{commitTooltip}">
    <dt>Commit ID</dt>
    <dd>
        <a href="{ hoveredCommit.url }" target="_blank">{ hoveredCommit.id }</a>
    </dd>

    <dt>Author</dt>
    <dd>{ hoveredCommit.author }</dd>

    <dt>Date</dt>
    <dd>{ hoveredCommit.datetime?.toLocaleString("en", {dateStyle: "full"}) }</dd>

    <dt>Time</dt>
    <dd>{ hoveredCommit.datetime?.toLocaleString("en", {timeStyle: "short"}) }</dd>
</dl>

<style>
    svg{
        overflow: visible;
    }

    .gridlines {
        stroke-opacity: 0.2;
    }

    dl.info {
        display: grid;
        margin: 0;
        transition-duration: 500ms;
        transition-property: opacity, visibility;

        &[hidden]:not(:hover, :focus-within) {
            opacity: 0;
            visibility: hidden;
        }
    }

    .tooltip {
        position: fixed;
        top: 1em;
        left: 1em;
        background-color: oklch(40% 0% 0 / 10%);
        /* box-shadow: 2px 2px 1px gray; */
        border-radius: 2px;
        border-color: gray;
        backdrop-filter: blur(10px);
    }

    circle {
        transition: 200ms;

        &:hover {
            transform: scale(1.5);
        }
        transform-origin: center;
        transform-box: fill-box;
    }
</style>