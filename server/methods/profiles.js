import {Meteor} from 'meteor/meteor'
import sanitizeHtml from 'sanitize-html'

export default function(){
  Meteor.methods({
    /**
     * Updates user's avatar
     * @function call profile.avater.update
     * @param {string} avatar
     * @returns {boolean}
     */
    'profile.avatar.update'(avatar){
      check(avatar, String)
      let profile = Meteor.profiles.findOne({userId: Meteor.userId()}).update({$set: {avatar: avatar}})
      if(profile === undefined){
        return true
      } else {
        return false
      }
    },
    /**
     * Updates user's biography
     * @function call profile.biography.update
     * @param {string} bio
     * @returns {boolean}
     */
    'profile.biography.update'(bio){
      check(bio, String)
      bio = sanitizeHtml(bio)
      let profile = Meteor.profiles.update({userId: Meteor.userId()}, {$set: {biography: bio}})
      if(profile === undefined){
        return true
      } else {
        return false
      }

      //profile.set('biography', bio)
      //let save = profile.save()
      //console.log(save);
    },
    /**
     * Updates user's name
     * @function call profile.name.update
     * @param {object} names object containing the given and family name {given: "firstname", family: "surname"}
     * @returns {boolean}
     */
    'profile.name.update'(names){
      check(names, {
        given: String,
        family: String
      })

      let result = Meteor.profiles.update({userId: Meteor.userId()}, {$set: {givenName: sanitizeHtml(names.given), familyName: sanitizeHtml(names.family)}})

      if(result){
        return true
      } else {
        return false
      }
    },
    /**
     * Count all users on the site
     * @function call users.count
     * @returns {Number}
     */
    'users.count'(){
      return Meteor.users.find().count()
    }
  })
}
