export default {
  verify({Meteor, LocalState}, email){
    Meteor.call("accounts.email.verify.send", email, function(error, result){
      if(error){
        LocalState.set('ACCOUNTS_ERROR_EMAIL_SENDING', error.reason)
        console.log(error)
      }
    })
  }
}
