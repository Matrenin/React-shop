import './stocks.scss'
import airtube from '../../assets/stocks/airtube.png'
import rectangle from '../../assets/stocks/rectangle.png'
import { Modal } from '../modal/modal'
import { Application } from '../application/application'
import { useSelector, useDispatch } from 'react-redux'
import { openModal } from '../../store/modal/actions'

const Stocks = () => {
  const modalShow = useSelector(store => store.modal.modalShow)
  const dispatch = useDispatch()

  const handleShowModal = () => {
    dispatch(openModal(true))
  }

  return (
    <>
      <div className="stocks">
        <h1>Акции месяца</h1>
        <section className="stockSlider">
          <div className="stockSlider__info">
            <p className="stockSlider__info_action">АКЦИЯ МЕСЯЦА</p>
            <h2>Полет в аэротрубе для двоих!</h2>
            <p className="stockSlider__info_price"> <span>4 000 ₽</span>3 200 ₽</p>
            <button className="stockSlider__info_btn" onClick={handleShowModal}>Заказать впечатление</button>
          </div>
          <div className="stockSlider__imgBlock">
            <img className="stockSlider__imgBlock_img" src={airtube} alt="airtube_img" />
          </div>
        </section>
        <section className="stockSlider">
          <div className="stockSlider__info">
            <p className="stockSlider__info_action">АКЦИЯ МЕСЯЦА</p>
            <h2>Игра в VR три часа по цене двух!</h2>
            <p className="stockSlider__info_price"> <span>1 800 ₽</span>1 200 ₽</p>
            <button className="stockSlider__info_btn" onClick={handleShowModal}>Заказать впечатление</button>
          </div>
          <div className="stockSlider__imgBlock">
            <img className="stockSlider__imgBlock_img" src={rectangle} alt="airtube_img" />
          </div>
        </section>
      </div>
      {
        modalShow &&
        <Modal>
          <Application />
        </Modal>
      }
    </>
  )
}

export default Stocks