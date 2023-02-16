import style from './details.module.css'
import horseWalk from '../../assets/slider/horseWalk.png'
import { Modal } from '../modal/modal'
import { Application } from '../application/application'
import { useState } from 'react'


export const arrDetails = [
    {
        id: 1,
        title: 'Конная прогулка',
        price: 'от 990 ₽',
        img: horseWalk
    }
]

const Details = () => {

    const [modalActive, setModalActive] = useState(false)

    return (
        <>
            {
                arrDetails.map(item => (
                    <form className={style.details}>
                        <div className={style.details__head}>
                            <h2 className={style.details__head__title} >{item.title}</h2>
                            <h1 className={style.details__price} >{item.price}</h1>
                        </div>
                        <button className={style.details__btn} onClick={() => setModalActive(true)}>Заказать впечатление</button>
                        <img src={item.img} alt="img" />
                        <p> Тут будет добавлена подробная информация </p>
                    </form>
                ))
            }
            <Modal active={modalActive} setActive={setModalActive}>
                <Application />
            </Modal>
        </>
    )
}

export default Details