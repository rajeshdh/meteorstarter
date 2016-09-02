import React from 'react'
import {Materialize} from 'meteor/poetic:materialize-scss'
import sanitizeHtml from 'sanitize-html'
import {check} from 'meteor/check'

/**
 * @class component UserNewConversation
 * @classdesc Modal to start a new conversation.
 */
export default class UserNewConversation extends React.Component{
  constructor(props){
    super(props)

    let users = props.recipients

    if(users === undefined){
      users = []
    }

    this.state = {
      users: users
    }

    this.usersListing.bind(this)
    this.populateSuggestions.bind(this)
  }

  componentDidMount(){
    this.hideSuggestions()
  }

  /**
   * Searches for a user
   */
  lookupUser(event){
    let query = event.target.value
    //check(query, String)

    //first wait for at least three characters to by typed before doing anything
    if(query.length > 2){
      //exlude users that have already been added + current user
      let excluded = [Meteor.userId()]
      this.state.users.forEach((user)=>{
        excluded.push(user._id)
      })

      //search through users collection
      Meteor.subscribe("pm.users.search", query, excluded, ()=>{
        //onReady
        this.setState({
          search: Meteor.users.find({username: {$regex: query, $options: 'i'}, _id: {$nin: excluded}}, {limit: 10}).fetch()
        })
        this.showSuggestions()
      })
    } else {
      this.hideSuggestions()
    }
  }

  showSuggestions(){
    $("#searchSuggestions").show()
  }

  populateSuggestions(){
    if(this.state.search){
      return this.state.search.map((user)=>{
        return <a href="#!" key={"SUG"+user._id} className="suggestion-item avatar" onClick={this.addUser.bind(this, user)}>
          <i className="material-icons circle">account_circle</i>
          <span className="title">{user.username}</span>
        </a>
      })
    } else {
      //TODO fix that this displays
      return <div className="suggestion-item"><span className="title">No results.</span></div>
    }

  }

  hideSuggestions(){
    $("#searchSuggestions").hide()
  }

  /**
   * Adds a user to the list of recipients
   * @var user User Object
   */
  addUser(user){
    //clear the searchbox
    let test = $("#searchUsernames").val("")

    users = this.state.users
    users.push(user)

    this.setState({
      users: users
    })

    //hide suggestions
    this.hideSuggestions()
  }

  /**
   * Removes a user from recipients
   */
  removeUser(user){
    let users = this.state.users

    let i = users.indexOf(user)

    users.splice(i, 1)

    this.setState({
      users: users
    })
  }

  /**
   * Creates a list of users that have already been added to the conversation
   */
  usersListing(){
    //create a listing of users
    if(this.state.users.length > 0){
      return this.state.users.map((user)=>{
        //NOTE: can't add the close tag since Materialize fires the event to remove the element before the function is called
        return <a href="#!" onClick={this.removeUser.bind(this, user)} key={user._id} className="chip">
                {user.username}
              </a>
      })
    }
  }

  /**
   * Sends the initial message
   */
  sendMessage(e){
    e.preventDefault()
    let msg = e.target.msg.value
    let users = this.state.users
    check(msg, String)
    check(users, Array)
    if(users.length > 0){
      //create conversation
      let converstation = new Conversation().save()

      //add participants
      users.forEach((user) => {
        converstation.addParticipant(user)
      })

      //sanitize
      msg = sanitizeHtml(msg)
      if(msg.length > 0){
        //send the message
        converstation.sendMessage(msg)

        Materialize.toast("Converstaion created!", 3000)

        //close modal or redirect to the conversation
        $('#newConversation').closeModal()
      } else {
        Materialize.toast("You should really say something...", 5000)
      }
    } else {
      Materialize.toast("You need to add at least one other user!", 5000)
    }
  }

  openModal(e){
    e.preventDefault()
    $('#newConversation').openModal()
  }


  render(){
    let {buttonClass, buttonText} = this.props

    if(buttonClass === null || buttonClass === undefined){
      buttonClass = "btn waves-effect modal-trigger"
    } else {
      buttonClass += " modal-trigger"
    }

    if(buttonText === null || buttonText === undefined){
      buttonText = "Send a message"
    }

    //the search element
    let search = <div className="input-field">
      <i className="material-icons prefix">search</i>
      <input id="searchUsernames" name="searchUsernames" type="text" className="validate" onInput={this.lookupUser.bind(this)} />
      <label className="active" htmlFor="searchUsernames">Username</label>
      <div id="searchSuggestions" className="search-suggestions-box">
        {this.populateSuggestions()}
      </div>
    </div>

    return (
      <div>
        <a className={buttonClass} onClick={this.openModal.bind(this)}>{buttonText}</a>
        <div id="newConversation" className="modal">
          <div className="modal-content">
            <form method="post" onSubmit={this.sendMessage.bind(this)}>
              {search}
              <div className="">
                To: {this.usersListing()}
              </div>
              <div className="input-field">
                <i className="material-icons prefix">mode_edit</i>
                <textarea name="msg" className="materialize-textarea validate" />
                <label htmlFor="msg">Message</label>
              </div>
              <div className="input-field">
                <input type="submit" className="btn waves-effect waves-light right" value="Send" />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
