import style from './details.module.scss'
import React, { useState } from 'react'
//import horseWalk from '../../assets/slider/horseWalk.png'
import { Modal } from '../modal/modal'
import { Application } from '../application/application'
import { useSelector, useDispatch } from 'react-redux'
import { openModal, closeModalDetail } from '../../store/modal/actions'
import { selectCard } from '../../store/card/actions'

const Details = ({ card }) => {

    const [wordData, setWordData] = useState(card.imgs[0])
    const [prices, setPrices] = useState(card.prices)
    const [selectedMesurement, setSelectedMesurement] = useState(prices[0].price);

    //const [desc1, setDesc1] =useState(Object.values(card.desc)[0]) Если надо чтоб менялось описание  "desc":{"900":"Описание1", "1000": "Описание2"}

    // useEffect(() => {      поменять описание при смене цены
    //     const index = prices.findIndex(el => el.price === selectedMesurement)
    //     setDesc1(Object.values(card.desc)[index])
    // },[selectedMesurement])

    const modalShow = useSelector(store => store.modal.modalShow)
    const dispatch = useDispatch()

    const handleOpenModal = (event) => {
        event.preventDefault()
        dispatch(selectCard(card))
        dispatch(openModal(true))
        dispatch(closeModalDetail(false))
    };

    
    const handleClick = (index) => {
        const wordSlider = card.imgs[index];
        setWordData(wordSlider)
    }

    return (
    <>
       
        <div className={style.details} key={card.id}>
        <h2 className={style.details__body_title} >
            {card.name.toUpperCase()}
         </h2>
            <div className={style.details__images}>
                <img className={style.details__images_img} src={wordData.value} alt="img" />
                <div className={style.flex_row}>
                    {card.imgs.map((data, i) =>
                        <img key={i}
                        className={style.details__images_img_mini}
                        src={data.value} alt="img"
                        onClick={() => handleClick(i)}/>
                    )}
                </div>
            </div>
       
            <div className={style.details__body}>
                <div className={style.details__body_info}>
                    <h1 className={style.details__price} >
                    {selectedMesurement} ₽
                    </h1>
                    {prices.length>1
                        ?<div className={style.dropdownList}>
                            <select className={style.dropdownListItem}
                                value={selectedMesurement}
                                onChange={e =>setSelectedMesurement(e.target.value)}
                            >
                                {prices.map(p => <option key={p.id} value={p.price}>{p.mesurement}</option>)}
                            </select>
                        </div>
                        : <p style={{visibility: 'hidden'}}></p>
                    }   
                </div>
                <button className={style.details__btn} onClick={(event) => handleOpenModal(event)}>
                    Заказать впечатление
                </button>
                <div className={style.details__description}>
                    <h3>Подробнее о впечатлении: </h3>
                    <div className={style.details__text}>
                        {card.desc.map((desc, index) => <p key={index}>{desc}</p>)}
                    </div>
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