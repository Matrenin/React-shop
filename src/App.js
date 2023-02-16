import { Routes, Route } from 'react-router-dom'
import './App.scss'
import MainPage from './pages/MainPage'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/404Page'
import ContactPage from './pages/ContactPage'
import StocksPage from './pages/StocksPage'

export default function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage/>}>
          <Route index element={<HomePage/>}></Route>
          <Route path="contacts" element={<ContactPage/>}></Route>
          <Route path="stock" element={<StocksPage/>}></Route>
          <Route path='*' element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </>
  )
}