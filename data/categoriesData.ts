interface Category {
  href: string
  name: string
  description?: string
  imgSrc?: string
}

// const CATEGORY_NAMES = []

// TODO: add position? to sort them before display them
const categoriesData: Category[] = [
  {
    href: '/categories/orientamento',
    name: 'Orientamento',
    description: 'Lorem ipsum lorem ipsum lorem',
  },
  { href: '/categories/html', name: 'Html', description: 'Lorem ipsum lorem ipsum lorem' },
  { href: '/categories/css', name: 'Css', description: '' },
  { href: '/categories/javascript', name: 'Javascript', description: '' },
  { href: '/categories/linux', name: 'Linux', description: 'Lorem ipsum lorem ipsum lorem' },
  { href: '/categories/web', name: 'Web', description: 'Lorem ipsum lorem ipsum lorem' },
]

export default categoriesData
export const popularCategories = ['Orientamento', 'Html', 'Css', 'Javascript', 'Linux']
