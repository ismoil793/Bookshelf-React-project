import React from 'react';

const NotFound = () => {
   return (
       <div className="container">
          <div className="row">
             <div className="col-lg-12">
                <div className="error-template">
                   <h1>
                      Oops!</h1>
                   <h2>
                      404 Not Found</h2>
                   <div className="error-details">
                      Sorry, an error has occured, Requested page not found!
                   </div>
                </div>
             </div>
          </div>
       </div>
   );
};

export default NotFound;