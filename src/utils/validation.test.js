import {
  isValidNumber,
  isValidOperator,
  formatNumber,
  validateEquation,
  sanitizeInput
} from './validation'

describe('isValidNumber', () => {
  test('should return true for valid numbers', () => {
    expect(isValidNumber('123')).toBe(true)
    expect(isValidNumber('0')).toBe(true)
    expect(isValidNumber('12.34')).toBe(true)
    expect(isValidNumber('-123')).toBe(true)
  })

  test('should return false for invalid numbers', () => {
    expect(isValidNumber('')).toBe(false)
    expect(isValidNumber('.')).toBe(false)
    expect(isValidNumber('abc')).toBe(false)
    expect(isValidNumber('12abc')).toBe(false)
    expect(isValidNumber('1234567890123')).toBe(false) // > 12 digits
  })
})

describe('isValidOperator', () => {
  test('should return true for valid operators', () => {
    expect(isValidOperator('+')).toBe(true)
    expect(isValidOperator('-')).toBe(true)
    expect(isValidOperator('*')).toBe(true)
    expect(isValidOperator('/')).toBe(true)
    expect(isValidOperator('×')).toBe(true)
    expect(isValidOperator('^')).toBe(true)
  })

  test('should return false for invalid operators', () => {
    expect(isValidOperator('=')).toBe(false)
    expect(isValidOperator('a')).toBe(false)
    expect(isValidOperator('')).toBe(false)
    expect(isValidOperator('plus')).toBe(false)
  })
})

describe('formatNumber', () => {
  test('should format integers correctly', () => {
    expect(formatNumber('123')).toBe('123')
    expect(formatNumber('-456')).toBe('-456')
    expect(formatNumber('0')).toBe('0')
  })

  test('should format decimals correctly', () => {
    expect(formatNumber('12.34')).toBe('12.34')
    expect(formatNumber('0.123456789')).toBe('0.12345679')
    expect(formatNumber('-1.23')).toBe('-1.23')
  })

  test('should return Error for invalid numbers', () => {
    expect(formatNumber('abc')).toBe('Error')
    expect(formatNumber('')).toBe('Error')
    expect(formatNumber('.')).toBe('Error')
  })
})

describe('validateEquation', () => {
  test('should validate correct equations', () => {
    expect(validateEquation('1 + 2')).toBe(true)
    expect(validateEquation('10.5 × 3')).toBe(true)
    expect(validateEquation('-5 / 2')).toBe(true)
  })

  test('should reject invalid equations', () => {
    expect(validateEquation('')).toBe(false)
    expect(validateEquation('1 + ')).toBe(false)
    expect(validateEquation('1 2 3')).toBe(false)
    expect(validateEquation('a + b')).toBe(false)
  })
})

describe('sanitizeInput', () => {
  test('should remove non-numeric characters', () => {
    expect(sanitizeInput('123abc')).toBe('123')
    expect(sanitizeInput('a1b2c3')).toBe('123')
    expect(sanitizeInput('12.34')).toBe('12.34')
    expect(sanitizeInput('abc')).toBe('')
  })

  test('should preserve decimal points', () => {
    expect(sanitizeInput('1.23.45')).toBe('1.2345')
    expect(sanitizeInput('.123')).toBe('.123')
  })
}) 