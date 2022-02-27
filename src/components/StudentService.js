import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import QuoraBox from './QuoraBox'
import "../css/StudentService.css"
import Posts from './Posts'
import db from '../firebase'

function useTimes(){

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db
        .collection("questions")
        .orderBy('timestamp',"desc")
        .onSnapshot((snapshot)=>{
            const newque=snapshot.docs.map((doc)=>({
                id:doc.id,
                questions:doc.data()
            }))
            setPosts(newque)
        })
      }, [])

    return posts
}


const StudentService =()=> {

    const posts=useTimes()

    return (
        <div className="StudentService">
            <Nav/>
            <div className="feedbox">
                <QuoraBox/>
                {posts.map(({ id, questions }) => (
                <Posts
                key={id}
                Id={id}
                question={questions.question}
                imageUrl={questions.imageUrl}
                timestamp={questions.timestamp}
                email={questions.user.email}
                userName={questions.user.displayName}
                userImg={questions.user.photo}
                   />
                 ))}
            </div>
        </div>
    )
}

export default StudentService
