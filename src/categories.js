const defaultCategories = [{ title: 'Creativity' }, { title: 'Growth', includes: [{title: 'Health', show: false}] }, { title: 'Family', tags: ['Father'] }]

const categoriesTree = defaultCategories;

const flat = (cats) =>
  cats.flatMap((cat) => (cat.includes?.length ? [cat, ...flat(cat.includes)] : cat))

export const flatCategories = flat(categoriesTree).filter(({ title }) => title)

export const timelineCategories = flatCategories.filter(
  ({ show }) => show === undefined || show === true
)

export function findBestVisibleCategory(tags) {
  if (!tags?.length) return undefined
  let list = [...categoriesTree]
  let best = list[0]
  while (list?.length) {
    let candidate = list.shift()
    if (tags?.some((tag) => tag.includes(candidate.title) || candidate.tags?.includes(tag))) {
      best = candidate
    }
    if ('includes' in candidate) {
      list.push(...candidate.includes.map((child) => ({ ...child, parent: candidate })))
    }
  }
  while (best && 'show' in best && !best.show) {
    best = best.parent
  }
  return best?.title
}
