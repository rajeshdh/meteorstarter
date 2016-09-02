import React from 'react'

/**
 * @class component ForgotPassword
 * @classdesc A form to fill in e-mail to send reset password link to.
 */
export default class ForgotPassword extends React.Component{
  sendReset(e){
    e.preventDefault()

    let email = e.target.email.value

    check(email, String)

    Meteor.call("accounts.password.reset.email.send", email, (error, result)=>{
      if(error){
        console.log(error)
        Materialize.toast(error.reason, 5000)
      }
      if(result){
        Materialize.toast("E-mail was send", 5000)
        FlowRouter.go("/")
      } else {
        //Materialize.toast("User not found!", 5000) //NOTE don't show any message as not to help scammers
        e.target.reset()
      }
    })
  }

  render(){
    return <form method="post" onSubmit={this.sendReset.bind(this)} className="row">
      <h2 className="center-align">Reset password</h2>
      <div className="input-field col s12 m10">
        <i className="material-icons prefix">mail</i>
        <input type="email" name="email" className="validate" />
        <label htmlFor="email">Your e-mail</label>
      </div>
      <div className="input-field col s12 m2">
        <input type="submit" value="submit" className="btn waves-effect waves-light" />
      </div>
    </form>
  }
}
