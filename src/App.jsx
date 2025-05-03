import { useState, useEffect, useCallback } from 'react'
import styles from './App.module.css'
import Screensaver from './components/Screensaver'

function App() {
  const [display, setDisplay] = useState('0')
  const [equation, setEquation] = useState('')
  const [memory, setMemory] = useState(null)
  const [history, setHistory] = useState([])
  const [lastResult, setLastResult] = useState(null)
  const [scientificMode, setScientificMode] = useState(false)

  const handleNumber = (number) => {
    if (display === '0' || lastResult !== null) {
      setDisplay(number)
      setLastResult(null)
    } else if (display.length < 12) {
      setDisplay(display + number)
    }
  }

  const handleOperator = (operator) => {
    if (lastResult !== null) {
      setEquation(lastResult + ' ' + operator + ' ')
      setDisplay('0')
      setLastResult(null)
    } else {
      setEquation(display + ' ' + operator + ' ')
      setDisplay('0')
    }
  }

  const handleScientificFunction = (func) => {
    const value = parseFloat(display)
    let result

    switch (func) {
      case 'sin':
        result = Math.sin(value * Math.PI / 180)
        break
      case 'cos':
        result = Math.cos(value * Math.PI / 180)
        break
      case 'tan':
        result = Math.tan(value * Math.PI / 180)
        break
      case 'asin':
        result = Math.asin(value) * 180 / Math.PI
        break
      case 'acos':
        result = Math.acos(value) * 180 / Math.PI
        break
      case 'atan':
        result = Math.atan(value) * 180 / Math.PI
        break
      case 'log':
        result = Math.log10(value)
        break
      case 'ln':
        result = Math.log(value)
        break
      case 'sqrt':
        result = Math.sqrt(value)
        break
      case 'pow':
        setEquation(display + ' ^ ')
        setDisplay('0')
        return
      case 'pi':
        result = Math.PI
        break
      case 'e':
        result = Math.E
        break
      case 'fact':
        result = factorial(value)
        break
      default:
        return
    }

    setHistory(prev => [...prev, `${func}(${value}) = ${result}`].slice(-5))
    setDisplay(result.toString())
  }

  const factorial = (n) => {
    if (n < 0) return NaN
    if (n === 0 || n === 1) return 1
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }

  const handleEquals = () => {
    try {
      const fullEquation = equation + display
      // Replace × with * and ^ with ** for evaluation
      const evaluableEquation = fullEquation
        .replace(/×/g, '*')
        .replace(/\^/g, '**')
      
      const result = eval(evaluableEquation)
      
      // Format the result
      const formattedResult = Number.isInteger(result) 
        ? result.toString()
        : parseFloat(result.toFixed(8)).toString()
      
      setHistory(prev => [...prev, `${fullEquation} = ${formattedResult}`].slice(-5))
      setLastResult(formattedResult)
      setDisplay(formattedResult)
      setEquation('')
    } catch (error) {
      setDisplay('Error')
      setTimeout(() => setDisplay('0'), 2000)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setEquation('')
    setLastResult(null)
  }

  const handleAllClear = () => {
    handleClear()
    setHistory([])
    setMemory(null)
  }

  const handleMemoryAdd = () => {
    const currentValue = parseFloat(display)
    setMemory(prev => (prev || 0) + currentValue)
  }

  const handleMemoryRecall = () => {
    if (memory !== null) {
      setDisplay(memory.toString())
      setLastResult(null)
    }
  }

  const handleMemoryClear = () => {
    setMemory(null)
  }

  const handleBackspace = () => {
    if (display.length === 1 || display === 'Error') {
      setDisplay('0')
    } else {
      setDisplay(display.slice(0, -1))
    }
  }

  const handleKeyboard = useCallback((event) => {
    const { key } = event
    if (/[0-9.]/.test(key)) {
      handleNumber(key)
    } else if (['+', '-', '*', '/', '×'].includes(key)) {
      handleOperator(key)
    } else if (key === 'Enter' || key === '=') {
      handleEquals()
    } else if (key === 'Escape') {
      handleClear()
    } else if (key === 'Backspace') {
      handleBackspace()
    }
  }, [display, equation])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [handleKeyboard])

  return (
    <>
      <Screensaver />
      <div className={styles.container}>
        <div className={styles.calculator}>
          <div className={styles.history}>
            {history.map((item, index) => (
              <div key={index} style={{ opacity: 0.7 - (0.1 * index) }}>{item}</div>
            ))}
          </div>
          <div className={styles.display}>
            <div style={{ fontSize: '0.5em', opacity: 0.7 }}>{equation}</div>
            {display}
          </div>
          <div className={styles.buttons}>
            <button className={`${styles.button} ${styles.memory}`} onClick={handleMemoryClear}>MC</button>
            <button className={`${styles.button} ${styles.memory}`} onClick={handleMemoryRecall}>MR</button>
            <button className={`${styles.button} ${styles.memory}`} onClick={handleMemoryAdd}>M+</button>
            <button className={`${styles.button} ${styles.clear}`} onClick={handleAllClear}>AC</button>
            <button className={`${styles.button} ${styles.scientific}`} onClick={() => setScientificMode(!scientificMode)}>
              {scientificMode ? 'Basic' : 'Sci'}
            </button>

            {scientificMode && (
              <>
                <button className={`${styles.button} ${styles.scientific}`} onClick={() => handleScientificFunction('sin')}>sin</button>
                <button className={`${styles.button} ${styles.scientific}`} onClick={() => handleScientificFunction('cos')}>cos</button>
                <button className={`${styles.button} ${styles.scientific}`} onClick={() => handleScientificFunction('tan')}>tan</button>
                <button className={`${styles.button} ${styles.scientific}`} onClick={() => handleScientificFunction('asin')}>sin⁻¹</button>
                <button className={`${styles.button} ${styles.scientific}`} onClick={() => handleScientificFunction('acos')}>cos⁻¹</button>
                <button className={`${styles.button} ${styles.scientific}`} onClick={() => handleScientificFunction('atan')}>tan⁻¹</button>
                <button className={`${styles.button} ${styles.scientific}`} onClick={() => handleScientificFunction('log')}>log</button>
                <button className={`${styles.button} ${styles.scientific}`} onClick={() => handleScientificFunction('ln')}>ln</button>
                <button className={`${styles.button} ${styles.scientific}`} onClick={() => handleScientificFunction('sqrt')}>√</button>
                <button className={`${styles.button} ${styles.scientific}`} onClick={() => handleScientificFunction('pow')}>x^y</button>
                <button className={`${styles.button} ${styles.scientific}`} onClick={() => handleScientificFunction('pi')}>π</button>
                <button className={`${styles.button} ${styles.scientific}`} onClick={() => handleScientificFunction('e')}>e</button>
                <button className={`${styles.button} ${styles.scientific}`} onClick={() => handleScientificFunction('fact')}>x!</button>
              </>
            )}

            <button className={styles.button} onClick={() => handleNumber('7')}>7</button>
            <button className={styles.button} onClick={() => handleNumber('8')}>8</button>
            <button className={styles.button} onClick={() => handleNumber('9')}>9</button>
            <button className={`${styles.button} ${styles.operator}`} onClick={() => handleOperator('/')}>/</button>
            <button className={`${styles.button} ${styles.scientific}`} onClick={handleBackspace}>⌫</button>

            <button className={styles.button} onClick={() => handleNumber('4')}>4</button>
            <button className={styles.button} onClick={() => handleNumber('5')}>5</button>
            <button className={styles.button} onClick={() => handleNumber('6')}>6</button>
            <button className={`${styles.button} ${styles.operator}`} onClick={() => handleOperator('×')}>×</button>
            <button className={`${styles.button} ${styles.scientific}`} onClick={() => handleScientificFunction('pow')}>x^y</button>

            <button className={styles.button} onClick={() => handleNumber('1')}>1</button>
            <button className={styles.button} onClick={() => handleNumber('2')}>2</button>
            <button className={styles.button} onClick={() => handleNumber('3')}>3</button>
            <button className={`${styles.button} ${styles.operator}`} onClick={() => handleOperator('-')}>-</button>
            <button className={`${styles.button} ${styles.scientific}`} onClick={() => handleScientificFunction('sqrt')}>√</button>

            <button className={styles.button} onClick={() => handleNumber('0')}>0</button>
            <button className={styles.button} onClick={() => handleNumber('.')}>.</button>
            <button className={`${styles.button} ${styles.equals}`} onClick={handleEquals}>=</button>
            <button className={`${styles.button} ${styles.operator}`} onClick={() => handleOperator('+')}>+</button>
            <button className={`${styles.button} ${styles.scientific}`} onClick={() => handleScientificFunction('fact')}>x!</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App 