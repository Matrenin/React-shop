import './howto.scss'
import email from '../../assets/howto/email.png'
import certificates from '../../assets/howto/certificates.png'


const HowtoContent = () => {
  return (
    <section className='howto'>
      <h1>Как это работает?</h1>
      <h2>1. Выбираете подарочный сертификат</h2>
      <p>Оформляете заявку с указанием Ваших контактных данных и пожеланиями.</p>
      <h2>2. Мы связываемся с Вами</h2>
      <p>Наш менеджер связывается с Вами для подтверждения заказа и согласования способа доставки.</p>
      <div className='howto__Box'>
        <div className='howto__BoxIner'>
          <div className='howto__BoxInerTitle'>
            <img src={email} alt="email" />
            <span>On-line сертификат с&nbsp;доставкой на электронную почту</span>
          </div>
          <h2>3. Мы направляем на Ваш e-mail запрос с ссылкой на оплату</h2>
          <h2>4. После подтверждения платежа мы направим on-line сертификат на Вашу электронную почту</h2>
        </div>
        <div className='howto__BoxIner'>
          <div className='howto__BoxInerTitle'>
            <img src={certificates} alt="certificates" />
            <span>Cертификат в&nbsp;дизайнерском конверте с доставкой на дом</span>
          </div>
          <h2>3. Мы привезем сертификат на дом в удобное время</h2>
          <h2>4. Оплатить сертификат при получении можно как в наличном, так и в безналичном&nbsp;виде</h2>
        </div>
      </div>
      <div>
        <h2>5. Получаетель подарка активирует сертификат</h2>
        <p>Cертификат действителен в течение 12 месяцев с момента продажи.<br />
          Получатель сам выбирает дату и время проведения, позвонив по телефону +7 (999) 123-45-67.</p>
        <h2>6. Делимся своими незабываемыми впечатлениями</h2>
        <p>В личном кабинете можно поделиться своими эмоциями.</p>
      </div>
    </section >
  )
}


export default HowtoContent