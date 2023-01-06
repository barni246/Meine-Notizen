
let titleInputs = [];
let textInputs = [];
let trashTitles = [];
let trashTexts = [];
let inputField = true;
load();



function checkAllInput() {

    let titleInput = document.getElementById('inputTitle');
    let textInput = document.getElementById('inputText');

    if (titleInput.value === '' && textInput.value === '') {
        titleInput.classList.add('border-red');
        textInput.classList.add('border-red');

    } else if (titleInput.value === '') {
        titleInput.classList.add('border-red');

    } else if (textInput.value === '') {
        textInput.classList.add('border-red');

    } else {
        titleInput.classList.remove('border-red');
        textInput.classList.remove('border-red');
        addNote();
        titleInput.value = '';
        textInput.value = '';
    }
}


function enterDown() {
    if (event.key === 'Enter') {
        checkAllInput();
    }
}


function addNote() {
    let titleInput = document.getElementById('inputTitle').value;
    let textInput = document.getElementById('inputText').value;

    titleInputs.push(titleInput);
    textInputs.push(textInput);

    showNote();
    save();
}


function editNote(i, title, text) {

    console.log(i, title, text);
    let textEdit = document.getElementById('myNote' + i);
    if (inputField) {
        textEdit.innerHTML += `
    <input id="inputTitle${i}" class="inputEdit" type="text">
    <input id="inputText${i}" class="inputEdit" type="text">
    `;
        let inputEditTitle = document.getElementById('inputTitle' + i);
        let inputEditText = document.getElementById('inputText' + i);
        inputEditTitle.value = title;
        inputEditText.value = text;
        inputField = false;
    }

}


function changeNote(i) {
    inputField = true;
    titleInputs.splice(i, 1);
    textInputs.splice(i, 1);
    let titleInput = document.getElementById('inputTitle' + i).value;
    let textInput = document.getElementById('inputText' + i).value;
    titleInputs.push(titleInput);
    textInputs.push(textInput);
    showNote();
    save();
}

function showNote() {

    document.getElementById('note-container').innerHTML = '';
    for (let i = 0; i < titleInputs.length; i++) {
        const titleInput = titleInputs[i];
        const textInput = textInputs[i];
        document.getElementById('note-container').innerHTML += /*html*/`
         <div id="myNote${i}" class="myNote"><b class="titleDecoration">${titleInput}</b><br><br>${textInput}
         <div class="btnEditSave">
         <div onclick="editNote(${i},'${titleInput}','${textInput}')">Edit</div>
         <div onclick="changeNote(${i})">Save</div>
        </div>
                <img src="img/close.png" onclick="trashNote(${i})"></div>`;

    }
}


function deleteNote(position) {
    titleInputs.splice(position, 1);
    textInputs.splice(position, 1);
    showNote();
    save();
}


function save() {
    let titleInputsAsText = JSON.stringify(titleInputs);
    let textInputsAsText = JSON.stringify(textInputs);
    localStorage.setItem('keyTitle', titleInputsAsText);
    localStorage.setItem('keyText', textInputsAsText);
}



function load() {
    let titleInputsAsText = localStorage.getItem('keyTitle');
    let textInputsAsText = localStorage.getItem('keyText');
    if (titleInputsAsText && textInputsAsText) {
        titleInputs = JSON.parse(titleInputsAsText);
        textInputs = JSON.parse(textInputsAsText);
    }
}


function trashNote(position) {

    trashTitles.push(titleInputs[position]);
    trashTexts.push(textInputs[position]);
    titleInputs.splice(position, 1);
    textInputs.splice(position, 1);
    showNote();
    save();
    showTrash();
    trashSave();

}

function trashSave() {
    let trashAsTitle = JSON.stringify(trashTitles);
    let trashAsText = JSON.stringify(trashTexts);
    localStorage.setItem('keyTrashTitle', trashAsTitle);
    localStorage.setItem('keyTrashText', trashAsText);
}


function trashLoad() {
    let trashAsTitle = localStorage.getItem('keyTrashTitle');
    let trashAsText = localStorage.getItem('keyTrashText');
    if (trashAsTitle && trashAsText) {
        trashTitles = JSON.parse(trashAsTitle);
        trashTexts = JSON.parse(trashAsText);
    }
}


function openTrash() {
    document.getElementById('trash-container').classList.remove('d-none');
    trashLoad();
    showTrash();
}


function closeTrash() {
    document.getElementById('trash-container').classList.add('d-none');
}



function deleteTrashNote() {
    trashTitles.splice(0, trashTitles.length);
    trashTexts.splice(0, trashTexts.length);
    showTrash();
    trashSave();
}


function showTrash() {
    document.getElementById('trashForNote').innerHTML = '';
    for (let i = 0; i < trashTitles.length; i++) {
        const trashTitle = trashTitles[i];
        const trashText = trashTexts[i];
        document.getElementById('trashForNote').innerHTML += /*html*/` <div class="trashNote"><b>${trashTitle}</b><br><br>${trashText}`;

    }
}





