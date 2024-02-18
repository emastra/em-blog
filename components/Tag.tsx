import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
  href: string
}

const Tag = ({ text, href }: Props) => {
  return (
    // transform transition duration-100 hover:scale-125
    // href={`/categories/${slug(text)}`}
    <Link
      href={href}
      className="mr-2 rounded-lg bg-gray-200 px-3 py-[6px] text-sm font-medium text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
      aria-label={`View posts with category ${text}`}
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag

// <Link
//   href={`/categories/${slug(text)}`}
//   className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
// >
//   {text.split(' ').join('-')}
// </Link>
