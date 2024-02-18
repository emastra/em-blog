import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  name: string
}

const CategoryLabel = ({ name }: Props) => {
  return (
    // transform transition duration-100 hover:scale-125
    <Link
      href={`/categories/${slug(name)}`}
      className="mr-2 rounded-lg bg-gray-200 px-3 py-[6px] text-sm font-medium text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
      aria-label={`View posts with category ${name}`}
    >
      {slug(name)}
    </Link>
  )
}

export default CategoryLabel
