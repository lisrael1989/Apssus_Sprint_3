const { useState } = React

export function MailCompose({ onClose, onSend }) {

    const [mail, setMail] = useState({ to: '', subject: '', body: '' })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMail(prevMail => ({ ...prevMail, [name]: value }))
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        onSend(mail)
    };

    return (
        <div className="mail-compose-container">
            <div className="mail-compose">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="to"
                        placeholder="To"
                        value={mail.to}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={mail.subject}
                        onChange={handleChange}
                    />
                    <textarea
                        name="body"
                        placeholder="Compose email"
                        value={mail.body}
                        onChange={handleChange}
                    />
                    <div className="actions">
                        <button type="submit">Send</button>
                        <button type="button" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}