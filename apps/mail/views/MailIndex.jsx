const { useState, useEffect } = React


import { MailList } from "../cmps/MailList.jsx";
import { MailFilter } from "../cmps/MailFilter.jsx";
import { mailService } from "../services/mail.service.js"

export function MailIndex() {
    const [mails, setMails] = useState(null)

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
        <MailList
            mails={mails}
        />

    </div>
    )
}

