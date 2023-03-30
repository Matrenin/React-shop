import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './account.scss'
import { getAuth, signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../store/auth/action'
import QuestionModalWindow from '../questionModal/QuestionModalWindow'
import CancelModalWindow from '../cancelModal/CancelModalWindow'
import { useAuth } from '../../hooks/use-auth'
import burgerPng from '../../assets/Burger.png'
import { useEffect, useState } from 'react'

const Account = () => {
  const auth = getAuth();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const modalQuestion = useSelector(store => store.modal.modalQuestion.show)
  const modalDelete = useSelector(store => store.modal.modalDelete)
  const { isAdmin } = useAuth()
  const [menu, setMenu] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const [button, setButton] = useState("Данные пользователя")

  if (isAdmin) {
    navigate('/admin')
  }

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

  const handleClickLink = event => {
    let id = event.target.dataset.id
    let links = document.querySelectorAll('.account__sideBar-wrapper-link')
    links.forEach(link => {
      if (link.dataset.id === id) {
        link.className = 'account__sideBar-wrapper-link active'
      } else {
        link.className = 'account__sideBar-wrapper-link'
      }
    })
  }

  useEffect(() => {
    const handleResize = (event) => {
      if (event.target.innerWidth < 690) {
        setMenu(true)
      } else {
        setMenu(false)
      }
    }
    window.addEventListener('resize', handleResize);
  }, [width]);

  return (
    <div className="account container">
      <h1>Личный кабинет</h1>
      <div className="account__box">
        <div className="account__sideBar" onClick={(event) => handleClickLink(event)}>
          {menu ? <div className="account__sideBar-wrapper">
            <NavLink
              className="account__sideBar-wrapper-link active"
              data-id="1"
              to="/account"
            >
              {button}
            </NavLink>
          </div> :
            <div className="account__sideBar-wrapper">
              <NavLink
                className="account__sideBar-wrapper-link active"
                data-id="1"
                to="/account"
                onClick={() => {
                  setButton("Данные пользователя");
                  setMenu(!menu)
                }
                }
              >
                Данные пользователя
              </NavLink>
              <NavLink
                className="account__sideBar-wrapper-link"
                data-id="2"
                to="completed"
                onClick={() => {
                  setButton("Оформленные заявки");
                  setMenu(!menu)
                }
                }
              >
                Оформленные заявки
              </NavLink>
              <NavLink
                className="account__sideBar-wrapper-link"
                data-id="3"
                to="managment"
                onClick={() => {
                  setButton("Управление подпиской");
                  setMenu(!menu)
                }
                }
              >
                Управление подпиской
              </NavLink>
              <NavLink
                className="account__sideBar-wrapper-link"
                data-id="4"
                to="comment"
                onClick={() => {
                  setButton("Оставить отзыв");
                  setMenu(!menu)
                }
                }
              >
                Оставить отзыв
              </NavLink>
              <button
                className="account__sideBar-btn-exit"
                onClick={(e) => handleLogOut(e)}
              >
                Выйти
              </button>
            </div>}
          <div className="shellMenu" onClick={() => setMenu(!menu)}>
            <img src={burgerPng} alt="close img" />
          </div>
        </div>
        <Outlet />
      </div>
      {modalQuestion && <QuestionModalWindow />}
      {modalDelete && <CancelModalWindow />}
    </div>
  )
}

export default Account