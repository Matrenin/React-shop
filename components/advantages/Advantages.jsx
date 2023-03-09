import './advantages.scss'
import lowPrice from '../../assets/advantages/lowPrice.png'
import delivery from '../../assets/advantages/delivery.png'
import certificates from '../../assets/advantages/certificates.png'
import partners from '../../assets/advantages/partners.png'

export const arrAdvantages = [
  {
    id: 1,
    text: 'Впечатления по цене партнера',
    img: lowPrice
  },
  {
    id: 2,
    text: 'Бесплатная доставка в день заказа',
    img: delivery
  },
  {
    id: 3,
    text: 'Красивые сертификаты на любое впечатление',
    img: certificates
  },
  {
    id: 4,
    text: 'Проверенные партнёры',
    img: partners
  }
]

const Advantages = () => {
  return (
    <>
      <div className="advantages container">
        {
          arrAdvantages.map(item => (
            <div className="advantages__item" key={item.id}>
              <img src={item.img} alt="advantages img" height="80"/>
              <p>{item.text}</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Advantages