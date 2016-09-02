import React from 'react'
import {Materialize} from 'meteor/poetic:materialize-scss'

/**
 * @class component UserChangeUsername
 * @classdesc Allows user to change username
 */
export default class UserChangeUsernane extends React.Component{
  /**
   * Changes currently logged in user's username
   * @access private
   * @param {event} e Submit event from form
   */
  changeUsername(e){
    e.preventDefault()
    let username = e.target.username.value
    check(username, String)
    Meteor.call("accounts.username", username, function(error, result){
      if(error){
        Materialize.toast(error.reason, 5000)
        console.log("error", error)
      }
      if(result === false){
        e.target.reset()
        //TODO test
        Materialize.toast("That username exists already.", 5000)
      } else {
        Materialize.toast("Username has been changed.", 4000)
      }
    })
  }
  /**
   * Actual content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  render(){
    return (
      <form method="post" className="row" ref="usernameForm" onSubmit={this.changeUsername.bind(this)}>
        <fieldset>
          <legend>Change Username</legend>
          <div className="input-field col s12">
            <input type="text" className="validate" name="username" defaultValue={Meteor.user().username}></input>
            <label htmlFor="username" className="active">Username</label>
            <input type="submit" value="Change" className="btn waves-effect"></input>
          </div>
        </fieldset>
      </form>)
  }
}
