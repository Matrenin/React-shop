import './stocksslider.scss'
import airtube from '../../assets/stocks/airtube.png'
import rectangle from '../../assets/stocks/rectangle.png'
import { Modal } from '../modal/modal'
import { Application } from '../application/application'
import { useSelector, useDispatch } from 'react-redux'
import { openModal } from '../../store/modal/actions'
import { useState, useEffect } from 'react'


export const stocksslider = [
  {
    id: 1,
    title: 'Полет в аэротрубе для двоих!',
    sell: '4 000 ₽',
    price: '3 200 ₽',
    img: airtube
  },
  {
    id: 2,
    title: 'Игра в VR три часа по цене двух!',
    sell: '1 800 ₽',
    price: '1 200 ₽',
    img: rectangle
  }
]

const Stocksslider = () => {
  const [index, setIndex] = useState(0)
  const modalShow = useSelector(store => store.modal.modalShow)
  const dispatch = useDispatch()

  useEffect(() => {
    let btns = document.querySelectorAll('.stocksSlider__box-btns-btn')
    btns.forEach(btn => {
      if (+btn.value === index) {
        btn.className = 'stocksSlider__box-btns-btn stocksSlider__btn-active'
      } else {
        btn.className = 'stocksSlider__box-btns-btn'
      }
    })
    setTimeout(() => {
      if (index + 1 < stocksslider.length) {
        setIndex(prev => prev + 1)
      } else {
        setIndex(0)
      }
    }, 3000)
  }, [index])

  const handleShowModal = () => {
    dispatch(openModal(true))
  }

  return (
    <>
      <div className="stocks container">
        <section className="stocksSlider">
          <div className="stocksSlider__info">
            <p className="stocksSlider__info_action">АКЦИЯ МЕСЯЦА</p>
            <h2>{stocksslider[index].title}</h2>
            <p className="stocksSlider__info_price"> <span>{stocksslider[index].sell}</span>{stocksslider[index].price}</p>
            <button className="stocksSlider__info_btn" onClick={handleShowModal}>Заказать впечатление</button>
          </div>
          <div className="stocksSlider__imgBlock">
            <img className="stocksSlider__imgBlock_img" src={stocksslider[index].img} alt="img slider" />
          </div>
          <div className="stocksSlider__box-btns">
            {
              stocksslider.map((btn, i) => (
                <button
                  className="stocksSlider__box-btns-btn"
                  value={i}
                  key={btn.id}
                ></button>
              ))
            }
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

export default Stocksslider