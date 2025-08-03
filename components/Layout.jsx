import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Ecommerce Store</title>
      </Head>
      {/* Test Mode Banner */}
      <div style={{
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '8px 0',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        🧪 TEST MODE - No real payments will be processed | Test card: 4242 4242 4242 4242
      </div>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout