const { useState, useEffect } = React
const { Route, Routes, useLocation, Link } = ReactRouterDOM



import { MailList } from "../cmps/MailList.jsx";
import { MailFilter } from "../cmps/MailFilter.jsx";
import { mailService } from "../services/mail.service.js"
import { MailPreview } from '../cmps/MailPreview.jsx'

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const location = useLocation()
    const [selectedMail, setSelectedMail] = useState(null)
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

    function onSelectMail(Mail) {
        console.log('selected Mail', Mail)
        setSelectedMail(Mail)
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
        <div className="mail-main">
            <div className="more-Options">
                <h1 className="send fa-solid fa-pen"></h1>
                <Link to='/mail'><h1 className="fa-solid fa-inbox"></h1></Link>
                <h1 className="fa-solid fa-trash-can"></h1>
                <h1 className="fa-regular fa-paper-plane"></h1>
            </div>

            <div className="mail-list-container">
                {location.pathname === "/mail" ?
                    <MailList mails={mails}
                        OnRemoveMail={OnRemoveMail}
                        OnReadMail={OnReadMail}
                        onSelectMail={onSelectMail}
                        selectedMail={selectedMail} /> :
                    <Routes>
                        <Route path=":mailId" element={<MailPreview />} />
                    </Routes>
                }
            </div>
        </div>
    </div >

    )
}

