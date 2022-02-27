import React from 'react'
import '../css/Home.css'
import Carousel from 'react-elastic-carousel'

function Home() {
  return (
    <div className='homeimages'>
      <Carousel>
        <img src='/images/CBIT MAIN BLOCK.jpg' alt='one'></img>
        <img src='/images/studentservice3.jpg' alt='two'></img>
        <img src='/images/student.jpg' alt='three'></img>
        <img src='/images/studentservice.jpg' alt='four'></img>
      </Carousel>
    </div>
  )
}

export default Home
