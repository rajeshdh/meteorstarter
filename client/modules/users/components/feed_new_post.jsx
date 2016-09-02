import React from 'react'
import sanitizeHtml from 'sanitize-html'

export default class NewFeedPost extends React.Component{
  addPost(e){
    e.preventDefault()

    // get the value
    let body = e.target.postText.value

    // sanitize
    body = sanitizeHtml(body)

    // add post
    Meteor.user().feed().addPost(body)

    // reset the form
    e.target.reset()
  }

  render(){
    if(Meteor.userId()){
      return <form id="postForm" method="post" className="row card-panel hoverable" onSubmit={this.addPost.bind(this)}>
        <div className="input-field col s12">
          <input type="text" className="validate" name="postText" />
          <label htmlFor="postText">New post</label>
        </div>
      </form>
    }
  }
}
