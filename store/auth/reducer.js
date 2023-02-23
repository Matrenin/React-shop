import * as types from '../auth/types'

const initialState = {
    email: null,
    token: null,
    id: null,
    name: null
}

export const userReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch(type) {
       
        case types.SET_USER:
            return {
                ...state,
                email: payload.email,
                token: payload.token,
                id: payload.id,
                name: payload.name
            }

        case types.REMOVE_USER:
            return {
                ...state,
                email: null,
                token: null,
                id: null,
                name: null
            }

        default:
            return state

    }
}