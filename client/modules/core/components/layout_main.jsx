import React from 'react'

// navigation
import Navigation from './navigation.jsx'
// footer
import Footer from './footer.jsx'

const MainLayout = ({content}) => (
  <div id="app">
    <Navigation />
    <div id="contentView" className="container">
      <div className="row">
        <div className="col s12">
          <main className="card-panel">
            {content()}
          </main>
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

export default MainLayout
