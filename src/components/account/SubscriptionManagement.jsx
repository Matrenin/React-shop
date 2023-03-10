import { writeUserSubscribe, writeSubscribeList, deliteInSubscribeList } from '../../services/firebase'
import { useAuth } from '../../hooks/use-auth'
import { useState } from 'react'

const SubscriptionManagement = () => {
  
  const { id, email } = useAuth()
  const [subscribeStatus, setSubscribeStatus] = useState(false)
  

  const handleSubscribeOn = (e) => {
    e.preventDefault()
    setSubscribeStatus(true)
   
     writeUserSubscribe(id, true) 
     writeSubscribeList(id, email)
  }

  const handleSubscribeOff = (e) => {
    e.preventDefault()
   setSubscribeStatus(false)
  
    writeUserSubscribe(id, false) 
    deliteInSubscribeList(id)  
  }
  
  return (
    <div className="history">
      managment
      {!subscribeStatus ?
        <button onClick={(e) => handleSubscribeOn(e)}>Подписаться</button> :
        <button onClick={(e) => handleSubscribeOff(e)}>Отменить подписку</button>
      }
      
  
    </div>
  )
}

export default SubscriptionManagement