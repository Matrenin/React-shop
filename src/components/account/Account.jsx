import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './account.scss'
import { getAuth, signOut } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { removeUser } from '../../store/auth/action'

const Account = () => {
  const auth = getAuth();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut = event => {
    event.preventDefault()

    signOut(auth)
      .then(() => {
        dispatch(removeUser())
        localStorage.removeItem('remember')
        navigate('/login')
      }).catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="account container">
      <h1>Личный кабинет</h1>
      <div className="account__box">
        <div className="account__sideBar">
          <div className="account__sideBar-wrapper">
            <NavLink
              className="account__sideBar-wrapper-link-active"
              to="/account"
            >
              Данные пользователя
            </NavLink>
            <NavLink
              className="account__sideBar-wrapper-link-active"
              to="history"
            >
              История заявок
            </NavLink>
            <NavLink
              className="account__sideBar-wrapper-link-active"
              to="completed"
            >
              Оформленные заявки
            </NavLink>
            <button
            className="account__sideBar-btn-exit"
            onClick={(e) => handleLogOut(e)}
            >
              Выйти
            </button>
          </div>
        </div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Account