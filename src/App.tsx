import React, { useState, useContext } from 'react';
import Landing from './components/Landing';
import MainApp from './components/MainApp';
import UserContext from './UserContext';


type LoginInfo = { newUser: string } | { user: string } | "GUEST";

interface UserInfoo {
  userName: string
  userStatus: string
}

function App() {
  const [newArrival, setnewArrival] = useState(true);
  const [initialUserState, setinitialUserState] = useState<UserInfoo>({userStatus:"", userName: ""});
  let _user = useContext(UserContext);

  const login = (user: LoginInfo) => {
    let status: string;
    let name: string;

    setnewArrival(false);

    switch (Object.keys(user)[0]) {    
      case "user":
        name = (user as {user: string}).user;
        status = "user"
        break;
      case "newUser":
        name = (user as {newUser: string}).newUser;
        status = "newUser"
        break;
      default:
        name = ""
        status = "GUEST"
        break;
    }
    _user = {
      userName: name,
      userStatus: status
    }
    setinitialUserState(_user)
  }

  return (
    <div style={{ height: "100%" }}>
      {!newArrival
        ?
        <UserContext.Provider value={initialUserState}>
          <MainApp />
        </UserContext.Provider>
        :
        <Landing loginHandler={login} />
      }

    </div>
  );
}

export default App;
