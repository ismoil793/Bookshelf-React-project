import React from 'react';

const User = ({user}) => {
   return (
       <div className="container">
          <div className="raw">
             <div className="col-lg-12">

                <div className="user_container">
                   <div className="avatar">
                      <img src="/images/avatar.png" alt="avatar"/>
                   </div>
                   <div className="nfo">
                      <div><span>Name: </span>{user.authLogin.name}</div>
                      <div><span>Last name: </span>{user.authLogin.lastname}</div>
                      <div><span>Email: </span>{user.authLogin.email}</div>
                   </div>
                </div>

             </div>
          </div>
       </div>
   );
};

export default User;