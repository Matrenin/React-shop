import style from './details.module.scss'
import React, { useState } from 'react'
//import horseWalk from '../../assets/slider/horseWalk.png'
import { Modal } from '../modal/modal'
import { Application } from '../application/application'
import { useSelector, useDispatch } from 'react-redux'
import { openModal, closeModalDetail } from '../../store/modal/actions'

const Details = ({ card }) => {

    const modalShow = useSelector(store => store.modal.modalShow)
    const dispatch = useDispatch()
    const handleOpenModal = (event) => {
        event.preventDefault()
        dispatch(openModal(true))
        dispatch(closeModalDetail(false))
    };

    const [desc, setDesc] = useState(card.desc)
    // const imgs = [
    //     { id: 0, value: "https://wallpaperaccess.com/full/2637581.jpg" },
    //     { id: 1, value: "https://source.unsplash.com/user/c_v_r/1900x800" },
    //     { id: 2, value: "https://source.unsplash.com/user/c_v_r/100x100" },
    // ]
    const [wordData, setWordData] = useState(card.imgs[0])
    const handleClick = (index) => {
        const wordSlider = card.imgs[index];
        setWordData(wordSlider)
    }

    const prices = [{
        id: 0,
        price: '390 Р',
        mesurement: '1 час'
    },
    {
        id: 1,
        price: '760 P',
        mesurement: '2 часа'
    },
    {
        id: 3,
        price: '1100 P',
        mesurement: '3 часа'
    }
    ]
    const [selectedMesurement, setSelectedMesurement] = useState(prices[0].price);



    return (

        <>
            <div className={style.details} key={card.id}>
                <div className={style.details__images}>
                    <img className={style.details__images_img} src={wordData.value} alt="img" />
                    <div className={style.flex_row}>
                        {card.imgs.map((data, i) =>
                            <img key={i} className={style.details__images_img_mini} src={data.value} alt="img" onClick={() => handleClick(i)} />
                        )}
                    </div>
                </div>

                <div className={style.details__body}>
                    <h2 className={style.details__body_title} >{card.name.toUpperCase()}</h2>
                    <div className={style.details__selectionPrice}>
                        <h1 className={style.details__price} >{card.price} ₽</h1>
                        {/* <button className={style.details__selection}>Менять описание</button> */}
                    </div>
                    <div>
                        <h1>{selectedMesurement}</h1>
                        <select value={selectedMesurement} onChange={e => setSelectedMesurement(e.target.value)}>
                            {prices.map((p) => <option value={p.price}>{p.mesurement}</option>)}
                        </select>
                    </div>
                    <button className={style.details__btn} onClick={(event) => handleOpenModal(event)}>Заказать впечатление</button>
                    <div className={style.details__description}>
                        <h3>Подробнее о впечатлении: </h3>
                        {desc.map((desc, index) => <p key={index}>{desc}</p>)}
                    </div>
                </div>
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

export default Details