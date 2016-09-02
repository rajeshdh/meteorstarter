import Component from '../components/conversation_reply.jsx'
import {useDeps, composeWithTracker, composeAll} from 'mantra-core'

export const composer = ({context, conversationId}, onData) => {
  const {Meteor, Collections, MessagesSubs, LocalState} = context()

  if(conversationId){
    if(MessagesSubs.subscribe("conversation", conversationId).ready()){
      let conversation = Meteor.conversations.findOne({_id: conversationId})

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
        //console.log("Access denied!")
        //redirect back
        FlowRouter.go("pmOverview")
      }
    }
  }
}

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Component)
