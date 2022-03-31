import React, { useReducer } from "react";
import { userReducer } from "./userReducer";
import jwt_decode from "jwt-decode";
import { BDUser, Token, UserState } from "../interface/interfaces";
import { UserContext } from "./userContext";

const defaultUser : BDUser =  {
    __v: 0,
    _id: "",
    _password: "",
    _username: "",
    _email: ""
};

let initialState: UserState = {
    isAuthenticated: false,
    user: defaultUser
};

interface UserProviderProps {
    children: JSX.Element | JSX.Element[];
}

export const UserProvider = ({ children }: UserProviderProps) => {
    if (localStorage.jwt) {
        console.log("Provider1")
        initialState.isAuthenticated = true;
        let user = jwt_decode<Token>(localStorage.jwt).user;
        initialState.user = user;
    }
    const [stateUser, dispatch] = useReducer(userReducer, initialState);

    const setCurrentUser = (user: BDUser) => {
        dispatch({ type: 'setCurrentUser', payload: user })
    };

    const logout = () => {
        dispatch({type: 'logout', payload: defaultUser})
    }

    if (localStorage.jwt && !stateUser.isAuthenticated) {
        console.log("Provider2")
        const userToken = localStorage.jwt ? localStorage.jwt : "";
        var token_decoded = jwt_decode<Token>(userToken);
        setCurrentUser(token_decoded.user);
    }

    return (
        <UserContext.Provider value={{ stateUser, setCurrentUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

