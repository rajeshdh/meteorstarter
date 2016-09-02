import {
  useDeps, composeWithTracker, composeAll
} from 'mantra-core'
import Component from '../components/settings_email.jsx'

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, LocalState} = context()
  const emails = Meteor.user().emails
  onData(null, {emails})
}

export const depsMapper = (context, actions)=>({
  verify: actions.email.verify,
  context: () => context
})

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Component)
