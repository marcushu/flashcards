interface GuestLoginProps {
  loginHandler: (input: string) => void
}

const GuestLogin = ( { loginHandler }: GuestLoginProps) => {
  return (
    <div className="card">
      <div>
        <button className="loginBtn" onClick={() => loginHandler("GUEST")}>
          Continue as guest
        </button>
        <br /><br />
          and choose from available topics.
      </div>
    </div>
  )
}

export default GuestLogin