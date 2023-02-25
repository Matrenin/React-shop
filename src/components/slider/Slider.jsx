import './slider.scss'
import horseWalk from '../../assets/slider/horseWalk.png'
import fly from '../../assets/slider/fly.png'
import yacht from '../../assets/slider/yacht.png'
import dome from '../../assets/slider/dome.png'
import { Modal } from '../modal/modal'
import { Application } from '../application/application'
import { useSelector, useDispatch } from 'react-redux'
import { openModal } from '../../store/modal/actions'
import { useState, useEffect } from 'react'


 export const sliders = [
  {
    id: 1,
    title: 'Конная прогулка',
    price: 'от 990 ₽',
    img: horseWalk
  },
  {
    id: 2,
    title: 'Полет на мотопараплане',
    price: '3000 ₽',
    img: fly
  },
  {
    id: 3,
    title: 'Прогулка на яхте «Чайка»',
    price: 'от 3500 ₽',
    img: yacht
  },
  {
    id: 4,
    title: 'Вечер в куполе',
    price: 'от 3000 ₽',
    img: dome
  }
]

const Slider = () => {
  const [index, setIndex] = useState(0)
  const modalShow = useSelector(store => store.modal.modalShow)

  const dispatch = useDispatch()

  useEffect(() => {
    let btns = document.querySelectorAll('.slider__box-btns-btn')
    btns.forEach(btn => {
      if (+btn.value === index) {
        btn.className = 'slider__box-btns-btn slider__btn-active'
      } else {
        btn.className = 'slider__box-btns-btn'
      }
    })
    setTimeout(() => {
      if (index + 1 < sliders.length) {
        setIndex(prev => prev + 1)
      } else {
        setIndex(0)
      }
    }, 3000)
  }, [index])

  const handleOpenModal = () => {
    dispatch(openModal(true))
  }

  return (
    <>
      <div className="slider container">
        <div className="slider__box">
          <img className='slider__img' src={sliders[index].img} alt="img slider" />
          <div className="slider__box-info">
            <p>{sliders[index].price}</p>
            <h1>{sliders[index].title}</h1>
            <button onClick={handleOpenModal}>Заказать впечатление</button>
          </div>
          <div className="slider__box-btns">
            {
              sliders.map((btn, i) => (
                <button
                  className="slider__box-btns-btn"
                  value={i}
                  key={btn.id}
                ></button>
              ))
            }
          </div>
        </div>
      </div>
      {
        modalShow &&
        <Modal>
          <Application/>
        </Modal>
      }
    </>
  )
}

export default Slider