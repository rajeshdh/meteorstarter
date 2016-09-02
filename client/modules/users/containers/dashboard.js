import {
  useDeps, composeWithTracker, composeAll
} from 'mantra-core'
import Component from '../components/dashboard.jsx'

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections} = context()
  if(Meteor.subscribe('friends.requests').ready()) {
    const friendRequests = Meteor.requests.find({userId: Meteor.userId()}).fetch()
    onData(null, {friendRequests})
  } else {
    //onData()
  }
}

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Component)
