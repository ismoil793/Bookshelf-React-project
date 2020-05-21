import React from 'react';
import FontAwesome from "react-fontawesome";

const Footer = () => {
   return (

       <footer className="footer-div">
          <div className="container h-100">
             <div className="row h-100">

                <div className="col-lg-3">
                   <div className="developer">
                      <p>
                         Developed by <a href="https://ismoil793.github.io/" target="_blank">Ismoil Shokirov</a> <br/>
                         using React nad NodeJs
                      </p>
                   </div>
                </div>
                <div className="col-lg-6" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>

                   <div className="social">

                      <div className="social_icons">
                         <a
                             href="https://www.facebook.com/ismoil.793"
                             target="_blank"
                         >
                            <FontAwesome name="fas fa-facebook"/>
                         </a>

                         <a
                             href="https://t.me/BlGDADDY"
                             target="_blank"
                         >
                            <FontAwesome name="fab fa-telegram"/>
                         </a>

                         <a
                             href="https://www.linkedin.com/in/ismoil-shokirov-a0479b157/"
                             target="_blank"
                         >
                            <FontAwesome name="fas fa-linkedin"/>
                         </a>

                         <a
                             href="https://www.instagram.com/ismoil.793/"
                             target="_blank"
                         >
                            <FontAwesome name="fab fa-instagram"/>
                         </a>
                      </div>
                   </div>
                </div>

                <div className="col-lg-3">
                   <div className="copy">
                      <p>
                         The Book Shelf 1.0<br/>
                         made in 2020
                      </p>
                   </div>
                </div>
             </div>
          </div>
       </footer>
   );
};

export default Footer;