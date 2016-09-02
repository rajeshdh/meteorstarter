import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'
import {SimpleSchema} from 'meteor/aldeed:simple-schema'
import {Roles} from 'meteor/alanning:roles'

export default function(){
  /**
   * User settings schema
   *
   */
  Accounts.validateNewUser((user) => {
   new SimpleSchema({
     _id: { type: String, regEx: SimpleSchema.RegEx.Id },
     username: {type: String, index: true, unique: true},
     emails: { type: Array },
     'emails.$': { type: Object },
     'emails.$.address': { type: String, regEx: SimpleSchema.RegEx.Email },
     'emails.$.verified': { type: Boolean },
     createdAt:{
         type: Date,
         autoValue: function(){
             if(this.isInsert || !this.isFromTrustedCode){
                 return new Date()
             }
         },
         denyUpdate: true
     },
     services: { type: Object, blackbox: true }
   }).validate(user)

   // Return true to allow user creation to proceed
   return true
  })

  /**
   * Assign basic roles
   */
  Meteor.users.after.insert((userId, document)=>{
    Roles.addUsersToRoles(document._id, 'user', Roles.GLOBAL_GROUP)
  })
}
