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

// TODO: check !!! no tags but categories
export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`, // TODO: no tags/, /categories!!!
      },
    },
  })
}

// TODO: check
export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    cat: encodeURI(tag),
  }))
  return paths
}

// TODO: DONE?: controlla bene se devo usare slug in giro per l'app, e se nome, capitalization, sluggization è consistente in giro. E SE la cat sono piu parole !!
export default function CategoryPage({ params }: { params: { cat: string } }) {
  const cat = decodeURI(params.cat)
  // Capitalize first letter and convert space to dash
  // const title = cat.toUpperCase() + cat.split(' ').join('-').slice(1)
  const title = cat.charAt(0).toUpperCase() + cat.slice(1) // TODO: qc da fare qui, guarda linea sopra !
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.category && slug(post.category) === cat))
  )

  return (
    <MainContainer>
      <div className="mt-16">
        <ListLayout posts={filteredPosts} title={title} />
      </div>
    </MainContainer>
  )
}
