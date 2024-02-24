import ListLayout from '@/layouts/ListLayout'
import MainContainer from '@/components/MainContainer'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

const POSTS_PER_PAGE = 10

export const metadata = genPageMetadata({ title: 'Articles' }) // !! TODO: update this. check how genPageMetadata works

export default function ArticlesPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)

  return (
    <>
      <MainContainer>
        <div className="mt-16">
          <ListLayout
            title="Tutti gli articoli"
            posts={posts}
            initialDisplayPosts={initialDisplayPosts}
            perPage={POSTS_PER_PAGE}
          />
        </div>
      </MainContainer>
    </>
  )
}
