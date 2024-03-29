import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
// import ListLayout from '@/layouts/ListLayoutWithTags'
import ListLayout from '@/layouts/ListLayout'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import MainContainer from '@/components/MainContainer'
import categoriesData from '@/data/categoriesData'

export async function generateMetadata({ params }: { params: { cat: string } }): Promise<Metadata> {
  const category = decodeURI(params.cat)
  return genPageMetadata({
    title: category,
    description: `${siteMetadata.title} content in the ${category} category`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/categories/${category}/feed.xml`,
      },
    },
  })
}

// TODO: check: uso l'abbreviazione "cat". perchè la dinamic route è cat?
export const generateStaticParams = async () => {
  // const tagCounts = tagData as Record<string, number>
  // const tagKeys = Object.keys(tagCounts)
  // const paths = tagKeys.map((tag) => ({
  //   cat: encodeURI(tag),
  // }))
  const paths = categoriesData.map((c) => ({
    cat: encodeURI(c.name),
  }))

  return paths
}

// TODO: same as in /articles/page.tsx
const POSTS_PER_PAGE = 10

// TODO: DONE?: controlla bene se devo usare slug in giro per l'app, e se nome, capitalization, sluggization è consistente in giro. E SE la cat sono piu parole !!
export default function CategoryPage({ params }: { params: { cat: string } }) {
  const cat = decodeURI(params.cat)
  // Capitalize first letter and convert space to dash
  // const title = cat.toUpperCase() + cat.split(' ').join('-').slice(1)
  // Ho saltato cat.split(' ').join('-'), ma se la cat sono parole staccate???
  const title = cat.charAt(0).toUpperCase() + cat.slice(1) // TODO: qc da fare qui, guarda linea sopra !
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.category && slug(post.category) === cat))
  )
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE)

  return (
    <MainContainer>
      <div className="mt-16">
        <ListLayout
          posts={filteredPosts}
          title={title}
          initialDisplayPosts={initialDisplayPosts}
          perPage={POSTS_PER_PAGE}
        />
      </div>
    </MainContainer>
  )
}
