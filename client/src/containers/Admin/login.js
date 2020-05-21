import React, {Component} from 'react';
import {connect} from "react-redux";
import {loginUser} from "../../actions";

class Login extends Component {

   state = {
      email: "",
      password: "",
      error: "",
      success: false
   };

   submitForm = (e) => {
      e.preventDefault();
      this.props.dispatch(loginUser(this.state));
   };

   handleInputEmail = (e) => {
      this.setState({
         email: e.target.value
      })
   };

   handleInputPassword = (e) => {
      this.setState({
         password: e.target.value
      })
   };

   UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.user && nextProps.user.login && nextProps.user.login.isAuth) {
         this.props.history.push("/user")
      }
   }

   render() {
      let user = this.props.user;
      return (
          <div className="container">
             <div className="raw">
                <div className="col-lg-12">

                   <div className="rl_container">
                      <form onSubmit={this.submitForm} autoComplete="on">

                         <h2>Log in here</h2>

                         <div className="form_element">
                            <input
                                type="email"
                                placeholder="Enter your e-mail"
                                value={this.state.email}
                                onChange={this.handleInputEmail}
                            />
                         </div>

                         <div className="form_element">
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={this.state.password}
                                onChange={this.handleInputPassword}
                            />
                         </div>

                         <button type="submit">Log in</button>

                         <div className="error">
                            {
                               user.login ?
                                   <div>{user.login.message}</div>
                                   :
                                   null
                            }
                         </div>

                      </form>
                   </div>

                </div>
             </div>
          </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      user: state.user
   }
}

export default connect(mapStateToProps)(Login);