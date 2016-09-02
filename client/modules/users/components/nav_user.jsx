import React from 'react'

export default class NavUser extends React.Component {
  componentDidMount(){
    //activate the menu
    $(".button-collapse").sideNav({menuWidth: 300, closeOnClick: true})
    $(".dropdown-button").dropdown()
  }

  showAvatar(){
    //show user avatar
    if(false){
      //TODO show small version of user avatar
      return (<img className="circle responsive-img" src="/images/avatars/{this.data.userAvatar}" />)
    } else {
      return (<i className="material-icons">account_circle</i>)
    }
  }

  render(){
    return (<div className="">
      <nav role="navigation" className="blue accent-2">
        <div className="nav-wrapper container ">
          <ul className="left">
            <li><a href="#" data-activates="slide-out" ref="sideNavControl" className="button-collapse show-on-large"><i className="material-icons">menu</i></a></li>
            <li><a href={FlowRouter.path("/")} id="pageName" className="brand-logo">Web starter</a></li>
          </ul>
          <ul className="right">
            <li className="hide-on-small-only"><a title="Dashboard" className="waves-effect" href={FlowRouter.path("dashboard")}><i className="material-icons">dashboard</i></a></li>
            <li className="hide-on-med-and-down"><a title="Private Messages" className="waves-effect" href={FlowRouter.path("pm-overview")}><i className="material-icons">mail</i></a></li>
            <li><a title="Options" className="dropdown-button waves-effect" data-activates="user-dropdown" href="#!">{this.showAvatar()}</a></li>
          </ul>
          <ul id="user-dropdown" className="dropdown-content">
            <li><a className="waves-effect" href={FlowRouter.path("profile")}>Profile</a></li>
            <li><a className="waves-effect" href={FlowRouter.path("user-settings")}>Settings</a></li>
            <li><a className="waves-effect" href={FlowRouter.path("logout")}>Logout</a></li>
          </ul>
        </div>
        <ul id="slide-out" className="side-nav">
          <li><a href={FlowRouter.path("dashboard")}>Dashboard</a></li>
          <li><a href={FlowRouter.path("pm")}>Messages</a></li>
          <li><a href={FlowRouter.path("user-settings")}>Settings</a></li>
          <li><a href={FlowRouter.path("logout")}>Logout</a></li>
        </ul>
      </nav>
  </div>)
  }
}
