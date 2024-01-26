import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function MainContainer({ children }: Props) {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 xl:max-w-[1080px] xl:px-2">
      {children}
    </section>
  )
}
