const defaultCategories = [{ title: 'Creativity' }, { title: 'Growth' }, { title: 'Family' }]

const categoriesTree = [
  {
    title: 'Творчество',
    tags: ['Путь Создателя', 'Создатель'],
    showOnTimeline: true,
    includes: [
      {
        title: 'Создатель продуктов',
        tags: ['Путь Создателя Продуктов'],
        showOnTimeline: false,
        includes: [
          {
            id: 'SDET',
            title: 'SDET-архитектор',
            showOnTimeline: false,
            includes: [{ id: 'cpp', id: 'epic' }]
          }
        ]
      },
      {
        title: 'EPAMer',
        tags: ['Путь EPAMа'],
        showOnTimeline: false,
        includes: [{ title: 'Epic Games SDET Architector', id: 'epic', showOnTimeline: false }]
      },
      { title: 'Блогер', showOnTimeline: false }
    ]
  },
  {
    title: 'Развитие',
    tags: ['Путь Мастера Жизни', 'Мастер Жизни'],
    includes: [
      {
        title: 'Спортсмен',
        id: 'sport',
        showOnTimeline: false,
        includes: [
          {
            title: 'Мастер спорта',
            tags: ['Путь Мастера Спорта'],
            id: 'ms',
            showOnTimeline: false,
            includes: [
              {
                id: 'chess',
                title: 'Шахматист',
                showOnTimeline: false,
                includes: [{ title: '3kGM', id: '3kgm', showOnTimeline: false }]
              }
            ]
          }
        ]
      },
      { title: 'Полиглот', showOnTimeline: false },
      {
        title: 'Разработчик',
        tags: [
          'Путь Мастера Разработки',
          'Путь Разработчика',
          'Путь Программиста',
          'Мастер Разработки'
        ],
        showOnTimeline: false,
        includes: [{ id: 'cpp', title: 'Мастер С++', showOnTimeline: false }]
      },
      {
        title: 'Игрок',
        showOnTimeline: false,
        includes: [{ title: 'Игрок в покер', showOnTimeline: false }, { id: 'chess' }]
      }
    ]
  },
  {
    title: 'Семья',
    tags: ['Путь Отца', 'Отец'],
    includes: [{ title: 'финансы', tags: 'Путь Инвестора', showOnTimeline: false }]
  }
]

const flat = (cats) =>
  cats.flatMap((cat) => (cat.includes?.length ? [cat, ...flat(cat.includes)] : cat))

export const flatCategories = flat(categoriesTree).filter(({ title }) => title)

export const timelineCategories = flatCategories.filter(
  ({ showOnTimeline }) => showOnTimeline === undefined || showOnTimeline === true
)

export function findBestTimelineCategory(tags) {
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
  while (best && 'showOnTimeline' in best && !best.showOnTimeline) {
    best = best.parent
  }
  return best?.title
}
