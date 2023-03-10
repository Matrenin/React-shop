const initialState = ""

export const filterNameReducer = (state = initialState, action) => {
    const { type, payload } = action
    if (type === 'PUSH_TEXT') {
        let result = state.replace(state, payload);
        return result
    }
    return state
}