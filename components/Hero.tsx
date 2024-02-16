import MainContainer from './MainContainer'

const Hero = () => {
  return (
    <>
      {/* mt-[-76px] */}
      <div className="mb-24 bg-gradient-to-t from-slate-200 to-transparent to-90% pb-16 pt-32 dark:from-slate-900">
        <MainContainer>
          <div className="max-w-lg">
            <h1 className="mb-4 text-5xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 md:text-6xl md:leading-14">
              Hi, it's Emiliano!
            </h1>
            <h2 className="text-lg text-gray-600 dark:text-gray-200">
              Welcome to my blog - Thoughts from a wandering mind. I am the co-founder of Cylynx, a
              data scientist by. Have a good read! <a href="/blog">blogging</a>
            </h2>
          </div>
        </MainContainer>
      </div>
    </>
  )
}

export default Hero
