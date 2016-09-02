import {
  useDeps, composeWithTracker, composeAll
} from 'mantra-core'
import Component from '../components/nav_user.jsx'

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections} = context()
  const records = Meteor.user()
  onData(null, {records})
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Component)
