'use strict';
import { $, GiveElement as CreateElm, addKeyEvent, codeHTML, insertSnippet as insert } from "./utils.js";
import Notifice from "./notifice_v2.0.0.js";
$('.toggleBtn').addEventListener('click', () => {
    $('.navbar').dataset.toggled == 'true' ? $('.navbar').dataset.toggled = 'false' : $('.navbar').dataset.toggled = 'true'
})
const notify = new Notifice({})

const mContainer = CreateElm('div', 'main-container')
const textFieldCon = CreateElm('div', 'text-field-container')
const TextFTitle = CreateElm('span')
const TextFBody = CreateElm('textarea')
const deleteBtn = CreateElm('button', undefined, 'Delete')
const importantBtn = CreateElm('button', 'imp', 'Mark Important!')

mContainer.append(
    CreateElm('div', 'main-child-container note-container'),
    CreateElm('div', 'main-child-container joke-container'),
    CreateElm('div', 'main-child-container account-container'),
    CreateElm('div', 'main-child-container about-container')
)
const mChild = mContainer.childNodes
const navSelData = $('.navbar ul li')
const arrElm = []
for (let i = 0; i < mChild.length; i++) {
    mChild[i].appendChild(CreateElm('nav', 'nav-headings'))
    mChild[i].appendChild(CreateElm('div', 'content-container'))
}

for (let i = 0; i < mChild.length; i++) {
    arrElm.push(mChild[i].firstChild);
}
for (let i = 0; i < arrElm.length; i++) {
    arrElm[i].appendChild(CreateElm('h3', 'heading'));
}

arrElm[0].firstChild.innerText = 'Notes'
const addNoteBtn = CreateElm('button', 'add-note-btn')
const addNImg = CreateElm('img', 'addNImg')
addNImg.setAttribute('src', './icons/add.svg')
addNoteBtn.appendChild(addNImg)

// opening note Adding window 
const NoteAddWindow = CreateElm('div', 'NoteAddWindow')
const N_A_W_Nav = CreateElm('nav', 'n-a-w-nav')

// and adding functionalities to back (<--) button
const backBtn = CreateElm('button', 'back-btn')
backBtn.innerHTML = '<span>&#10140</span>'
// seting importent
let important = false


// adding events to back button 
// add new note when clicking on back button
backBtn.addEventListener('click', () => {
    addOrUpdate(important)
})

// this will delete note
deleteBtn.addEventListener('click', () => {
    TextFTitle.textContent = ''
    TextFBody.value = ''
    NoteAddWindow.remove()
    notify.type = 'alert'
    notify.position = 'bottom-right'
    notify.stay(2000)
    notify.text = 'The note has been Deleted!'
    notify.rgbColor = [200, 70, 0]
    notify.show()
})
// This funtion can update or add a new note to database also
function addOrUpdate(imp = false) {
    if (TextFBody.value == '' && TextFTitle.innerText == '') {
        NoteAddWindow.remove()
        return
    }
    const noteCard = CreateElm('div', imp == true ? 'note-card important' : 'note-card')
    noteCard.addEventListener('click', (e) => { noteClick(e) })

    // This noteClick function should retrive existing title
    // and body data
    function noteClick(e) {
        addNote()
        const [title, body] = [e.target.firstChild.textContent, e.target.lastChild.textContent]
        TextFTitle.textContent = title
        TextFBody.value = body
        if (noteCard.classList[1]) {
            importantBtn.click()
        }
        e.target.remove()
    }
    noteCard.style.borderColor = important == true ? '#fc4747' : bdrClr.lastChild.value


    const noteText = CreateElm('h4')
    const noteBody = CreateElm('p')
    noteText.innerText = TextFTitle.innerText

    // TODO - make perfect bold and itelic buttons to work
    const htm = codeHTML({
        '*b*': '<b>',
        '*/b*': '</b>',
        '*/i*': '</i>',
        '*i*': '<i>'
    }, TextFBody.value)
    noteBody.textContent = htm.slice(1, htm.length - 1)
    noteCard.append(noteText, noteBody)
    mChild[0].lastChild.appendChild(noteCard)
    TextFBody.value = ''
    TextFTitle.textContent = ''
    NoteAddWindow.remove()
}

//this will mark as important
importantBtn.addEventListener('click', () => {
    important = true
    close()
    notify.type = 'alert'
    notify.stay(2000)
    notify.position = 'bottom-right'
    notify.text = 'Marked As Importent!'
    notify.rgbColor = [30, 175, 50]
    notify.show()
})

// adding buttons to nav
const bdrClr = CreateElm('div', 'bdrClr')

bdrClr.innerHTML = `<label for="clrInput"></label>
<input type="color" name="color" id="clrInput">`
// applying color on input change
const changeClr = () => {
    bdrClr.firstChild.style.backgroundColor = bdrClr.lastChild.value
}
bdrClr.lastChild.addEventListener('change', changeClr)

