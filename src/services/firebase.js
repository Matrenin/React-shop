import { initializeApp } from "firebase/app";
import { getAuth, updateEmail } from 'firebase/auth'
import { getDatabase, ref, set, onValue, push } from "firebase/database";


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
  return new Promise((resolve, reject) => {
    onValue(ref(db, 'users/' + uid), (data) => {
        const dataUser = data.val();
        resolve(dataUser)
    }, (error) => {
      reject(error)
    }
    )
  })
}

//записать e-mail 
export const writeUserEmail = (user) => {
  const uid = user.uid;
  set(ref(db, 'users/' + uid + '/email'), {
    email: user.email,
  });
}

//изменить e-mail 
export const editUserEmail = (id, email, onError, setLoading) => {
  
  updateEmail(firebaseAuth.currentUser, email).then(() => {
    console.log('Email updated!')
    set(ref(db, 'users/' + id + '/email'), {
      email: email,
    });
  }).catch((error) => {
    switch (error.code) {
      case "auth/requires-recent-login":
        onError("Для изменения e-mail необходимо обновить данные об авторизации");
        break;
      default:
        onError(error.message);
        break;
    }
  })
  .finally(()=> {
    setLoading(false)
  }
  )
}

//записать имя
export const writeUserName = (user) => {
  const uid = user.uid;
  set(ref(db, 'users/' + uid + '/name'), {
    name: user.displayName,
  });
}

//изменить имя
export const editUserName = (id, name) => {
  set(ref(db, 'users/' + id + '/name'), {
    name: name,
  });
}

//изменить телефон
export const editUserPhone = (id, phone) => {
  set(ref(db, 'users/' + id + '/phone'), {
    phone: phone,
  });
}

// ОТЗЫВЫ

//отправить отзыв
export const editUserComment = (id, name, rating, comment, card, date ) => {
  const newCommentKey = push(ref(db, 'users/' + id + '/comments/')).key;
  set(ref(db, 'users/' + id + '/comments/' + newCommentKey), {
    name: name,
    rating: rating, 
    comment: comment, 
    card: card,
    date: date
  });
  set(ref(db, 'commentsList/' + newCommentKey), {
    name: name,
    rating: rating, 
    comment: comment, 
    card: card,
    date: new Date().toLocaleDateString('en-US')
  });
}

//удалить отзыв из личного кабинета
export const editUserCommentAccount = (id, idComment) => {
  set(ref(db, 'users/' + id + '/comments/' + idComment), {
    name: null
  });
  set(ref(db, 'commentsList/' + idComment), {
    name: null
  });
}

//удалить отзыв для Админа
export const editUserCommentAdmin = (idComment) => {
  set(ref(db, 'commentsList/' +  idComment), {
    name: null
  });
}

// получить весь список отзывов
export const getCommitsList = () => {
  return new Promise((resolve, reject) => {
    onValue(ref(db, 'commentsList/'), (data) => {
        const dataList = data.val();
        resolve(dataList)
    }, (error) => {
      reject(error)
    })
  }, {
    onlyOnce: true
  })
}

// получить список отзывов пользователя (для личного кабинета)
/*
В файле, где нужно получить список вставлять следущим образом:
 getCommitsUserList(id) 
 .then((data) => {
  const dataList = data
  console.log(dataList)
  //...
})
.catch((error) => {
  console.error(error)
}) 
*/
export const getCommitsUserList = (id) => {
  return new Promise((resolve, reject) => {
    onValue(ref(db, 'users/' + id + '/comments'), (data) => {
        const dataList = data.val();
        resolve(dataList)
    }, (error) => {
      reject(error)
    })
  }, {
    onlyOnce: true
  })
}

// ПОДПИСКИ

//записать статус подписки
export const writeUserSubscribe = (id, subscribe) =>   {
  
  set(ref(db, 'users/' + id + '/subscribe'), {
    subscribe: subscribe
  });
}

//добавить пользователя в список подписавшихся
export const writeSubscribeList = (id, email, name) => {
  set(ref(db, 'subscribeList/' + id ), {
    email: email,
    name: name
  });
}

//удалить пользователя из списка подписавшихся
export const deliteInSubscribeList = (id) => {
  set(ref(db, 'subscribeList/' + id ), {
    email: null
  });
}

// получить весь список подписавшихся (для Админа)
/*

Если нужно получать информацию более одного раза, то убрать {onlyOnce: true}. 
Тогда объект будет обнаовляться каждый раз, когда добавляется commit в  db.

В файле, где нужно получить список вставлять следущим образом:
getSubscribeList()
    .then((data) => {
      const dataList = data
      console.log(dataList)
      //...
    })
    .catch((error) => {
      console.error(error)
    })
*/
export const getSubscribeList = () => {
  return new Promise((resolve, reject) => {
    onValue(ref(db, 'subscribeList/'), (data) => {
        const dataList = data.val();
        resolve(dataList)
    }, (error) => {
      reject(error)
    }, {onlyOnce: true})
  })
}

// ЗАЯВКИ

//отправить заявку от авторизованного пользователя
export const writeUserApplication = (id, idApplication, card, date, name, phone, email) => {
  set(ref(db, 'users/' + id + '/applications/'+ idApplication), {
    card: card,
    date: date
  });
  set(ref(db, 'applicationList/'+idApplication), {
    userId: id,
    name: name,
    phone: phone,
    card: card,
    email: email,
    date: new Date().toLocaleDateString('en-US')
  });
}

//отправить заявку без авторизации
export const writeApplicationList = (idApplication, name, phone, card, email) => {
  set(ref(db, 'applicationList/'+idApplication), {
    name: name,
    phone: phone,
    card: card,
    email: email,
    date: new Date().toLocaleDateString('en-US')
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
  set(ref(db, 'applicationList/'+idApplication + '/status'), {
    status: status
  });
}

//указать статус для заявки для Админа
export const writeApplicationStatusAdmin = (idApplication, statusAdmin) => {
  set(ref(db, 'applicationList/'+idApplication + '/statusAdmin'), {
    statusAdmin: statusAdmin
  });
}

// получить весь список заявок (для Админа)
/*

В файле, где нужно получить список вставлять следущим образом:
getApplicationList()
    .then((data) => {
      const dataList = data
      console.log(dataList)
      //...
    })
    .catch((error) => {
      console.error(error)
    })
*/
export const getApplicationList = () => {
  return new Promise((resolve, reject) => {
    onValue(ref(db, 'applicationList/'), (data) => {
        const dataList = data.val();
        resolve(dataList)
    }, (error) => {
      reject(error)
    }, {onlyOnce: true})
  })
}


