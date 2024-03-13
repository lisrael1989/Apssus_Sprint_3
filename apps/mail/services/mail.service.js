import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'MailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    // getDefaultFilter,
    // getFilterFromParams
}

function query() {
    // console.log('filterBy', filterBy)
    // filterBy = getDefaultFilter()
    return storageService.query(MAIL_KEY)
        .then(mails => {
            // console.log(mails)
            return mails
        })
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        mail = _createMail(mail.from, mail.to, mail.subject, mail.body)
        return storageService.post(MAIL_KEY, mail)
    }
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function getEmptyMail(from = '', to = '', subject = '', body = '', isRead, sentAt, removedAt,id = '') {
    return { id, from, to, subject, body , isRead,sentAt,removedAt }
}

function _createMails() {
    let Mails = utilService.loadFromStorage(MAIL_KEY)
    if (!Mails || !Mails.length) {
        Mails = []
        Mails.push(_createMail('jane.doe@example.com', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(100), true, 1189323, null))
        Mails.push(_createMail('alex.johnson@example.org', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(100), false, 1189323, null))
        Mails.push(_createMail('samantha.brown@example.edu', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(100), false, 1189323, null))
        Mails.push(_createMail('david.wilson@example.co', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(100), true, 1189323, null))
        Mails.push(_createMail('emily.miller@example.info', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(100), false, 1189323, null))
        Mails.push(_createMail('chris.taylor@example.biz', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(100), false, 1189323, null))
        Mails.push(_createMail('rebecca.white@example.tv', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(100), false, 1189323, null))
        Mails.push(_createMail('michael.harris@example.me', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(100), false, 1189323, null))
        Mails.push(_createMail('sophia.martinez@example.io', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(100), true, 1189323, null))

        utilService.saveToStorage(MAIL_KEY, Mails)
    }
}

function _createMail(from, to, subject, body , isRead,sentAt,removedAt ) {
    const mail = getEmptyMail(from, to, subject, body , isRead,sentAt,removedAt )
    mail.id = utilService.makeId()
    // mail.desc = utilService.makeLorem(100)
    return mail
}

// function getDefaultFilter() {
//     return { txt: '', minSpeed: 50, desc: '' }
// }
// function getFilterFromParams(searchParams = {}) {
//     const defaultFilter = getDefaultFilter()
//     return {
//         txt: searchParams.get('txt') || defaultFilter.txt,
//         minSpeed: searchParams.get('minSpeed') || defaultFilter.minSpeed,
//         desc: searchParams.get('desc') || defaultFilter.desc
//     }
// }
const email = {//Model - start with a basic model of emails: 
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
}

const loggedinUser = {//have a basic user:

    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}


const criteria = {//emailService query function should get a criteria(filterBy
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}