import {createApp} from 'mantra-core'
import initContext from './configs/context'

// modules
import coreModule from './modules/core'
import pagesModule from './modules/pages'
import usersModule from './modules/users'
import messagingModule from './modules/messaging'

// initialize context
const context = initContext()

// create the app
const app = createApp(context)

// load the modules
app.loadModule(coreModule)
app.loadModule(pagesModule)
app.loadModule(usersModule)
app.loadModule(messagingModule)

// initialize
app.init()
