import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import './header.scss'
import imgLogo from '../../assets/logo.png'
import imgSearch from '../../assets/search.png'
import { useAuth } from '../../hooks/use-auth'
//import { useDispatch } from 'react-redux'
import { removeUser, setUser } from '../../store/auth/action'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { pushText } from '../../store/filterName/actions'
import React, { useCallback } from 'react'

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
    name: 'Контакты',
    to: 'contacts'
  }
]



const Header = () => {

  const {isAuth} = useAuth();
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
     if (rememberMe){
       onAuthStateChanged(auth, (user) => {
         if (user) {
 
           dispatch(setUser({
             email: user.email,
             id: user.uid,
             token: user.accessToken,
             name: null
         }));  
         } else {
           console.log('No user is signed in.')
         }
       });
     } else {
       signOut(auth)
       .then(() => {
          dispatch(removeUser());
          localStorage.removeItem('remember')
          navigate('/login');
        }).catch ((error) => {
          console.log(error)
        })
     }
     // eslint-disable-next-line
   }, [])

   /*
   const handleLogOut = (e) => {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        localStorage.removeItem('remember');
        navigate('/login');
    }).catch ((error) => {
      console.log(error)
    })

  }*/
  
  return (
    <>
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