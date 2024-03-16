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


function query(filterBy = { text: '' }) {
  return storageService.query(NOTE_KEY)
      .then(notes => {
          if (!filterBy.text) {
              return notes; 
          }
          const regex = new RegExp(filterBy.text, 'i'); 
          return notes.filter(note => 
              regex.test(note.info.title) || 
              regex.test(note.info.txt) || 
              regex.test(note.type)
          );
      });
}




function getDefaultFilter() {
    return {
      title: "",
      txt: "",
      type:""
    };
  }

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (!note.style) {
    note.style = { backgroundColor: '#ffffff' }; }
  if (note.id) {
    return storageService.put(NOTE_KEY, note);
  } else {
    note.id = utilService.makeId();
    note.createdAt = Date.now();
    return storageService.post(NOTE_KEY, note);
  }
}


function getEmptyNote(type="") {
    return {
      id:"",
      type,
      info: {
        title:'',
        txt: '', 
      },
      style: { backgroundColor: '#ffffff' } 
    };
  }


function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY);
    if (!notes || !notes.length){
        notes = [ 
        {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
        backgroundColor: '#aaddaa'
        },
        info: {
        txt: 'Fullstack Me Baby!'
        }
        },
        {
        id: 'n109',
        createdAt: 1112222,
        type: 'NoteVideo',
        isPinned: true,
        style: {
        backgroundColor: '#11111'
        },
        info: {
        url: 'https://www.youtube.com/watch?v=sWOrd50HYa4'
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
        backgroundColor: '#f0ad4e'
        }
        },
        {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
        title: 'Get my stuff together',
        todos: [
        { txt: 'Driving license', doneAt: null, checked: false },
        { txt: 'Coding power', doneAt: 187111111, checked: true }
        ]
        }
        },
        {
            id: 'n104',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: true,
            style: {
            backgroundColor: '#f0addd'
            },
            info: {
            txt: 'HAPPY TO BE HERE 😎 '
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
                backgroundColor: '#f0edad'
                }
                },
                {
                  id: 'n106',
                  type: 'NoteImg',
                  isPinned: false,
                  info: {
                      url: 'https://www.liveabout.com/thmb/ohIr79XSDOPxnbdkY5WdoUQdCEw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/trumpmeme-3-5c51da71c9e77c00016f38da.jpg',
                      title: 'I miss you all from sprint 2'
                  },
                  style: {
                  backgroundColor: '#f0aaaa'
                  }
                  },
                  {
                    id: 'n107',
                    createdAt: 1112222,
                    type: 'NoteTxt',
                    isPinned: true,
                    style: {
                    backgroundColor: '#aaddaa'
                    },
                    info: {
                    txt: 'Why did the skeleton refuse to fight anyone at the Halloween party? Because he realized he didnt have the guts for it. Plus, every time he tried to throw a punch, he would just rattle himself!'
                    }
                    },
                    {
                      id: 'n111',
                      type: 'NoteTodos',
                      isPinned: false,
                      style: {
                        backgroundColor: '#aacddd'
                        },
                      info: {
                      title: 'Get my stuff together',
                      todos: [
                      { txt: 'Add about page', doneAt: 1112222, checked: true},
                      { txt: 'Add home page', doneAt: 187111111, checked: true },
                      { txt: 'find time to sleep', doneAt: 1112222, checked: false }
                      ]
                      }
                      },
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