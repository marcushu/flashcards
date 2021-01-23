import { useState } from 'react';
import './css/Newquestion.css';


interface NewquestionProp {
  setNewQuestion: (newQuestion: string, newAnswer: string) => void
  hideMe: () => void
}

const Newquestion = ({ setNewQuestion, hideMe }: NewquestionProp) => {
  const [questionText, setquestionText] = useState("");
  const [anserText, setanserText] = useState("");

  return (
    <div id="newQuestionCard">
      <div id="cardBody">
        <h3 style={{ marginTop: "2px", marginBottom: "2px" }}>question:</h3>
        <input
          type="text"
          data-testid="newQuestion"
          className="addQqandA"
          onChange={e => setquestionText(e.target.value)} />
        <br />
        <h3 style={{ marginTop: "14px", marginBottom: "2px" }}>answer:</h3>

        <textarea className="addQqandA" name="newQuesiton"
          id="newQuestionTxt"
          data-testid="newAnswer"
          rows={10} cols={50}
          style={{ marginTop: "0px" }}
          onChange={e => setanserText(e.target.value)} />
      </div>
      <div id="cardFooter" style={{ fontSize: "18px" }}>
        <button className="questionButtons"
          onClick={() => setNewQuestion(questionText, anserText)}>
          Submit
        </button>
        &nbsp;
        <button className="questionButtons"
          onClick={hideMe}>
          Cancel
        </button>

      </div>
    </div>
  )
}

export default Newquestion;
