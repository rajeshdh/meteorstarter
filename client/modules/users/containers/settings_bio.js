import {
  useDeps, composeWithTracker, composeAll
} from 'mantra-core'
import Component from '../components/settings_bio.jsx'

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections} = context()
  if(Meteor.subscribe('profile.for', Meteor.userId()).ready()){
    const profile = Meteor.profiles.findOne({userId: Meteor.userId()})

    onData(null, {profile})
  } else {
    //onData()
  }
}

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Component)
