import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
      // Additional optional properties (presi da MetadataRoute.Sitemap):
      // changeFrequency: 'weekly', // Assuming the blog is updated weekly
      // priority: 0.8, // Assigning a relatively high priority
    }))

  // IT WAS: const routes = ['', 'blog', 'projects', 'tags'].map((route) => ({
  // lascio fuori 'blog' al momento. TODO: se aggiungo il redirect di /blog dovrei aggiungere la route pure qui
  const routes = ['', 'articles', 'categories', 'about'].map((route) => ({
    url: `${siteUrl}/${route}`,
    // TODO: dovrei mettere una data piu realistica. Articles cambia ogni volata che aggiungo un articolo. About non cambia quasi mai
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
