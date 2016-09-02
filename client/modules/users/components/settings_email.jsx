import React from 'react'
import {Materialize} from 'meteor/poetic:materialize-scss'

/**
 * @class component UserEmail
 * @classdesc Shows e-mails associated with the account and allows to add more or delete them.
 */
export default class UserEmail extends React.Component{
  constructor(){
    super()

    this.verification.bind(this)
  }
  /**
   * Prepares the list of e-mails for display
   * @access private
   * @returns {jsx}
   */
  getEmails(emails){
    if(Meteor.user() !== undefined){
      return emails.map((email) => {
        let verified = null
        if(email.verified){
          verified = (<i className="material-icons green-text">check</i>)
        } else {
          verified = (<div className="chip red darken-1"><a href="#!" onClick={this.verification.bind(this, email.address)}>not verified</a></div>)
        }
        return (<li key={email.address} className="collection-item">{email.address} {verified}<div className="secondary-content"><a href="#!" onClick={this.removeEmail}><i id={email.address} className="material-icons">delete</i></a></div></li>)
      })
    } else {
      // TODO add Loader here
      return <div>Loading...</div>
    }
  }

  /**
   * Removes the particular e-mail that was clicked
   * @access private
   * @param {event} e Click event
   */
  removeEmail(e){
    e.preventDefault()
    //TODO figure out a better way that doesn't uses jquery
    email = e.target.id
    Meteor.call("accounts.email.remove", email, function(error, result){
      if(error || result === false){
        Materialize.toast(error.reason, 4000)
        console.log("error", error)
      }
      if(result){
         Materialize.toast(email + " has been removed.", 4000)
      }
    })
  }

  /**
   * Adds the inputed e-mail to the list and creates a Materialize toast with the result
   * @access private
   * @param {event} e Submit event from form
   */
  addEmail(e){
    e.preventDefault()
    let email = e.target.email.value
    if(email.length > 6){
      Meteor.call("accounts.email.add", email, (error, result)=>{
        if(error){
          Materialize.toast("There has been an error!", 5000)
          console.log("error", error)
        }
        if(result === false){
          Materialize.toast(email + " is already associated with another account.", 5000)
        } else {
          Materialize.toast(email + " has been added.", 4000)
          this.verification(email)
        }
      })
      e.target.reset()
    } else {
      Materialize.toast("That is not a valid e-mail address!", 4000)
    }
  }

  /**
   * @access private
   * @param {event} e Click event
   */
  verification(email){
    /** TODO make Mantra work here
    const {verify} = this.props
    verify(email)
    */
    Meteor.call("accounts.email.verify.send", email, function(error, result){
      if(error){
        console.log(error)
      } else {
        Materialize.toast("Verification e-mail send.", 5000)
      }
    })

  }

  /**
   * Content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  render(){
    return (
      <form method="post" className="row" ref="emailForm" onSubmit={this.addEmail.bind(this)}>
        <fieldset>
          <legend>E-mails</legend>
          <ul className="collection with-header col s12">
            <li className="collection-header">E-mails associated with your account</li>
            {this.getEmails(this.props.emails)}
          </ul>
          <div className="input-field col s12">
            <input type="email" className="validate" required name="email"></input>
            <label htmlFor="email">Add e-mail</label>
          </div>
          <input type="submit" className="btn waves-effect waves-light" value="Add"></input>
        </fieldset>

      </form>)
  }
}
