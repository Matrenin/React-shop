import imgLogo from '../../assets/logo.png'
import adaptiveSearchImg from '../../assets/adaptiveSearch.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth'
import menuImg from '../../assets/circleMenu.png'
import { useState } from 'react'
import closeImg from '../../assets/closeWhite.png'
import personalAreaMenu from '../../assets/personalAreaMenu.png'
import insta from '../../assets/footer/insta.png'
import vk from '../../assets/footer/vk.png'

const AdaptiveHeader = () => {
  const { isAuth } = useAuth()
  const [search, setSearch] = useState(false)
  const [menu, setMenu] = useState(false)

  const handleOpenSearch = () => {
    setSearch(true)
  }

  const handleCloseSearch = () => {
    setSearch(false)
  }

  const handleOpenMenu = () => {
    setMenu(true)
  }

  const handleCloseMenu = () => {
    setMenu(false)
  }

  return (
    <>
      {/* блок поиска */}
      <div className={search ? "adaptiveHeader__search-show" : "adaptiveHeader__search"}>
        <input type="search" placeholder="Поиск"/>
        <button onClick={handleCloseSearch}>
          <img src={closeImg} alt="close img" />
        </button>
      </div>

      {/* основной блок header */}
      <div className="adaptiveHeader">
        <Link to="/">
          <img src={imgLogo} alt="img logo" height="40"/>
        </Link>
        <div className="adaptiveHeader__box">
          <button onClick={handleOpenSearch}>
            <img src={adaptiveSearchImg} alt="search img" />
          </button>
          { isAuth 
            ? <Link className="adaptiveHeader__auth" to='/account'></Link>
            : <Link className="adaptiveHeader__auth" to='/login'></Link>
          }
          <button onClick={handleOpenMenu}>
            <img src={menuImg} alt="menu img" />
          </button>
        </div>
      </div>

      {/* блок выпадающего меню */}
      <div className={ menu ? "adaptiveHeader__menu-show" : "adaptiveHeader__menu"}>
        <div className="adaptiveHeader__menu-show-top" onClick={handleCloseMenu}>
          <button className="adaptiveHeader__menu-show-close">
            <img src={closeImg} alt="close img" />
          </button>
          <div className="adaptiveHeader__menu-show-nav" onClick={handleCloseMenu}>
            <Link className="adaptiveHeader__menu-show-link" to="/">На главную</Link>
            <Link className="adaptiveHeader__menu-show-link" to="catalog">Каталог</Link>
            <Link className="adaptiveHeader__menu-show-link" to="stock">Акции</Link>
            <Link className="adaptiveHeader__menu-show-link" to="howto">Как это работает</Link>
            <Link className="adaptiveHeader__menu-show-link" to="contacts">Контакты</Link>
            { isAuth 
              ? <Link className="adaptiveHeader__menu-show-linkLK" to='/account'>
                  <img src={personalAreaMenu} alt="presonal area menu" />
                  <span>Личный кабинет</span>
                </Link>
              : <Link className="adaptiveHeader__menu-show-linkLK" to='/login'>
                  <img src={personalAreaMenu} alt="presonal area menu" />
                  <span>Личный кабинет</span>
                </Link>
            }
          </div>
          <div className="adaptiveHeader__menu-show-question">
              <h3>Остались вопросы?</h3>
              <p>Оставьте заявку, мы свяжемся с Вами в ближайшее время</p>
              <button>Оставить заявку</button>
            </div>
        </div>
        <div className="adaptiveHeader__menu-show-bot">
          <div className="adaptiveHeader__menu-show-contact">
            <div className="adaptiveHeader__menu-show-social">
              <a href="https://instagram.com/daridushoy/">
                <img src={vk} alt="vk" />
              </a>
              <a href="https://vk.com/daridushoy/">
                <img src={insta} alt="insta" />
              </a>
            </div>
            <h2>+7 (999) 123-45-67</h2>
          </div>
          <img className="adaptiveHeader__menu-show-logo" src={imgLogo} alt="img logo"/>
        </div>
      </div>
    </>
  )
}

export default AdaptiveHeader