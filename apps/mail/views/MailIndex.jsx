const { useState, useEffect } = React
const { Route, Routes, useLocation, Link } = ReactRouterDOM



import { MailList } from "../cmps/MailList.jsx";
import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailCompose } from "../cmps/MailCompose.jsx";
import { mailService } from "../services/mail.service.js"
import { loggedinUser } from "../services/mail.service.js"
import { MailPreview } from '../cmps/MailPreview.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { utilService } from '../../../services/util.service.js'

import {
    eventBusService,
    showErrorMsg,
    showSuccessMsg,
} from "../../../services/event-bus.service.js"

import { UserMsg } from "../cmps/UserMsg.jsx";



export function MailIndex() {

    const [mails, setMails] = useState(null)
    const location = useLocation()
    const [selectedMails, setSelectedMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(mailService.getDefaultSort())
    const [isCompose, setCompose] = useState(false)
    const [onsendmail, setSendmail] = useState(0)
    const [userMsg, setUserMsg] = useState("");

    const myUser = loggedinUser
    console.log(myUser)


    function opemCompose() {
        if (isCompose) {
            setCompose(false)
        } else {
            setCompose(true)
        }
    }

    function sendMail(newMail) {
        newMail.email = myUser.email
        newMail.from = 'Me'
        newMail.sentAt = new Date()
        console.log(newMail)

        mailService.save(newMail)
            .then((savedmail) => {
                setMails(prevMails => prevMails.map(mail => mail.id === savedmail.id ? savedmail : mail))

                setSendmail(1)
                showSuccessMsg(`mail send successfully `)

            })
        setCompose(false)
    }


    useEffect(() => {
        loadMails()
    }, [filterBy, sortBy, onsendmail])





    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function loadMails() {
        mailService.query(filterBy, sortBy)
            .then((mails) => {
                setMails(mails)
            })
    }


    function OnReadMail(mailId) {
        mailService.get(mailId).then((mail) => {
            mail.isRead = !mail.isRead;
            const updatedMails = mails.map(m => m.id === mailId ? { ...m, isRead: mail.isRead } : m)
            mailService.save(mail)
            setMails(updatedMails)
        })
    }

    function onSelectAll() {
        if (selectedMails.length === mails.length) {
            setSelectedMails([])
        } else {
            setSelectedMails(mails.map(mail => mail.id))
        }
    }

    function onSelectMail(mailId) {
        setSelectedMails(currentSelectedMails => {
            if (currentSelectedMails.includes(mailId)) {
                return currentSelectedMails.filter(id => id !== mailId)
            } else {
                return [...currentSelectedMails, mailId]
            }
        })
    }



    function OnRemoveMail() {
        const updatedMails = mails.map(mail => {
            if (selectedMails.includes(mail.id)) {
                const updatedMail = { ...mail, isRemove: Date.now() }
                mailService.save(updatedMail)
                return updatedMail
            }
            return mail
        })
        setMails(updatedMails)
        setSelectedMails([])
        showSuccessMsg("Selected mails removed successfully")
    }


    function OnDeletePermanent() {
        const updatedMails = mails.filter(mail => !selectedMails.includes(mail.id))
        selectedMails.forEach(mailId => {
            mailService.remove(mailId)
        })
        setMails(updatedMails)
        setSelectedMails([])
        showSuccessMsg("Selected mails deleted")

        // loadMails()
    }



    function getMailList() {
        const route = location.pathname

        switch (route) {
            case '/mail':
                return (
                    <MailList mails={mails.filter(m => !m.isRemove && m.to === myUser.email)}
                        OnRemoveMail={OnRemoveMail}
                        OnReadMail={OnReadMail}
                        onSelectMail={onSelectMail}
                        selectedMails={selectedMails}
                        onSelectAll={onSelectAll}
                    />
                )
            case '/mail/trash':
                return (
                    <MailList mails={mails.filter(m => m.isRemove)}
                        OnRemoveMail={OnDeletePermanent}
                        OnReadMail={OnReadMail}
                        onSelectMail={onSelectMail}
                        selectedMails={selectedMails}
                        onSelectAll={onSelectAll}
                    />
                )
            case '/mail/send':
                return (
                    <MailList mails={mails.filter(m => !m.isRemove && m.from === 'Me')}
                        OnRemoveMail={OnRemoveMail}
                        OnReadMail={OnReadMail}
                        onSelectMail={onSelectMail}
                        selectedMails={selectedMails}
                        onSelectAll={onSelectAll}
                    />
                )
            case '/mail/write':
                return (
                    <MailList mails={mails.filter(m => !m.isRemove && m.to === myUser.email)}
                        OnRemoveMail={OnRemoveMail}
                        OnReadMail={OnReadMail}
                        onSelectMail={onSelectMail}
                        selectedMails={selectedMails}
                        onSelectAll={onSelectAll}
                    />
                )
            default:
                return (
                    <Routes>
                        <Route path=":mailId" element={<MailPreview />} />
                    </Routes>
                )
        }
    }

    const { txt, isRead } = filterBy
    return (
        <div className="mail-page">

            <MailFilter
                onSetFilter={onSetFilter}
                filterBy={{ txt, isRead }}
                sortBy={sortBy}
                setSortBy={setSortBy} />
            <div className="mail-main">

                <MailFolderList
                    opemCompose={opemCompose}
                />
                {/* <div className="more-Options">
                <h1 className="send fa-solid fa-pen"></h1>
                <Link to='/mail'><h1 className="fa-solid fa-inbox"></h1></Link>
                <h1 className="fa-solid fa-trash-can"></h1>
                <h1 className="fa-regular fa-paper-plane"></h1>
            </div> */}

                <div className="mail-list-container">
                    {mails ? getMailList() : null}
                </div>
            </div>
            {isCompose ? <MailCompose
                onClose={() => setCompose(false)}
                onSend={sendMail} /> : ''}
            <UserMsg msg={userMsg} />

        </div >


    )
}

