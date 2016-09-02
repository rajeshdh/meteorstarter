import React from 'react'

/**
 * @class component UserLogin
 * @classdesc Shows user login form
 */
class UserLogin extends React.Component{
  /**
   * Renders the login form
   * @access private
   */
  render(){
    const {error} = this.props
    return (<div className="row">
        <div className="col s12 m8 offset-m2 l4 offset-l4 center-align">
          <h1>Login</h1>
          <div className="col s12">{error ? <div className="red darken-2"><p className="white-text">{error}</p></div> : null}</div>
          <form onSubmit={this.login.bind(this)}>
            <div className="input-field col s12 left-align">
              <input className="validate" type="email" id="email" name="email" required />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className="input-field col s12 left-align">
              <input className="validate" type="password" name="password" required />
              <label htmlFor="email">Your password</label>
            </div>
            <div className="left-align"><a href={FlowRouter.path("forgot-password")}>Forgot password?</a></div>
            <div className="expanded button-group">
              <a href={FlowRouter.path("register")} className="waves-effect waves-teal btn-flat">Register</a>
              <input type="submit" value="Login" className="btn waves-effect waves-light"></input>
            </div>
          </form>
        </div>
      </div>)
  }

  /**
   * Login the user
   * @access private
   * @param {event} e Submit event from the form
   */
  login(e){
    e.preventDefault()

    let email = e.target.email.value
    let password = e.target.password.value

    const {loginUser} = this.props
    loginUser(email, password)
  }
}

export default UserLogin
