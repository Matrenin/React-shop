import { Routes, Route } from 'react-router-dom'
import './App.scss'
import MainPage from './pages/MainPage'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/404Page'
import ContactPage from './pages/ContactPage'
import StocksPage from './pages/StocksPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import AccountPage from './pages/AccountPage'
import PublicRoute from './utils/PublicRoute'
import PrivateRoute from './utils/PrivateRoute'

import './services/firebase'

export default function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage/>}>
          <Route index element={<HomePage/>}></Route>
          <Route path="contacts" element={<ContactPage/>}></Route>
          <Route path="stock" element={<StocksPage/>}></Route>
          <Route path="login" element={<PublicRoute component={<LoginPage/>}/>}></Route>
          <Route path="account" element={<PrivateRoute component={<AccountPage/>}/>}></Route>
          <Route path="signup" element={<PublicRoute component={<SignUpPage/>}/>}></Route>
          <Route path='*' element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </>
  )
}