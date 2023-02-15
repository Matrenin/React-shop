import './stocks.scss'
import airtube from '../../assets/stocks/airtube.png'
import certificates from '../../assets/stocks/certificates.png'

const Stocks = () => {
  
  return (
    <>
          <section className="stockSlider">
              <div className="stockSlider__info">
                  <p className="stockSlider__info_action">АКЦИЯ МЕСЯЦА</p>
                  <h2>ПОЛЁТ В АЭРОТРУБЕ ДЛЯ ДВОИХ!</h2>
                  <p className="stockSlider__info_price"> <span>4 000 ₽</span>3 200 ₽</p>
                  <button className="stockSlider__info_btn">Заказать впечатление</button>
              </div>
              <div className="stockSlider__imgBlock">
                  <img className="stockSlider__imgBlock_img" src={airtube} alt="airtube_img" />
              </div>
          </section>
          <section className="sertificates">
              <div className="sertificates__img">
                  <img src={certificates} alt="certificates_img" />
              </div>
              <div className="sertificates__info">
                  <h3>СЕРТИФИКАТ В ДИЗАЙНЕРСКОМ КОНВEРТЕ</h3>
                  <ul>
                    <li>Электронный сертификат - бесплатный</li>
                    <li>Сертификат в подарочном конверте - 200р</li>
                    <li>Срок действия сертификата - 3 месяца</li>
                    <li>Бесплатная доставка в день заказа</li>
                    <li>Есть возможность заменить впечатление
                          по сертификату, если подарок не понравится</li>
                  </ul>
              </div>
          </section>
          

      
    </>
  )
}

export default Stocks