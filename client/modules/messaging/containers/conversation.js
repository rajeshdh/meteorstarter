import {
  useDeps, composeWithTracker, composeAll
} from 'mantra-core'
import Component from '../components/conversation.jsx'

export const composer = ({context, conversationId}, onData) => {
  const {Meteor, Collections, MessagesSubs} = context()

  if(conversationId){
    MessagesSubs.subscribe("conversation", conversationId)
    if(MessagesSubs.ready()){
      const conversation = Meteor.conversations.findOne({_id: conversationId})

      //confirm that user can view the conversation
      let access = false

      conversation._participants.forEach((p) => {
        if(p === Meteor.userId()){
          access = true
        }
      })

      if(access){
        onData(null, {conversation})
      } else {
        // unauthorized access
        FlowRouter.go("pmOverview")
      }
    } else {
      //onData()
    }
  } else {
    FlowRouter.go("pmOverview")
  }

}

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Component)
