import React, { Fragment, ReactNode } from 'react'
import Footer from 'src/Components/Footer'
import Header from 'src/Components/Header'
interface Props {
  children?: ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  )
}
