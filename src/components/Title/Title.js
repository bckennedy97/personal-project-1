import React, { Component } from 'react';
import "./title.css"


export default class App extends Component {
  login = () => {
      const redirectUri = encodeURIComponent(`${window.location.origin}/auth`)

      window.location = `https://${process.env.REACT_APP_AUTH_DOMAIN}/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=openid%20email%20profile&redirect_uri=${redirectUri}&response_type=code`
  }

  render() {
    return (
      <section className="graydiant">
      <div className="title-container">
        <div>
          <h1>ouiCARE</h1>
          <h3>Providing Simple and Efficient Access to Healthcare Services and Support for Those In Need<br/>Say Yes to Your Health, Because We Care</h3>
          <button className = "box" onClick={this.login}>Get Started</button>
        </div>
      </div>
      </section>
    );
  }
}
