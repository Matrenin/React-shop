export const openModal = data => ({
  type: 'OPEN_MODAL',
  payload: data
})

export const closeModal = data => ({
  type: 'CLOSE_MODAL',
  payload: data
})

export const openModalDetail = data => ({
  type: 'OPEN_MODAL_DETAIL',
  payload: data
})

export const closeModalDetail = data => ({
  type: 'CLOSE_MODAL_DETAIL',
  payload: data
})

export const openModalSended = data => ({
  type: 'OPEN_MODAL_SENDED',
  payload: data
})

export const closeModalSended = data => ({
  type: 'CLOSE_MODAL_SENDED',
  payload: data
})

export const toggleQuestionModal = data => ({
  type: 'TOGGLE_QUESTION_MODAL',
  payload: data
})

export const toggleDeleteModal = data => ({
  type: 'TOGGLE_DELETE_MODAL',
  payload: data
})
export const toggleRatioModal = data => ({
  type: 'TOGGLE_RATIO_MODAL',
  payload: data
})