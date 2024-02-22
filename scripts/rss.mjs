import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import GithubSlugger from 'github-slugger'
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'
import tagData from '../app/tag-data.json' assert { type: 'json' }
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'
import categoriesData from '@/data/categoriesData.js'

// se usassi post.tags che era un array: ${post.category && post.tags.map((t) => `<category>${t}</category>`).join('')}
const generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${config.siteUrl}/blog/${post.slug}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${post.category && `<category>${post.category}</category>`}
  </item>
`

const generateRss = (config, posts, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}/blog</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join('')}
    </channel>
  </rss>
`

async function generateRSS(config, allBlogs, page = 'feed.xml') {
  const publishPosts = allBlogs.filter((post) => post.draft !== true)
  // RSS for blog post
  if (publishPosts.length > 0) {
    const rss = generateRss(config, sortPosts(publishPosts))
    writeFileSync(`./public/${page}`, rss)
  }

  // if (publishPosts.length > 0) {
  //   for (const tag of Object.keys(tagData)) {
  //     const filteredPosts = allBlogs.filter((post) =>
  //       post.tags.map((t) => GithubSlugger.slug(t)).includes(tag)
  //     )
  //     const rss = generateRss(config, filteredPosts, `tags/${tag}/${page}`)
  //     const rssPath = path.join('public', 'tags', tag)
  //     mkdirSync(rssPath, { recursive: true })
  //     writeFileSync(path.join(rssPath, page), rss)
  //   }
  // }
  if (publishPosts.length > 0) {
    for (const c of categoriesData) {
      // se post.category diventasse un array: post.tags.map((t) => GithubSlugger.slug(t)).includes(tag)
      const filteredPosts = allBlogs.filter((post) => GithubSlugger.slug(post.category) === c.name)
      const rss = generateRss(config, filteredPosts, `categories/${c.name}/${page}`)
      const rssPath = path.join('public', 'categories', c.name)
      mkdirSync(rssPath, { recursive: true })
      writeFileSync(path.join(rssPath, page), rss)
    }
  }
}

const rss = () => {
  generateRSS(siteMetadata, allBlogs)
  console.log('RSS feed generated...')
}
export default rss
