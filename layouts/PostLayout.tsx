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
import NewsletterBox from '@/components/NewsletterBox'

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
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-6 mt-1 md:order-last md:col-span-2 md:ml-16 lg:ml-20">
                <div className="sticky top-[164px]">
                  {/* TODO: responsiveness: asDisclosure */}
                  <TableOfContents toc={toc} />
                </div>
              </div>
              <div className="col-span-6 md:col-span-4 md:mr-4">
                <div className="prose max-w-none pb-8 dark:prose-invert">{children}</div>
              </div>
            </div>
          </div>
        </article>
        <NewsletterBox />
      </MainContainer>
    </>
  )
}
