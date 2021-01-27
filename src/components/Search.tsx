import { useState, useRef } from 'react';

interface SearchProps {
  setTopic: (topic: string) => void
}

const Search = ({ setTopic }: SearchProps) => {
  const [searchText, setsearchText] = useState("");
  const textRef = useRef<HTMLInputElement>(null);
  
  const sendTopic = () => {
    setTopic(searchText);
    setsearchText("");

    // kludge alert
    if(textRef && textRef.current) {
      textRef.current.value = "";
    }    
  }

  return (
    <div style={{ paddingTop: "40px" }}>
      <input type="text"
        placeholder="Topic Search..."
        ref={textRef}
        id="searchBox"
        onChange={e => setsearchText(e.currentTarget.value)} />
      <button onClick={sendTopic}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16">
          <path fillRule="evenodd"
            d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
          <path fillRule="evenodd"
            d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
        </svg>
      </button>
      
    </div>
  )
}

export default Search