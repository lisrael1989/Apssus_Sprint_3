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
                            <span>{mail.subject}</span>
                            {/* <span>{mail.}</span> */}
                        </Link>
                        <div className="btn-mail">
                            <span onClick={() => OnRemoveMail(mail.id)}>remove</span>
                            <span onClick={() => OnReadMail(mail.id)}>read</span>
                        </div>
                    </div></div>)

                )}
        </div>

    )
}

