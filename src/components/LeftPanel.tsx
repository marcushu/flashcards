import React, { useContext} from 'react';
import './css/LeftPanel.css';
import NewTopic from './NewTopic';
import Search from './Search';
import axios from 'axios';
import { isEmpty } from 'lodash';
import TopicList from './TopicList';
import UserContext from '../UserContext';

interface PanelProps {
  setTopic: (topic: string) => void
  addTopic: (newTopic: string) => void
  deleteTopic: (toDelete: string) => void
  topics: string[] | []
  currentTopic: string
}

const LeftPanel = ({ setTopic, addTopic, deleteTopic, topics, currentTopic }: PanelProps) => {
  const _user = useContext(UserContext);

  const searchTopic = (_topic: string) => { 
    axios.post('/searchtopic', {
      "topicName": _topic
    })
      .then(searchResult => {
        if (isEmpty(searchResult.data.topic)) {
          alert("No topic was found.")
        } else {
          setTopic(searchResult.data.topic);
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="leftColumn">
      <TopicList currentTopic={currentTopic}
        userStatus={_user.userStatus}
        deleteTopic={deleteTopic}
        setTopic={setTopic}
        usersTopics={topics} />
      {_user.userStatus !== 'GUEST' &&
        <NewTopic addNewTopic={topic => addTopic(topic)} />
      }
      {_user.userStatus === "GUEST" &&
        <Search setTopic={searchTopic} />}
    </div>
  )
}

export default LeftPanel