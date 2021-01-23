import './css/AppHead.css';

type AppProps = {
  owner: string
}

const AppHead = ({ owner }: AppProps) => {
  return (
    <div className="headerDiv">
      <div>
        <h1>stuff I should know...</h1>
      </div>
      {!!owner.length &&
        <div id="buttonGreeting">
          <div>Hello {owner}</div>
        </div>
      }
    </div>
  )
}

export default AppHead