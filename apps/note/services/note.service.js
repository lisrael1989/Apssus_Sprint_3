import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    // getDefaultFilter,
    // getFilterFromParams
}


function query() {
    return storageService.query(NOTE_KEY)
    .then(notes => {
        console.log(notes)
        return notes
    })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        note = _createNote(note.type, note.info.txt)
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(type="") {
    return {
      id:"",
      type,
      info: {
        txt: '', 
      },
    };
  }


function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY);
    if (!notes || !notes.length){
        const notes = [ //here is an array of some notes
        {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
        backgroundColor: '#00d'
        },
        info: {
        txt: 'Fullstack Me Baby!'
        }
        },
        {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
        url: 'http://some-img/me',
        title: 'Bobi and Me'
        },
        style: {
        backgroundColor: '#00d'
        }
        },
        {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
        title: 'Get my stuff together',
        todos: [
        { txt: 'Driving license', doneAt: null },
        { txt: 'Coding power', doneAt: 187111111 }
        ]
        }
        }
        ]
        utilService.saveToStorage(NOTE_KEY, notes);

    }
}

    function _createNote(type) {
        const note = getEmptyNote(type);
        note.id = utilService.makeId();
        return note;
      }




//<component :is="cmp.type" :info="cmp.info"
// @changeInfo="updateNote" /> // bounus?