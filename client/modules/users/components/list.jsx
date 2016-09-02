import React from 'react'

export default class UserListing extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    let list = this.props.users.map((user)=>{
      return <a key={user._id} href={FlowRouter.path("profilePublic", {username: user.username})} className="collection-item"><i className="material-icons">account_circle</i> {user.username}</a>
    })

    let {page, totalUsers} = this.props
    let previousPage, nextPage
    let perPage = 10

    page = Number(page)

    if(page <= 1){
      previousPage = "disabled"
    }

    if(totalUsers >= (page - 1) * perPage ){
      nextPage = "disabled"
    }

    return <div>
      <h1>User listing</h1>
      <div className="collection">
        {list}
      </div>
      <ul className="pagination">
        <li className={previousPage}><a href={FlowRouter.path("userListing", {page: page - 1})}><i className="material-icons">chevron_left</i></a></li>
        <li className={nextPage}><a href={FlowRouter.path("userListing", {page: page + 1})}><i className="material-icons">chevron_right</i></a></li>
      </ul>
    </div>
  }
}
