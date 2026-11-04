import { useState } from 'react'
import './App.css'

function App() {
  const [joke, setJoke] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchJoke = async () => {
    setLoading(true)
    setError('')
    setJoke(null)
    try {
      const res = await fetch('https://official-joke-api.appspot.com/random_joke')
      if (!res.ok) throw new Error('fail')
      const data = await res.json()
      setJoke(data)
    } catch {
      setError('Could not fetch a joke. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Random Joke</h1>
        <p className="subtitle">Click the button to fetch a fresh one.</p>
        <button onClick={fetchJoke} disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch joke'}
        </button>
        <div className="result">
          {error ? (
            <>
              <p className="error-text">Could not fetch a joke. Try again.</p>
              <button className="try-again" onClick={fetchJoke}>
                Try again
              </button>
            </>
          ) : joke ? (
            <>
              <p>{joke.setup}</p>
              <p>{joke.punchline}</p>
            </>
          ) : (
            <p>No joke yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App