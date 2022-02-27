import React,{useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import StudentService from './components/StudentService';
import { login, logout,selectUser } from './features/userSlice';
import { auth } from "./firebase";
import MainApp from './components/MainApp';


function App() {
  const user = useSelector(selectUser)
  const dispatch=useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            photo: authUser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      {
        user ? (<StudentService/>) : (<MainApp/>)
      }
    </div>
  );
}

export default App;
