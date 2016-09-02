import React from 'react'
import {Materialize} from 'meteor/poetic:materialize-scss'

export default class BetaSignup extends React.Component{
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    $("#socialMedia").hide()
  }

  componentDidUpdate(){
    $("#socialMedia").hide()
  }

  signUp(e){
    e.preventDefault()

    let form = e.target
    let name = form.name.value
    let username = form.username.value
    let email = form.email.value
    let reason = form.why.value

    // TODO make the checks part of the schema
    Meteor.call("app.beta.email.unique", email, function(error, result){
      if(error){
        Materialize.toast(error.reason, 5000)
      }
      if(result){
        Meteor.call("app.beta.username.unique", username, function(error, result){
          if(error){
            Materialize.toast(error.reason, 5000)
          }
          if(result){
            Meteor.call('app.beta.signup', name, username, email, reason, (error, result)=>{
              if(error){
                Materialize.toast(error.reason, 5000)
              }
              if(result){
                $("#signupForm").hide()
                $("#socialMedia").show()
              }
            })
          } else {
            Materialize.toast("This username has already been reserved.", 5000)
          }
        })
      } else {
        Materialize.toast("This email has already been registered.", 5000)
      }
    })
  }

  render(){
    return <div>
      <h1>Beta signup</h1>
      <p className="flow-text">Literary Universe currently isn't ready for everyone. As such we are not allowing registration on our site. But, we are looking for those writers and readers who are willing to accept that there will be issues and work with us to solve them and improve the site in general. If you are interested to help us make the best of Literary Universe, we would like to encourage you sign-up bellow. We will be selecting from those who sing-up who we will let in early, but eventually we will allow everyone in.</p>

    <form onSubmit={this.signUp.bind(this)} className="row card-panel hoverable" id="signupForm">
        <div className="input-field col s12">
          <input type="text" name="name" required></input>
          <label htmlFor="name">Your name</label>
        </div>
        <div className="input-field col s12">
          <input type="text" name="username" required></input>
          <label htmlFor="username">Desired username</label>
        </div>
        <div className="input-field col s12">
          <input type="email" name="email" required></input>
          <label htmlFor="email">Your e-mail</label>
        </div>
        <div className="input-field col s12">
          <textarea name="why" className="materialize-textarea"></textarea>
          <label htmlFor="why">Why?</label>
        </div>
        <input type="submit" value='Submit' className="btn waves-effect waves-light right"></input>
      </form>

      <div id="socialMedia" className="card-panel hoverable">
        <p className="flow-text">Thank you for signing up! We will let you know once you get selected. In the meantime join us on social media:</p>
        <h2 className='center-align'>
          <a href='https://www.facebook.com/literaryuniverse' title='Facebook'><i className='fa fa-facebook-official'></i></a>
          <a href='https://twitter.com/lituniapp' title='Twitter'><i className='fa fa-twitter'></i></a>
          <a href='https://plus.google.com/111850683202775914031' title='Google Plus'><i className='fa fa-google-plus-official'></i></a>
          <a href='https://www.youtube.com/channel/UCFNquWevZRS7vDw2ducUmpw' title='YouTube'><i className='fa fa-youtube'></i></a>
        </h2>
      </div>
    </div>
  }
}
