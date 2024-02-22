import { slug } from 'github-slugger'

const CrumbDivider = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="relative bottom-[1px] mx-2 inline"
    >
      <polyline points="9 18 15 12 9 6" opacity="0.6"></polyline>
    </svg>
  )
}

const Breadcrumb = ({ crumbData }) => {
  const crumb = crumbData.slice(0, -1)

  return (
    <nav
      aria-label="Breadcrumb"
      role="navigation"
      className="mb-8 text-base leading-6 tracking-tight text-gray-500 dark:text-gray-400"
    >
      <ol>
        {crumb.map((c, index) => (
          <li
            key={slug(c.title)}
            className="inline-block transition-colors hover:text-gray-900 hover:dark:text-gray-100"
          >
            <a href={c.url} aria-label={`Go to ${c.title}`}>
              {c.title}
            </a>
            {index < crumb.length - 1 && <CrumbDivider />}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
