'use client'
// In questo componente c'era la search e la pagination
// vedi: https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/main/layouts/ListLayout.tsx

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import ArticleCard from '@/components/ArticleCard'
import { slug } from 'github-slugger'

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  perPage: number
  hasSearch?: boolean
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  perPage = 10,
  hasSearch = false,
}: ListLayoutProps) {
  const pathname = usePathname()
  const [displayedPosts, setDisplayedPosts] = useState(initialDisplayPosts)
  const [loadMoreCount, setLoadMoreCount] = useState(2) // (initialDisplayPosts.length / perPage) + 1

  const loadMorePosts = () => {
    const nextPosts = posts.slice(0, loadMoreCount * perPage)
    setDisplayedPosts(nextPosts)
    setLoadMoreCount(loadMoreCount + 1)
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8 space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-5xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 md:text-6xl md:leading-14">
          {title}
        </h1>
      </div>
      <ul>
        {!displayedPosts.length && 'No posts found.'}
        {displayedPosts.map((post) => {
          const { path, date, title, summary, category } = post
          return (
            <li key={slug(title)} className="my-12 first:mt-0">
              <ArticleCard
                path={path}
                title={title}
                summary={summary}
                category={category}
                isLabel={!pathname.includes('categories')}
              />
            </li>
          )
        })}
      </ul>
      {displayedPosts.length < posts.length && (
        <div className="mt-4">
          {/* hover:bg-primary-400 dark:hover:bg-primary-600 */}
          <button
            onClick={loadMorePosts}
            className="rounded-md border border-primary-500 px-4 py-2 text-gray-900 dark:text-gray-100"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
