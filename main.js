const container = document.querySelector('.container');
const content = document.querySelector('.content');
const text = document.querySelector('.text');
const rmvBtn = document.querySelector('.rmvBtn')
const button = document.querySelector('.button');
const sort = document.querySelector('.sort');
const tasks = document.querySelector('.tasks');
// let task, metn, rmvTsk;

tasks.style.display = 'none';

// input value remove
rmvBtn.addEventListener('click', () => {
    text.value = '';
});

// input remove hover
rmvBtn.addEventListener('mousemove', (event) => {
    event.target.src = './symbol/cancel-hover.png'
});
rmvBtn.addEventListener('mouseout', (event) => {
    event.target.src = './symbol/cancel.png'
});

// input add
function addTask() {

    // input visible&hidden
    if(content.style.display === 'none') {
        content.style.display = 'flex';
        text.focus();
    }
    else {
        if(text.value != '') {
            content.style.display = 'none';
        }
        else {
            alert('Tapşırıq daxil edin!');
        }
    }

    if(text.value == '') return;

    // li tag (task)
    const task = document.createElement('li');
    task.classList.add('task');
    tasks.append(task);

    // li > p tag (paragraph)
    const metn = document.createElement('p');
    metn.classList.add('metn');
    task.append(metn);
    metn.innerHTML = text.value;



    // li > img tag (remove button)
    const rmvTsk = document.createElement('img');
    rmvTsk.classList.add('rmvBtn');
    task.append(rmvTsk);
    rmvTsk.src = './symbol/cancel.png';
    rmvTsk.alt = 'remove';

    text.value = '';

    // remove hover
    rmvTsk.addEventListener('mousemove', (event) => {
        event.target.src = './symbol/cancel-hover.png'
    });
    rmvTsk.addEventListener('mouseout', (event) => {
        event.target.src = './symbol/cancel.png'
    });
    
    // remove
    rmvTsk.addEventListener('click', () => {
        rmvTsk.parentElement.remove();
        if(tasks.children.length == 0) tasks.style.display = 'none';

        // her seyi silende input gorunsun...
    });

    tasks.style.display = 'block';

}


document.body.addEventListener('keypress', (event) => {
    if(event.key == 'Enter') addTask();
});

button.addEventListener('click', () => {
    let keyEvent = new KeyboardEvent('keypress', {key: 'Enter'});
    document.body.dispatchEvent(keyEvent);
});

let count = 0;

function sortTask() {
    const paragraph = document.querySelectorAll('.metn');

    let arr = new Array();
    for(let i = 0; i < paragraph.length; i++) {
        arr[i] = paragraph[i].innerHTML;
    }

    const rect = document.querySelectorAll('rect');
    const path = document.querySelectorAll('path');

    if(count == 0) {
        count = 1;
        arr.sort((a, b) => {
            return a - b;
        });
        

        // rect[0].x = "5";
        // rect[0].y = "15";
        // rect[0].transform = "rotate(-180 5 15)"
        // path.d="M3.75 6.55671e-07L6.99759 4.6875L0.502404 4.6875L3.75 6.55671e-07Z";
    }

    else {
        count = 0;
        arr.sort((a, b) => {
            return b - a;
        });
        
        // rect[0].x = "2.5";
        // rect[0].y = "0";
        // rect[0].transform = "";
        // path.d="M3.75 15L0.502405 10.3125L6.9976 10.3125L3.75 15Z";

    }
    
    for(let i = 0; i < paragraph.length; i++) {
        paragraph[i].innerHTML = arr[i];
    }

}

sort.addEventListener('click', sortTask);