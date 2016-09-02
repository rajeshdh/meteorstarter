import React from 'react'
import NavUser from '../../users/containers/nav_user.js'
import NavPublic from './nav_public.jsx'

export default class Navigation extends React.Component{
  render(){
    //determine which menu to show
    if(Meteor.userId()){
      //user is logged in
      return (<NavUser />)
    } else {
      return (<NavPublic />)
    }
  }
}
