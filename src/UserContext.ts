import { createContext } from 'react';

interface UserInfoo {
    userName: string
    userStatus: string
}

const UserContext = createContext({} as UserInfoo);

export default UserContext;
