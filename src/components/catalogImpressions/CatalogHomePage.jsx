import React, { useState, useEffect } from 'react';
import CardHomePage from './CardHomePage';
import style from './CatalogHomePage.module.scss'
import { Modal } from '../modal/modal';
import { Application } from '../application/application';
import { useSelector } from 'react-redux'
import Details from '../details/Details';
import axios from 'axios'

const CatalogHomePage = () => {

  const [cards, setCards] = useState([])
  const [cardModal, setCardModal] = useState('')
  const [cardsHomePage, setCardsHomePage] = useState([])
  const modalShow = useSelector(store => store.modal.modalShow)
  const modalDetail = useSelector(store => store.modal.modalDetails)

  useEffect(() => {
    fetchCards()
  }, []
  )

  async function fetchCards() {
    const cards = await axios.get('https://kaori318.github.io/site/cards.json')
    // const cards = await axios.get('https://kaori318.github.io/site/test.json')
    setCards(cards.data)
    setCardsHomePage(cards.data.slice(0, 6))
  }

  function getCardId(cardId) {
    const id = cardId;
    let index = cards.findIndex(el => el.id === id);
    setCardModal(cards[index])
  }

  return (
    <div className={style.catalogImpressions}>
      <h1 className={style.title}>
        Каталог впечатлений
      </h1>
      <div className={style.catalogCard}>
        {cardsHomePage.map(card => <CardHomePage card={card} cardId={getCardId} key={card.id} />)}
      </div>
      {
        modalShow &&
        <Modal>
          <Application />
        </Modal>
      }
      {
        modalDetail &&
        <Modal>
          <Details card={cardModal} />
        </Modal>
      }
    </div>
  );
};

export default CatalogHomePage;