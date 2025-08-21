import { combineClasses } from '../utils'

describe('Utils', () => {
  describe('combineClasses', () => {
    it('combines multiple class strings', () => {
      const result = combineClasses('class1', 'class2', 'class3')
      expect(result).toContain('class1')
      expect(result).toContain('class2')
      expect(result).toContain('class3')
    })

    it('handles undefined values', () => {
      const result = combineClasses('class1', undefined, 'class3')
      expect(result).toContain('class1')
      expect(result).toContain('class3')
    })

    it('handles empty strings', () => {
      const result = combineClasses('class1', '', 'class3')
      expect(result).toContain('class1')
      expect(result).toContain('class3')
    })

    it('returns empty string for no arguments', () => {
      const result = combineClasses()
      expect(typeof result).toBe('string')
    })
  })
})
