import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'
import {SimpleSchema} from 'meteor/aldeed:simple-schema'

export default function(){
  let publicationOptionsSchema = new SimpleSchema({
    limit:{
      type: Number,
      optional: true
    },
    skip:{
      type: Number,
      optional: true
    },
    sort:{
      type: Number,
      optional: true
    }
  })

  /**
   * Searches for users
   * @param {String} query
   * @param {Array} excluded
   */
  Meteor.publish("pm.users.search", function(query, excluded){
    check(query, String)
    check(excluded, [String])
    return Meteor.users.find({username: {$regex: query, $options: 'i'}, _id: {$nin: excluded}}, {fields: {username: 1, roles: 1},limit: 10})
  })

  /**
   * Gets the specified conversation
   */
  Meteor.publishComposite("conversation", function(conversationId){
    check(conversationId, String)

    if(!this.userId){
      return this.ready()
    }

    return {
      find: function(){
        return Meteor.conversations.find({_id: conversationId}, {limit: 1})
      },
      children: [
        {
          find: function(conversation){
            return Meteor.participants.find({conversationId: conversation._id, deleted: {$exists: false}})
          },
          children: [
            {
              find: function(participant){
                return Meteor.users.find({_id: participant.userId}, {fields :{username: true}})
              }
            }
          ]
        },
        {
          find: function(conversation){
            //TODO make messages limit changeable
            return Meteor.messages.find({conversationId: conversation._id}, {limit: 10, sort: {date: -1}})
          }
        }
      ]
    }
  })

  /**
   * The following are publish options from the official package + fix for #8
   * These will be activated once the socialize package is updated to exclude these.
   */
  Meteor.publishComposite("conversations", function (options) {
     let currentUser

     if(!this.userId){
         return this.ready()
     }

     options = options || {}

     options = _.pick(options, ["limit", "skip"])

     check(options, publicationOptionsSchema)

     options.sort = {date:-1}

     return {
       find: function(){
         return Meteor.participants.find({userId: this.userId, deleted:{$exists:false}}, options)
       },
       children: [
         {
           find: function(participant){
             return Meteor.conversations.find({_id: participant.conversationId})
           },
           children: [
             {
               find: function(conversation){
                 return Meteor.participants.find({conversationId: conversation._id, deleted: {$exists: false}})
               },
               children: [
                 {
                   find: function(participant){
                     return Meteor.users.find({_id: participant.userId}, {fields:{username:true}})
                   }
                 }
               ]
             },
             {
               find: function(conversation){
                 return Meteor.messages.find({conversationId: conversation._id}, {limit: 1, sort: {date: -1}})
               }
             }
           ]
         }
       ]
     }
  })

  /**
   * Publish conversations that have not been read yet by the user
   */
  Meteor.publishComposite("conversations.unread", function(){
     if(!this.userId){
         return this.ready()
     }

     return {
       find: function(){
         return Meteor.participants.find({userId: this.userId, deleted: {$exists: false}, read: false})
       },
       children: [
         {
           find: function(participant){
             return Meteor.conversations.find({_id: participant.conversationId})
           },
           children: [
             {
               find: function(conversation){
                 return Meteor.participants.find({conversationId: conversation._id, deleted: {$exists: false}})
               },
               children: [
                 {
                   find: function(participant){
                     return Meteor.users.find({_id: participant.userId}, {fields:{username:true}})
                   }
                 }
               ]
             },
             {
               find: function(conversation){
                 return Meteor.messages.find({conversationId: conversation._id}, {limit: 1, sort: {date: -1}})
               }
             }
           ]
         }
       ]
     }
  })

  /**
  * Publish messages for a particular conversation
  * @param   {String}       conversationId The _id of the conversation to fetch messages for
  * @param   {Object}       options        Query options {limit:Number, skip:Number}
  * @returns {Mongo.Cursor} A cursor of messsages that belong to the current conversation
  */
  Meteor.publish("messages.for", function(conversationId, options){
    check(conversationId, String)

    let user = User.createEmpty(this.userId)

    options = options || {}

    check(options, publicationOptionsSchema)

    if(!this.userId){
      return this.ready()
    }

    let conversation = Conversation.createEmpty(conversationId)

    if(user.isParticipatingIn(conversation)){
      return conversation.messages(options.limit, options.skip, "date", -1)
    }
  })
}
