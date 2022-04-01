const initialState: any = [
  
]
type InitialStateType = typeof initialState
export const UserReducer = (state: InitialStateType = initialState, action: any) => {
  switch (action.type) {
    case 'UPDATE-USER-NAME':

      return { ...state, userName: action.name }

    default: return state
  }
}