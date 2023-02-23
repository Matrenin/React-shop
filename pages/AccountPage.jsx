import { useAuth } from "../hooks/use-auth"

const AccountPage = () => {

    const {email, name} = useAuth();

    return (
      <>
        <p>Привет, пользователь!</p>
        <p>Ваш e-mail: {email}</p>
        {
            name ?
            (<p>{name}</p>) :
            (<p>Нет данных об имени</p>)
        }
      </>
    )
  }

  export default AccountPage