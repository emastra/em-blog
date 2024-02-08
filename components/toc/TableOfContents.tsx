'use client'

import { Toc, TocItem } from './remark-toc-headings'
import { useEffect } from 'react'
import '@/components/toc/styles.css'

export interface TOCInlineProps {
  toc: Toc
  fromHeading?: number
  toHeading?: number
  asDisclosure?: boolean
  exclude?: string | string[]
  collapse?: boolean
  ulClassName?: string
}

export interface NestedTocItem extends TocItem {
  children?: NestedTocItem[]
}

const createNestedList = (items: TocItem[]): NestedTocItem[] => {
  const nestedList: NestedTocItem[] = []
  const stack: NestedTocItem[] = []

  items.forEach((item) => {
    const newItem: NestedTocItem = { ...item }

    while (stack.length > 0 && stack[stack.length - 1].depth >= newItem.depth) {
      stack.pop()
    }

    const parent = stack.length > 0 ? stack[stack.length - 1] : null

    if (parent) {
      parent.children = parent.children || []
      parent.children.push(newItem)
    } else {
      nestedList.push(newItem)
    }

    stack.push(newItem)
  })

  return nestedList
}

/**
 * Generates an inline table of contents
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 *
 * `asDisclosure` will wrap the TOC in a `details` element with a `summary` element.
 * `collapse` will collapse the TOC when `AsDisclosure` is true.
 *
 * If you are using tailwind css and want to revert to the default HTML list style, set `ulClassName="[&_ul]:list-[revert]"`
 * @param {TOCInlineProps} {
 *   toc,
 *   fromHeading = 1,
 *   toHeading = 6,
 *   asDisclosure = false,
 *   exclude = '',
 *   collapse = false,
 *   ulClassName = '',
 * }
 *
 */
const TOCInline = ({
  toc,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = false,
  exclude = '',
  collapse = false,
  ulClassName = '',
}: TOCInlineProps) => {
  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i')

  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  )

  const createList = (items: NestedTocItem[] | undefined, n: number = 0) => {
    if (!items || items.length === 0) {
      return null
    }

    return (
      <ul className={ulClassName}>
        {items.map((item, index) => (
          <li key={index} className={`mt-${3 - n * 2} text-[${15 - n}px]`}>
            <a href={item.url} className="content-anchor">
              {item.value}
            </a>
            <div className="ml-4">{createList(item.children, 1)}</div>
          </li>
        ))}
      </ul>
    )
  }

  const nestedList = createNestedList(filteredToc)

  // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  // https://web.dev/articles/intersectionobserver !
  //// https://www.smashingmagazine.com/2018/01/deferring-lazy-loading-intersection-observer-api/
  //// https://blog.webdevsimplified.com/2022-01/intersection-observer/
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -60% 0px',
      threshold: 1.0,
    }

    const observerCallBack = (entries) => {
      console.log('entries', entries)

      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        const { target } = entry

        if (entry.isIntersecting) {
          document.querySelectorAll('.content-anchor.text-primary-500').forEach((title) => {
            title.classList.remove('text-primary-500')
          })

          // const fragment = target.attributes['href'].nodeValue
          // console.log('fragment', fragment)
          // const el = document.querySelector('a[href="' + fragment + '"]')
          // console.log('el', el)
          // el?.classList.add('text-primary-500')

          const el = document.querySelector('a[href="#' + target.id + '"]')
          console.log('el', el)
          el?.classList.add('text-primary-500')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallBack, observerOptions)
    document.querySelectorAll('h2, h3').forEach((title) => {
      console.log('title', title)
      observer.observe(title)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {asDisclosure ? (
        <details open={!collapse}>
          <summary className="pb-2 pt-2 text-lg font-bold uppercase tracking-widest">
            Table of Contents
          </summary>
          <div className="ml-6">{createList(nestedList)}</div>
        </details>
      ) : (
        <section>
          <div className="mb-4 text-lg font-medium uppercase tracking-widest">
            Table of contents
          </div>
          {createList(nestedList)}
        </section>
      )}
    </>
  )
}

export default TOCInline
