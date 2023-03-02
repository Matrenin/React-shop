import { createStore, compose, combineReducers } from 'redux'
import { applicationsReducer } from './applications/reducer'
import { modalReducer } from './modal/reducer'
import { userReducer } from './auth/reducer'
import { filterNameReducer } from './filterName/reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  applications: applicationsReducer,
  modal: modalReducer,
  user: userReducer,
  text: filterNameReducer
})

export const store = createStore(rootReducer, composeEnhancers())