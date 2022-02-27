import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyB9ibHQJoJiJJ4G9Ef4dbXTw2joD34b00M",
    authDomain: "studentservice-6371d.firebaseapp.com",
    projectId: "studentservice-6371d",
    storageBucket: "studentservice-6371d.appspot.com",
    messagingSenderId: "287305846227",
    appId: "1:287305846227:web:a24c119eb83c05b9553326",
    measurementId: "G-8DM53G26QJ"
  };


  const firebaseApp=firebase.initializeApp(firebaseConfig)
  const auth=firebase.auth()
  const provider=new firebase.auth.GoogleAuthProvider()
  const db=firebaseApp.firestore()

  export {auth,provider}
  export default db