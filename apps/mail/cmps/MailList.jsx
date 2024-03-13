const { Link, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React
import { mailService } from "../services/mail.service.js"



export function MailList({ mails }) {
    const [isRemove, setRemove] = useState(false)

    function OnRemoveCar(mailId) {
        mailService.get(mailId).then((mail) => {
            mail.isRemove = Date.now()
            setRemove(mail)
            mailService.save(mail)
        })
    }


    if (!mails) return <div>loading...</div>
    return (
        <div className="mail-list">


            {
               !isRemove && mails.map(mail => (<div className={mail.isRead ? 'read' : ''} key={mail.id} >
                    <Link to={`/mail/${mail.id}`} className="line-mail" >
                        <span>{mail.from}</span>
                        <span>{mail.subject}</span>
                        {/* <span>{mail.}</span> */}
                    </Link>
                    {/* <span onClick={() => OnRemoveCar(mail.id)}>remove</span> */}
                </div>)

                )}
        </div>

    )
}