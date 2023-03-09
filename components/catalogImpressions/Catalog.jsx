import React, {useState, useEffect} from 'react';
import Card from './Card';
import './Catalog.scss'
import { Modal } from '../modal/modal';
import { Application } from '../application/application';
import { useSelector } from 'react-redux'
import Details from '../details/Details';
import axios from 'axios'


const Catalog = () => {

  const [cards, setCards] = useState([])
  const [cardModal, setCardModal] = useState('')
  
  const modalShow = useSelector(store => store.modal.modalShow)
  const modalDetail = useSelector(store => store.modal.modalDetails)
  const [info, setInfo] = useState(false)

  useEffect (() => {
    fetchCards()
  }, []
  )
  
  async function fetchCards() {
    const cards = await axios.get('https://kaori318.github.io/site/cards.json')
    setCards(cards.data)
  }
  
  function getCardId(cardId) {
  const id = cardId;
    let index = cards.findIndex(el => el.id === id);
    setCardModal(cards[index])
  }
  
 return (
  <div className="catalogImpressions">
    <h1 className="title">
      Каталог впечатлений
    </h1>
    <div className="catalogCard">
      {cards.map(card => <Card card={card} cardId={getCardId} key={card.id}/>)}
    </div>
    {
      modalShow &&
      <Modal>
        <Application/>
      </Modal>
    }
    {
      modalDetail &&
      <Modal>
        <Details card={cardModal}/>
      </Modal>
    }
  </div>
 );
};

export default Catalog;
