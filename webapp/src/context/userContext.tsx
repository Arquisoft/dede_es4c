import {createContext} from 'react';
import { BDUser, UserState } from '../interface/interfaces';

export type UserContextProps = {
    stateUser: UserState;
    setCurrentUser: (user: BDUser) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

