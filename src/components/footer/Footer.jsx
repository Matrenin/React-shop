import './footer.scss'
import insta from '../../assets/footer/insta.png'
import vk from '../../assets/footer/vk.png'
import flogo from '../../assets/footer/flogo.png'
import { Modal } from '../modal/modal'
import { useSelector, useDispatch } from 'react-redux'
import { Application } from '../application/application'
import { openModal } from '../../store/modal/actions'
import { NavLink } from 'react-router-dom'


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
    name: 'Как\u00A0это\u00A0работает',
    to: 'howto'
  },
  {
    id: 4,
    name: 'Контакты',
    to: 'contacts'
  }
]

const Footer = () => {
  const modalShow = useSelector(store => store.modal.modalShow)
  const dispatch = useDispatch()

  const handleShowModal = () => {
    dispatch(openModal(true))
  }

  return (
    <>
      <footer className="footer">
        <div className="footer__box container">
          <div className="footer__row">
            <div className="footer__column logo">
              <img className="footer__logo" src={flogo} alt="flogo" />
              <p className="footer__column-allright">Все права защищены<br />
                © Дари Душой, 2023 г.
              </p>
            </div>

            <div className="footer__column menu">
              <h2>Меню</h2>
              <div className="footer__column-nav">
                {links.map(link => (
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
                }</div>
            </div>

            <div className="footer__column number">
              <h1>+7 (999) 123-45-67</h1>
              <div className="footer__column-link">
                <a href="https://instagram.com/daridushoy/"><img src={vk} alt="vk" /></a>
                <a href="https://vk.com/daridushoy/"><img src={insta} alt="insta" /></a>
              </div>
            </div>

            <div className="footer__column question">
              <h1>Остались вопросы?</h1>
              <p className="footer__column-text">Оставьте заявку, мы свяжемся с Вами <br /> в ближайшее время</p>
              <button onClick={handleShowModal}>Оставить заявку</button>
            </div>

          </div>
        </div>
      </footer>
      {
        modalShow &&
        <Modal>
          <Application />
        </Modal>
      }
    </>)
}

export default Footer