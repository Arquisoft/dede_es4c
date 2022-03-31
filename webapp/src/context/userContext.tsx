import {createContext, Dispatch} from 'react';
import { User, UserState } from '../interface/interfaces';

export type UserContextProps = {
    stateUser: UserState;
    setCurrentUser: (user: User) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

