import { NavLink, Outlet, useNavigate } from "react-router-dom"
import './admin.scss'
import { useDispatch } from "react-redux"
import { signOut, getAuth } from "firebase/auth"
import { removeUser } from "../../store/auth/action"

const Admin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = getAuth();

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
    let links = document.querySelectorAll('.admin-nav')
    let id = event.target.dataset.id
    links.forEach(link => {
      if (link.dataset.id === id) {
        link.className = 'admin-nav active'
      } else {
        link.className = 'admin-nav'
      }
    })
  }

  return (
    <>
      <section className="admin container">
        <h1>Администрирование</h1>
        <nav onClick={(event) => handleClickLink(event)}>
          <NavLink data-id='1' className="admin-nav" to="/admin">Управление заявками</NavLink>
          <NavLink data-id='2' className="admin-nav" to="/admin/comments">Управление отзывами</NavLink>
          <NavLink data-id='3' className="admin-nav" to="/admin/subscriptions">Управление подписками</NavLink>
          <NavLink data-id='4' className="admin-nav" onClick={(e) => handleLogOut(e)}>Выход</NavLink>
        </nav>
        <Outlet />
      </section>
    </>
  )
}

export default Admin