import HomeListLayout from '@/layouts/HomeListLayout'
import Hero from '@/components/Hero'
import MainContainer from '@/components/MainContainer'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

const DISPLAY_POSTS_NUM = 10

// TODO: check if add description and other things
export const metadata = genPageMetadata({ title: 'Blog' })

export default function HomePage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const displayPosts = posts.slice(0, DISPLAY_POSTS_NUM)

  return (
    <>
      <Hero />
      <MainContainer>
        <HomeListLayout displayPosts={displayPosts} />
      </MainContainer>
    </>
  )
}
