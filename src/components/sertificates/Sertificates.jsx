import './sertificates.scss'
import certificates from '../../assets/stocks/certificates.png'

const Sertificates = () => {
  return (
    <>
      <section className="sertificates">
       <h3>СЕРТИФИКАТ В ДИЗАЙНЕРСКОМ КОНВEРТЕ</h3>
        <div className="sertificates__img">
          <img src={certificates} alt="certificates_img" />
        </div>
        <div className="sertificates__info">
          <ul>
            <li>Электронный сертификат - бесплатный</li>
            <li>Сертификат в подарочном конверте - 200р</li>
            <li>Срок действия сертификата - 12 месяцев с момента покупки</li>
            <li>Бесплатная доставка в день заказа</li>
            <li>Есть возможность заменить впечатление
              по сертификату, если подарок не понравится</li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Sertificates