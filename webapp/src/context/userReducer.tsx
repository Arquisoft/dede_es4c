import { UserState, BDUser} from "../interface/interfaces";

type UserAction = 
    | {type: 'setCurrentUser', payload: BDUser}
    | {type: 'logout', payload: BDUser}

export const userReducer = (state:UserState, action: UserAction): UserState => {
    switch(action.type){
        case 'setCurrentUser':
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case 'logout':
            localStorage.removeItem("jwt");
            return{...state,
                isAuthenticated: false,
                user: action.payload
            }
        default:
            return state;
    }
}

const isEmpty = (value : any) =>{
    return(
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
}