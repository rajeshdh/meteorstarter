import {Meteor} from 'meteor/meteor'

export default function(){
  Meteor.methods({
    'pm.conversation.count'(conversationId){
      check(conversationId, String)
      return Meteor.messages.find({conversationId: conversationId}, {fields: {conversationId: 1}}).count()
    }
  })
}
