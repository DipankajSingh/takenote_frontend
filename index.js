'use strict';
import { $, GiveElement as CreateElm, addKeyEvent, codeHTML } from "./utils.js";
const mContainer = CreateElm('div', 'main-container')

mContainer.append(
    CreateElm('div', 'main-child-container note-container'),
    CreateElm('div', 'main-child-container joke-container'),
    CreateElm('div', 'main-child-container setting-container'),
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

// adding events to back button 
// add new note when clicking on back button
backBtn.addEventListener('click', addOrUpdate)

// This funtion can update or add a new note to database also
function addOrUpdate() {
    const noteCard = CreateElm('div', 'note-card')
    const noteText = CreateElm('h4')
    const noteBody = CreateElm('p')
    noteText.innerText = TextFTitle.innerText
    const htm = codeHTML({
        '*b*': '<b>',
        '*/b*': '</b>',
        '*/i*': '</i>',
        '*i*': '<i>'
    }, TextFBody.value)
    noteBody.value = htm.slice(1, htm.length - 1)
    noteCard.append(noteText, noteBody)
    mChild[0].lastChild.appendChild(noteCard)
    NoteAddWindow.remove()
}

// adding buttons to nav
const bdrClr = CreateElm('div', 'bdrClr')

bdrClr.innerHTML = `<label for="clrInput"></label>
<input type="color" name="color" id="clrInput">`

// applying color on input change
const changeClr = () => {
    bdrClr.firstChild.style.backgroundColor = bdrClr.lastChild.value
}
bdrClr.lastChild.addEventListener('change', changeClr)

// this function will insert B and I snippet to textarea
function insert(Snippet = String()) {
    let [start, end] = [TextFBody.selectionStart, TextFBody.selectionEnd]
    let text = TextFBody.value
    let [before, after] = [text.substring(0, start), text.substring(end, text.lenght)]
    TextFBody.value = (before + Snippet + after)
    TextFBody.focus()
    TextFBody.setSelectionRange(start + 3, start + 3)
}

// bold button
const boldBtn = CreateElm('button', 'bold-btn')
boldBtn.addEventListener('click', () => {
    insert('*b* *b*')
})
boldBtn.innerHTML = '<img src="./icons/bold.svg">'

// itelic button
const itelicBtn = CreateElm('button', 'itelic-btn')
itelicBtn.addEventListener('click', () => {
    insert('*i* *i*')
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
addEventListener('click', rEvent)
iForOptions.addEventListener('click', () => {
    if (optionDiv.dataset.visible == null) {
        optionDiv.dataset.visible = 'true'
        //block of code
        let deleteBtn = CreateElm('button', undefined, 'Delete')
        let importantBtn = CreateElm('button', undefined, 'Mark Important!')
        optionDiv.append(deleteBtn, importantBtn)
    } else {
        delete optionDiv.dataset.visible
        while (optionDiv.firstChild) {
            optionDiv.removeChild(optionDiv.firstChild)
        }
    }
})

NAW_OptionDiv.append(iForOptions, optionDiv)

leftAlignedDiv.append(bdrClr, boldBtn, itelicBtn, NAW_OptionDiv)

N_A_W_Nav.append(backBtn, leftAlignedDiv)


//adding nav and text fields to NAW
// creating fields
const textFieldCon = CreateElm('div', 'text-field-container')
const TextFTitle = CreateElm('span')
TextFTitle.setAttribute('role', 'textbox')
TextFTitle.contentEditable = true
const TextFBody = CreateElm('textarea')
TextFBody.placeholder = 'Note'
textFieldCon.append(TextFTitle, TextFBody)
// expanding text fields acording to text height


NoteAddWindow.append(N_A_W_Nav, textFieldCon)
const addNote = () => {





    document.body.appendChild(NoteAddWindow)
}
addNote()
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
arrElm[2].firstChild.innerText = 'Settings'
arrElm[3].firstChild.innerText = 'Account'
arrElm[4].firstChild.innerText = 'About Us'

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
        if (e.dataset.name == 'Settings') {
            mChild[2].dataset.selected = 'true'
        }
        if (e.dataset.name == 'Account') {
            mChild[3].dataset.selected = 'true'
        }
        if (e.dataset.name == 'About') {
            mChild[4].dataset.selected = 'true'
        }
    })
})

$('.toggleBtn').addEventListener('click', () => {
    $('.navbar').dataset.toggled == 'true' ? $('.navbar').dataset.toggled = 'false' : $('.navbar').dataset.toggled = 'true'
})



document.body.appendChild(mContainer)

