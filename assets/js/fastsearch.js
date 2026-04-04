import * as params from '@params';

let fuse; // holds our search engine
let resList = document.getElementById('searchResults');
let sInput = document.getElementById('searchInput');
let sortFilter = document.getElementById('searchSort');
let categoryFilter = document.getElementById('searchCategory');
let seriesFilter = document.getElementById('searchSeries');
let first, last, current_elem = null
let resultsAvailable = false;
let loadedData = [];

// load our search index
window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                if (data) {
                    loadedData = data;
                    populateFilters(data);
                    // fuse.js options; check fuse.js website for details
                    let options = {
                        distance: 100,
                        threshold: 0.4,
                        ignoreLocation: true,
                        keys: [
                            'title',
                            'permalink',
                            'summary',
                            'content',
                            'tags',
                            'categories',
                            'series'
                        ]
                    };
                    if (params.fuseOpts) {
                        options = {
                            isCaseSensitive: params.fuseOpts.iscasesensitive ?? false,
                            includeScore: params.fuseOpts.includescore ?? false,
                            includeMatches: params.fuseOpts.includematches ?? false,
                            minMatchCharLength: params.fuseOpts.minmatchcharlength ?? 1,
                            shouldSort: params.fuseOpts.shouldsort ?? true,
                            findAllMatches: params.fuseOpts.findallmatches ?? false,
                            keys: params.fuseOpts.keys ?? ['title', 'permalink', 'summary', 'content', 'tags', 'categories', 'series'],
                            location: params.fuseOpts.location ?? 0,
                            threshold: params.fuseOpts.threshold ?? 0.4,
                            distance: params.fuseOpts.distance ?? 100,
                            ignoreLocation: params.fuseOpts.ignorelocation ?? true
                        }
                    }
                    fuse = new Fuse(data, options); // build the index from the json file
                }
            } else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.open('GET', "../index.json");
    xhr.send();
}

function activeToggle(ae) {
    document.querySelectorAll('.focus').forEach(function (element) {
        // rm focus class
        element.classList.remove("focus")
    });
    if (ae) {
        ae.focus()
        document.activeElement = current_elem = ae;
        ae.parentElement.classList.add("focus")
    } else {
        document.activeElement.parentElement.classList.add("focus")
    }
}

function reset() {
    resultsAvailable = false;
    resList.innerHTML = sInput.value = ''; // clear inputbox and searchResults
    sInput.focus(); // shift focus to input box
}

