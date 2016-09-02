import {
  useDeps, composeWithTracker, composeAll
} from 'mantra-core'
import Component from '../components/conversation_new.jsx'

export const composer = ({context, recipients, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context()

  /**
   * TODO move user search sub fully here?
   */
  if(LocalState.get('CONVERSATION_USER_SEARCH')){
    if(Meteor.subscribe('searchForUsers', LocalState.get('CONVERSATION_USER_SEARCH')).ready()){
      const userSearchResults = Meteor.users.find({}).fetch()
      onData(null, {userSearchResults, recipients})
    }
  } else {
    onData(null, {})
  }
}

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Component)
