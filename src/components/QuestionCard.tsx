import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { isNil } from 'lodash'

interface Question {
  question?: string,
  answer?: string,
}

interface QuestionCardProps {
  randomQuestion: Question,
  setshowModal: (newState: boolean) => void
  nextQuestion: () => void
  deleteQuestion: (question: string) => void
}

const QuestionCard = ({ randomQuestion, setshowModal, nextQuestion, deleteQuestion }: QuestionCardProps) => {
  const [hideQuestion, sethideQuestion] = useState(true);
  const user = useContext(UserContext);

  useEffect(() => {
    sethideQuestion(true);
  }, [randomQuestion]);

  const newQuestion = () => {
    sethideQuestion(true);
    nextQuestion();
  }

  const deleteIt = () => {
    if (!isNil(randomQuestion.question)) {
      deleteQuestion(randomQuestion.question);
      newQuestion();
    }
  }

  return (
    <div id="questionCard">
      {randomQuestion.question
        ?
        <>
          <div id="cardHeader">
            <div className="cardHead">
              {user.userStatus !== 'GUEST' &&
                <>
                  <button className="addDelete" style={{ width: "30px", color: "red" }} onClick={deleteIt}>
                    -
                  </button>
                  <button className="addDelete" style={{ width: "30px", color: "rgb(123 123 123)" }} onClick={() => setshowModal(true)}>
                    +
                  </button>
                </>}
              &nbsp;
              {randomQuestion.question}
            </div>
          </div>
          <div id="cardBody" style={{height: "auto", paddingBottom: "15px"}}>
            {hideQuestion
              ?
              <div>
                <button id="questionMask"
                  onClick={() => sethideQuestion(false)}
                  style={{ visibility: !hideQuestion ? "hidden" : "visible" }}>?</button>
              </div>
              :
              <div style={{ visibility: hideQuestion ? "hidden" : "visible" }}>
                {randomQuestion.answer}
              </div>
            }
          </div>
          <div id="cardFooter">
            <button className="questionButtons" style={{ width: "100%" }} onClick={newQuestion}>
              &gt;&gt;
            </button>
          </div>
        </>
        :
        <div id="cardBody">
          <p style={{ fontStyle: "italic" }}>
            Questions will appear here when a topic is selected
          </p>
        </div>
      }
    </div>
  )
}

export default QuestionCard;