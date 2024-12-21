import { flatCategories, findBestVisibleCategory } from './categories'

describe('categories', () => {
  describe('flatCategories', () => {
    it('does not contain empty', () => {
      flatCategories.forEach((element) => {
        expect(element.title).toBeDefined()
      })
    })
  })
  describe('findBestVisibleCategory', () => {
    it('works for sub-items', () => {
      const category = findBestVisibleCategory(['Health'])
      expect(category).toEqual('Growth')
    })
    it('works for another case', () => {
      const category = findBestVisibleCategory(['Father'])
      expect(category).toEqual('Family')
    })
    it('return undefined if tags are absent', () => {
      const category = findBestVisibleCategory()
      expect(category).toBeUndefined()
    })
  })
})
