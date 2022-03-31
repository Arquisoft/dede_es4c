import React, { useReducer } from "react";
import { userReducer } from "./userReducer";
import jwt_decode from "jwt-decode";
import { User, UserState } from "../interface/interfaces";
import { UserContext } from "./userContext";

let initialState: UserState = {
    isAuthenticated: false,
    user: {
        _username: "",
        _email: ""
    }
};

interface UserProviderProps {
    children: JSX.Element | JSX.Element[];
}

export const UserProvider = ({ children }: UserProviderProps) => {
    if (localStorage.jwt) {
        initialState.isAuthenticated = true;
        initialState.user = jwt_decode(localStorage.jwt);
    }
    const [stateUser, dispatch] = useReducer(userReducer, initialState);

    const setCurrentUser = (user: User) => {
        let userToSet = {_username: user._username, _email: user._email};
        dispatch({ type: 'setCurrentUser', payload: userToSet })
    };

    const logout = () => {
        dispatch({type: 'logout', payload: {
            _username: "",
            _email: ""
        }})
    }

    if (localStorage.jwt && !stateUser.isAuthenticated) {
        const userToken = localStorage.jwt ? localStorage.jwt : "";
        setCurrentUser(jwt_decode(userToken));
    }

    return (
        <UserContext.Provider value={{ stateUser, setCurrentUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

