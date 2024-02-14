/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'
// posso levallo se non uso usepath???

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import NewsletterForm from 'pliny/ui/NewsletterForm'

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

export default function HomeListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  console.log('pathname', pathname, pathname.startsWith('/blog'))

  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

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
              const { path, date, title, summary, tags } = post
              return (
                <li key={path} className="group py-5 first:pt-0">
                  <article className="flex flex-col">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="mt-1">
                      <div>
                        <h3 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                            {title}
                          </Link>
                        </h3>
                      </div>
                      {/* <div className="flex flex-wrap">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div> */}
                      <div className="prose mt-3 max-w-none text-gray-800 dark:text-gray-200">
                        {summary}
                      </div>
                    </div>
                    <div className="mt-3 text-base font-medium leading-6">
                      <Link
                        href={`/${path}`}
                        className="text-gray-900 group-hover:text-primary-600 dark:text-gray-100"
                        aria-label={`Read more: "${title}"`}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </article>
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
              {sortedTags.slice(0, 7).map((t) => {
                return (
                  <li key={t} className="my-[10px] inline-block">
                    <Link
                      href={`/categories/${slug(t)}`}
                      className="mr-2 rounded-lg bg-gray-200 px-[10px] py-[7px] text-sm font-medium text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                      aria-label={`View posts tagged ${t}`}
                    >
                      {`${t}`}
                    </Link>
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
                  <li key={p.title} className="my-3">
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
        {/* <div className="h-[900px]">test</div> */}
      </div>
      <div className="mt-24 max-w-lg">
        <h2 className="mb-4 text-3xl font-extrabold leading-10 tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl md:leading-12">
          A front-end web development newsletter that sparks joy
        </h2>
        <p className="prose max-w-none text-gray-500 dark:text-gray-200">
          My goal with this blog is to create helpful content for front-end web devs, and my
          newsletter is no different! I'll let you know when I publish new content, and I'll even
          share exclusive newsletter-only content now and then.
          <br />
          <br /> No spam, unsubscribe at any time.
        </p>
        {siteMetadata.newsletter?.provider && (
          <div className="pt-8">
            <NewsletterForm title="Iscriviti alla newsletter" />
          </div>
        )}
      </div>
    </>
  )
}
