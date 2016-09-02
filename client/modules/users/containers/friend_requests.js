import {
  useDeps, composeWithTracker, composeAll
} from 'mantra-core'
import Component from '../components/friend_requests.jsx'

export const composer = ({context, clearErrors}, onData, user) => {
  const {Meteor, Collections} = context()

  if(Meteor.subscribe('friends.requests').ready()){
    const requests = Meteor.requests.find({userId: Meteor.userId()}).fetch()

    onData(null, {requests})
  } else {
    //onData()
  }
}

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Component)
