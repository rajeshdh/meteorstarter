import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'

export default function(){
  Meteor.methods({
    /**
     * Change username for current logged in user
     * @param {string} newUsername
     */
    'accounts.username'(newUsername){
      check(newUsername, String)
      return Accounts.setUsername(Meteor.userId(), newUsername)
    },
    /**
     * Associate a new e-mail with the user
     * @param {string} newEmail
     */
    'accounts.email.add'(newEmail){
      check(newEmail, String)
      return Accounts.addEmail(Meteor.userId(), newEmail)
    },
    /**
     * Remove the given e-mail from the user
     * @param {string} email
     */
    'accounts.email.remove'(email){
      check(email, String)
      // double check that there will be an e-mail left if we remove
      let user = Meteor.users.find({"emails.address": email}).fetch()
      if(user[0].emails.length < 2){
        throw new Meteor.Error("last-email", "You can't delete your last e-mail.")
      } else {
        return Accounts.removeEmail(Meteor.userId(), email)
      }
    },
    /**
     * Sends a verification e-mail to the given e-mail
     * @param {string} email
     */
    'accounts.email.verify.send'(email){
      check(email, String)
      return Meteor.defer(function(){
        return Accounts.sendVerificationEmail(Meteor.userId(), email)
      })
    },
    /**
     * Send a reset password link to the given email.
     * @param {string} email
     */
    'accounts.password.reset.email.send'(email){
      check(email, String)
      let user = Accounts.findUserByEmail(email)

      user = user._id

      check(user, String)

      if(user !== null){
        return Meteor.defer(function(){
          return Accounts.sendResetPasswordEmail(user, email)
        })
      } else {
        return false
      }
    }
  })
}
