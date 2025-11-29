import React from 'react'
import Header from './header'
import { Outlet } from 'react-router-dom'
import Footer from './footer'
const Layout = () => {
  return (
    <div >
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer></Footer>
  </div>
  )
}

export default Layout
