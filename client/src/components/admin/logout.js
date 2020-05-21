import React from 'react';
import axios from "axios";

const Logout = (props) => {

   const logOut = () => {
      let request = axios.get(`/api/logout`)
          .then(request => {
             props.history.push('/')
          });
   };

   return (
       <div className="container">
          <div className="row">
             <div className="col-lg-12">

                <div className="logout_container">
                   <h1>Sorry to see you go :(</h1>
                   <button className="mt-5 w-100 button btn btn-danger" onClick={logOut}>Log out!</button>
                </div>

             </div>
          </div>
       </div>
   );
};

export default Logout;