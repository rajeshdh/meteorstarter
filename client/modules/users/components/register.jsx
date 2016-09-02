import React from 'react'

/**
 * @class component UserRegister
 * @classdesc User registration form.
 */
class UserRegister extends React.Component{
  /**
   * Registers a new user in the system.
   * @access private
   * @param {event} e Submit event from form
   */
  register(e){
    e.preventDefault()
    //get the data
    let username = e.target.username.value
    let email = e.target.email.value
    let password = e.target.password.value
    let password2 = e.target.password2.value

    check(username, String)
    check(email, String)
    check(password, String)
    check(password2, String)

    const {create} = this.props

    create(username, email, password, password2)
  }
  /**
   * Render the registration form.
   * @access private
   */
  render(){
    const {error} = this.props
    return (
      <div className="row">
        <div className="col s12 m8 offset-m2 l4 offset-l4 center-align">
          <h1>Register</h1>
          <div className="col s12">{error ? <div className="red darken-2"><p className="white-text">{error}</p></div> : null}</div>
          <form onSubmit={this.register.bind(this)}>
            <div className="input-field col s12 left-align">
              <input className="validate" type="text" id="username" name="username" required />
              <label htmlFor="username">Your username</label>
            </div>
            <div className="input-field col s12 left-align">
              <input className="validate" type="email" name="email" required />
              <label htmlFor="email">Your e-mail</label>
            </div>
            <div className="input-field col s12 left-align">
              <input className="validate" type="password" name="password" required />
              <label htmlFor="password">Your password</label>
            </div>
            <div className="input-field col s12 left-align">
              <input className="validate" type="password" name="password2" required />
              <label htmlFor="password2">Repeat your password</label>
            </div>
            <div className="expanded button-group">
              <a href={FlowRouter.path("login")} className="waves-effect waves-teal btn-flat">Login</a>
              <input type="submit" value="Create account" className="btn waves-effect"></input>
            </div>
          </form>
        </div>
      </div>)
  }
}

export default UserRegister
