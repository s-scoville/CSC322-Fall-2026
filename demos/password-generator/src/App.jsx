import './App.css'
import { useState } from 'react'

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({
    Uppercase: true,
    Lowercase: true,
    Numbers: true,
    Symbols: false
  })
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const characterSets = {
    Uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    Lowercase: 'abcdefghijklmnopqrstuvwxyz',
    Numbers: '0123456789',
    Symbols: '!@#$%^&*()-_=+?'
  }

  function handleOptionChange(option) {
    setOptions((previous) => ({
      ...previous,
      [option]: !previous[option]
    }))
  }

  function generatePassword() {
    const selectedSets = Object.keys(options)
      .filter((option) => options[option])
      .map((option) => characterSets[option])

    if (selectedSets.length === 0) {
      setPassword('')
      setMessage('Please select at least one character type.')
      setCopied(false)
      return
    }

    const characters = selectedSets.join('')

    function randomIndex(max) {
      const limit = Math.floor(4294967296 / max) * max
      const randomValue = new Uint32Array(1)

      do {
        crypto.getRandomValues(randomValue)
      } while (randomValue[0] >= limit)

      return randomValue[0] % max
    }

    const result = []

    for (const set of selectedSets) {
      result.push(set[randomIndex(set.length)])
    }

    while (result.length < length) {
      result.push(characters[randomIndex(characters.length)])
    }

    for (let i = result.length - 1; i > 0; i--) {
      const j = randomIndex(i + 1)
      ;[result[i], result[j]] = [result[j], result[i]]
    }
    
    setPassword(result.join(''))
    setMessage('')
    setCopied(false)
  }

  async function copyPassword() {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setMessage('Password copied to clipboard.')
    } catch {
      setMessage('Unable to copy password.')
    }
  }

  return (
    <section className="password-card">
      <div className="password-header">
        <h1>Password Generator</h1>
        <span className="tech-badge">React</span>
      </div>

      <p className="description">
        Generate a customizable random password.
      </p>

      <div className="password-output">
        <span id="generatedPassword">{password || 'Your password will appear here.'}</span>
        <button type="button"
                onClick={copyPassword}
                disabled={!password}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <p className="password-message" role="status" aria-live="polite">
        {message}
      </p>

      <div className="password-settings">
        <label htmlFor="passwordLength">Password Length: {length}</label>
        <input 
          id="passwordLength"
          type="range"
          min="8"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />

        <div className="password-options">
          {["Uppercase", "Lowercase", "Numbers", "Symbols"].map(option => (
            <label key={option}>
              <input type="checkbox" checked={options[option]}
                     onChange={() => handleOptionChange(option)} />
              {option}
            </label>
          ))}
        </div>
      </div>

      <button className="generate-button" type="button" onClick={generatePassword}>
        Generate Password
      </button>
    </section>
  )
}

export default App