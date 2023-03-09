import './sended.scss'
import goodSend from '../../assets/goodSend.png'
import imgLogo from '../../assets/logo.png'
import closeModal from '../../assets/close.png'
import { useDispatch } from 'react-redux'
import { closeModalSended } from '../../store/modal/actions'

const Sended = () => {
  const dispatch = useDispatch()

  const handleCloseModal = () => {
    dispatch(closeModalSended(false))
  }

  return (
    <div className="sended">
      <img src={goodSend} alt="good send" />
      <div className="sended__text">
        <p className="sended__text-normal">Ваша заявка</p>
        <p className="sended__text-bold">успешно отправлена</p>
      </div>
      <p className="sended__info">Мы свяжемся с Вами в ближайшее время</p>
      <img src={imgLogo} alt="img logo" height="58" className="sended__logo" />
      <button onClick={handleCloseModal}>
        <img src={closeModal} alt="close" />
      </button>
    </div>
  )
}

export default Sended