const initialState = []

export const applicationsReducer = (state = initialState, action) => {
  const { type, payload } = action
  if (type === 'ADD_APPLICATION') {
    let result = Object.assign([], state)
    result.push(payload)
    return result
  }
  return state
}