import React, { useState } from 'react'
import '../css/login.css'
import { auth } from '../firebase'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [view, setView] = useState(true)

  const handleSignIn = (e) => {
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth)
      })
      .catch((e) => alert(e.message))
    setEmail('')
    setPassword('')
  }
  return (
    <div className='loginbox'>
      <div className='login'>
        <div className='logo'>
          <img
            src='https://www.cbit.ac.in/wp-content/themes/CBIT/images/logo.png'
            alt='cbitlogo'
          ></img>
        </div>
        <div className='credentials'>
          <h1>login</h1>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            placeholder='EMAIL'
          ></input>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={view ? 'type' : 'password'}
            placeholder='PASSWORD'
          ></input>
          <div className='eyeicon'>
            {view ? (
              <VisibilityOffIcon onClick={() => setView(!view)} />
            ) : (
              <VisibilityIcon onClick={() => setView(!view)} />
            )}
          </div>
          <button onClick={handleSignIn} type='submit'>
            login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
