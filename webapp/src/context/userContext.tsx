import { createContext } from "react";
import { BDUser, InfoPod, UserData, UserState } from "../interface/interfaces";

export type UserContextProps = {
	stateUser: UserState;
	setCurrentUser: (user: BDUser) => void;
	logoutUser: () => void;
	setInfo: (info: InfoPod) => void;
	setUserData: (userData: UserData) => void;
};

export const UserContext = createContext<UserContextProps>(
	{} as UserContextProps,
);
