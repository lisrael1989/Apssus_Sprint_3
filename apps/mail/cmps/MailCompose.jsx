const { useState } = React

export function MailCompose({ onClose, onSend }) {

    const [mail, setMail] = useState({ to: '', subject: '', body: '' })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMail(prevMail => ({ ...prevMail, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSend(mail)
    }

    return (
        <div className="mail-compose-container">
            <div className="mail-compose">
                <div className="header-compose">
                    <h1>New mail</h1>
                    <button type="button" onClick={onClose}><span class="material-symbols-outlined">
                        close
                    </span></button>

                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="to"
                        placeholder="To"
                        value={mail.to}
                        onChange={handleChange}
                    />
                    <input
                        className="desc-msg"
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={mail.subject}
                        onChange={handleChange}
                    />
                    <textarea
                        name="body"
                        placeholder=''
                        value={mail.body}
                        onChange={handleChange}
                    />
                    <div className="actions">
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}