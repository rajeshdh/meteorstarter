import React from 'react'

const Homepage = () => (
  <div>
    <h1>Web starter</h1>
    <p>A starter for Meteor apps.</p>
    <section className="row">
      <h3>What is included</h3>

      <div className="col s12 m6">
        <div className="card-panel green darken-1">
          <h4 className="white-text">User Login & Registration</h4>
          <p className="white-text">Allow users to register and login to your website.</p>
        </div>
      </div>

      <div className="col s12 m6">
        <div className="card-panel green darken-1">
          <h4 className="white-text">User Settings</h4>
          <p className="white-text">Allow users to change their settings.</p>
        </div>
      </div>

      <div className="col s12 m6">
        <div className="card-panel green darken-1">
          <h4 className="white-text">User Profiles</h4>
          <p className="white-text">Each user gets a profile that others can interact with.</p>
        </div>
      </div>

      <div className="col s12 m6">
        <div className="card-panel green darken-1">
          <h4 className="white-text">Private messages</h4>
          <p className="white-text">Allow users to message each other.</p>
        </div>
      </div>

      <div className="col s12 m6">
        <div className="card-panel green darken-1">
          <h4 className="white-text">User Feed</h4>
          <p className="white-text">Facebook like feed to allow users post what they think and interact with others.</p>
        </div>
      </div>

      <div className="col s12 m6">
        <div className="card-panel green darken-1">
          <h4 className="white-text">Beta signup</h4>
          <p className="white-text">Disallow registration and rather have users signup their interest in your app and select those you want to join.</p>
        </div>
      </div>

      <h3 className="col s12">What is in the future</h3>


      <div className="col s12 m6">
        <div className="card-panel blue-grey darken-1">
          <h4 className="white-text">Administration</h4>
          <p className="white-text">The starter is currently lacking an admin interface. That will change soon.</p>
        </div>
      </div>

      <div className="col s12 m6">
        <div className="card-panel blue-grey darken-1">
          <h4 className="white-text">User Search / Listing</h4>
          <p className="white-text">Search and list registered users.</p>
        </div>
      </div>

    </section>
  </div>
)

export default Homepage
