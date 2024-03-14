const { useState, useEffect } = React
const { Route, Routes, useLocation, Link } = ReactRouterDOM



import { MailList } from "../cmps/MailList.jsx";
import { MailFilter } from "../cmps/MailFilter.jsx";
import { mailService } from "../services/mail.service.js"
import { MailPreview } from '../cmps/MailPreview.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'

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
        if(selectedMail === Mail.id){
            setSelectedMail(null)
        } else{
            setSelectedMail(Mail.id)
        }
    }



    function OnRemoveMail(mailId) {
        mailService.get(mailId).then((mail) => {
            mail.isRemove = Date.now()
            const updatedMails = mails.map(m => m.id === mailId ? { ...m, isRemove: mail.isRemove } : m)
            setMails(updatedMails)
            mailService.save(mail)
        })
    }

    function OnDeletePermanent(mailId) {
        mailService.get(mailId).then((mail) => {
            mail.isRemove = Date.now()
            const updatedMails = mails.map(m => m.id !== mailId)
            setMails(updatedMails)
            mailService.remove(mailId)
        })
    }

    function getMailList(){
        const route = location.pathname
        const myUser = "user@appsus.com"
        
        switch(route){
            case '/mail':
                return (
                    <MailList mails={mails.filter(m=>!m.isRemove && m.to === myUser)}
                    OnRemoveMail={OnRemoveMail}
                    OnReadMail={OnReadMail}
                    onSelectMail={onSelectMail}
                    selectedMail={selectedMail} />
                )
            case '/mail/trash':
                return (
                    <MailList mails={mails.filter(m=>m.isRemove)}
                    OnRemoveMail={OnDeletePermanent}
                    OnReadMail={OnReadMail}
                    onSelectMail={onSelectMail}
                    selectedMail={selectedMail} />
                )
            case '/mail/send':
                return (
                    <MailList mails={mails.filter(m=>!m.isRemove && m.from === myUser)}
                    OnRemoveMail={OnRemoveMail}
                    OnReadMail={OnReadMail}
                    onSelectMail={onSelectMail}
                    selectedMail={selectedMail} />
                )
            default:
                return (
                    <Routes>
                        <Route path=":mailId" element={<MailPreview />} />
                    </Routes>
                )
        }
    }

    const { txt } = filterBy
    return (<div className="mail-page">

        <MailFilter
            onSetFilter={onSetFilter}
            filterBy={{ txt }} />
        <div className="mail-main">

            <MailFolderList/>
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
    </div >

    )
}

