import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

import MainContainer from '@/components/MainContainer'
// import TOCInline from 'pliny/ui/TOCInline'
import TableOfContents from '@/components/toc/TableOfContents'
import ArticleHeader from '@/components/ArticleHeader'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  toc: any
  children: ReactNode
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  toc,
  children,
}: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <>
      <ArticleHeader title={title} />
      <MainContainer>
        <ScrollTopAndComment />

        <article>
          <div className="">
            {/* header with title */}
            {/* <header className="mt-8 pt-6 xl:pb-6">
              <div className="space-y-1">
                <dl className="space-y-10">
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>
                        {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                      </time>
                    </dd>
                  </div>
                </dl>
                <div>
                  <PageTitle>{title}</PageTitle>
                </div>
              </div>
            </header> */}

            <div className="grid grid-cols-6 gap-8">
              <div className="col-span-6 md:order-last md:col-span-2 md:ml-12 lg:ml-16">
                <div className="sticky top-[164px]">
                  <TableOfContents toc={toc} />
                </div>
              </div>

              <div className="col-span-6 md:col-span-4 md:mr-4">
                <div className="prose max-w-none pb-8 dark:prose-invert">{children}</div>
              </div>
            </div>
          </div>
        </article>
      </MainContainer>
    </>
  )
}
