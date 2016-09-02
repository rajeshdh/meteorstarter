import {
  useDeps, composeWithTracker, composeAll
} from 'mantra-core'
import Component from '../components/conversation_messages.jsx'

export const composer = ({context, conversationId, msgLimit, clearErrors}, onData) => {
  const {Meteor, Collections, FlowRouter, LocalState, MessagesSubs} = context()

  if(!msgLimit){
    msgLimit = 10
  }

  if(conversationId){
    MessagesSubs.subscribe("messages.for", conversationId, {limit: msgLimit, skip: 0})
    MessagesSubs.subscribe("conversation", conversationId)

    if(MessagesSubs.ready()){
      let messages = Meteor.messages.find({conversationId: conversationId}, {sort: {date: 1}}).fetch()
      let conversation = Meteor.conversations.findOne({_id: conversationId})

      //confirm that user can view the conversation
      let access = false

      conversation._participants.forEach((p) => {
        if(p === Meteor.userId()){
          access = true
        }
      })

      if(access){
        onData(null, {messages})
      } else {
        //Materialize.toast("Access denied!", 3000)
        //unsubscribe
        MessagesSubs.stop()
        //redirect back
        FlowRouter.go("pmOverview")
      }
    } else {
      //onData()
    }
  } else {
    FlowRouter.go("pmOverview")
  }

  return clearErrors
}

export const depsMapper = (context, actions) => ({
  clearErrors: actions.messages.clearErrors,
  context: () => context
})

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Component)
