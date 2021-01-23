import { useState } from 'react';

interface LoginProps {
  login: (input: string) => void
  signUp: (intput: string) => void
}

const Login = ({login, signUp}: LoginProps) => {
  const [userName, setuserName] = useState("");
  const [newUserName, setnewUserName] = useState("");

  return (
    <div className="card">
      <div>
        <input className="loginText"
          type="text"
          alt="login"
          onChange={e => setuserName(e.currentTarget.value)} />
        <br /><br />
        <button className="loginBtn" onClick={() => login(userName)}>
          Log In
            </button>
        <h4>Or</h4>
        <input className="loginText"
          type="text"
          alt="signup"
          onChange={e => setnewUserName(e.currentTarget.value)} />
        <br /><br />
        <button className="loginBtn" onClick={() => signUp(newUserName)}>
          Sign up
        </button>
      </div>
    </div>
  )
}

export default Login;