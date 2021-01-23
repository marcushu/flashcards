interface TopicListProps {
  usersTopics: string[] | []
  setTopic: (newTopic: string) => void
  deleteTopic: (_topic: string) => void
  currentTopic: string
  userStatus: string
}

const TopicList = ({ usersTopics, setTopic, deleteTopic, currentTopic, userStatus }: TopicListProps) => {
  return (
    <>
      {!!usersTopics.length &&
        <div>
          {(usersTopics as string[]).map((topic: string) =>
            <p key={topic}>

              <button 
                onClick={() => setTopic(topic)}
                className={topic === currentTopic ? "selected" : ""}>
                {topic}
              </button>
              {topic === currentTopic && userStatus !== 'GUEST' &&
                <button 
                  onClick={() => deleteTopic(topic)}
                  style={{ color: "red", fontSize: "12px" }}>
                  delete
                </button>}
            </p>
          )}
        </div>
      }
    </>
  )
}

export default TopicList