import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import MainContainer from './MainContainer'
import { usePathname } from 'next/navigation'

const Header = () => {
  // const pathname = usePathname()
  // console.log('pathname', pathname)
  // if / add div block on top of the header. change the sticky top-0, mesa de no
  // solo se client component !!

  return (
    <div className="sticky top-0 z-40 bg-white dark:bg-gray-950">
      <MainContainer>
        {/* pb-5 pt-4 */}
        <header className="flex items-center justify-between py-4">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="mb-1 hidden h-8 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
                >
                  {link.title}
                </Link>
              ))}
            <SearchButton />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
      </MainContainer>
    </div>
  )
}

export default Header
