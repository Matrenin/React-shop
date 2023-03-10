import { createStore, compose, combineReducers } from 'redux'
import { applicationsReducer } from './applications/reducer'
import { modalReducer } from './modal/reducer'
import { userReducer } from './auth/reducer'
import { filterNameReducer } from './filterName/reducer'
import { cardReducer } from './card/reducer'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  applications: applicationsReducer,
  modal: modalReducer,
  user: userReducer,
  text: filterNameReducer,
  card: cardReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composeEnhancers())

export const persistor = persistStore(store)