import * as React from 'react';
import axios from 'axios';
import './css/Landing.css';
import Login from './Login';
import GuestLogin from './GuestLogin';


type LoginInfo = { newUser: string } | { user: string } | "GUEST";

interface LandingProps {
  loginHandler: (input: LoginInfo) => void
}

const Landing = ({ loginHandler }: LandingProps) => {

  const login = (_name: string) => {
    if (!_name) {
      alert("please enter user name");
    } else {
      userExists(_name)
        .then((userExists) => {
          if (userExists)
            loginHandler({ user: _name });
          else
            alert("No user with that name found.");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }


  const signUp = (_name: string) => {
    userExists(_name)
      .then(userExists => {
        if (userExists) {
          alert("Invalid user name. Please pick another.");
        } else {
          // save the new user
          axios.post('/user', {
            name: _name
          })
            .then(() => loginHandler({ newUser: _name }))
            .catch(err => console.error(err));
        }
      })
      .catch(err => console.error(err));
  }


  const userExists = (loginName: string) => {
    return axios.post('/userexists', {
      userName: loginName
    })
      .then(response => response.data.userExists)
      .catch(err => console.error(err));
  }

  return (
    <div className="landingCards">
      <div className="landingHeaderDiv">
        <div>
          <h1>stuff I should know...</h1>
        </div>
      </div>
      <div id="leftCol">
        <Login login={login} signUp={signUp} />
      </div>
      <div id="mainStageLanding">
        <GuestLogin loginHandler={() => loginHandler("GUEST")} />
      </div>
    </div>
  )
}

export default Landing;