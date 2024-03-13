const { useState, useEffect } = React
const { Route, Routes, useLocation } = ReactRouterDOM



import { MailList } from "../cmps/MailList.jsx";
import { MailFilter } from "../cmps/MailFilter.jsx";
import { mailService } from "../services/mail.service.js"
import { MailPreview } from '../cmps/MailPreview.jsx'

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const location = useLocation()

    useEffect(() => {
        loadMails()
    }, [])


    function loadMails() {
        mailService.query()
            .then((mails) => {
                setMails(mails)
            })
    }


    return (<div className="mail-page">

        <MailFilter />

        <div className="mail-list-container">
            {location.pathname === "/mail" ?
                <MailList mails={mails} /> :
                <Routes>
                    <Route path=":mailId" element={<MailPreview />} />
                </Routes>
            }
        </div>
    </div>

    )
}

