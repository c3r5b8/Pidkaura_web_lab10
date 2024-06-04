let loadBtn = document.getElementById('load');
let clearBtn = document.getElementById('clear');
let url = document.getElementById('url');
let res = document.getElementById('result_count');
let showTable = document.getElementById('show_table');
let hideTable = document.getElementById('hide_table');
let clear_sort = document.getElementById('clear_sort');

clearBtn.disabled = true;

url.value = 'https://jsonplaceholder.typicode.com/users';

function checkUrl(urlValue) {
    let urlPattern = /^(http|https):\/\/[^ "]+$/;
    if (urlPattern.test(urlValue)) {
        return true;
    } else {
        return false;
    }
}

let tableData = [];
let oroginalData = [];

function loadTable() {
    let urlValue = url.value;
    let load_errot = false;
    if (checkUrl(urlValue)) {
        fetch(urlValue)
            .then(response => {
                if (!response.ok) {
                    load_errot = true;
                    text = 'Помилка: ' + response.status + ' ' + response.statusText
                    return text;
                } else {
                    return response.json();
                }
            }).then(json => {
                if (load_errot) {
                    res.style.display = 'block';
                    res.style.color = 'red';
                    res.textContent = json
                } else {
                    let rowCount = json.length;
                    tableData = json;
                    oroginalData = json;
                    res.style.display = 'block';
                    res.style.color = 'green';
                    res.textContent = "Дані формату JSON успішно завантажено. Кількість записів рівна " + rowCount;
                    document.getElementsByClassName('show_table')[0].style.display = 'block';
                    clearBtn.disabled = false;
                    clearBtn.style.background = "#9f3080";
                    loadBtn.disabled = true;
                    loadBtn.style.background = "#399f30";
                }
            });
    } else {
        alert('Please enter a valid URL');
        return;
    }
}

function clear() {
    url.value = '';
    res.style.display = 'none';
    document.getElementsByClassName('show_table')[0].style.display = 'none';
    clearBtn.disabled = true;
    clearBtn.style.background = "#762960";
    loadBtn.disabled = false;
    loadBtn.style.background = "#99e592";
    document.getElementsByClassName('table')[0].style.display = 'none';
}

let sorted_by = 'id';

let colors = ['#0fa227', '#0fa227', '#0fa227', '#0fa227'];

function showTableData() {

    document.getElementsByClassName('table')[0].style.display = 'block';

    let table = document.getElementById('table');
    table.innerHTML = `
        <button style="background: ${colors[0]}" id="sort_by_id">ID</button>
        <button style="background: ${colors[1]}" id="sort_by_street">Street</button>
        <button style="background: ${colors[2]}" id="sort_by_phone">Phone</button>
        <button style="background: ${colors[3]}" id="sort_by_website">Website</button>
    `;


    for (let i = 0; i < tableData.length; i++) {
        let row = '';
        let id = tableData[i].id;
        let street = tableData[i].address.street;
        let phone = tableData[i].phone;
        let website = tableData[i].website;
        let class_ = "light_green"
        if (i % 2 == 0) {
            class_ = "dark_green";
        }
        row = `
            <div class="${class_}" >${id}</div>
            <div class="${class_}" >${street}</div>
            <div class="${class_}" >${phone}</div>
            <div class="${class_}" >${website}</div>
        `;
        table.innerHTML += row;
    }

    let sort_by_id = document.getElementById('sort_by_id');
    let sort_by_street = document.getElementById('sort_by_street');
    let sort_by_phone = document.getElementById('sort_by_phone');
    let sort_by_website = document.getElementById('sort_by_website');

    function clearSortColors() {
        sort_by_id.style.background = '#0fa227';
        sort_by_street.style.background = '#0fa227';
        sort_by_phone.style.background = '#0fa227';
        sort_by_website.style.background = '#0fa227';
    }

    function clearSort() {
        sorted_by = '';
        sortById(false);
    }

    function sortById(f) {
        if (sorted_by == 'id') {
            tableData.reverse();
        } else {
            tableData.sort((a, b) => a.id - b.id);
        }
        sorted_by = 'id';
        clearSortColors();
        colors = ['#0fa227', '#0fa227', '#0fa227', '#0fa227'];
        if (f) {
            colors[0] = '#e34cb9';
        }
        showTableData();
    }

    function sortByStreet() {
        if (sorted_by == 'street') {
            tableData.reverse();
        } else {
            tableData.sort((a, b) => a.address.street.localeCompare(b.address.street));
        }
        sorted_by = 'street';
        clearSortColors();
        colors = ['#0fa227', '#0fa227', '#0fa227', '#0fa227'];
        colors[1] = '#e34cb9';
        showTableData();
    }

    function sortByPhone() {
        if (sorted_by == 'phone') {
            tableData.reverse();
        } else {
            tableData.sort((a, b) => a.phone.localeCompare(b.phone));
        }
        sorted_by = 'phone';
        colors = ['#0fa227', '#0fa227', '#0fa227', '#0fa227'];
        colors[2] = '#e34cb9';
        showTableData();
    }

    function sortByWebsite() {
        let sort_by_website = document.getElementById('sort_by_website');

        if (sorted_by == 'website') {
            tableData.reverse();
        } else {
            tableData.sort((a, b) => a.website.localeCompare(b.website));
        }
        sorted_by = 'website';
        colors = ['#0fa227', '#0fa227', '#0fa227', '#0fa227'];
        colors[3] = '#e34cb9';
        showTableData();
    }




    sort_by_id.addEventListener('click', sortById);
    sort_by_street.addEventListener('click', sortByStreet);
    sort_by_phone.addEventListener('click', sortByPhone);
    sort_by_website.addEventListener('click', sortByWebsite);
    clear_sort.addEventListener('click', clearSort);
}


// Event listeners
loadBtn.addEventListener('click', loadTable);
clearBtn.addEventListener('click', clear);
showTable.addEventListener('click', showTableData);
hideTable.addEventListener('click', clear);
