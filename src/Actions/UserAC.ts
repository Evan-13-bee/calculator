import { Dispatch } from "redux";

export type UserReducerActionsType = ReturnType<typeof updateUserName>;

export const updateUserName = (name: string): { type: 'UPDATE-USER-NAME', name: string } => {   
    return { type: 'UPDATE-USER-NAME', name }
}

export const updateUserNameTC = (name: string) => (dispatch: Dispatch) => {   
    dispatch(updateUserName(name))
}
