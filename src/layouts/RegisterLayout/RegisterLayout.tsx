import React, { ReactNode } from 'react'
import Footer from 'src/Components/Footer'
import RegisterHeader from 'src/Components/RegisterHeader'
interface Props {
  children?: ReactNode
}
export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}
