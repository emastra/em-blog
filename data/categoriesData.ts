export type CategoryName = 'Orientamento' | 'HTML' | 'CSS' | 'Javascript' | 'Linux' | 'Web'

interface Category {
  name: CategoryName
  description?: string
  // imgSrc?: string
}

const categoriesData: Category[] = [
  {
    name: 'Orientamento',
    description: 'Lorem ipsum lorem ipsum lorem',
  },
  { name: 'HTML', description: 'Lorem ipsum lorem ipsum lorem' },
  { name: 'CSS', description: '' },
  { name: 'Javascript', description: '' },
  { name: 'Linux', description: 'Lorem ipsum lorem ipsum lorem' },
  { name: 'Web', description: 'Lorem ipsum lorem ipsum lorem' },
]

export default categoriesData
