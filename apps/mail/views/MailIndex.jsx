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


export function MailIndex() {

    const [mails, setMails] = useState(null)
    const location = useLocation()
    const [selectedMail, setSelectedMail] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(mailService.getDefaultSort())
    const [isCompose, setCompose] = useState(false)
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

            })

    }


    useEffect(() => {
        loadMails()
    }, [filterBy, sortBy])





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

    function onSelectMail(Mail) {
        if (selectedMail === Mail.id) {
            setSelectedMail(null)
        } else {
            setSelectedMail(Mail.id)
        }
    }



    function OnRemoveMail(mailId) {
        mailService.get(mailId).then((mail) => {
            mail.isRemove = Date.now()
            const updatedMails = mails.map(m => m.id === mailId ? { ...m, isRemove: mail.isRemove } : m)
            mailService.save(mail)
            setMails(updatedMails)
        })
    }

    function OnDeletePermanent(mailId) {
        mailService.get(mailId).then((mail) => {
            // mail.isRemove = Date.now()
            const updatedMails = mails.map(m => m.id !== mail.id)
            mailService.remove(mail.id)
            setMails(updatedMails)
        })
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
                        selectedMail={selectedMail}
                      />
                )
            case '/mail/trash':
                return (
                    <MailList mails={mails.filter(m => m.isRemove)}
                        OnRemoveMail={OnDeletePermanent}
                        OnReadMail={OnReadMail}
                        onSelectMail={onSelectMail}
                        selectedMail={selectedMail}
                         />
                )
            case '/mail/send':
                return (
                    <MailList mails={mails.filter(m => !m.isRemove && m.from === 'Me')}
                        OnRemoveMail={OnRemoveMail}
                        OnReadMail={OnReadMail}
                        onSelectMail={onSelectMail}
                        selectedMail={selectedMail}
                        />
                )
            case '/mail/write':
                return (
                    <MailList mails={mails.filter(m => !m.isRemove && m.to === myUser.email)}
                        OnRemoveMail={OnRemoveMail}
                        OnReadMail={OnReadMail}
                        onSelectMail={onSelectMail}
                        selectedMail={selectedMail}
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
    return (<div className="mail-page">

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
    </div >

    )
}

