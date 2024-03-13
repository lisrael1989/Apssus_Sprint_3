

export function MailList({ mails }) {


    return (<div className="mail-list">
            <ul>
                
                {
                    mails&&mails.map( mail => <il key={mail.id}>
                        <div className="line-mail">
                            <span>{mail.from}</span>
                        </div>
                    </il>)
                  
                }
            </ul>
    </div>
    )
    }