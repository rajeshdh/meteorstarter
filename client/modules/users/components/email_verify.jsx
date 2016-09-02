import React from 'react'
import {Accounts} from 'meteor/accounts-base'

export default class EmailVerify extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    let {token} = this.props
    if(token[0] === "3" && token[1] === "D"){
      token = token.substr(2)
    }
    return Accounts.verifyEmail(token, function(error){
      if(error){
        return <div>
          <h3>There was an error!</h3>
          <p>{error.reason}</p>
        </div>
      } else {
        FlowRouter.go('user-settings')
      }
    })
  }
}
