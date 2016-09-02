/**
 * As per Mantra specs here we define what all of the files on the client side will have in common.
 */
import * as Collections from '/lib/collections'
import {Meteor} from 'meteor/meteor'
import {FlowRouter} from 'meteor/kadira:flow-router-ssr'
import {ReactiveDict} from 'meteor/reactive-dict'
import {Tracker} from 'meteor/tracker'
// Subscription manager
import {SubsManager} from 'meteor/meteorhacks:subs-manager'

const UserSubs = new SubsManager()
const ProfileSubs = new SubsManager()
const MessagesSubs = new SubsManager()

export default function(){
  return {
    Meteor,
    FlowRouter,
    Collections,
    LocalState: new ReactiveDict(),
    Tracker,
    /* SUBS */
    UserSubs,
    ProfileSubs,
    MessagesSubs
  }
}
