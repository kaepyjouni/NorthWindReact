import './App.css'
import React, {useState, useEffect} from 'react'

const Posts = () => {

// Komponentin tilan määritys
const [posts, setPosts] = useState([])

useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/posts")
  .then(res => res.json()) //muutetaan json data javascriptiksi
  .then(oliot => setPosts(oliot))
},[]
)

  return (
    <>
        <h2>Posts from typicode</h2>

        {
          posts && posts.map(p =>

            <div className='posts' key={p.id}>
            <h2>{p.id}</h2>
            <h4>Title:</h4>{p.title}
            <h4>Body:</h4>
            <p>{p.body}</p>
            
            </div>
            )
        }

    </>
  )
}

export default Posts