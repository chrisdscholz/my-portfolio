<script>
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    let data = [];

    let commits = [];

    let maxD = [];
    let avgD = [];

    let maxL = [];

    let files = [];

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
                    url: 'https://github.com/chrisdscholz/my-portfolio/commit' + commit,
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
    });

    let dateRange = d3.extent(commits, d => d.datetime);

    // minDate = d3.extent(date)

    let width = 1000,
        height = 600;

    const yScale = d3.scaleLinear()
        .domain([0, 24])
        .range([0, height]);
    
    const xScale = d3.scaleUtc()
        .domain([dateRange])
        .range([0, width])
        .nice();
</script>

<h1>Meta</h1>
<p>This page includes stats about the code of this website</p>

<p>Total lines of code: {data.length}</p>

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

<svg viewBox="0 0 {width} {height}">
    <g class="dots">
        {#each commits as commit, index}
        <circle
        cx={
        xScale(commit.datetime)
        }
        cy={
        yScale(commit.hourFrac)
        }
        r="5"
        fill="steelblue"
        />
        {/each}
    </g>
</svg>

<style>
    svg{
        overflow: visible;
    }
</style>