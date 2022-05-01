import { UserState, BDUser, InfoPod, UserData } from "../interface/interfaces";

type UserAction =
	| { type: "setCurrentUser"; payload: BDUser }
	| { type: "logoutUser"; payload: BDUser }
	| { type: "setInfo"; payload: InfoPod }
	| { type: "setUserData"; payload: UserData };

export const userReducer = (
	state: UserState,
	action: UserAction,
): UserState => {
	switch (action.type) {
		case "setCurrentUser":
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
			};
		case "logoutUser":
			localStorage.removeItem("jwt");
			localStorage.removeItem("user");
			return { ...state, isAuthenticated: false, user: action.payload };
		case "setInfo":
			return {
				...state,
				isAuthenticated: true,
				info: action.payload,
			};
		case "setUserData":
			return {
				...state,
				userData: action.payload,
			};
		default:
			return state;
	}
};

const isEmpty = (value: any) => {
	return (
		value === undefined ||
		value === null ||
		(typeof value === "object" && Object.keys(value).length === 0) ||
		(typeof value === "string" && value.trim().length === 0)
	);
};
