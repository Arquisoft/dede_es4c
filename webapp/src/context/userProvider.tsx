import React, { useReducer, useEffect } from "react";
import { userReducer } from "./userReducer";
import jwt_decode from "jwt-decode";
import { BDUser, InfoPod, Token, UserState } from "../interface/interfaces";
import { UserContext } from "./userContext";

const defaultUser : BDUser =  {
    __v: 0,
    _id: "",
    _password: "",
    _username: "",
    _email: ""
};

const defaultInfo : InfoPod = {
    expirationDate: 0,
    isLoggedIn: false,
    sessionId: '',
    webId: ''
}

let initialState: UserState = {
    isAuthenticated: false,
    user: defaultUser,
    info: defaultInfo
};

interface UserProviderProps {
    children: JSX.Element | JSX.Element[];
}

export const UserProvider = ({ children }: UserProviderProps) => {
    if (localStorage.jwt) {
        initialState.isAuthenticated = true;
        let user = jwt_decode<Token>(localStorage.jwt).user;
        initialState.user = user;
    }
    const [stateUser, dispatch] = useReducer(userReducer, initialState, () => {
        const localData = localStorage.getItem('user');
        return localData ? JSON.parse(localData) : initialState
    });

    const setCurrentUser = (user: BDUser) => {
        dispatch({ type: 'setCurrentUser', payload: user })
    };

    const logoutUser = () => {
        dispatch({type: 'logoutUser', payload: defaultUser})
    }

    const setInfo = (info: InfoPod) => {
        dispatch({type: 'setInfo', payload: info})
    }

    if (localStorage.jwt && !stateUser.isAuthenticated) {
        const userToken = localStorage.jwt ? localStorage.jwt : "";
        var token_decoded = jwt_decode<Token>(userToken);
        setCurrentUser(token_decoded.user);
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(stateUser))
    }, [stateUser])

    return (
        <UserContext.Provider value={{ stateUser, setCurrentUser, logoutUser, setInfo }}>
            {children}
        </UserContext.Provider>
    );
}

