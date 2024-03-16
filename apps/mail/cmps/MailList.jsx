const { Link, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React
import { mailService } from "../services/mail.service.js"
import { utilService } from '../../../services/util.service.js'



export function MailList({ mails, OnRemoveMail, OnReadMail, onSelectMail, selectedMails, sortBy, setSortBy,onSelectAll }) {
    let unredMsg = mails.filter(mail => !mail.isRead).length
    // const timeSend = mails.map(mail => mail.sentAt = utilService.getRelativeTime(mail.sentAt))




    function letters(body, maxLength = 23) {
        return body.length > maxLength ? body.substring(0, maxLength) + '...' : body
    }
    function lettersTitle(body, maxLength = 15) {
        return body.length > maxLength ? body.substring(0, maxLength) + '...' : body
    }
    if (!mails || !mails.length) return <div className="message-mails">No messages matching your search were found...</div>
    return (
        <div className="mail-list">

            <div className="header-of-list">
                <span className="header-titles">mails unread:{unredMsg}</span>
                <button onClick={onSelectAll} className="header-titles"> Select All</button>

            </div>
            {
                mails.map(mail => (<div className={mail.isRead ? 'read' : ''} key={mail.id} >
                    <div className="line-container">
                        <div onClick={() => { onSelectMail(mail.id) }} id='line-squere' className={selectedMails.includes(mail.id) ? "square-check fa-regular fa-square-check" : "square-check fa-regular fa-square"}></div>
                        <div className="line-mail">
                            <Link to={`/mail/${mail.id}`} style={{ width: '100%' }} >

                                <span className="name-mail">{mail.from[0].toUpperCase() + mail.from.slice(1)}</span>

                                <span className="subject-mail">{lettersTitle(mail.subject)}<span className="mail-body">{letters(mail.body)}</span></span>
                            </Link>

                            <div className="btn-mail">
                                {selectedMails.includes(mail.id) ? (
                                    <React.Fragment>
                                        <span className="fa-solid fa-trash" onClick={OnRemoveMail}></span>
                                        <span className={mail.isRead ? "fa-regular fa-envelope-open" : "fa-regular fa-envelope"} onClick={() => { OnReadMail(mail.id) }}></span>
                                    </React.Fragment>
                                ) : (<span className="time-mail">{utilService.getRelativeTime(mail.sentAt)}</span>)}
                            </div> </div></div></div>)

                )
            }
        </div >

    )
}

