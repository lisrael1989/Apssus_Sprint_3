import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'MailDB'
_createMails()

export const loggedinUser = {//have a basic user:

    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getDefaultSort,


    // getFilterFromParams
}

function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
    // console.log('filterBy', filterBy)
    // filterBy = getDefaultFilter()
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.from))
            }
            if (filterBy.isRead) {
                mails = mails.filter(mail => mail.isRead)
            }
            if (!filterBy.isRead) {
                mails = mails.filter(mail => !mail.isRead)
            }

            if (sortBy.title !== 'none') {
                const direction = sortBy.title === 'a' ? 1 : -1
                mails.sort((a, b) => a.subject.localeCompare(b.subject) * direction)
            }
            if (sortBy.time === 'd') {
                mails.sort((a, b) => b.sentAt - a.sentAt)
            } else if (sortBy.time === 'a') {
                mails.sort((a, b) => a.sentAt - b.sentAt)
            }
            return mails
        })
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        mail = _createMail(mail.email,mail.from, mail.to, mail.subject, mail.body, mail.isRead, mail.sentAt)
        return storageService.post(MAIL_KEY, mail)
    }
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function getEmptyMail(email = '', from = '', to = '', subject = '', body = '', isRead, sentAt, removedAt, id = '') {
    return { id, email, from, to, subject, body, isRead, sentAt, removedAt }
}

function _createMails() {
    let Mails = utilService.loadFromStorage(MAIL_KEY)
    if (!Mails || !Mails.length) {
        Mails = []

        Mails.push(_createMail('hello@gmail.com', 'alex', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), false, new Date("Oct 12 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'samantha', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), false, new Date("Aug 05 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'david', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), true, new Date("Jul 22 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'emily', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), false, new Date("Jun 19 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'chris', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), false, new Date("May 30 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'rebecca', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), false, new Date("Apr 25 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'michael', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), false, new Date("Mar 15 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'sophia', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), true, new Date("Feb 09 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'jane', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), true, new Date("Sep 14 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'alex', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), false, new Date("Oct 12 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'samantha', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), false, new Date("Aug 05 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'david', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), true, new Date("Jul 22 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'emily', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), false, new Date("Jun 19 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'chris', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), false, new Date("May 30 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'rebecca', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), false, new Date("Apr 25 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'michael', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), false, new Date("Mar 15 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'sophia', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), true, new Date("Feb 09 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'jane', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), true, new Date("Sep 14 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'alex', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), false, new Date("Oct 12 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'samantha', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), false, new Date("Aug 05 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'david', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), true, new Date("Jul 22 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'emily', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), false, new Date("Jun 19 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'chris', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), false, new Date("May 30 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'rebecca', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), false, new Date("Apr 25 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'michael', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), false, new Date("Mar 15 2023").getTime(), null))
        Mails.push(_createMail('hello@gmail.com', 'sophia', 'user@appsus.com', utilService.makeLorem(2), utilService.makeLorem(600), true, new Date("Feb 09 2023").getTime(), null))
        // Mails.push(_createMail('hello@gmail.com', 'user@appsus.com', 'yuval', utilService.makeLorem(2), utilService.makeLorem(600), true, new Date("Feb 09 2023").getTime(), null))

        utilService.saveToStorage(MAIL_KEY, Mails)
    }
}

function _createMail(email, from, to, subject, body, isRead, sentAt, removedAt) {
    const mail = getEmptyMail(email, from, to, subject, body, isRead, sentAt, removedAt)
    mail.id = utilService.makeId()
    // mail.desc = utilService.makeLorem(100)
    return mail
}

function getDefaultFilter() {
    return { txt: '', isRead: false }
}
function getDefaultSort() {
    return { time: 'd', title: 'none' }
}
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


const criteria = {//emailService query function should get a criteria(filterBy
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}