import React, { useState, useEffect } from 'react';
import Card from './Card';
import style from './Catalog.module.scss'
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
    if (state !== "") {
      return filtredCards.filter((e) =>
        e.name.match(RegExp(`${state.text}`, 'i'))
      )
    }

  })

  function getCardId(cardId) {
    const id = cardId;
    let index = cards.findIndex(el => el.id === id);
    setCardModal(cards[index])
  }

  const watchChange = (valueMin, valueMax, val) => {
    let filtredCards = cards.slice();
    if (val === "1") {
      setFiltredCards(filtredCards.sort((a, b) => parseInt(a.price.match(/\d+/)) - parseInt(b.price.match(/\d+/))))
    } else if (val === "2") {
      setFiltredCards(filtredCards.sort((a, b) => parseInt(b.price.match(/\d+/)) - parseInt(a.price.match(/\d+/))))
    } else {
      setFiltredCards(filtredCards)
    }
    if (valueMin !== "" | valueMax !== "") {
      setFiltredCards(filtredCards.filter((el) => valueMin <= parseInt(el.price.match(/\d+/)) && parseInt(el.price.match(/\d+/)) <= valueMax))
    }
    // else {
    //   setFiltredCards(filtredCards)
    // }

  }



  return (
    <div className={style.catalogImpressions}>
      <h1 className={style.title}>
        Каталог впечатлений
      </h1>
      <FilterCost watchChange={watchChange} />
      <div className={style.catalogCard}>
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