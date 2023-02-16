import React, {useState} from 'react';
import { Modal } from '../modal/modal';
import Card from './Card';
import './CatalogImpressions.scss'
import { Application } from '../application/application';
import Details from '../details/Details';

const CatalogImpressions = () => {
  const [modalActive1, setModalActive1] = useState(false)
  const [modalActive2, setModalActive2] = useState(false)
  const [cards, setCards] = useState([
    {
      "id": 1,
      "name": "Конная прогулка",
      "img": "../../img/1.jpg",
      "price": "от 990"
     },
     {
      "id": 2,
      "name": "Полет на мотопараплане",
      "img": "../../img/2.jpg",
      "price": "3000"
     },
     {
      "id": 3,
      "name": "Полет в аэротрубе",
      "img": "../../img/3.jpg",
      "price": "от 1800"
     },
     {
      "id": 4,
      "name": "Вечер в куполе",
      "img": "../../img/4.jpg",
      "price": "3000"
     },
     {
      "id": 5,
      "name": "Прогулка на яхте «Чайка»",
      "img": "../../img/5.jpg",
      "price": "от 3500"
     },
     {
      "id": 6,
      "name": "Велопрогулка с пикником",
      "img": "../../img/6.jpg",
      "price": "3000"
     },
     {
      "id": 7,
      "name": "Драйв на квадроциклах",
      "img": "../../img/7.jpg",
      "price": "от 1800"
     },
     {
      "id": 8,
      "name": "Запись песни в студии",
      "img": "../../img/8.jpg",
      "price": "5000"
     },
     {
      "id": 9,
      "name": "Поездка на болотоходах",
      "img": "../../img/9.jpg",
      "price": "3500"
     },
     {
      "id": 10,
      "name": "Игра в виртуальной реальности",
      "img": "../../img/10.jpg",
      "price": "600"
     },
     {
      "id": 11,
      "name": "Романтический пикник",
      "img": "../../img/11.jpg",
      "price": "2500"
     }
  ])
  
 return (
  <div className="catalogImpressions">
    <h1 className="title">
      Каталог впечатлений
    </h1>
    <div className="catalogCard">
      {cards.map(card => <Card modal1={setModalActive1} modal2={setModalActive2} card={card} key={card.id}/>)}
    </div>
    <Modal active={modalActive1} setActive={setModalActive1}>
        <Application />
    </Modal>
    <Modal active={modalActive2} setActive={setModalActive2}>
    <Details details={cards}/>
    </Modal>
  </div>
 );
};

export default CatalogImpressions;