// bold button
const boldBtn = CreateElm('button', 'bold-btn')
boldBtn.addEventListener('click', () => {
    insert({ open: '*b*', close: '*/b*' }, 'keep spaces!', TextFBody)
})
boldBtn.innerHTML = '<img src="./icons/bold.svg">'

// itelic button
const itelicBtn = CreateElm('button', 'itelic-btn')
itelicBtn.addEventListener('click', () => {
    insert({ open: '*i*', close: '*/i*' }, 'keep spaces!', TextFBody)
})
itelicBtn.innerHTML = '<img src="./icons/italic.svg">'

const leftAlignedDiv = CreateElm('div', 'left-aligned-div')

const NAW_OptionDiv = CreateElm('div', 'options-div')
const optionDiv = CreateElm('div', 'option-div')

const iForOptions = CreateElm('img')
iForOptions.setAttribute('src', './icons/menu.svg')
// Toggling options div visiblity
function rEvent(e) {
    // detecting outside click
    if (!NAW_OptionDiv.contains(e.target)) {
        if (optionDiv.dataset.visible) {
            delete optionDiv.dataset.visible
            while (optionDiv.firstChild) {
                optionDiv.removeChild(optionDiv.firstChild)
            }
        }
    }
}
function close() {
    delete optionDiv.dataset.visible
    while (optionDiv.firstChild) {
        optionDiv.removeChild(optionDiv.firstChild)
    }
}

addEventListener('click', rEvent)
iForOptions.addEventListener('click', () => {

    if (optionDiv.dataset.visible == null) {
        optionDiv.dataset.visible = 'true'
        //block of code


        optionDiv.append(deleteBtn, importantBtn)
    } else {
        close()
    }
})

NAW_OptionDiv.append(iForOptions, optionDiv)

leftAlignedDiv.append(bdrClr, boldBtn, itelicBtn, NAW_OptionDiv)

N_A_W_Nav.append(backBtn, leftAlignedDiv)


//adding nav and text fields to NAW
// creating fields

TextFTitle.setAttribute('role', 'textbox')
TextFTitle.contentEditable = true
TextFBody.placeholder = 'Note'
textFieldCon.append(TextFTitle, TextFBody)
NoteAddWindow.append(N_A_W_Nav, textFieldCon)
function addNote() {
    important = false
    document.body.appendChild(NoteAddWindow)
}
// addNote()
// opening Note add window on "alt+w" pressing
addKeyEvent('w', () => (!$('.NoteAddWindow')) &&
    document.body.appendChild(NoteAddWindow))
// closing Note add window on "alt+a" pressing

addKeyEvent('a', () => ($('.NoteAddWindow')) &&
    addOrUpdate())

// adding headers to fields
addNoteBtn.addEventListener('click', addNote)
arrElm[0].appendChild(addNoteBtn)
arrElm[1].firstChild.innerText = 'Jokes'
arrElm[2].firstChild.innerText = 'Account'
arrElm[3].firstChild.innerText = 'About Us'

// style
mChild.forEach((e, i) => {
    e.dataset.selected = 'false'
    if (i == 0) e.dataset.selected = 'true'
})

navSelData.forEach((e) => {
    e.addEventListener('click', () => {
        navSelData.forEach((el) => el.dataset.selected = 'false')
        e.dataset.selected = 'true'
        mChild.forEach((val) => val.dataset.selected = 'false')
        if (e.dataset.name == 'Notes') {
            mChild[0].dataset.selected = 'true'
        }
        if (e.dataset.name == 'Jokes') {
            mChild[1].dataset.selected = 'true'
        }
        if (e.dataset.name == 'Account') {
            mChild[2].dataset.selected = 'true'
        }
        if (e.dataset.name == 'About') {
            mChild[3].dataset.selected = 'true'
        }
        notify.remove()
    })
})



const jokeContainer = mChild[1].childNodes[1]
notify.onClick = () => { getJoke(6) }

async function getJoke(count) {

    for (let i = 0; i < count; i++) {
        const res = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'accept': 'application/json'
            }
        })
        const joke = await res.json()
        const jokeCard = CreateElm('div', 'joke-card', joke.joke)
        jokeContainer.append(jokeCard)
    }
    notify.type = 'reload'
    notify.text = 'Need More Laught?'
    notify.rgbColor = [200, 170, 0]
    notify.autoClose = undefined
    notify.position = 'top-right'
    notify.show()
}

$('.joke-li').addEventListener('click', () => {
    if (jokeContainer.hasChildNodes()) {
        jokeContainer.innerHTML = ''
    }
    getJoke(6)
})
document.body.appendChild(mContainer)