
export function MailFilter(){

    


    return <div className="header-mail">
        <nav className="nav-header">
            <span>inbox</span>
            <span>sent</span>
        </nav>
        <form onSubmit=''>
        <input type="text" 
        id="from"
        name="txt"
        value=''
        onChange=''
        placeholder="search"/>
        </form>
    </div>
}