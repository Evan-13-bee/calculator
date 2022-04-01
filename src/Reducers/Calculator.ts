
const initialState = {
  userName: 'Me',
  usersList: [{
    id: 1,
    name: 'string',
    email: 'string',
    address: {
      street: 'string',
      city: 'string',
      zipcode: 'string'
    }
  }]
}

export const UserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'UPDATE-USER-NAME':

      return { ...state, userName: action.name }

    default: return state
  }
}