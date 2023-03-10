import React, { useState, useEffect } from 'react';
import Card from './Card';
import style from './Catalog.module.scss'
import { Modal } from '../modal/modal';
import { Application } from '../application/application';
import { useSelector } from 'react-redux'
import Details from '../details/Details';
import axios from 'axios'
import { FilterCost } from '../filterCost/filterCost';
import Pagination from '../pagination/Pagination';

const Catalog = () => {

  const [cards, setCards] = useState([])
  const [cardModal, setCardModal] = useState('')
  const [filtredCards, setFiltredCards] = useState(cards)
  const [currentPage, setCurrentPage] = useState(1)
  const [countriesPerPage] = useState(12)

  const modalShow = useSelector(store => store.modal.modalShow)
  const modalDetail = useSelector(store => store.modal.modalDetails)

  useEffect(() => {
    fetchCards()
  }, [])

  async function fetchCards() {
    const cards = await axios.get('https://kaori318.github.io/site/cards.json')
    // const cards = await axios.get('https://kaori318.github.io/site/test.json')
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

// Пагинация отображение элементов на странице
  const lastCountryIndex = currentPage * countriesPerPage
  const firstCountryIndex = lastCountryIndex - countriesPerPage
  const currentCountry = filterName.slice(firstCountryIndex, lastCountryIndex)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className={style.catalogImpressions}>
      <h1 className={style.title}>
        Каталог впечатлений
      </h1>
      <FilterCost watchChange={watchChange} />
      <div className={style.catalogCard}>
        {currentCountry.map(card => <Card card={card} cardId={getCardId} key={card.id} />)}
      </div>
      <Pagination
        countriesPerPage={countriesPerPage}
        totalCoutries={cards.length}
        paginate={paginate}
        currentPage={currentPage}
      />
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