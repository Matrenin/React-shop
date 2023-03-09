import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { setUser } from "../store/auth/action";

import FormLogin from "../components/formLogin"



const SignUpPage = () => {
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleRegister = (e, email, password) => {
   e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          
            const user = userCredential.user 

            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken,
                name: null
            }));
        })
        .catch(console.error)
}

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
   /* 
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);*/
      });
}

    return (
      <>
      <section className="container">
        <h1>SignUpPage</h1>
        <FormLogin 
          title='Зарегестрироваться' 
          handleClick={handleRegister}/>
        <div>
            <button onClick={handleSubmitGoogle} >Войти с помощью Google</button>
        </div>
        <div>
            <p>Уже есть учётная запись?</p>
            <NavLink to='/login'>Войти</NavLink>
        </div>
        </section>
      </>
    )
  }
  
  export default SignUpPage