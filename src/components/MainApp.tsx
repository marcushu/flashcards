import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AppHead from './AppHead';
import LeftPanel from './LeftPanel';
import MainStage from './MainStage';
import UserContext from '../UserContext';
import './css/MainApp.css';

axios.defaults.baseURL = 'http://localhost:3001'; //TODO: change before deploy

interface UserInfoo {
  userName: string
  userStatus: string
}

interface Question {
  question: string,
  answer: string,
  author: string
}

const MainApp = () => {
  const [topics, settopics] = useState<string[] | []>([]);
  const [currentTopic, setcurrentTopic] = useState("");
  const [randomQuestion, setrandomQuestion] = useState<Question | {}>({});

  const currentUser = useContext(UserContext);

  useEffect(() => {
    const setupUser = async (userLogin: string) => {
      try {
        const topics = await getUserTopics(userLogin);

        // load topics
        if (topics) {
          const usersTopics = topics.data.topics

          settopics(usersTopics);
          setcurrentTopic(usersTopics[0]);

          await setRandQuestion(currentUser, usersTopics[0]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if(currentUser.userStatus === "user")
      setupUser(currentUser.userName);

  }, [currentUser]);


  const getUserTopics = async (userInfo: string) => {
    try {
      return await axios.post('/topics', {
        owner: userInfo
      });
    } catch (err) {
      return err;
    }
  }


  const setRandQuestion = async (currentUser: UserInfoo, _topic: string) => {
    try {
      let randQuestion;

      if (currentUser.userStatus === "GUEST") {
        randQuestion = await axios.post('/randomquestionAnon', {
          topic: _topic
        });

        settopics([_topic]);
      } else {
        randQuestion = await axios.post('/randomquestion', {
          userName: currentUser.userName,
          topicName: _topic
        });
      }

      if (randQuestion.data.length) {
        setrandomQuestion({
          question: randQuestion.data[0].question,
          answer: randQuestion.data[0].answer,
          author: randQuestion.data[0].owner
        });
      } else {
        setrandomQuestion({
          question: "Please add question."
        });

        alert("No questions for this topic");
      }
    } catch (error) {
      return error
    }
  }


  const addNewTopic = async (_topic: string) => {
    try {
      await axios.post('/topic', {
        owner: currentUser.userName,
        topic: _topic
      });

      settopics([...topics, _topic]);
      setcurrentTopic(_topic);

      setrandomQuestion({
        question: "Use the '+' button to add questions"
      });
    } catch (error) {
      console.error(error);
    }
  }


  const changeTopic = (newTopic: string) => { 
    setcurrentTopic(newTopic);
    setRandQuestion(currentUser, newTopic);
  }


  const addNewQuestion = async (_question: string, _answer: string) => {
    if (currentTopic === "") {
      alert("no topic selected")
    } else {
      const questionObject = {
        owner: currentUser.userName,
        question: _question,
        answer: _answer,
        topic: currentTopic
      }

      try {
        await axios.post('/question', questionObject);

        setRandQuestion(currentUser, currentTopic);
      } catch (error) {
        console.error(error);
      }
    }
  }


  const deleteQuestion = async (question: string) => {
    if (currentUser.userStatus !== 'GUEST') {
      try {
        await axios.post('/delquestion', {
          owner: currentUser.userName,
          question: question
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("You are not the owner of this question")
    }
  }


  const deleteTopic = async (_topic: string) => {
    console.log("topic: " + _topic);
    if (currentUser.userName !== 'GUEST') {
      try {
        await axios.post('/deltopic', {
          owner: currentUser.userName,
          topic: _topic
        });

        settopics(topics.filter(topic => topic !== _topic));
        setcurrentTopic(topics[0]);
        setRandQuestion(currentUser, topics[0]);
      } catch (error) {
        console.error(error);
      }
    }
  }


  return (
    <div className="cards">
      <AppHead owner={currentUser.userName} />
      <LeftPanel
        setTopic={changeTopic}
        addTopic={newTopic => addNewTopic(newTopic)}
        deleteTopic={toDelete => deleteTopic(toDelete)}
        topics={topics}
        currentTopic={currentTopic} />
      <MainStage
        randomQuestion={randomQuestion}
        getNewQuestion={() => setRandQuestion(currentUser, currentTopic)}
        addNewQuestion={addNewQuestion}
        deleteQuestion={deleteQuestion} />
    </div>

  )
}

export default MainApp