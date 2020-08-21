'use strict'

//variable for DOM element
const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')

const noteId = location.hash.substring(1) //getting every character from 1st to last
let notes = getSavedNotes()   //similar to notes = []
let note = notes.find((note) => note.id === noteId)

if (!note) {       //if there is no note go back to index
    location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = generateLasteEdited(note.updatedAt)

titleElement.addEventListener('input', (e) => {
    note.title = e.target.value	//what you type in the input value
    note.updatedAt = moment().valueOf() //when you type something it updates the timestamp
    dateElement.textContent = generateLasteEdited(note.updatedAt)
    saveNotes(notes)
})

bodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLasteEdited(note.updatedAt)
    saveNotes(notes)
})

removeElement.addEventListener('click', (e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

//Syncing data across pages using window - update what the user sees
window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)  //get the new value of the storage item that changed
        note = notes.find((note) => note.id === noteId)
        if (!note) {       //if note is found, truthy value
            location.assign('/index.html')
        }
        titleElement.value = note.title
        bodyElement.value = note.body
        dateElement.textContent = generateLasteEdited(note.updatedAt)
    }
})
