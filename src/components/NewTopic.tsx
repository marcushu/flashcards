import { useState } from 'react';

interface NewTopicProps {
  addNewTopic: (newtopic: string) => void
}

const NewTopic = ({ addNewTopic }: NewTopicProps) => {
  const [newTopicText, setnewTopicText] = useState("");

  const addTopic = () => {
    if (newTopicText === "") {
      alert("Please add a name for your new topic.");
    } else {
      addNewTopic(newTopicText);
      setnewTopicText("");
    }
  }

  return (
    <div>
      <button className="newTopic" onClick={addTopic}>
        +
      </button>
      <input id="newtopicText"
        type="text"
        value={newTopicText}
        placeholder="new topic..."
        onChange={e => setnewTopicText(e.target.value)} />
    </div>
  )
}

export default NewTopic;
