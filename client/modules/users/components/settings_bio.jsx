import React from 'react'
import {Materialize} from 'meteor/poetic:materialize-scss'

/**
 * @class component UserChangeBio
 * @classdesc Change user biography
 */
export default class UserChangeBio extends React.Component{
  constructor(props){
    super(props)
    $("#userBio").trigger('autoresize')
    Materialize.updateTextFields()
  }

  componentDidUpdate(){
    $("#userBio").trigger('autoresize')
    Materialize.updateTextFields()
  }

  /**
   * Changes currently logged in user's biography
   * @access private
   * @param {event} e Submit event from form
   */
  changeBio(e){
    e.preventDefault()
    let bio = e.target.userBio.value

    check(bio, String)

    Meteor.call("profile.biography.update", bio, (error, result)=>{
      if(error){
        Materialize.toast(error.reason, 5000)
        console.log(error);
      }
      if(result){
        Materialize.toast("Saved!", 3000)
      }
    })
  }

  /**
   * Content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  render(){
    let bio = null
    if(this.props.profile.biography){
      bio = this.props.profile.biography
    }

    return (
      <form method="post" className="row" ref="bioForm" onSubmit={this.changeBio.bind(this)}>
        <fieldset>
          <legend>Biography</legend>
            <div className="input-field col s12">
              <textarea id="userBio" name="userBio" className="materialize-textarea" defaultValue={bio}></textarea>
              <label htmlFor="userBio" className="active">A little bit about yourself</label>
              <input type="submit" value="Change" className="btn waves-effect"></input>
            </div>
        </fieldset>
      </form>)
  }
}
