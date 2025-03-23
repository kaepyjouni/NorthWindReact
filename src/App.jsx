import { useState } from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'
import Message from './Message'

function App() {
  const [count, setCount] = useState(0)
  const [showLaskuri, setShowLaskuri] = useState(false)
  const [showPosts, setShowPosts] = useState(false)
  // Statet messagen näyttämistä varten
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)

  return (
    <>
      <h1>Hello from react!!</h1>
      {showMessage && <Message message={message} isPositive={isPositive} /> }
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Klikattu {count} kertaa
        </button>
      </div>
      {showLaskuri && <Laskuri />}

        {showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Piilota laskuri</button>}

        {!showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Näytä laskuri</button>}

        <Viesti teksti="Tervehdys app komponentista!" />

        <CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />

        <p>
          asd
        </p>
        {showPosts && <button onClick={() => setShowPosts(!showPosts)}>Piilota Postit</button>}
        {showPosts && <Posts />}
        {!showPosts && <button onClick={() => setShowPosts(!showPosts)}>Näytä Postit</button>}
    </>
  )
}

export default App
