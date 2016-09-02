import React from 'react'
import moment from 'moment'

/**
 * @class component ConversationMessage
 * @classdesc Component to display a full user conversation.
 */
export default class ConversationMessage extends React.Component{
  constructor(props){
    super(props)
    this.getMessages = this.getMessages.bind(this)

    this.state = {
      viewing: Meteor.subscribe("viewingConversation", props.conversationId)
    }
  }

  componentWillUnmount(){
    this.state.viewing.stop()
  }

  getMessages(){
    let {messages} = this.props
    return messages.map((msg)=>{
      let user = msg.user()

      return <div key={msg._id} className="row">
        <div className="col s10"><strong>{user.username}:</strong> {msg.body}</div>
        <div className="col s2">{moment(msg.date).fromNow()}</div>
      </div>
    })
  }

  render(){
    return <div>
      {this.getMessages()}
    </div>
  }
}


ConversationMessage.propTypes = {
  conversationId: React.PropTypes.string,
  msgLimit: React.PropTypes.number
}
