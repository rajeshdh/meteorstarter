export default {
  create({Meteor, LocalState}, username, email, password, password2){
    if (!email){
      return LocalState.set('CREATE_USER_ERROR', 'Email is required.')
    }

    if (!password){
      return LocalState.set('CREATE_USER_ERROR', 'Password is required.')
    }

    if(password !== password2){
      return LocalState.set('CREATE_USER_ERROR', 'Password does not macht.')
    }

    Accounts.createUser({email: email, username: username, password: password}, function(error){
      /* TODO: figure out why we are getting "Content is required" error here even though the user gets created successfully*/
      if(error){
        console.log(error)
        return LocalState.set('CREATE_USER_ERROR', error.reason)
      } else {
        FlowRouter.go("dashboard")
      }
    })
  },
  login({Meteor, LocalState, FlowRouter}, email, password){
    if(!email){
      return LocalState.set('LOGIN_ERROR', 'Email is required.');
    }
    if(!password){
      return LocalState.set('LOGIN_ERROR', 'Password is required.');
    }

    Meteor.loginWithPassword(email, password, function(error){
      if(error !== undefined){
        console.log(error)
        LocalState.set('LOGIN_ERROR', error.reason)
      } else {
        FlowRouter.go("dashboard")
      }
    })
  },
  clearErrors({LocalState}) {
    LocalState.set('CREATE_USER_ERROR', null)
    LocalState.set('LOGIN_ERROR', null)
    return LocalState.set('SAVING_ERROR', null)
  }
}
