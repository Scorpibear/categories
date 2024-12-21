import { flatCategories, findBestTimelineCategory } from './categories'

describe('categories', () => {
  describe('flatCategories', () => {
    it('does not contain empty', () => {
      flatCategories.forEach((element) => {
        expect(element.title).toBeDefined()
      })
    })
  })
  describe('findBestTimelineCategory', () => {
    it('works for sub-items', () => {
      const category = findBestTimelineCategory(['хобби', 'Путь 3kGM'])
      expect(category).toEqual('Развитие')
    })
    it('works for another case', () => {
      const category = findBestTimelineCategory(['Путь Отца'])
      expect(category).toEqual('Семья')
    })
    it('return undefined if tags are absent', () => {
      const category = findBestTimelineCategory()
      expect(category).toBeUndefined()
    })
  })
})
