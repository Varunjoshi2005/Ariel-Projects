import { createContext, useContext, useEffect, useReducer } from "react";
import { ACTIONS, type UserContextPayload } from "../types";


const UserContext = createContext<UserContextPayload | undefined>(undefined);



interface State {
    user: any | null;
}

export interface Actions {
    type: typeof ACTIONS[keyof typeof ACTIONS],
    payload?: any;
}


export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("Context not available!!");
    }

    return context;
}


function reducerMethod(state: State, actions: Actions) {

    switch (actions.type) {

        case ACTIONS.SET_USER: {
            return { ...state, user: actions.payload }
        }
        case ACTIONS.REMOVE_USER: {
            return { ...state, user: null }
        }
        default: return state;
    }
}



export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, dispatch] = useReducer(reducerMethod, { user: null });

    function LoadFromLocalStorage() {
        const user = localStorage.getItem("user-details");
        if (user && typeof (user) == "string") {
            const parsedUser = JSON.parse(user);
            dispatch({ type: ACTIONS.SET_USER, payload: parsedUser });
        }

        return;
    }


    useEffect(() => {
        LoadFromLocalStorage();
    }, []);


    return (

        <UserContext.Provider value={{ user: state.user, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}