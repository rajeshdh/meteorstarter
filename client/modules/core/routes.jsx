import {FlowRouter} from 'meteor/kadira:flow-router-ssr'
import React from 'react'
import {mount} from 'react-mounter'

// triggers functionality
import {routeAnonOnly, routeUserOnly} from '../../configs/routes_triggers.js'

// layouts
import MainLayout from './components/layout_main.jsx'

// homepage
import Homepage from '../pages/components/homepage.jsx'

// user dashboard
import UserDashboard from '../users/containers/dashboard.js'

export default function(injectDeps, {FlowRouter}){
  const MainLayoutCtx = injectDeps(MainLayout)
  /**
   * Routes
   */
  FlowRouter.route('/', {
    name: 'homepage',
    triggersEnter: [routeAnonOnly],
    action(){
      mount(MainLayoutCtx, {
        content: ()=>(<Homepage />)
      })
    }
  })

  FlowRouter.route("/dashboard", {
   name: "dashboard",
   triggersEnter: [routeUserOnly],
   action(){
     mount(MainLayoutCtx, {
       content: () => (<UserDashboard />)
     })
   }
  })
}
