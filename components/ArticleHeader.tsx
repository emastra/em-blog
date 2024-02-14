import MainContainer from './MainContainer'
import PageTitle from '@/components/PageTitle'

const ArticleHeader = ({ title }) => {
  return (
    <>
      <div className="mb-24 bg-gradient-to-t from-slate-200 to-white to-90% pb-16 pt-32 dark:from-slate-900 dark:to-gray-950">
        <MainContainer>
          <div>
            <PageTitle>{title}</PageTitle>
          </div>
        </MainContainer>
      </div>
    </>
  )
}

export default ArticleHeader
