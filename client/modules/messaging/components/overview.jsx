import React from 'react'

import UserNewConversation from './conversation_new.jsx'

/**
 * @class component UserConversationOverview
 * @classdesc Overview of all conversations that the user is involved in.
 */
export default class UserConversationOverview extends React.Component{
  constructor(props){
    super(props)

    this.getConversations = this.getConversations.bind(this)
  }

  getConversations(conversations){
    if(conversations && conversations.length > 0){
      return conversations.map((conversation)=>{

        let usersArray = []
        conversation.participants().forEach((participant)=>{
          usersArray.push(participant.user().username)
        })


        let users = usersArray[0]
        for (let i = 1; i < usersArray.length; i++) {
          users = users + ", " + usersArray[i]
        }

        let lastMessage = conversation.lastMessage()

        return <li className="collection-item avatar" key={conversation._id}>
          <a href={FlowRouter.path("pmConversation", {conversationId: conversation._id})} >
          <i className="material-icons circle">mail</i>
          <span className="title">{users}</span>
          <p className="flow-text truncate">{lastMessage.user().username}: {lastMessage.body}</p>
          </a>
        </li>
      })
    } else {
      return this.noData()
    }
  }

  noData(){
    return <li className="collection-item avatar">You are currently not conversing with anyone.</li>
  }

  render(){
    let {conversations} = this.props
    return <div>
      <section className="row valign-wrapper">
        <h1 className="col m11 l11"><a href={FlowRouter.path("/")}><i className="material-icons">arrow_back</i></a> Messages</h1>
        <div className="col m1 l1">
          <UserNewConversation buttonText={<i className="large material-icons">add</i>} buttonClass={"valign btn-floating btn-large waves-effect waves-light red"} />
        </div>
      </section>
      <ul className="collection">
        {this.getConversations(conversations)}
      </ul>
    </div>
  }
}
