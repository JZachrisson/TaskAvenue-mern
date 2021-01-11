import React, { Component } from 'react';

import AuthService from '../../services/auth-service';

export default class Register extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: '',
      password: '',
    };
  }

  onChangeUsername(e: any) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e: any) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e: any) {
    e.preventDefault();

    this.setState({
      message: '',
      successful: false,
    });

    AuthService.register(this.state.username, this.state.password).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <form onSubmit={this.handleRegister}>
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
