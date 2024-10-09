import React from 'react'
import Aside from '@/Components/Aside'
import Header from '@/Components/Header'

const Layout = ( {children}) => {
  return (
      <div className="h-screen w-full flex flex-col">
          <Header />
          <div className="flex h-full flex-row bg-white w-full overflow-hidden">
              <Aside />
              <main className='w-full flex flex-col py-6 px-12 overflow-auto'>{children}</main>
          </div>
      </div>
  );
}

export default Layout
