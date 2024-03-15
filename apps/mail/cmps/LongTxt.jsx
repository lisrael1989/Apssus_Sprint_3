const { useState } = React



export function LongTxt({ txt, length }) {
  const [isMore, setIsmore] = useState(false)

  function toggleExpand() {
    setIsmore(!isMore)
  }


  const text = isMore ? txt : txt.substring(0, length)
  // if(text)return <div>loading...</div>
  return <div className="more-p">
    <p>{text}</p>
    {txt.length > length && (
      <button onClick={() => toggleExpand()}>
        {isMore ? 'Read Less' : 'Read More'}
      </button>
    )}
  </div>

}