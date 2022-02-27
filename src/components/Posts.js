import React, { useEffect, useState } from 'react'
import '../css/Post.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { Avatar } from '@material-ui/core'
import Modal from 'react-modal'
import db from '../firebase'
import { selectQuestionId, setQuestionInfo } from '../features/questionSlice'
import firebase from 'firebase'

function Posts({
  Id,
  question,
  imageUrl,
  timestamp,
  email,
  userName,
  userImg,
}) {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const [IsmodalOpen, setIsModalOpen] = useState(false)
  const questionId = useSelector(selectQuestionId)
  const [answer, setAnswer] = useState('')
  const [getAnswers, setGetAnswers] = useState([])

  useEffect(() => {
    if (questionId) {
      db.collection('questions')
        .doc(questionId)
        .collection('answer')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setGetAnswers(
            snapshot.docs.map((doc) => ({ id: doc.id, answers: doc.data() }))
          )
        )
    }
  }, [questionId])

  const handleAnswer = (e) => {
    e.preventDefault()

    if (questionId) {
      db.collection('questions').doc(questionId).collection('answer').add({
        user: user,
        answer: answer,
        questionId: questionId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
    }
    console.log(questionId)
    setAnswer('')
    setIsModalOpen(false)
  }
  return (
    <div
      className='post'
      onClick={() =>
        dispatch(
          setQuestionInfo({
            questionId: Id,
            questionName: question,
          })
        )
      }
    >
      <div className='post__info'>
        <Avatar src={userImg} />
        <h4>{userName}</h4>
        <small>{new Date(timestamp?.toDate()).toLocaleDateString()}</small>
      </div>
      <div className='post__body'>
        <div className='post__question'>
          <p>{question}</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className='post__btnAnswer'
          >
            answer
          </button>
          <Modal
            isOpen={IsmodalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            shouldCloseOnOverlayClick={false}
            style={{
              overlay: {
                width: 680,
                height: 550,
                backgroundColor: 'rgba(0,0,0,0.8)',
                zIndex: '1000',
                top: '50%',
                left: '50%',
                marginTop: '-250px',
                marginLeft: '-350px',
              },
            }}
          >
            <div className='modal__question'>
              <h1>{question}</h1>
              <p>
                asked by <span className='name'>{userName}</span> {''}
                on{' '}
                <span className='name'>
                  {new Date(timestamp?.toDate()).toLocaleString()}
                </span>
              </p>
            </div>
            <div className='modal__answer'>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder='Enter Your Answer'
                type='text'
              />
            </div>
            <div className='modal__button'>
              <button className='cancle' onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type='sumbit' onClick={handleAnswer} className='add'>
                Add Answer
              </button>
            </div>
          </Modal>
        </div>
        <div className='post__answer'>
          {getAnswers.map(({ id, answers }) => (
            <p key={id} style={{ position: 'relative', paddingBottom: '5px' }}>
              {Id === answers.questionId ? (
                <span>
                  {answers.answer}
                  <br />
                  <span
                    style={{
                      position: 'absolute',
                      color: 'gray',
                      fontSize: 'small',
                      display: 'flex',
                      right: '0px',
                    }}
                  >
                    <span style={{ color: 'blue' }}>
                      {answers.user.displayName
                        ? answers.user.displayName
                        : answers.user.email}{' '}
                      on{' '}
                      {new Date(answers.timestamp?.toDate()).toLocaleString()}
                    </span>
                  </span>
                </span>
              ) : (
                ''
              )}
            </p>
          ))}
        </div>
        <img src={imageUrl} alt='' />
      </div>
    </div>
  )
}

export default Posts
