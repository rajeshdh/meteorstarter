import React from 'react'
import {Materialize} from 'meteor/poetic:materialize-scss'

export default class UserChangeName extends React.Component{
  /**
   * Functions that run every time the component updates
   * @access private
   */
  componentDidUpdate(){
    Materialize.updateTextFields()
  }

  /**
   * Changes currently logged in user's name
   * @access private
   * @param {event} e Submit event from form
   */
  changeName(e){
    e.preventDefault()
    let given = e.target.given.value
    let family = e.target.family.value

    // check
    check(given, String)
    check(family, String)

    // TODO reconsider this approach 
    Meteor.call("profile.name.update", {given: given, family: family}, function(error, result){
      if(error){
        console.log("error", error);
        Materialize.toast(error.reason, 5000)
      }
      if(result){
        Materialize.toast("Saved!", 3000)
      }
    })
  }

  /**
   * Content to be displayed
   * @access private
   * @returns {jsx}
   */
  render(){
    let givenName, familyName = null

    if(this.props.profile.givenName || this.props.profile.familyName){
      givenName = this.props.profile.givenName
      familyName = this.props.profile.familyName
    }

    return (
      <form method="post" className="row section" ref="usernameForm" onSubmit={this.changeName.bind(this)}>
        <fieldset>
          <legend>Real name</legend>
            <div className="input-field col s12 m6">
              <input type="text" name="given" className="validate" defaultValue={givenName}></input>
              <label htmlFor="given" className="active">Given Name</label>
            </div>
            <div className="input-field col s12 m6">
              <input type="text" name="family" className="validate" defaultValue={familyName}></input>
              <label htmlFor="family" className="active">Family Name</label>
            </div>
          <input type="submit" value="Change" className="btn waves-effect"></input>
        </fieldset>
      </form>)
  }
}
