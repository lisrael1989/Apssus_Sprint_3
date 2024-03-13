const { Link, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React
import { mailService } from "../services/mail.service.js"



export function MailList({ mails, OnRemoveMail, OnReadMail }) {



    if (!mails) return <div>loading...</div>
    const filteredMails = mails.filter(mail => !mail.isRemove)
    return (
        <div className="mail-list">


            {
                filteredMails.map(mail => (<div className={mail.isRead ? 'read' : ''} key={mail.id} >
                    <div className="line-mail">
                        <Link to={`/mail/${mail.id}`}  >

                            <span>{mail.from}</span>

                            {/* <span>{mail.}</span> */}
                        </Link>
                        <span>{mail.subject}</span>
                        <div className="btn-mail">
                            <span className="fa-solid fa-trash" onClick={() => OnRemoveMail(mail.id)}></span>
                            <span className={mail.isRead ? "fa-regular fa-envelope-open" : "fa-regular fa-envelope"} onClick={() => OnReadMail(mail.id)}></span>                        </div>
                    </div></div>)

                )}
        </div>

    )
}

