'use strict'

//Fetch the data from localStorage, see if any exists and if it does, parse it
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }
}

//Save the notes to localStorage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

//remove a note from the list
const removeNote = (noteId) => {
    const noteIndex = notes.findIndex((note) => note.id === noteId)   //true when note.id equals id passed into the function line 20

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)  //removes 1 element from noteIndex position
    }
}

//Generate the DOM structure for a note
const generateNotes = (note) => {
    const noteElement = document.createElement('a')
    const textElement = document.createElement('p')
    const status = document.createElement('p')
    // const button = document.createElement('button')

    // //setup the remove note button
    // button.textContent = 'x'
    // noteElement.appendChild(button)
    // button.addEventListener('click', () => { //we care if button did or didnt click
    //     removeNote(note.id) //modifying it, saving it then rerendering it
    //     saveNotes(notes)
    //     renderNotes(notes, filters)
    // })

    //Setup the note title text 
    if (note.title.length > 0) {
        textElement.textContent = note.title
    } else {
        textElement.textContent = ' Unnamed note '
    }
    textElement.classList.add('list-item__title')
    // textElement.setAttribute('href', `/note.html#${note.id}`)
    noteElement.appendChild(textElement)

    //setup the link
    noteElement.setAttribute('href', `/note.html#${note.id}`)
    noteElement.classList.add('list-item')

    //setup the status message
    status.textContent = generateLasteEdited(note.updatedAt)
    status.classList.add('list-item__subtitle')
    noteElement.appendChild(status)

    return noteElement
}

//Sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {    //wire up by last edited 
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    }
    if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    }
    if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    }
}

//Render application notes
//render notes by putting array of notes into the filter searchText
const renderNotes = (notes, filters) => {
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    notesEl.innerHTML = '' //div tag be empty everytime you type

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {           //filter notes and create paragraph for each array
            const noteElement = generateNotes(note)
            notesEl.appendChild(noteElement)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes has been found'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)       
    }
}

//Generate last edited message
const generateLasteEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}
