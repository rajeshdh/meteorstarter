import React from 'react'
import {Accounts} from 'meteor/accounts-base'
import {Materialize} from 'meteor/poetic:materialize-scss'
/**
 * @class component SetPassword
 * @classdesc Component where users can reset their password.
 */
export default class SetPassword extends React.Component{
  setPassword(e){
    e.preventDefault()

    let pass1 = e.target.pass1.value
    let pass2 = e.target.pass2.value

    if(pass1 === pass2){
      let {token} = this.props
      if(token){
        /**
         * TODO figure out why "3D" is added after "=" in url token creation
         * so that we don't have to doctor the token
         */
        if(token[0] === "3" && token[1] === "D"){
          token = token.substr(2)
        }
        Accounts.resetPassword(token, pass1, function(error){
          if(error){
            console.log(error)
            Materialize.toast(error.reason, 5000)
          } else {
            Materialize.toast("Passwords set!", 5000)
            FlowRouter.go('dashboard')
          }
        })
      }
      // for future actions like enrollment

    } else {
      Materialize.toast("Passwords don't match!", 5000)
      e.target.reset()
    }
  }
  render(){
    return <form method="post" onSubmit={this.setPassword.bind(this)}>
      <div className="input-field">
        <input type="password" name="pass1" className="validate" />
        <label htmlFor="pass1">New password</label>
      </div>
      <div className="input-field">
        <input type="password" name="pass2" className="validate" />
        <label htmlFor="pass2">Repeat password</label>
      </div>
      <div className="input-field right-align">
        <input type="submit" className="btn waves-effect waves-light" />
      </div>
    </form>
  }
}
