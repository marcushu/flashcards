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
              {topic === currentTopic && userStatus !== 'GUEST' &&
                <button
                  onClick={() => deleteTopic(topic)}
                  className="newTopic"
                  style={{color: "red"}} >
                  -
                </button>}
              <button
                onClick={() => setTopic(topic)}
                className={topic === currentTopic ? "selected" : ""}>
                {topic}
              </button>
            </p>
          )}
        </div>
      }
    </>
  )
}

export default TopicList