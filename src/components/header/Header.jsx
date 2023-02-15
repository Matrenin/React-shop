import { NavLink } from 'react-router-dom'
import './header.scss'
import imgLogo from '../../assets/logo.png'
import imgBasket from '../../assets/basket.png'


const links = [
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
                    textDecoration: isActive ? 'underline' : 'none'
                  })}
                >
                  {link.name}
                </NavLink>
              ))
            }
          </nav>
          <NavLink to="basket" className="header__nav-basket">
            <img src={imgBasket} alt="basket" height="50"/>
          </NavLink>
        </div>
      </header>
    </>
  )
}

export default Header