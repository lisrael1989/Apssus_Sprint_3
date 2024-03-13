const { useSearchParams } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"


function MailPreview() {
    const { mailId } = useSearchParams()
    const [mail, setMail] = useState(null)
    
    useEffect(()=>{
        mailService.get(mailId).then(setMail)
    },[mailId])


    return (
        <div className="mail-preview">
            <h2>{mail.subject}</h2>
            <p>{mail.body}</p>
        </div>
    )
}
    
