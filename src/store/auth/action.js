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

export const editUser = (data) => ({
    type: types.EDIT_USER,
    payload: data
})

export const addAuthApplications = (data) => ({
    type: types.ADD_AUTH_APPLICATION,
    payload: data
})

export const setUserSubscribe = (data) => {
    return {
        type: types.SET_USER_SUBSCRIBE,
        payload: data   
    }
}

export const deleteAuthApplication = (data) => ({
    type: types.DELETE_AUTH_APPLICATION,
    payload: data
}) 

export const addAuthComment = comment => ({
    type: types.ADD_AUTH_COMMENT,
    payload: comment
  })

  export const deleteAuthComment = data => ({
    type: types.DELETE_AUTH_COMMENT,
    payload: data
  })