import {
  useDeps, composeWithTracker, composeAll
} from 'mantra-core'
import Component from '../components/conversation_participants.jsx'

export const composer = ({context, conversationId}, onData) => {
  const {Meteor, Collections, MessagesSubs} = context()
  if(MessagesSubs.subscribe("conversation", conversationId).ready()){
    const conversation = Meteor.conversations.findOne({_id: conversationId})

    onData(null, {conversation})
  } else {
    //onData()
  }
}

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Component)
