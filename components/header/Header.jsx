import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './header.scss'
import imgLogo from '../../assets/logo.png'
import imgSearch from '../../assets/search.png'
import closed from '../../assets/close-icon.png'
import { removeUser } from '../../store/auth/action'
import { useAuth } from '../../hooks/use-auth'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'

//предлагаю этот массив импортировать в футер, чтобы не дублировать код для навигации
export const links = [
  {
    id: 1,
    name: 'Каталог',
    to: '/'
  },
  {
    id: 2,
    name: 'Акции',
    to: 'stock'
  },
  {
    id: 3,
    name: 'Контакты',
    to: 'contacts'
  }
]

const Header = () => {
  const {isAuth} = useAuth();
  const auth = getAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogOut = (e) => {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate('/login');
        console.log('Пользователь не авторизован');
    }).catch ((error) => {
      console.log(error)
    })

  }
  
  return (
    <>
      <header className="header">
        <div className="header__nav container">
          <NavLink to="/" className="header__nav-logo">
            <img src={imgLogo} alt="logo" height="64"/>
          </NavLink>
          <nav>
            {
              links.map(link => (
                <NavLink
                  to={link.to}
                  key={link.id}
                  style={({ isActive }) => ({
                    color: isActive ? '#547147' : '#333333'
                  })}
                >
                  {link.name}
                </NavLink>
              ))
            }
          </nav>
          <div className="header__nav-right">
            <div className="header__search">
              <img src={imgSearch} alt="img search" className="header__search-img" />
              <input type="search" placeholder="Поиск" className="header__search-input"/>
            </div>
            {isAuth ?
              <div>
                <NavLink to='/account'>
                  <button>Личный кабинет</button>
                </NavLink>
                <button onClick={(e) => handleLogOut(e)}>Выйти</button>
              </div>

              :
              <div className="header__link"> 
                <NavLink to='/login'>
                  <button>Войти</button>
                </NavLink>
                <NavLink to='/signup'>
                  <button>Зарегестрироваться</button>
                </NavLink>
              </div>
            }
          </div>
        </div>
      </header>
    </>
  )
}

export default Header