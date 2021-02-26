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
    randomQuestion.question = "LOADING...";
    randomQuestion.answer = "...";
    sethideQuestion(true);
    nextQuestion();
  }

  const deleteIt = () => {
    if (user.userStatus !== "GUEST") {
      if (!isNil(randomQuestion.question)) {
        deleteQuestion(randomQuestion.question);
        newQuestion();
      }
    }
  }

  const sentences = () => typeof randomQuestion.answer !== 'undefined'
    ? randomQuestion.answer.split('\n')
    : [""];


  return (
    <div id="questionCard">
      {randomQuestion.question
        ?
        <>
          <div id="cardHeader">
            <div className="cardHead">
              {randomQuestion.question}
            </div>
          </div>
          <div id="cardBody" style={{ height: "auto", paddingBottom: "15px" }}>
            {hideQuestion
              ?
              <div>
                <button id="questionMask"
                  onClick={() => sethideQuestion(false)}
                  style={{ visibility: !hideQuestion ? "hidden" : "visible" }}>?</button>
              </div>
              :
              <div style={{ visibility: hideQuestion ? "hidden" : "visible" }}>
                {sentences().map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            }
          </div>
          <div id="cardFooter">
            {user.userStatus !== "GUEST" &&
              <button
                style={{ width: "20%", fontStyle: "bold", color: "red", backgroundColor: "rgb(136 130 144)", borderRadius: "5px 0px 0px 5px" }}
                onClick={deleteIt}>
                -
            </button>}
            <button style={{ width: "60%", backgroundColor: "#3251a475", color: "white" }} onClick={newQuestion}>
              &gt;&gt;
            </button>
            {user.userStatus !== "GUEST" &&
              <button
                style={{ width: "20%", color: "white", backgroundColor: "rgb(136 130 144)", borderRadius: "0px 5px 5px 0px" }}
                onClick={() => setshowModal(true)}>
                +
            </button>}
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