import type { Actions } from "../context/UserContext";

export interface UserContextPayload {

    user: any | null;
    selectedCountry: string;
    selectedState: string;
    setSelectedState: React.Dispatch<React.SetStateAction<string>>;
    setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
    dispatch: React.ActionDispatch<[actions: Actions]>

}

export const ACTIONS = {

    SET_USER: "set-user",
    REMOVE_USER: "remove-user"

} as const;


