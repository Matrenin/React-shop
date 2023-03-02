import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Catalog.scss'
import { Modal } from '../modal/modal';
import { Application } from '../application/application';
import { useSelector } from 'react-redux'
import Details from '../details/Details';
import axios from 'axios'
import { FilterCost } from '../filterCost/filterCost';

const Catalog = () => {

  const [cards, setCards] = useState([])
  const [cardModal, setCardModal] = useState('')
  const [filtredCards, setFiltredCards] = useState(cards)

  const modalShow = useSelector(store => store.modal.modalShow)
  const modalDetail = useSelector(store => store.modal.modalDetails)

  useEffect(() => {
    fetchCards()
  }, []
  )

  async function fetchCards() {
    const cards = await axios.get('https://kaori318.github.io/site/cards.json')
    setCards(cards.data)
    setFiltredCards(cards.data)
  }

  let filterName = useSelector((state) => {
    return filtredCards.filter((e) =>
      e.name.match(RegExp(`${state.text}`, 'i'))
    )
  })

  function getCardId(cardId) {
    const id = cardId;
    let index = cards.findIndex(el => el.id === id);
    setCardModal(cards[index])
  }

  const watchChange = (valueMin, valueMax) => {
    let filtredCards = cards.slice();
    setFiltredCards(filtredCards.filter((el) => valueMin <= parseInt(el.price.match(/\d+/)) && parseInt(el.price.match(/\d+/)) <= valueMax))
  }

  return (
    <div className="catalogImpressions">
      <h1 className="title">
        Каталог впечатлений
      </h1>
      <FilterCost watchChange={watchChange} />
      <div className="catalogCard">
        {filterName.map(card => <Card card={card} cardId={getCardId} key={card.id} />)}
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

export default Catalog;