const { Link, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React
import { mailService } from "../services/mail.service.js"



export function MailList({ mails, OnRemoveMail, OnReadMail, onSelectMail, selectedMail }) {

    if (!mails) return <div>loading...</div>
    if (mails.length === 0) return <div>Empty😎</div>

    function letters(body, maxLength = 23) {
        return body.length > maxLength ? body.substring(0, maxLength) + '...' : body
    }

    return (
        <div className="mail-list">


            {
                mails.map(mail => (<div className={mail.isRead ? 'read' : ''} key={mail.id} >
                    <div className="line-container">
                        <div onClick={() => { onSelectMail(mail) }} id='line-squere' className={selectedMail === mail.id ? "squere-check fa-regular fa-square-check" : "squere-check fa-regular fa-square"}></div>
                        <div className="line-mail">
                            <Link to={`/mail/${mail.id}`} style={{width: '100%'}} >

                                <span className="name-mail">{mail.from}</span>

                                {/* <span>{mail.}</span> */}
                                <span className="subject-mail">{mail.subject}<span className="mail-body">{letters(mail.body)}</span></span>
                            </Link>

                            <div className="btn-mail">
                                {selectedMail === mail.id ? (
                                    <React.Fragment>
                                        <span className="fa-solid fa-trash" onClick={() => { OnRemoveMail(mail.id) }}></span>
                                        <span className={mail.isRead ? "fa-regular fa-envelope-open" : "fa-regular fa-envelope"} onClick={() => { OnReadMail(mail.id); }}></span>
                                    </React.Fragment>
                                ) : (<span>{mail.sentAt}</span>)}
                            </div> </div></div></div>)

                )}
        </div>

    )
}

