const initialState = {
  modalShow: false,
  modalDetails: false,
  modalSended: false
}

export const modalReducer = (state = initialState, action) => {
  const { type, payload } = action
  if (type === 'OPEN_MODAL') {
    let copy = Object.assign({}, state)
    copy.modalShow = payload
    return copy
  }
  if (type === 'CLOSE_MODAL') {
    let copy = Object.assign({}, state)
    copy.modalShow = payload
    return copy
  }
  if (type === 'OPEN_MODAL_DETAIL') {
    let copy = Object.assign({}, state)
    copy.modalDetails = payload
    return copy
  }
  if (type === 'CLOSE_MODAL_DETAIL') {
    let copy = Object.assign({}, state)
    copy.modalDetails = payload
    return copy
  }
  if (type === 'OPEN_MODAL_SENDED') {
    let copy = Object.assign({}, state)
    copy.modalSended = payload
    return copy
  }
  if (type === 'CLOSE_MODAL_SENDED') {
    let copy = Object.assign({}, state)
    copy.modalSended = payload
    return copy
  }
  return state
}