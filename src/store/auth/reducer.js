import * as types from '../auth/types'

const initialState = {
    email: null,
    token: localStorage.getItem('remember')  || null,
    id: null,
    name: null,
    phone: null,
    rememberMe: localStorage.getItem('remember') ? true : false,
    applications: {},
    subscribe: false,
    comments: {}
}

export const userReducer = (state = initialState, action) => {
    const { type, payload } = action
    const {comments} = state

    switch(type) {
       
        case types.SET_USER:
            return {
                ...state,
                email: payload.email,
                token: payload.token,
                id: payload.id,
                name: payload.name,
                rememberMe: payload.rememberMe,
                subscribe: payload.subscribe,
                phone: payload.phone,
                comments: payload.comments,
                applications: payload.applications
            }

        case types.REMOVE_USER:
            return {
                ...state,
                email: null,
                token: null,
                id: null,
                name: null,
                rememberMe: false,
                phone: null,
                applications: {},
                subscribe: false,
                comments: {}
            }

        case types.EDIT_USER:
            return {
                ...state,
                name: payload.name,
                phone: payload.phone,
                email: payload.email
            }

        case types.ADD_AUTH_APPLICATION:
            let copy = Object.assign({}, state)
            copy.applications = {...copy.applications, ...payload}
            return copy

        case types.SET_USER_SUBSCRIBE:
            return {
                ...state,
                subscribe: payload.subscribe
            }

        case types.DELETE_AUTH_APPLICATION:
            let obj = Object.assign({}, state)
            delete obj.applications[payload]
            return obj

        case types.ADD_AUTH_COMMENT:
            const newComments = {...comments, ...payload}
            return {
                ...state,
                comments: newComments
            }

       case types.DELETE_AUTH_COMMENT:
            const newCommentsList = {...comments}
            delete newCommentsList[payload]
            return {
                ...state,
                comments: newCommentsList
            }

        default:
            return state

    }
}