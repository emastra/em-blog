import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import MainContainer from '@/components/MainContainer'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <MainContainer>
        <div className="mb-8 mt-16">
          <AuthorLayout content={mainContent}>
            <MDXLayoutRenderer code={author.body.code} />
          </AuthorLayout>
        </div>
      </MainContainer>
    </>
  )
}
