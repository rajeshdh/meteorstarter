import React from 'react'
import {mount} from 'react-mounter'
import {Accounts} from 'meteor/accounts-base'

// layouts
import MainLayout from '../core/components/layout_main.jsx'

// triggers functionality
import {routeAnonOnly, routeUserOnly} from '../../configs/routes_triggers.js'

// components
import UserRegister from './containers/register.js'
import UserLogin from './containers/login.js'
import UserSettings from './components/settings.jsx'
import UserProfile from './containers/profile.js'
import UserFriendsRequests from './containers/friend_requests.js'
import ForgotPassword from './components/password_forgot.jsx'
import SetPassword from './components/password_set.jsx'
import EmailVerify from './components/email_verify.jsx'
import UserListing from './containers/list.js'
import UserSearch from './components/search.jsx'
import BetaSignup from './components/signup_beta.jsx'

export default function(injectDeps, {FlowRouter}){
  const MainLayoutCtx = injectDeps(MainLayout)

  /**
   * Routes
   */
  FlowRouter.route('/register', {
    name: 'register',
    triggersEnter: [routeAnonOnly],
    action(){
      mount(MainLayoutCtx, {
        content: ()=>(<UserRegister />)
        //content: ()=>(<BetaSignup />)
      })
    }
  })

  FlowRouter.route('/login', {
    name: 'login',
    triggersEnter: [routeAnonOnly],
    action(){
      mount(MainLayoutCtx, {
        content: ()=>(<UserLogin />)
      })
    }
  })

  FlowRouter.route('/logout', {
    name: 'logout',
    triggersEnter: [routeUserOnly],
    action(){
      Meteor.logout(function(error){
        if(error !== undefined){
          console.log(error)
        }
        FlowRouter.go('/')
      })
    }
  })

  /**
   * Create a group for all user related activities
   */
  let userRoutes = FlowRouter.group({
    prefix: '/user',
    triggersEnter: [routeUserOnly]
  })

  userRoutes.route('/settings', {
    name: 'user-settings',
    action(){
      mount(MainLayoutCtx, {
        content: ()=>(<UserSettings />)
      })
    }
  })

  userRoutes.route('/profile', {
    name: "profilePersonal",
    action(){
      mount(MainLayoutCtx, {
        content: ()=>(<UserProfile user={Meteor.users.findOne({_id: Meteor.userId()}).username} />)
      })
    }
  })

  let profileRoutes = FlowRouter.group({
    prefix: '/profile'
  })

  profileRoutes.route('/:username', {
    name: "profilePublic",
    action(params, queryParams){
     //check if user exists
     if(params.username !== null && ! Meteor.user({username: params.username})){
       //show 404
       console.log("User not found!")
     }

     //if username null, go to the currently logged in user
     if(params.username === null){
       if(Meteor.userId()){
         FlowRouter.go("profilePersonal")
       } else {
         //show 404
         console.log("User not found!")
       }
     }

     mount(MainLayoutCtx, {
       content: ()=>(<UserProfile user={params.username} />)
    })
   }
 })

 // friendship requests
 userRoutes.route("/friends/requests", {
   name: "user-friends-requests",
   action(){
     mount(MainLayoutCtx, {
       content: () => (<UserFriendsRequests />)
     })
   }
 })

 // password operations
 FlowRouter.route('/forgot-password', {
   name: 'forgot-password',
   triggersEnter: [routeAnonOnly],
   action(params, queryParams){
     mount(MainLayoutCtx, {
       content: () => (<ForgotPassword />)
     })
   }
 })

 FlowRouter.route('/reset-password', {
   name: 'reset-password',
   triggersEnter: [routeAnonOnly],
   action(params, queryParams){
     mount(MainLayoutCtx, {
       content: () => (<SetPassword token={queryParams.token} />)
     })
   }
 })

 FlowRouter.route('/user/verify-email', {
   name: 'verify-email',
   action(params, queryParams){
     mount(MainLayoutCtx, {
       content: () => (<EmailVerify token={queryParams.token} />)
     })
   }
 })

 FlowRouter.route('/user/search', {
   name: 'userSearch',
   action(params, queryParams){
     mount(MainLayoutCtx, {
       content: () => (<UserSearch />)
     })
   }
 })

 FlowRouter.route('/users', {
   action(params){
     FlowRouter.go("userListing", {page: 1})
   }
 })

 FlowRouter.route('/users/:page', {
   name: 'userListing',
   action(params){
     let page = params.page
     if(page === undefined || page === 0){page = 1}
     mount(MainLayoutCtx, {
       content: ()=>(<UserListing page={page} />)
     })
   }
 })
}
