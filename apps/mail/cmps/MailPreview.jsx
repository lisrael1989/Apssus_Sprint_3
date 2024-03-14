const { useParams } = ReactRouterDOM
const { useEffect, useState } = React

import { mailService } from "../services/mail.service.js"


export function MailPreview() {
    const { mailId } = useParams()
    const [mail, setMail] = useState(null)

    useEffect(() => {
        if (mailId) {
            mailService.get(mailId).then(setMail)
        }
    }, [mailId])

    if (!mail) return <div>Loading...</div>
    return (
        <div className="mail-Msg">
            <h2>subject:{mail.subject}</h2>
            <span>{mail.sentAt}</span>
            <span className="fa-solid fa-user"></span>
            <span>{mail.from}</span>
            <p>{mail.body}</p>
        </div>
    )
}

