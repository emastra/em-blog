import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import MainContainer from './MainContainer'
import Logo from '@/data/logo.svg'

export default function Footer() {
  return (
    // border-t border-slate-200 dark:border-slate-900
    <footer className="mt-24 bg-slate-200 dark:bg-slate-900">
      <MainContainer>
        <div className="py-16">
          <div className="flex justify-between">
            {/* column 1 */}
            <div>
              <div className="-mt-3">
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
            </div>
            {/* column 2 */}
            <div className="flex space-x-16">
              <div>
                <p className="mb-4 font-bold">Categories</p>
                <Link href="/" className="mb-2 block">
                  Guidance
                </Link>
                {/* <Link href="/" className="mb-2 block">
                  Computer Basics
                </Link> */}
                <Link href="/" className="mb-2 block">
                  Html
                </Link>
                <Link href="/" className="mb-2 block">
                  Css
                </Link>
                <Link href="/" className="mb-2 block">
                  Javascript
                </Link>
                <Link href="/" className="mb-2 block">
                  Linux
                </Link>
                {/* <Link href="/" className="mb-2 block">
                  Networks
                </Link> */}
                <Link href="/" className="mb-2 block">
                  Web
                </Link>
              </div>
              <div>
                <p className="mb-4 font-bold">Links</p>
                <Link href="/" className="mb-2 block">
                  Linkedin
                </Link>
                <Link href="/" className="mb-2 block">
                  Github
                </Link>
                <Link href="/" className="mb-2 block">
                  Twitter
                </Link>
              </div>
              <div>
                <p className="mb-4 font-bold">Links</p>
                <Link href="/" className="mb-2 block">
                  Terms of use
                </Link>
                <Link href="/" className="mb-2 block">
                  Privacy
                </Link>
                <Link href="/" className="mb-2 block">
                  RSS feed
                </Link>
              </div>
            </div>
          </div>
          {/* <div className="divide-x divide-solid"></div> */}
        </div>
      </MainContainer>
    </footer>

    // <footer>
    //   <div className="mt-16 flex flex-col items-center">
    //     <div className="mb-3 flex space-x-4">
    //       <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
    //       <SocialIcon kind="github" href={siteMetadata.github} size={6} />
    //       <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
    //       <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
    //       <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
    //       <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
    //       <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
    //       <SocialIcon kind="threads" href={siteMetadata.threads} size={6} />
    //     </div>
    //     <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
    //       <div>{siteMetadata.author}</div>
    //       <div>{` • `}</div>
    //       <div>{`© ${new Date().getFullYear()}`}</div>
    //       <div>{` • `}</div>
    //       <Link href="/">{siteMetadata.title}</Link>
    //     </div>
    //     <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
    //       <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
    //         Tailwind Nextjs Theme
    //       </Link>
    //     </div>
    //   </div>
    // </footer>
  )
}
