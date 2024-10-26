console.log("IT'S ALIVE!");

function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

/* let pages = [
    {url: './', title: 'Home'},
    {url: 'projects', title: 'Projects'},
    {url: 'contact', title: 'Contact'},
    {url: 'resume', title: 'Resume'},
    {url: 'https://github.com/chrisdscholz', title: 'My GitHub Profile'},
];

let nav = document.createElement('nav');
document.body.prepend(nav);

const ARE_WE_HOME = document.documentElement.classList.contains('home'); */

/* for (let p of pages) {
    let url = p.url;
    let title = p.title;

    if (!ARE_WE_HOME && !url.startsWith('http')) {
        url = '../' + url;
    }

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);

    let normPath = a.pathname === '' || a.pathname === '/index.html' ? '' : a.pathname;
    let currPath = location.pathname === '' || location.pathname === '/index.html' ? '' : location.pathname;

    if (a.host === location.host && normPath === currPath) {
        a.classList.add('current');
    }

    if (a.host !== location.host) {
        a.target = "_blank";
    }
} */

document.body.insertAdjacentHTML(
    'afterbegin',
    `
        <label class="color-scheme">
            Theme:
            <select id="selector">
                <option value="auto">Automatic</option>
                <option value="light dark">Light Dark</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </label>`,
);

let select = document.querySelector("#selector");

select.addEventListener('input', function(event) {
    console.log('color scheme changed to', event.target.value);
    document.documentElement.style.setProperty('color-scheme', event.target.value);
    localStorage.colorScheme = event.target.value;
})

if ("colorScheme" in localStorage) {
    document.documentElement.style.setProperty('color-scheme', localStorage.colorScheme);
    select.value = localStorage.colorScheme;
}

let contForm = document.querySelector("#eContact");

contForm?.addEventListener('submit', function(event) {
    event.preventDefault();

    let eURL = ""

    let data = new FormData(contForm);

    for (let [name, value] of data) {
        if (name === 'email') {
            eURL = eURL + "mailto:" + value + "?"
        }

        if (name === 'subject') {
            eURL = eURL + "subject=" + value + "&";
        }

        if (name === 'body') {
            eURL = eURL + "body=" + encodeURIComponent(value);
        }
    }

    location.href = eURL;
})
