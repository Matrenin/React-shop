import './stocks.scss'
import airtube from '../../assets/stocks/airtube.png'

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
    </>
  )
}

export default Stocks