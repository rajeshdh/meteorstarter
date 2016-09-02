import React from 'react'

import Loader from '../../core/components/loader.jsx'

// import feed
import NewFeedPost from '../components/feed_new_post.jsx'
import UserFeed from '../containers/feed.js'

// import notifications

export default class UserDashboard extends React.Component{
  getFriendshipRequests(){
    let currentUser = Meteor.user()
    if(currentUser){
      let friendships

      //friends requests
      if(currentUser.numRequests() > 0){
        let msg
        if(currentUser.numRequests() > 1){
          msg = currentUser.numRequests() + " new friend requests"
        } else {
          msg = currentUser.numRequests() + " new friend request"
        }
        friendships = (<div className="col s6 m4 l3 center-align">
          <div className="card hoverable green waves-effect waves-block waves-light">
            <a href={FlowRouter.path("user-friends-requests")}>
              <div className="card-image">
                <i className="material-icons white-text">person_add</i>
              </div>
              <div className="card-content">
                <p className="flow-text white-text">{msg}</p>
              </div>
            </a>
          </div>
        </div>)
      }

      return friendships
    } else {
      return <Loader />
    }
  }

  render(){
    return(<div>
      <section className="row">
        <div className="col s6 m4 l3 center-align">
          <div className="card hoverable green darken-2 waves-effect waves-block waves-light">
            <a href={FlowRouter.path("user-groups")}>
              <div className="card-image">
                <i className="material-icons white-text">group</i>
              </div>
              <div className="card-content">
                <p className="flow-text white-text">Groups</p>
              </div>
            </a>
          </div>
        </div>

        <div className="col s6 m4 l3 center-align">
          <div className="card hoverable green darken-2 waves-effect waves-block waves-light">
            <a href={FlowRouter.path("blogs-overview")}>
              <div className="card-image">
                <i className="material-icons white-text">art_track</i>
              </div>
              <div className="card-content">
                <p className="flow-text white-text">Blogs</p>
              </div>
            </a>
          </div>
        </div>

        <div className="col s6 m4 l3 center-align">
          <div className="card hoverable green darken-2 waves-effect waves-block waves-light">
            <a href={FlowRouter.path("forums")}>
              <div className="card-image">
                <i className="material-icons white-text">forum</i>
              </div>
              <div className="card-content">
                <p className="flow-text white-text">Forums</p>
              </div>
            </a>
          </div>
        </div>

        <div className="col s6 m4 l3 center-align">
          <div className="card hoverable green darken-2 waves-effect waves-block waves-light">
            <a href={FlowRouter.path("pmOverview")}>
              <div className="card-image">
                <i className="material-icons white-text">mail</i>
              </div>
              <div className="card-content">
                <p className="flow-text white-text">Messages</p>
              </div>
            </a>
          </div>
        </div>

        <div className="col s6 m4 l3 center-align">
          <div className="card hoverable green darken-2 waves-effect waves-block waves-light">
            <a href={FlowRouter.path("user-settings")}>
              <div className="card-image">
                <i className="material-icons white-text">settings</i>
              </div>
              <div className="card-content">
                <p className="flow-text white-text">Settings</p>
              </div>
            </a>
          </div>
        </div>

        <div className="col s6 m4 l3 center-align">
          <div className="card hoverable green darken-2 waves-effect waves-block waves-light">
            <a href={FlowRouter.path("logout")}>
              <div className="card-image">
                <i className="material-icons white-text">exit_to_app</i>
              </div>
              <div className="card-content">
                <p className="flow-text white-text">Logout</p>
              </div>
            </a>
          </div>
        </div>
    </section>

    <h5>What's new</h5>
    <section className="row">
      {this.getFriendshipRequests()}
    </section>
    <hr />
    <NewFeedPost />
    <UserFeed userId={false} />
  </div>)
  }
}
