import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

// !
// Used only in PostLayout.
// Also in LayoutWrapper, PostBanner, PostSimple components, but they are not used.
// For main use, I created MainContainer component.

export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 xl:max-w-[1080px] xl:px-2">
      {children}
    </section>
  )
}
