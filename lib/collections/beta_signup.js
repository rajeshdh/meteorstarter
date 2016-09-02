import {Mongo} from 'meteor/mongo'

// import socialize functionality
import {BaseModel} from 'meteor/socialize:base-model'
//import {LikeableModel} from 'meteor/socialize:likeable'
//import {CommentableModel} from 'meteor/socialize:commentable'

import {SimpleSchema} from 'meteor/aldeed:simple-schema'

const BetaSignup = BaseModel.extendAndSetupCollection("betaSignups")

BetaSignup.appendSchema({
  name: {
    type: String
  },
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    index: true,
    unique: true
  },
  reason: {
    type: String,
    optional: true
  },
  "createdAt": {
    type: Date,
    autoValue: function(){
        if(this.isInsert){
            return new Date()
        }
    },
    denyUpdate: true
  },
  "acceptedAt": {
    type: Date,
    optional: true
  }
})

export default BetaSignup
