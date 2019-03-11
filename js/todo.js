const cardContainer = document.querySelector('.card-container');
const popupContainer = document.querySelector('.popup-container');

document.body.addEventListener('click', (e) => {
    const clickedEl = e.srcElement;
    if (clickedEl.classList.contains('create-new-card-btn')) {
        popupContainer.style.display = 'flex';
        document.querySelector('.add-card-popup input').focus();
        toggleBlur('on');
    }
    if (clickedEl.classList.contains('popup-btn')) {
        abortPopup(clickedEl);
    }
    const card = getCard(clickedEl);
    if (card) {
        const removeBtn = card.querySelector('.remove-btn');
        if (card.classList.contains('done')) {
            card.classList.remove('done');
            removeBtn.style.visibility = 'hidden';
        } else {
            card.classList.add('done');
            removeBtn.style.visibility = 'visible';
        }
    }
    if(clickedEl.classList.contains('remove-btn')) {
        cardContainer.removeChild(clickedEl.parentElement.parentElement);
    }
    toggleEmptyTag(card);
})

popupContainer.addEventListener('keypress', e => {
    if (e.which === 13) abortPopup(e.srcElement);
})



function abortPopup(el) {
    if(el.classList.contains('add-btn') || el.tagName === 'INPUT') addNewNote();
        popupContainer.style.display = 'none';
        toggleBlur('off');
}

function toggleBlur(status) {
    const content = document.querySelector('main');
    const header = document.querySelector('.main-header');
    if (status === 'on') [content, header].forEach( e => e.classList.add('blur'));
    if (status === 'off') [content, header].forEach( e => e.classList.remove('blur'));
}

function getCard(el) {
    if (el.classList.contains('card')) return el;
    if (el.parentElement.classList.contains('card')) return el.parentElement;
}

function addNewNote() {
    const taskInput = document.querySelector('.task-input');
    const descriptionInput = document.querySelector('.description-input');
    const dateInput = document.querySelector('.date-input');
    createNote(taskInput.value, descriptionInput.value, dateInput.value);
    taskInput.value = '';
    descriptionInput.value = '';
    dateInput.value = '2019-04-13';
}

function createNote(task, description = '', date) { 
    const div = createEl('div', '', 'card');
    const h3 = createEl('h3', task);
    const p = createEl('p', description);
    const footer = createEl('div', '', 'card-footer');
    const btn = createEl('button', '- remove -', 'remove-btn abort-btn');
    btn.style.visibility = 'hidden';
    const dueDate = createEl('small', `Due: ${date}`, 'due-date')
   
    footer.appendChild(btn);
    footer.appendChild(dueDate);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(footer);
    cardContainer.appendChild(div);
}

function createEl(tag, content, className = '') {
    const el = document.createElement(tag);
    el.className = className;
    el.textContent = content;
    return el;
}

function toggleEmptyTag(card) {
    const emptySection = document.querySelector('.empty-page-section');
    const emptyTag = document.querySelector('.empty-tag');
    if (card) {
        emptySection.style.visibility = 'hidden';
    }
    if (cardContainer.innerText === '') {
        emptySection.style.visibility = 'visible';
        emptyTag.textContent = 'nothing has been added yet...';
    } else {
        emptyTag.textContent = 'Click on a note to mark it as done!';
    }
}