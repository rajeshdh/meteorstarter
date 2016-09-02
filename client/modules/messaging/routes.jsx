import React from 'react'
import {mount} from 'react-mounter'

// layouts
import MainLayout from '../core/components/layout_main.jsx'

// components
import UserConversationOverview from './containers/overview.js'
import UserConversation from './containers/conversation.js'

// triggers functionality
import {routeAnonOnly, routeUserOnly} from '../../configs/routes_triggers.js'

export default function(injectDeps, {FlowRouter}){
  const MainLayoutCtx = injectDeps(MainLayout)

  let userMessaging = FlowRouter.group({
    prefix: '/pm',
    triggersEnter: [routeUserOnly]
  })

  userMessaging.route("/", {
    name: "pmOverview",
    action(params, queryParams){
      mount(MainLayoutCtx, {
        content: () => (<UserConversationOverview />)
      })
    }
  })

  userMessaging.route("/:conversationId", {
    name: "pmConversation",
    action(params, queryParams){
      mount(MainLayoutCtx, {
        content: () => (<UserConversation conversationId={params.conversationId} />)
      })
    }
  })
}
