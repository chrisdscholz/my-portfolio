<svelte:head>
    <title>Projects</title>
</svelte:head>

<script>
    import * as d3 from "d3";

    import projects from '$lib/projects.json';
    import Project from '$lib/Project.svelte';
    import Pie from '$lib/Pie.svelte';

    // let rolledData = d3.rollups(
    //     filteredProjects,
    //     (v) => v.length,
    //     (d) => d.year,
    // );

    let rolledData;

    let pieData;

    $: {
        pieData = {};
        
        rolledData = {};

        rolledData = d3.rollups(
            filteredProjects,
            (v) => v.length,
            (d) => d.year,
        );

        pieData = rolledData.map(([year, count]) => {
        return {value: count, label: year };
    });
    }

    // let pieData = rolledData.map(([year, count]) => {
    //     return {value: count, label: year };
    // });

    let query = '';

    let filteredProjects;
    $: filteredProjects = projects.filter((project) => {

        let values = Object.values(project).join('\n').toLowerCase();
        return values.includes(query.toLowerCase());
    });

    let selectedYearIndex = -1;
    let selectedYear;
    $: selectedYear = 
        selectedYearIndex > -1 ? pieData[selectedYearIndex].label : null;

    let filteredByYear;
    $: filteredByYear = projects.filter((year) => {
        let values = Object.values(year);
        return values.includes(selectedYear);
    })
</script>

<h4>Menu</h4>

<Pie data={pieData} bind:selectedIndex="{selectedYearIndex}"/>

<p>{ selectedYearIndex }</p>
<p>{ selectedYear }</p>

<input 
    type="search"
    bind:value="{query}"
    aria-label="Search projects"
    placeholder="Search projects..."
/>

    <h1>{filteredByYear.length} Projects</h1>
    <div class="projects">
        {#each filteredByYear as p}
            <Project data={p} hLevel=3 />
        {/each}
<!--         <article>
            <h2>Numquam suscipit ea laboriosam.</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Repellat eos doloribus, asperiores non a, in explicabo alias quaerat sunt veritatis minima, molestias reprehenderit rerum enim beatae voluptatibus possimus mollitia adipisci. Unde neque at est autem amet ipsum reiciendis!</p>
        </article>
        <article>
            <h2>Doloribus omnis sequi odio.</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Accusamus pariatur illo autem distinctio soluta enim explicabo animi, optio cum minus, beatae dolorem rerum earum unde, vel adipisci? Mollitia reiciendis maiores molestiae dolorem harum quas consectetur rerum, totam fuga.</p>
        </article>
        <article>
            <h2>Maxime facilis laboriosam quos!</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Vero ex, eius omnis qui dolores labore obcaecati voluptatum possimus aliquid porro, eligendi magni laboriosam deleniti in repellendus id accusamus illum soluta ducimus commodi? Maiores obcaecati dolorem unde rem. Ea?</p>
        </article>
        <article>
            <h2>Quisquam perspiciatis reiciendis ipsa.</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Asperiores assumenda, nostrum, mollitia eos aut ex laborum natus dolores, excepturi consequuntur eaque! Corrupti laborum sint officia tempora, aspernatur facere unde magnam sit ratione dolorum optio at qui voluptate mollitia.</p>
        </article>
        <article>
            <h2>Ab tempore aliquam obcaecati.</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Cupiditate asperiores atque itaque? Nemo rem itaque consectetur harum fuga, iusto vero minus sed cumque, facere animi? Odio itaque, recusandae fugiat excepturi quibusdam eius magni error. Tempora numquam eius hic.</p>
        </article>
        <article>
            <h2>Cum delectus eos sint.</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Dolorem similique illo quaerat sapiente incidunt eaque doloremque repellendus asperiores sunt tenetur, unde expedita, optio temporibus adipisci deserunt? Dignissimos earum ex beatae debitis totam consequatur libero sed perspiciatis quae placeat?</p>
        </article>
        <article>
            <h2>Aspernatur ducimus illum nisi.</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Eum ratione temporibus officiis vero nam cumque incidunt consequuntur laboriosam enim doloremque illum, ab voluptates ipsa hic sequi. Hic, modi harum saepe optio fugit consequuntur reiciendis impedit reprehenderit adipisci aliquid.</p>
        </article>
        <article>
            <h2>Beatae vero sunt praesentium!</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Quaerat labore totam voluptate error eum eveniet nihil, cumque neque blanditiis consequuntur debitis impedit maxime asperiores itaque numquam nam quidem rerum nostrum autem rem repellat eius. Consectetur ut voluptates assumenda!</p>
        </article>
        <article>
            <h2>Ipsa illo quos libero?</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Maiores non officiis repudiandae odio odit possimus numquam laboriosam reiciendis, nemo ipsum, tenetur veniam aspernatur! Optio repudiandae accusantium laboriosam, illo autem sed modi architecto nesciunt iste perferendis tempora recusandae quis.</p>
        </article>
        <article>
            <h2>Debitis tempore quis molestias!</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Minima hic aspernatur dignissimos ratione dicta a molestiae illum, excepturi in rerum eaque veniam magni aliquid, sint qui labore, provident voluptates nesciunt maxime nulla! Architecto dicta optio iusto animi repellendus.</p>
        </article>
        <article>
            <h2>Deserunt deleniti praesentium repellat!</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Non, harum omnis esse at consequuntur laborum similique eveniet labore libero unde, qui tempora. Et, minus quas! Fugiat cum omnis eaque adipisci, minima soluta dolorem, distinctio suscipit, dolore aperiam animi?</p>
        </article> -->
    </div>

<!--     <link href="../style.css"
    rel="stylesheet" /> -->
<!--     <script src="../global.js"
    type="module"></script> -->