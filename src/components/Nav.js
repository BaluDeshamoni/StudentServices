import React,{useState} from 'react'
import HomeIcon from "@material-ui/icons/Home";
import { Avatar , Button , Input} from "@material-ui/core";
import db, {auth} from "../firebase"
import "../css/Nav.css";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import Modal from "react-modal"
import {  Link } from "@material-ui/icons";
import firebase from "firebase"

function Nav() {
  const user=useSelector(selectUser)
  const [IsmodalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [inputUrl, setInputUrl] = useState("");

  const handleQuestion=(e)=>{
    e.preventDefault()

    setIsModalOpen(false)

    db.collection('questions').add({
      question:input,
      imageUrl:inputUrl,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      user:user
    })

    setInput("")
    setInputUrl("")

  }

    return (
    <div className="qHeader">
      <div className="qHeader__logo">
      <div className="qHeader__next">
        <img
          src="/images/logo.png"
          alt="logo"
        />
      </div>
      <div className="qHeader__main">
      <p>STUDENT SERVICE</p>
        </div>
        
      </div>
      <div className="qHeader__icons">
        <div className="active qHeader__icon">
          <HomeIcon />
          <p>HOME</p>
        </div>
        </div>
      <div className="qHeader__Rem">
        <div className="qHeader__avatar">
          <Avatar  src={user.photo} />
        </div>
        <Button onClick={()=> auth.signOut()} > LOGOUT</Button>
        <Button onClick={()=>setIsModalOpen(true)}>Add Question</Button>
      </div>
      <Modal
      isOpen={IsmodalOpen}
      onRequestClose={()=>setIsModalOpen(false)}
      shouldCloseOnOverlayClick={false}
      style={{
            overlay: {
              width: 700,
              height: 600,
              backgroundColor: "rgba(0,0,0,0.8)",
              zIndex: "1000",
              top: "50%",
              left: "50%",
              marginTop: "-300px",
              marginLeft: "-350px",
            },
          }}
        >
           <div className="modal__title">
            <h5>Add Question</h5>
            <h5>Share Link</h5>
          </div>
          <div className="modal__info">
            <Avatar src={user.photo}/>
            <p>{user.email}</p>
          </div>
          <div className="modal__Field">
            <Input 
             required
             value={input}
             onChange={(e)=>setInput(e.target.value)}
             type="text"
             placeholder="Start your question with 'What', 'How', 'Why', etc. "/>
            <div className="modal__fieldLink">
              <Link />
              <input 
              value={inputUrl}
              onChange={(e)=>setInputUrl(e.target.value)}
              type="text" 
              placeholder="Optional: inclue a link that gives context"></input>
            </div>
          </div>
          <div className="modal__buttons">
            <button className="cancle" onClick={()=>setIsModalOpen(false)}>Cancel</button>
            <button onClick={handleQuestion} className="add" type="sumbit" >Add Question</button>
          </div>
        </Modal>
    </div>
    )
}

export default Nav
