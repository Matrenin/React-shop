import './contact.scss'
import { Application } from '../application/application'


const ContactContent = () => {
    return (
        <section className='center container'>
            <div className='contact'>
                <div className='contact__text'>
                    <h1 className='contact__text__tall'>Контакты</h1>
                    <p>Телефон:</p>
                    <p className='contact__text__tall'>+7 (999) 123-45-67</p>
                    <p>Время работы магазина:</p>
                    <p>пн-пт с 09:00 до 19:00</p>
                    <p>e-mail:</p>
                    <a className='contact__text__a' href="mailto:info@dari.ru">info@dari.ru</a>
                    <p>e-mail для корпоративных клиентов:</p>
                    <a className='contact__text__a' href="mailto:sales@dari.ru">sales@dari.ru</a>
                                                                                           
                </div> 
                <div>
                <div className='form'>
                    <Application />
                </div>              
            </div>  
            </div>                
        </section>
    )
  }
  
  export default ContactContent