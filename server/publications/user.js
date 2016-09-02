import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'

export default function(){
  /**
   * Looks up user details by username or id.
   * @param {string} userIdOrUsername User id or username
   * @returns {pointer} MongoDB pointer to the user
   */
  Meteor.publish("user.get", function(userIdOrUsername){
    check(userIdOrUsername, String)
    return Meteor.users.find({$or:[{_id:userIdOrUsername}, {username:userIdOrUsername}]}, {fields: {username: 1, createdAt: 1}})
  })

  /**
   * Fetches a basic list of users for a page listing.
   * @param {Number} page
   * @param {Number} limit Limit of users shown per page
   * @returns {pointer} MongoDB pointer to the user
   */
  Meteor.publish("users.list", function(page, limit){
    check(page, Number)
    check(limit, Number)

    let skip = (page - 1) * limit

    return Meteor.users.find({}, {fields: {username: 1, createdAt: 1}, limit: limit, skip: skip})
  })
}
