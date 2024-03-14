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
    getDefaultFilter,
    // getFilterFromParams
}


function query(filterBy = getDefaultFilter()) {
    return storageService.query(NOTE_KEY)
    .then(notes => {
        if (filterBy.title) {
            const regex = new RegExp(filterBy.title, "i");
            notes = notes.filter((note) => regex.test(note.info.title));
          }
          if (filterBy.txt) {
            notes = notes.filter((note) => {
              return note.info.txt.includes (filterBy.txt);
            });
          }
          
        return notes
    })
}

function getDefaultFilter() {
    return {
      title: "",
      txt: "",
    };
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
        // note = _createNote(note.type, note.info.txt)
        note.id = utilService.makeId();
        note.createdAt = Date.now();
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
        url: 'https://i.pinimg.com/564x/f0/ae/8b/f0ae8baf772d83667bb91c266ee9d8fc.jpg',
        title: 'Love this game'
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
        },
        {
            id: 'n104',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: true,
            style: {
            backgroundColor: '#00d'
            },
            info: {
            txt: 'HAPPY TO BE HERE 😎'
            }
            },
            {
                id: 'n105',
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://i.pinimg.com/564x/1f/87/b2/1f87b29a2df46100a75aa86b170a21cb.jpg',
                    title: 'Sprint 3 be like '
                },
                style: {
                backgroundColor: '#00d'
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