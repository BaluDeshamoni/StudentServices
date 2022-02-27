import React, { useState } from 'react'
import '../css/login.css'
import { auth } from '../firebase'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [img, setImg] = useState('')
  const registerSignIn = (e) => {
    e.preventDefault()
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          console.log(auth)
        }
      })
      .catch((e) => alert(e.message))

    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        authUser.updateProfile({
          displayName: username,
          photoURL: img,
        })
        console.log(authUser)
      }
    })
    setUsername('')
    setEmail('')
    setPassword('')
    setImg('')
  }

  return (
    <div className='loginbox'>
      <div className='login'>
        <div className='logo'>
          <img src='../images/logo.png' alt='cbitlogo'></img>
        </div>
        <div className='credentials'>
          <h1>SIGNUP</h1>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            placeholder='USERNAME'
          ></input>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            placeholder='EMAIL'
          ></input>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='passwoed'
            placeholder='PASSWORD'
          ></input>
          <input
            value={img}
            onChange={(e) => setImg(e.target.value)}
            type='text'
            placeholder='AVATAR'
          ></input>
          <button onClick={registerSignIn} type='submit'>
            SIGNUP
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
