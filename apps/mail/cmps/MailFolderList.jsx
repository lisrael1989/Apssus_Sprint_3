
const { Route, Routes, useLocation, Link } = ReactRouterDOM
const { useState } = React

export function MailFolderList({opemCompose}) {
    const location = useLocation()
    const route = location.pathname
    

    return <div className="more-Options">
        <Link to='/mail/write' className={route === '/mail/write' ? 'marked' : ''}> <h1 onClick={()=>opemCompose()} className="send fa-solid fa-pen"></h1></Link>
        <Link to='/mail' className={route === '/mail' ? 'marked' : ''} style={{padding: 10}}><h1 className="fa-solid fa-inbox"></h1></Link>
        <Link to='/mail/trash' className={route === '/mail/trash' ? 'marked' : ''} style={{padding: 10}}><h1 className="fa-solid fa-trash-can"></h1></Link>
        <Link to='/mail/send' className={route === '/mail/send' ? 'marked' : ''} style={{padding: 10}}><h1 className="fa-regular fa-paper-plane"></h1></Link>
    </div>
}