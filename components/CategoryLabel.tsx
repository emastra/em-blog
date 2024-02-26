import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const CategoryLabel = ({ name, size = 'sm' }: Props) => {
  const padding = size === 'sm' ? 'px-3 py-[6px]' : size === 'md' ? 'px-4 py-2' : 'px-5 py-[10px]'
  const fontSize = size !== 'lg' ? 'font-sm' : 'font-base'

  return (
    // transform transition duration-100 hover:scale-125
    <Link
      href={`/categories/${slug(name)}`}
      className={`mr-2 inline-block rounded-lg bg-gray-200 ${padding} ${fontSize} font-medium text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600`}
      aria-label={`View posts in ${name} category`}
    >
      {slug(name)}
    </Link>
  )
}

export default CategoryLabel
