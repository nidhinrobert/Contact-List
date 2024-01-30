import React from 'react'
import ContactList from './ContactList'
import Header from './Header'
import Footer from './footer'


const MainLayout = () => {
  return (
    <div>
       <Header/>
       <ContactList/>
       <Footer/>
    </div>
  )
}

export default MainLayout