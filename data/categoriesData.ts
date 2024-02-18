import { slug } from 'github-slugger'

type CategoryName = 'Orientamento' | 'Html' | 'Css' | 'Javascript' | 'Linux' | 'Web'

interface Category {
  href: string
  name: CategoryName
  description?: string
  imgSrc?: string
}

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
export const getCategoryHref = (categoryName: string) => '/categories/' + slug(categoryName)
