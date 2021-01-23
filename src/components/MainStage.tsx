import * as React from 'react';
import { useState } from 'react';
import './css/MainStage.css';
import Newquestion from './Newquestion';
import QuestionCard from './QuestionCard';

interface Question {
  question?: string,
  answer?: string,
  author?: string
}

interface MainStageProps {
  randomQuestion: Question
  getNewQuestion: () => void
  addNewQuestion: (newQuestion: string, newAnswer: string) => void
  deleteQuestion: (question: string) => void
}

const MainStage = ({ randomQuestion, getNewQuestion, addNewQuestion, deleteQuestion }: MainStageProps) => {
  const [showModal, setshowModal] = useState(false);

  const handleNewQuestion = (_question: string, _answer: string) => {
    setshowModal(false);

    addNewQuestion(_question, _answer);
  }

  return (
    <div className="mainStage">
      {showModal
        ?
        <Newquestion 
          setNewQuestion={handleNewQuestion}
          hideMe={() => setshowModal(false)} />
        :
        <QuestionCard 
          randomQuestion={randomQuestion} 
          setshowModal={setshowModal}
          nextQuestion={getNewQuestion}
          deleteQuestion={deleteQuestion} />
      }
    </div>
  )
}

export default MainStage;
