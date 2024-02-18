import MainContainer from './MainContainer'
import PageTitle from '@/components/PageTitle'
import CategoryLabel from './CategoryLabel'

const ArticleHeader = ({ title, category }) => {
  return (
    <>
      <div className="mb-24 bg-gradient-to-t from-slate-200 to-transparent to-90% pb-16 pt-32 dark:from-slate-900">
        <MainContainer>
          {/* <div className=" mb-4 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
            {'Home > Articoli > Categoria'}
          </div> */}
          <div className="mb-10">
            <CategoryLabel name={category} size="lg" />
          </div>
          {/* prendi link da homelistlayout */}
          <div>
            <PageTitle>{title}</PageTitle>
          </div>
          <div className="mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
            <div>Lorem ipsum lorem ipsum ya ya ya</div>
          </div>
          {/* <div className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            Aggiornato: 16 Feb, 2024
          </div> */}
        </MainContainer>
      </div>
    </>
  )
}

export default ArticleHeader
