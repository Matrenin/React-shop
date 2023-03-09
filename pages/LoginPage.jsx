import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import FormLogin from "../components/formLogin"

import { setUser } from "../store/auth/action";
import { useAuth } from "../hooks/use-auth";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth();
    
    const handleLogin = (e, email, password) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

              const user = userCredential.user

                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                    name: null
                }));

            })
            .catch(() => console.log('Invalid user!'))
    }

  /*  const {currentUser} = useAuth();

    const rememberUser = () => {
 
  console.log(currentUser)
  localStorage.setItem('currentUser', JSON.stringify(currentUser))
}*/
   
 
    const handleSubmitGoogle = (e) => {
        e.preventDefault()    
     
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
        
              const user = result.user;
    
              dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken,
                name: user.displayName
                }));
                navigate('/account');
              })
          .catch((error) => {
        
         /*   const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);*/
          });
    }

    return (
      <>
      <section className="container">
        <h1>LoginPage</h1>
        <FormLogin handleClick={handleLogin} title='Войти'/>
        <div>
            <button onClick={handleSubmitGoogle}>Войти с помощью Google</button>
        </div>
        <div>
            <p>Нет учётной записи?</p>
            <NavLink to='/signup'>Зарегестрироваться</NavLink>
        </div>
        </section>
      </>
    )
  }
  
  export default LoginPage