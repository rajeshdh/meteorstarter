import React from 'react'
import sanitizeHtml from 'sanitize-html'

/**
 * @class component ConversationReply
 * @classdesc Reply to the given conversation
 */
export default class ConversationReply extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      typing: null
    }
  }

  isTyping(){
    this.setState({
      typing: Meteor.subscribe("typing", this.props.conversationId)
    })
  }

  isNotTyping(){
    this.state.typing.stop()
  }

  sendMessage(e){
    e.preventDefault()
    //get message
    let msg = $('#messageToSend').val()

    //sanitize
    msg = sanitizeHtml(msg)

    //send the message
    let send = this.props.conversation.sendMessage(msg)

    //increase the limit so the current conversation stays on the screen
    this.setState({
      msgLimit: this.state.msgLimit + 1
    })

    //reset the text field
    $('#messageToSend').val("")
  }

  render(){
      return (<form method="post" onSubmit={this.sendMessage.bind(this)}>
        <fieldset>
          <legend>Send message</legend>
          <div className="input-field col s12">
            <i className="material-icons prefix">mode_edit</i>
            <textarea name="message" id="messageToSend" className="materialize-textarea" onFocus={this.isTyping.bind(this)} onBlur={this.isNotTyping.bind(this)}></textarea>
            <label htmlFor="messageToSend">Message</label>
          </div>
          <input type="submit" value="send" className="btn pull-right waves-light waves-light" />
        </fieldset>
      </form>)
  }
}


ConversationReply.propTypes = {
  conversationId: React.PropTypes.string
}
