import './App.css'

function App() {
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
        <span id="generatedPassword">Your password will appear here.</span>
        <button type="button" disabled>Copy</button>
      </div>

      <div className="password-settings">
        <label htmlFor="passwordLength">Password Length</label>
        <input 
          id="passwordLength"
          type="range"
          min="8"
          max="32"
          defaultValue="16"
        />

        <div className="password-options">
          {["Uppercase", "Lowercase", "Numbers", "Symbols"].map(option => (
            <label key={option}>
              <input type="checkbox" defaultChecked={option !== "Symbols"} />
              {option}
            </label>
          ))}
        </div>
      </div>

      <button className="generate-button" type="button">
        Generate Password
      </button>
    </section>
  )
}

export default App