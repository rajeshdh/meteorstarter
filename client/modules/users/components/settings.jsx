import React from 'react'

import UserChangeUsernane from './settings_username.jsx'
import UserChangeName from '../containers/settings_name.js'
import UserChangeBio from '../containers/settings_bio.js'
import UserEmail from '../containers/settings_email.js'
import UserChangePassword from './settings_password.jsx'
import UserChangePicture from '../containers/settings_picture.js'

/**
 * @class component UserSettings
 * @classdesc Shows full settings page.
 */
class UserSettings extends React.Component{
  changeAvatar(){ /*
    if(Package['storyteller:profiles-react-materialize']){
      return(<UserChangeAvatar />)
    }*/
  }
  /**
   * Renders the components for full settings page.
   * @access private
   */
  render(){
    return (<div className="container">
    <div className="row">
      <h1>Settings</h1>
      <div className="col s12">
        {this.changeAvatar()}
        <UserChangePicture />
        <UserChangeUsernane />
        <UserChangeName />
        <UserChangeBio />
        <UserEmail />
        <UserChangePassword />
      </div>
    </div>
    </div>)
  }
}

export default UserSettings
