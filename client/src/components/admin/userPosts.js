import React, {Component} from 'react';
import {connect} from "react-redux";
import {getUserPosts} from "../../actions";
import moment from "moment-js";
import {Link} from "react-router-dom";

class UserPosts extends Component {

   componentDidMount() {
      this.props.dispatch(getUserPosts(this.props.user.authLogin.id))
   }

   showUserPosts = (user) => (
       user.userPosts ?
           user.userPosts.map(item => (
               <tr key={item._id}>
                  <td>
                     <Link to={`/user/edit-post/${item._id}`}>{item.name}</Link>
                  </td>
                  <td>{item.author}</td>
                  <td>{moment(item.createdAt).format("MM/DD/YY")}</td>
               </tr>
           ))
           : null
   );

   render() {
      let user = this.props.user;
      return (
          <div className="container">
             <div className="raw">
                <div className="col-lg-12">

                   <div className="user_posts">
                      <h4>Your reviews:</h4>
                      <table>
                         <thead>
                         <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Date</th>
                         </tr>
                         </thead>
                         <tbody>
                         {this.showUserPosts(user)}
                         </tbody>
                      </table>
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

export default connect(mapStateToProps)(UserPosts);