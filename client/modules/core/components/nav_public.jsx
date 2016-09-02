import React from 'react'

export default class NavPublic extends React.Component {
  componentDidMount(){
    //activate the menu
    //TODO don't use jquery, figure out how to use React
    $(".button-collapse").sideNav({menuWidth: 300, closeOnClick: true});
    //this.refs.sideNavControl.sideNav({closeOnClick: true});
  }

  render(){
    return (<div className="navbar-fixed">
      <nav role="navigation" className="blue accent-2">
        <div className="container">
          <div className="nav-wrapper">
            <a className="brand-logo left" href={FlowRouter.path("/")}>Web starter</a>
            <a href="#" data-activates="nav-mobile" ref="sideNavControl" className="button-collapse right"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><a href={FlowRouter.path("register")}>Register</a></li>
              <li><a href={FlowRouter.path("login")}><i className="material-icons right">lock_open</i>Sign in</a></li>
            </ul>
            <ul className="side-nav" id="nav-mobile">
              <li><a href={FlowRouter.path("register")}>Register</a></li>
              <li><a href={FlowRouter.path("login")}>Sign in</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>)
  }
}
