import {
  useDeps, composeWithTracker, composeAll
} from 'mantra-core'
import Component from '../components/feed.jsx'

export const composer = ({context, userId, clearErrors}, onData) => {
  const {LocalState, Meteor, Collections} = context()

  let postLimit = LocalState.get('USER_FEED_POST_LIMIT')
  if(postLimit === undefined){
    postLimit = 10
  }

  // it loads twice
  // TODO fix
  // Possibly page 49 of Meteor+React ???
  if(userId){
    if(Meteor.subscribe('feed.posts', userId, {limit: postLimit}).ready()) {
      const posts = Meteor.posts.find({posterId: userId}, {sort: {date: -1}}).fetch()
      onData(null, {posts, postLimit})
    } else {
      //onData()
    }
  } else {
    if(Meteor.subscribe('feed', {limit: postLimit}).ready()) {
      const posts = Meteor.posts.find({}, {sort: {date: -1}}).fetch()
      onData(null, {posts, postLimit})
    } else {
      //onData()
    }
  }
}

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Component)
