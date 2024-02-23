import Link from '@/components/Link'
import CategoryLabel from './CategoryLabel'

const ArticleCard = ({ path, title, summary, category }) => {
  return (
    <article className="flex flex-col">
      <div className="mb-4 ml-[-4px]">
        <CategoryLabel name={category} />
      </div>
      <Link href={`/${path}`} className="group">
        <h3 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <h4 className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
          Lorem ipsum lorem ipsum ya ya ya lorem ipsum subtitle
        </h4>
        <p className="prose mt-3 max-w-none text-gray-800 dark:text-gray-200">{summary}</p>
        <div
          aria-label={`Read more: "${title}"`}
          className="mt-3 text-base font-medium leading-6 text-gray-900 group-hover:text-primary-600 dark:text-gray-100"
        >
          Read more &rarr;
        </div>
      </Link>
    </article>
  )
}

export default ArticleCard
