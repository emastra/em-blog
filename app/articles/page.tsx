import HomeListLayout from '@/layouts/HomeListLayout'
import ListLayout from '@/layouts/ListLayout'
import Hero from '@/components/Hero'
import MainContainer from '@/components/MainContainer'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

const POSTS_PER_PAGE = 20

export const metadata = genPageMetadata({ title: 'Blog' }) // !! TODO: update this. check how genPageMetadata works

export default function ArticlesPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
  // TODO:
  // Check quale data viene visualiizata. Published or Modified? Decidi come visualizzare date.
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <>
      <MainContainer>
        <div className="mt-16">
          <ListLayout
            posts={posts}
            initialDisplayPosts={initialDisplayPosts}
            pagination={pagination}
            title="Tutti gli articoli"
          />
        </div>
      </MainContainer>
    </>
  )
}

// EX HOMEPAGE

// import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
// import { allBlogs } from 'contentlayer/generated'
// // import Main from '../Main'
// import Link from '@/components/Link'
// import Tag from '@/components/Tag'
// import siteMetadata from '@/data/siteMetadata'
// import { formatDate } from 'pliny/utils/formatDate'
// import NewsletterForm from 'pliny/ui/NewsletterForm'

// const MAX_DISPLAY = 5

// export default async function Page() {
//   // const sortedPosts = sortPosts(allBlogs)
//   const posts = allCoreContent(sortPosts(allBlogs))

//   return (
//     <>
//       <div className="divide-y divide-gray-200 dark:divide-gray-700">
//         <div className="space-y-2 pb-8 pt-6 md:space-y-5">
//           <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
//             Latest
//           </h1>
//           <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
//             {siteMetadata.description}
//           </p>
//         </div>
//         <ul className="divide-y divide-gray-200 dark:divide-gray-700">
//           {!posts.length && 'No posts found.'}
//           {posts.slice(0, MAX_DISPLAY).map((post) => {
//             const { slug, date, title, summary, tags } = post
//             return (
//               <li key={slug} className="py-12">
//                 <article>
//                   <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
//                     <dl>
//                       <dt className="sr-only">Published on</dt>
//                       <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
//                         <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
//                       </dd>
//                     </dl>
//                     <div className="space-y-5 xl:col-span-3">
//                       <div className="space-y-6">
//                         <div>
//                           <h2 className="text-2xl font-bold leading-8 tracking-tight">
//                             <Link
//                               href={`/blog/${slug}`}
//                               className="text-gray-900 dark:text-gray-100"
//                             >
//                               {title}
//                             </Link>
//                           </h2>
//                           <div className="flex flex-wrap">
//                             {tags.map((tag) => (
//                               <Tag key={tag} text={tag} />
//                             ))}
//                           </div>
//                         </div>
//                         <div className="prose max-w-none text-gray-500 dark:text-gray-400">
//                           {summary}
//                         </div>
//                       </div>
//                       <div className="text-base font-medium leading-6">
//                         <Link
//                           href={`/blog/${slug}`}
//                           className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
//                           aria-label={`Read more: "${title}"`}
//                         >
//                           Read more &rarr;
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               </li>
//             )
//           })}
//         </ul>
//       </div>
//       {posts.length > MAX_DISPLAY && (
//         <div className="flex justify-end text-base font-medium leading-6">
//           <Link
//             href="/blog"
//             className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
//             aria-label="All posts"
//           >
//             All Posts &rarr;
//           </Link>
//         </div>
//       )}
//       {siteMetadata.newsletter?.provider && (
//         <div className="flex items-center justify-center pt-4">
//           <NewsletterForm />
//         </div>
//       )}
//     </>
//   )
// }
