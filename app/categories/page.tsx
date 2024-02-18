// import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import MainContainer from '@/components/MainContainer'
import Link from 'next/link'
import categoriesData from '@/data/categoriesData'

export const metadata = genPageMetadata({ title: 'Categories', description: 'Things I blog about' }) // !! check: il title era Tags

export default async function Page() {
  // const tagCounts = tagData as Record<string, number>
  // const tagKeys = Object.keys(tagCounts)
  // const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <>
      <MainContainer>
        <div className="mt-16">
          <div className="mb-8 space-y-2 pb-8 pt-6 md:space-y-5">
            <h1 className="text-5xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 md:text-6xl md:leading-14">
              Categorie
            </h1>
          </div>
          <div className="grid grid-cols-4 gap-8">
            {categoriesData.length === 0 && 'No categories found.'}
            {categoriesData.map((cat) => {
              return (
                <Link
                  key={slug(cat.name)}
                  href={`/categories/${slug(cat.name)}`} // TODO: consider having a getCategoryHref utils function. Eventually do it also in CategoryLabel comp and ListLayoutWithTags (if used)
                  className="col-span-4 flex min-h-64 flex-col items-center justify-center rounded-lg bg-slate-300 hover:bg-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700 md:col-span-2"
                >
                  <div className="text-3xl md:text-4xl">{cat.name}</div>
                  {cat.description && (
                    <div className="mt-2 text-gray-300 md:text-lg">{cat.description}</div>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </MainContainer>
    </>
  )
}
