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

// TODO: check !!! no tags but categories. DONE
export async function generateMetadata({ params }: { params: { cat: string } }): Promise<Metadata> {
  const category = decodeURI(params.cat)
  console.log('@@@category', category)
  return genPageMetadata({
    title: category,
    description: `${siteMetadata.title} content in the ${category} category`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/categories/${category}/feed.xml`, // TODO: no tags/, /categories!!!
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
  // Ho saltato cat.split(' ').join('-'), ma se la cat sono parole staccate???
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
