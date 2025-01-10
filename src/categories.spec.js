import { CategoriesStore, CategoriesStoreLocal } from './categories'
import jest from 'jest-mock'

describe('CategoriesStore', () => {
  describe('getFlat', () => {
    it('does not contain empty', () => {
      let catStore = new CategoriesStore();
      catStore.getFlat().forEach((element) => {
        expect(element.title).toBeDefined()
      })
    })
  })
  describe('findBestMain', () => {
    let catStore;
    beforeAll(() => {
      catStore = new CategoriesStore()
    })
    it('works for sub-items', () => {
      const category = catStore.findBestMain(['Health'])
      expect(category).toEqual('Growth')
    })
    it('works for another case', () => {
      const category = catStore.findBestMain(['Father'])
      expect(category).toEqual('Family')
    })
    it('return undefined if tags are absent', () => {
      const category = catStore.findBestMain()
      expect(category).toBeUndefined()
    })
  })
  describe('get', () => {
    it('returns all categories', () => {
      const catStore = new CategoriesStore()
      expect(catStore.categories).toBe(catStore.categories);
    })
  })
  describe('getMain', () => {
    it('returns list of all main categories titles', () => {
      const catStore = new CategoriesStore()
      expect(catStore.getMain()).toEqual(['Creativity', 'Growth', 'Family']);
    })
  })
  describe('update', () => {
    it('calls onUpdate handler', () => {
      const catStore = new CategoriesStore()
      const onUpdate = jest.fn()
      catStore.onUpdate = onUpdate
      catStore.update()
      expect(onUpdate).toHaveBeenCalled()
    })
  })
  //onFirstLoad
})

describe('CategoriesStoreLocal', () => {
  it('stores state between initializations', () => {
    const catStore = new CategoriesStoreLocal()
    catStore.update([{ title: 'Test' }])
    const catStore2 = new CategoriesStoreLocal()
    expect(catStore2.categories).toEqual([{ title: 'Test' }])
  })
})
