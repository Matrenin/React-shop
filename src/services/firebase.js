import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, set, get, child, update, onValue, onChildChanged } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBU_ZciAuk-2ZjDISns1IIpGcJJBvw3Rgg",
  authDomain: "react-shop-f4b14.firebaseapp.com",
  projectId: "react-shop-f4b14",
  storageBucket: "react-shop-f4b14.appspot.com",
  messagingSenderId: "628260170468",
  appId: "1:628260170468:web:d64193b07f15d26c5c5af1",
  databaseURL: "https://react-shop-f4b14-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);

export const db = getDatabase(app);


// получить всю информацию о пользователе
export const getUserValue = (user) => {
  const uid = user.uid;
  onValue(ref(db, 'users/' + uid), (data) => {
    const dataUser = data.val();
    console.log(dataUser)
});
}

//записать e-mail 
export const writeUserEmail = (user) => {
  const uid = user.uid;
  set(ref(db, 'users/' + uid + '/email'), {
    email: user.email,
  });
}

//записать имя
export const writeUserName = (user) => {
  const uid = user.uid;
  set(ref(db, 'users/' + uid + '/name'), {
    name: user.displayName,
  });
}

//записать статус подписки
export const writeUserSubscribe = (id, subscribe) =>   {
  
  set(ref(db, 'users/' + id + '/subscribe'), {
    subscribe: subscribe
  });
}

// получить информацию о статусе подписки пользователе
export const getUserValueSubscribe = (id) => {
  return new Promise((resolve, reject) => {
    get(ref(db, 'users/' + id + '/subscribe')).then((data) => {
      if (data.exists()) {
        resolve(data.val().subscribe);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  })
}

//добавить пользователя в список подписавшихся
export const writeSubscribeList = (id, email) => {
  set(ref(db, 'subscribeList/' + id ), {
    email: email
  });
}

//удалить пользователя из списка подписавшихся
export const deliteInSubscribeList = (id) => {
  set(ref(db, 'subscribeList/' + id ), {
    email: null
  });
}

//отправить заявку от авторизованного пользователя
export const writeUserApplication = (id, idApplication, name, phone, commit, card, date) => {
  set(ref(db, 'users/' + id + '/applications/'+ idApplication), {
    name: name,
    phone: phone,
    commit: commit,
    card: card,
    date: date
  });
}

//удалить заявку от авторизованного пользователя
export const deliteUserApplication = (id, idApplication) => {
  set(ref(db, 'users/' + id + '/applications/'+ idApplication ), {
    application: null
  });
}

//указать статус для заявки от авторизованного пользователя
export const writeUserApplicationStatus = (id, idApplication, status) => {
  set(ref(db, 'users/' + id + '/applications/'+ idApplication + '/status'), {
    status: status
  });
}

//отправить заявку без авторизации
export const writeApplicationWithoutLogin = (idApplication, name, phone, commit, card) => {
  set(ref(db, 'applicationsWithoutLogin/'+idApplication), {
    name: name,
    phone: phone,
    commit: commit,
    idCard: card
  });
}