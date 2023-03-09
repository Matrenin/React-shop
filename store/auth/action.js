import * as types from '../auth/types'

export const setUser = (data) => {
    return {
        type: types.SET_USER,
        payload: data   
    }
}
export const removeUser = () => {
    return {
        type: types.REMOVE_USER  
    }
}