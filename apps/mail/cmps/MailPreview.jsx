const { useParams } = ReactRouterDOM
const { useEffect, useState } = React

import { mailService } from "../services/mail.service.js"
import { LongTxt } from './LongTxt.jsx'
import { utilService } from '../../../services/util.service.js'


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
            <div className="human-details">
            <span className="fa-solid fa-user"></span>
            <span className="name-user">{mail.from[0].toUpperCase() + mail.from.slice(1)} - {mail.email} </span>
            <span className="date">{utilService.getRelativeTime(mail.sentAt)}</span>
            {/* utilService.getRelativeTime */}
            </div>
            {/* <p>{mail.body}</p> */}
            <LongTxt txt={mail.body} length={2000} />
        </div>
    )
}

