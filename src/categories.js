const defaultCategories = [
  { title: "Creativity" },
  { title: "Growth", includes: [{ title: "Health", main: false }] },
  { title: "Family", tags: ["Father"] },
];

export class CategoriesStore {
  constructor(categories = defaultCategories) {
    this.categories = categories;
  }

  getFlat() {
    return flat(this.categories).filter(({ title }) => title);
  }

  /**
   * @returns list of all main categories titles
   */
  getMain() {
    return this.getFlat().filter(
      ({ main }) => main === undefined || main === true
    ).map(({ title }) => title);
  }

  /**
   * @param {Array<string>} tags 
   * @returns {string|undefined} best matching main category title
   */
  findBestMain(tags) {
    if (!tags?.length) return undefined;
    let list = [...this.categories];
    let best = list[0];
    while (list?.length) {
      let candidate = list.shift();
      if (match(tags, candidate)) best = candidate;
      if ("includes" in candidate) {
        list.push(
          ...candidate.includes.map((child) => ({
            ...child,
            parent: candidate,
          }))
        );
      }
    }
    while (best && "main" in best && !best.main) {
      best = best.parent;
    }
    return best?.title;
  }

  update(categories) {
    this.categories = categories;
    this.onUpdate?.(categories);
  }
}

const flat = (cats) =>
  cats.flatMap((cat) =>
    cat.includes?.length ? [cat, ...flat(cat.includes)] : cat
  );

const match = (tags, candidate) => tags?.some(
    (tag) => tag.includes(candidate.title) || candidate.tags?.includes(tag)
  );

const lsKey = "categories";

const inMemoryStorage = {};
global.localStorage ||= { getItem: (key) => inMemoryStorage[key], setItem: (key, value) => { inMemoryStorage[key] = value; }};

export class CategoriesStoreLocal extends CategoriesStore {
  constructor() {
    super(localStorage.getItem(lsKey) ? JSON.parse(localStorage.getItem(lsKey)) : defaultCategories);
    this.onUpdate = (categories) => localStorage.setItem(lsKey, JSON.stringify(categories));
  }
}
