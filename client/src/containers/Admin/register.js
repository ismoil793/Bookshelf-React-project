import React, {Component} from 'react';
import {connect} from "react-redux";

import {getUsers, userRegister} from "../../actions";


class Register extends Component {

   state = {
      name: "",
      lastname: "",
      email: "",
      password: "",
      error: ""
   };

   componentDidMount() {
      this.props.dispatch(getUsers());
   }

   handleInputLastname = (event) => {
      this.setState({lastname: event.target.value})
   };


   handleInputEmail = (event) => {
      this.setState({email: event.target.value})
   };

   handleInputName = (event) => {
      this.setState({name: event.target.value})
   };

   handleInputPassword = (event) => {
      this.setState({password: event.target.value})
   };

   submitForm = (e) => {
      e.preventDefault();
      this.setState({error: ""});

      if (this.state.password.length < 6 || this.state.email === "") {
         this.setState({error: "Error occurred please try again!"})
      } else {
         this.props.dispatch(userRegister({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            lastname: this.state.lastname
         }, this.props.user.users));
      }

      setTimeout(() => {
         if (this.props.user && this.props.user.register) {
            if (this.props.user.register === false) {
               this.setState({error: "Error occurred please try again!"})
            } else {
               this.setState({
                  name: "",
                  lastname: "",
                  email: "",
                  password: "",
                  error: ""
               });
            }
         }
         if (this.props.user && !this.props.user.register) {
            if (this.props.user.register === false) {
               this.setState({error: "Error occurred please try again!"})
            } else {
               this.setState({
                  name: "",
                  lastname: "",
                  email: "",
                  password: "",
                  error: ""
               });
            }
         }
      }, 2000)
   };

   showUsers = (user) => (
       user.users && user.users.length > 0 ?
           user.users.map(item => (
               <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.lastname}</td>
                  <td>{item.email}</td>
               </tr>
           ))
           : null
   );

   render() {

      let user = this.props.user;

      console.log(user)

      return (
          <div className="container">
             <div className="row">
                <div className="col-lg-12">

                   <div className="rl_container">
                      <form className="form" onSubmit={this.submitForm}>
                         <h2>Add user</h2>

                         <div className="form_element">
                            <input
                                className=""
                                type="text"
                                required={true}
                                placeholder="Enter name"
                                value={this.state.name}
                                onChange={this.handleInputName}
                            />
                         </div>

                         <div className="form_element">
                            <input
                                className=""
                                type="text"
                                required={true}
                                placeholder="Enter lastname"
                                value={this.state.lastname}
                                onChange={this.handleInputLastname}
                            />
                         </div>

                         <div className="form_element">
                            <input
                                className=""
                                type="email"
                                required={true}
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.handleInputEmail}
                            />
                         </div>

                         <div className="form_element">
                            <input
                                className=""
                                type="password"
                                required={true}
                                minLength={6}
                                placeholder="Enter password"
                                value={this.state.password}
                                onChange={this.handleInputPassword}
                            />
                         </div>

                         <button type="submit">Add user</button>

                         <div className="error">
                            {this.state.error}
                         </div>

                      </form>
                      <div className="current_users mt-5">
                         <h4>Current users:</h4>
                         <table className="table table-striped">
                            <thead>
                            <tr>
                               <th>Name</th>
                               <th>Lastname</th>
                               <th>Email</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.showUsers(user)}
                            </tbody>
                         </table>
                      </div>
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

export default connect(mapStateToProps)(Register);