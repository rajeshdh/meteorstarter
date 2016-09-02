import {Meteor} from 'meteor/meteor'
//import {FlowRouter} from 'meteor/kadira:flow-router-ssr'

/**
 * Functions for routes
 *
 */
export function routeAnonOnly(context, redirect){
  if(Meteor.userId()){
    redirect("dashboard")
  }
}

export function routeUserOnly(context, redirect){

  //TODO after loging redirect back to the given page
  if(Meteor.userId() === null){
    redirect("login")
  }
}

export default function(){
  return {
    routeAnonOnly,
    routeUserOnly
  }
}
