import React from 'react'

/**
 * Search for stories and universes
 */
export default class UserSearch extends React.Component{
  constructor(props){
    super(props)

    this.showResults.bind(this)
    this.state = {
      results: null
    }
  }

  search(e){
    e.preventDefault()
    let query = e.target.value
    if(query.length > 2){
      const results = Meteor.subscribe("pm.users.search", query, [Meteor.userId()], ()=>{
        this.setState({
          results: Meteor.users.find({username: {$regex: query, $options: 'i'}, _id: {$nin: [Meteor.userId()]}}, {fields: {username: 1, roles: 1}}).fetch()
        })
      })
      if(results.ready() === false){
        this.setState({
          results: false
        })
      }
    }
  }

  showResults(){
    let {results} = this.state
    // first account for not results or search not even started
    if(results === false){
      return <div>Searching...</div>
    } else if (results === undefined || results === null) {
      return null
    } else if (results.length < 1) {
      return <p className="flow-text">No users found.</p>
    }

    // no return back stuff
    return results.map((user)=>{
      return <a key={user._id} href={FlowRouter.path("profilePublic", {username: user.username})} className="collection-item"><i className="material-icons">account_circle</i> {user.username}</a>
    })
  }

  render(){
    return <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">search</i>
          <input type="text" name="search" id="search" onKeyUp={this.search.bind(this)}></input>
          <label htmlFor="search">Search</label>
        </div>
      <div className="collection">
        {this.showResults()}
      </div>
    </div>
  }
}
