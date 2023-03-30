import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import React, { useEffect, useCallback } from 'react'
import './header.scss'
import './adaptiveHeader.scss'
import imgLogo from '../../assets/logo.png'
import imgSearch from '../../assets/search.png'

import { useAuth } from '../../hooks/use-auth'
import { removeUser, setUser } from '../../store/auth/action'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { pushText } from '../../store/filterName/actions'
import { getUserValue } from '../../services/firebase'
import AdaptiveHeader from './AdaptiveHeader'

export const links = [
  {
    id: 1,
    name: 'Каталог',
    to: 'catalog'
  },
  {
    id: 2,
    name: 'Акции',
    to: 'stock'
  },
  {
    id: 3,
    name: 'Как\u00A0это\u00A0работает',
    to: 'howto'
  },
  {
    id: 4,
    name: 'Контакты',
    to: 'contacts'
  }
]



const Header = () => {

  const { isAuth, name } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const enterFilter = useCallback((e) => {
    if (e.target.value !== "") {
      navigate("/catalog")
      dispatch(pushText(e.target.value))
    } else {
      dispatch(pushText(e.target.value))
    }
  }, [dispatch])

  useEffect(() => {
    const rememberMe = localStorage.getItem('remember');
    const auth = getAuth();
    if (rememberMe) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          getUserValue(user)
            .then((data) => {
              const dataUser = data
              dispatch(setUser({
                email: dataUser.email.email,
                id: user.uid,
                token: user.accessToken,
                name: dataUser.name?.name || null,
                phone: dataUser.phone?.phone || null,
                applications: dataUser?.applications || {},
                subscribe: dataUser.subscribe?.subscribe || null,
                comments: dataUser.comments?.comments || {},

              }));
            })
            .catch((error) => {
              console.error(error)
            })
        } else {
          console.log('No user is signed in.')
        }
      });
    } else {
      signOut(auth)
        .then(() => {
          dispatch(removeUser());
          localStorage.removeItem('remember')
          navigate('/');
        }).catch((error) => {
          console.log(error)
        })
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <AdaptiveHeader/>
      <header className="header">
        <div className="header__nav container">
          <NavLink to="/" className="header__nav-logo">
            <img src={imgLogo} alt="logo" height="64" />
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
            <div className="header__search" >
              <img src={imgSearch} alt="img search" className="header__search-img" />

              <input
                type="search"
                onChange={enterFilter}
                onFocus={enterFilter}
                placeholder="Поиск"
                className="header__search-input"
              />
            </div>
            {isAuth ?
              <div className="header__auth">
                <NavLink to='/account'></NavLink>
                <p className='userName'>{name}</p>
              </div>
              :
              <div className="header__auth">
                <NavLink to='/login'></NavLink>
              </div>
            }
          </div>
        </div>
      </header>
    </>
  )
}

export default Header