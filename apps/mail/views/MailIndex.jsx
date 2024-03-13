const { useState, useEffect } = React
const { Route, Routes, useLocation } = ReactRouterDOM



import { MailList } from "../cmps/MailList.jsx";
import { MailFilter } from "../cmps/MailFilter.jsx";
import { mailService } from "../services/mail.service.js"
import { MailPreview } from '../cmps/MailPreview.jsx'

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const location = useLocation()

    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())


    useEffect(() => {
        loadMails()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {


        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function loadMails() {
        mailService.query(filterBy)
            .then((mails) => {
                setMails(mails)
            })
    }


    function OnReadMail(mailId) {
        mailService.get(mailId).then((mail) => {
            mail.isRead = !mail.isRead;
            const updatedMails = mails.map(m => m.id === mailId ? { ...m, isRead: mail.isRead } : m)
            setMails(updatedMails)
            mailService.save(mail)
        })
    }


    function OnRemoveMail(mailId) {
        mailService.get(mailId).then((mail) => {
            mail.isRemove = Date.now()
            const updatedMails = mails.map(m => m.id === mailId ? { ...m, isRemove: mail.isRemove } : m)
            setMails(updatedMails)
            mailService.save(mail)
        })
    }
    const { txt } = filterBy
    return (<div className="mail-page">

        <MailFilter
            onSetFilter={onSetFilter}
            filterBy={{ txt }} />

        <div className="mail-list-container">
            {location.pathname === "/mail" ?
                <MailList mails={mails}
                    OnRemoveMail={OnRemoveMail}
                    OnReadMail={OnReadMail} /> :
                <Routes>
                    <Route path=":mailId" element={<MailPreview />} />
                </Routes>
            }
        </div>
    </div>

    )
}

