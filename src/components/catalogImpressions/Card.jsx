import React from 'react';
import './CatalogImpressions.scss'
// import {CardButton} from './UI/button/CardButton';
import { Modal } from '../modal/modal'
import { useState } from 'react'
import Details from '../details/Details';

const Card = ({ card, modal1, modal2 }) => {

  const [modalActive, setModalActive] = useState(false)

  return (
    <div className="card">
      <div className="card__img" onClick={() => modal2(true)}>
        <img
          src={card.img}
          alt={card.title} />
      </div>
      <div className="card__block">
        <div className="card__title" onClick={() => modal2(true)}>{card.name}</div>
        <div className="card__body">
          <h1 className='price'>{card.price}</h1>
          <button className="cardBtn" onClick={() => modal1(true)}>Заказать</button>
          <p onClick={() => modal2(true)}>Подробнее</p>
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <Details />
      </Modal>


    </div>
  );
};

export default Card;