export const isValidNumber = (value) => {
  if (typeof value !== 'string') return false
  if (value === '') return false
  if (value === '.') return false
  if (isNaN(parseFloat(value))) return false
  if (value.length > 12) return false
  return true
}

export const isValidOperator = (operator) => {
  const validOperators = ['+', '-', '*', '/', '×', '^']
  return validOperators.includes(operator)
}

export const formatNumber = (value) => {
  if (!isValidNumber(value)) return 'Error'
  
  const number = parseFloat(value)
  if (Number.isInteger(number)) {
    return number.toString()
  }
  
  return parseFloat(number.toFixed(8)).toString()
}

export const validateEquation = (equation) => {
  if (!equation) return false
  
  const parts = equation.trim().split(' ')
  if (parts.length !== 3) return false
  
  const [first, operator, second] = parts
  return isValidNumber(first) && isValidOperator(operator) && isValidNumber(second)
}

export const sanitizeInput = (input) => {
  return input.replace(/[^0-9.]/g, '')
}

export const handleError = (error, setDisplay) => {
  console.error('Calculator Error:', error)
  setDisplay('Error')
  setTimeout(() => setDisplay('0'), 2000)
} 