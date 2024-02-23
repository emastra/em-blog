/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'
// TODO: posso levallo se non uso usepath???

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
// import Tag from '@/components/Tag'
import CategoryLabel from '@/components/CategoryLabel'
import ArticleCard from '@/components/ArticleCard'
// import siteMetadata from '@/data/siteMetadata'
// import tagData from 'app/tag-data.json'
import categoriesData, { CategoryName } from '@/data/categoriesData'
import NewsletterBox from '@/components/NewsletterBox'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

const POPULAR_CATEGORIES: CategoryName[] = ['Orientamento', 'HTML', 'CSS', 'Javascript', 'Linux']

export default function HomeListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  // const pathname = usePathname()
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div className="grid grid-cols-6 gap-8">
        <section className="col-span-6 md:col-span-4 md:mr-8 lg:mr-12">
          <div className="mb-9">
            <h2 className="text-xl font-bold uppercase tracking-widest text-primary-500">
              Last published
            </h2>
          </div>
          <ul>
            {displayPosts.map((post) => {
              const { path, date, title, summary, category } = post
              return (
                <li key={slug(title)} className="my-12 first:mt-0">
                  <ArticleCard path={path} title={title} summary={summary} category={category} />
                </li>
              )
            })}
          </ul>
        </section>

        <div className="col-span-6 md:col-span-2 lg:ml-4">
          <section>
            <div className="mb-8">
              <h2 className="text-xl font-bold uppercase tracking-widest text-primary-500">
                Top categories
              </h2>
            </div>
            <ul>
              {categoriesData
                .filter((cat) => POPULAR_CATEGORIES.includes(cat.name))
                .map((cat) => {
                  return (
                    <li key={slug(cat.name)} className="my-[10px] inline-block">
                      <CategoryLabel name={cat.name} size="md" />
                    </li>
                  )
                })}
            </ul>
          </section>
          <section className="sticky top-[108px]">
            <div className="mb-8 mt-20">
              <h2 className="text-xl font-bold uppercase tracking-widest text-primary-500">
                Popular articles
              </h2>
            </div>
            <ul>
              {posts.slice(0, 8).map((p) => {
                return (
                  <li key={p.slug} className="my-3">
                    <Link
                      href={`/tags/${slug(p.slug)}`}
                      className="text-lg font-medium text-gray-900 dark:text-gray-100"
                      aria-label={`View post titled ${p.title}`}
                    >
                      {`${p.title}`}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        </div>
      </div>
      <NewsletterBox />
    </>
  )
}
