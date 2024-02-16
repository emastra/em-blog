import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from '@/components/NewsletterForm'

const NewsletterBox = () => {
  return (
    <div className="mt-24 border-2 border-dashed border-slate-500 bg-gradient-to-bl from-slate-100 to-transparent to-90% p-8 dark:from-slate-900 sm:p-16">
      <div className="max-w-xl">
        <h2 className="mb-4 text-3xl font-extrabold leading-10 tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl md:leading-12">
          A front-end web development newsletter that sparks joy
        </h2>
        <p className="prose max-w-none text-gray-500 dark:text-gray-200">
          My goal with this blog is to create helpful content for front-end web devs, and my
          newsletter is no different! I'll let you know when I publish new content, and I'll even
          share exclusive newsletter-only content now and then.
          <br />
          <br /> No spam, unsubscribe at any time.
        </p>
        {siteMetadata.newsletter?.provider && (
          <div className="pt-8">
            <NewsletterForm title="Iscriviti alla newsletter" />
          </div>
        )}
      </div>
      {/* <div
          className="col-span-3"
          style={{
            backgroundImage: `url('/static/images/bg2.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div> */}
    </div>
  )
}

export default NewsletterBox
