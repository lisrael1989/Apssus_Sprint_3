const { Link } = ReactRouterDOM


export function MailList({ mails }) {

    if (!mails) return <div>loading...</div>
    return (<div className="mail-list-container">
        <div className="mail-list">


            {
                mails && mails.map(mail => <il key={mail.id}>
                    <Link to={`/mail/${mail.id}`} className="line-mail">
                        <span>{mail.from}</span>
                        <span>{mail.subject}</span>
                    </Link>
                </il>)

            }
        </div>
    </div>
    )
}