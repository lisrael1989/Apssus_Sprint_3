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
        mail = _createMail(mail.from, mail.to,mail.subject,mail.body)
        return storageService.post(MAIL_KEY, mail)
    }
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function getEmptyMail( from = '', to = '', subject = '', body = '',id='') {
    return { id,from, to, subject, body }
}

function _createMails() {
    let Mails = utilService.loadFromStorage(MAIL_KEY)
    if (!Mails || !Mails.length) {
        Mails = []
        Mails.push(_createMail('momo@momo.com', 'user@appsus.com', 'Miss you!', 'Would love to catch up sometimes'))
        Mails.push(_createMail('momo@momo.com', 'user@appsus.com', 'Miss you!', 'Would love to catch up sometimes'))
        Mails.push(_createMail('momo@momo.com', 'user@appsus.com', 'Miss you!', 'Would love to catch up sometimes'))
        Mails.push(_createMail('momo@momo.com', 'user@appsus.com', 'Miss you!', 'Would love to catch up sometimes'))
        Mails.push(_createMail('momo@momo.com', 'user@appsus.com', 'Miss you!', 'Would love to catch up sometimes'))
        Mails.push(_createMail('momo@momo.com', 'user@appsus.com', 'Miss you!', 'Would love to catch up sometimes'))
        Mails.push(_createMail('momo@momo.com', 'user@appsus.com', 'Miss you!', 'Would love to catch up sometimes'))
        Mails.push(_createMail('momo@momo.com', 'user@appsus.com', 'Miss you!', 'Would love to catch up sometimes'))
        Mails.push(_createMail('momo@momo.com', 'user@appsus.com', 'Miss you!', 'Would love to catch up sometimes'))
        Mails.push(_createMail('momo@momo.com', 'user@appsus.com', 'Miss you!', 'Would love to catch up sometimes'))
        Mails.push(_createMail('momo@momo.com', 'user@appsus.com', 'Miss you!', 'Would love to catch up sometimes'))
        Mails.push(_createMail('momo@momo.com', 'user@appsus.com', 'Miss you!', 'Would love to catch up sometimes'))
        Mails.push(_createMail('momo@momo.com', 'user@appsus.com', 'Miss you!', 'Would love to catch up sometimes'))
        Mails.push(_createMail('momo@momo.com', 'user@appsus.com', 'Miss you!', 'Would love to catch up sometimes'))

        utilService.saveToStorage(MAIL_KEY, Mails)
    }
}

function _createMail(from, to, subject, body,) {
    const mail = getEmptyMail(from, to, subject, body)
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