function safeArray(value) {
    if (Array.isArray(value)) return value.filter(Boolean);
    if (typeof value === 'string' && value.trim()) return [value.trim()];
    return [];
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightText(text, query) {
    const escaped = escapeHtml(text);
    const trimmed = query.trim();
    if (!trimmed) return escaped;

    try {
        const pattern = new RegExp(`(${escapeRegExp(trimmed)})`, 'ig');
        return escaped.replace(pattern, '<mark class="search-highlight">$1</mark>');
    } catch {
        return escaped;
    }
}

function formatMeta(item) {
    const series = safeArray(item.series);
    const categories = safeArray(item.categories);
    const tags = safeArray(item.tags);
    const bits = [];

    if (item.date) bits.push(`<span class="search-meta-date">${item.date}</span>`);
    if (series.length) bits.push(`<span class="search-meta-chip search-meta-chip-series">${series[0]}</span>`);
    if (categories.length) bits.push(`<span class="search-meta-chip">${categories[0]}</span>`);
    if (tags.length) bits.push(`<span class="search-meta-chip search-meta-chip-muted">${tags[0]}</span>`);

    return bits.join('');
}

function populateSelect(select, values) {
    if (!select) return;
    const current = select.value;
    const options = ['<option value="">All</option>'];
    values.forEach((value) => {
        options.push(`<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`);
    });
    select.innerHTML = options.join('');
    if (current && values.includes(current)) {
        select.value = current;
    }
}

function populateFilters(data) {
    const categories = [...new Set(data.flatMap((item) => safeArray(item.categories)))].sort((a, b) => a.localeCompare(b, 'ja'));
    const series = [...new Set(data.flatMap((item) => safeArray(item.series)))].sort((a, b) => a.localeCompare(b, 'ja'));
    populateSelect(categoryFilter, categories);
    populateSelect(seriesFilter, series);
}

function matchesFilters(item) {
    const selectedCategory = categoryFilter ? categoryFilter.value : '';
    const selectedSeries = seriesFilter ? seriesFilter.value : '';
    const categories = safeArray(item.categories);
    const series = safeArray(item.series);

    if (selectedCategory && !categories.includes(selectedCategory)) return false;
    if (selectedSeries && !series.includes(selectedSeries)) return false;
    return true;
}

function toTimestamp(item) {
    const parsed = Date.parse(item.date || '');
    return Number.isNaN(parsed) ? 0 : parsed;
}

function sortResults(results, query) {
    const mode = sortFilter ? sortFilter.value : 'relevance';
    if (mode === 'newest') {
        return [...results].sort((a, b) => toTimestamp(b.item) - toTimestamp(a.item));
    }
    if (mode === 'oldest') {
        return [...results].sort((a, b) => toTimestamp(a.item) - toTimestamp(b.item));
    }
    if (!query.trim()) {
        return [...results].sort((a, b) => toTimestamp(b.item) - toTimestamp(a.item));
    }
    return results;
}

function runSearch() {
    if (!fuse) return;

    let results;
    const query = sInput.value.trim();
    if (!query) {
        results = loadedData.map((item) => ({ item }));
    } else if (params.fuseOpts) {
        results = fuse.search(query, {limit: params.fuseOpts.limit});
    } else {
        results = fuse.search(query);
    }

    results = results.filter((entry) => matchesFilters(entry.item));
    results = sortResults(results, query);

    if (results.length !== 0) {
        let resultSet = '';

        for (let item in results) {
            const result = results[item].item;
            const summary = (result.summary || '').trim();
            const meta = formatMeta(result);
            resultSet += `<li class="post-entry search-result-card">` +
                `<header class="entry-header"><h2>${highlightText(result.title, query)}</h2></header>` +
                (meta ? `<div class="search-result-meta">${meta}</div>` : '') +
                (summary ? `<div class="entry-content"><p>${highlightText(summary, query)}</p></div>` : '') +
                `<a href="${result.permalink}" aria-label="${escapeHtml(result.title)}"></a></li>`
        }

        resList.innerHTML = resultSet;
        resultsAvailable = true;
        first = resList.firstChild;
        last = resList.lastChild;
    } else {
        resultsAvailable = false;
        resList.innerHTML = '';
    }
}

// execute search as each character is typed
sInput.onkeyup = function (e) {
    runSearch();
}

if (categoryFilter) categoryFilter.addEventListener('change', runSearch);
if (seriesFilter) seriesFilter.addEventListener('change', runSearch);
if (sortFilter) sortFilter.addEventListener('change', runSearch);

sInput.addEventListener('search', function (e) {
    // clicked on x
    if (!this.value) reset()
})

// kb bindings
document.onkeydown = function (e) {
    let key = e.key;
    let ae = document.activeElement;

    let inbox = document.getElementById("searchbox").contains(ae)

    if (ae === sInput) {
        let elements = document.getElementsByClassName('focus');
        while (elements.length > 0) {
            elements[0].classList.remove('focus');
        }
    } else if (current_elem) ae = current_elem;

    if (key === "Escape") {
        reset()
    } else if (!resultsAvailable || !inbox) {
        return
    } else if (key === "ArrowDown") {
        e.preventDefault();
        if (ae == sInput) {
            // if the currently focused element is the search input, focus the <a> of first <li>
            activeToggle(resList.firstChild.lastChild);
        } else if (ae.parentElement != last) {
            // if the currently focused element's parent is last, do nothing
            // otherwise select the next search result
            activeToggle(ae.parentElement.nextSibling.lastChild);
        }
    } else if (key === "ArrowUp") {
        e.preventDefault();
        if (ae.parentElement == first) {
            // if the currently focused element is first item, go to input box
            activeToggle(sInput);
        } else if (ae != sInput) {
            // if the currently focused element is input box, do nothing
            // otherwise select the previous search result
            activeToggle(ae.parentElement.previousSibling.lastChild);
        }
    } else if (key === "ArrowRight") {
        ae.click(); // click on active link
    }
}
