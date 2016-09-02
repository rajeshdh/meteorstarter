import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'
import {SimpleSchema} from 'meteor/aldeed:simple-schema'

export default function(){
  // Setup a schema so we can check the arguments to ensure application security
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
   * Publish friend records with their related user records.
   * @function publication friends
   * @param {object} options
   */
  Meteor.publishComposite("friends", function(options){
    if(!this.userId){
      return this.ready();
    }

    options = options || {}

    check(options, publicationOptionsSchema)

    return {
      find: function(){
        return Meteor.friends.find({userId: this.userId, friendId: {$ne:this.userId}}, options)
      },
      children: [
        {
          find: function(friend){
            return Meteor.users.find({_id: friend.friendId}, {fields: {username: 1, status: 1}})
          }
        }
      ]
    }
  })

  /**
   * Publish all friend requests to the current users.
   * @function publication friends.requests
   * @param {object} options
   */
  Meteor.publishComposite('friends.requests', function(options){
    if(!this.userId){
      return this.ready()
    }

    options = options || {}

    check(options, publicationOptionsSchema)

    return {
      find: function(){
        return Meteor.requests.find({userId: this.userId, denied: {$exists: false}, ignored: {$exists: false}}, options)
      },
      children: [
        {
          find: function(request){
            return Meteor.users.find({_id: request.requesterId}, {fields: {username: 1}})
          }
        }
      ]
    }
  })

  /**
   * Ignored friend requests to the current user.
   * @function publication friends.requests.ignored
   * @param {object} options
   */
  Meteor.publishComposite('friends.requests.ignored', function(options){
    if(!this.userId){
      return this.ready()
    }

    options = options || {}

    check(options, publicationOptionsSchema)

    return {
      find: function(){
        return Meteor.requests.find({userId: this.userId, denied: {$exists: false}, ignored: {$exists: true}}, options)
      },
      children: [
        {
          find: function(request){
            return Meteor.users.find({_id: request.requesterId}, {fields: {username: 1}})
          }
        }
      ]
    }
  })

  /**
   * Friend requests from the current user to other users.
   * @function publication friends.requests.outgoing
   * @param {object} options
   */
  Meteor.publishComposite('friends.requests.outgoing', function(options){
   if(!this.userId){
      return this.ready()
   }

   options = options || {}

   check(options, publicationOptionsSchema)

   return {
     find: function(){
       return Meteor.requests.find({requesterId: this.userId, denied: {$exists: false}}, options)
     },
     children: [
       {
         find: function(request){
           return Meteor.users.find({_id: request.requesterId}, {fields: {username: 1}})
         }
       }
     ]
   }
  })
}
