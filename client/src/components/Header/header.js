import React, {Component} from 'react';
import FontAwesome from "react-fontawesome";
import {Link} from "react-router-dom";
import Nav from "./Sidenav/sidenav";

class Header extends Component {

   state = {
      showNav: false
   };

   onHideNav = () => {
      this.setState({
         showNav: false
      })
   };

   render() {
      return (
          <header>
             <div className="container">
                <div className="raw">
                   <div className="col-lg-12">

                      <div className="nav-wrapper">
                         <div style={{width: "100%", alignItems: "center"}}>
                            <div className="open_nav"
                                 onClick={() => this.setState({showNav: true})}
                            >
                               <FontAwesome name="bars"/><span>Menu</span>
                            </div>

                            <div className="side-nav">
                               <Nav
                                   showNav={this.state.showNav}
                                   onHideNav={() => this.onHideNav()}
                               />
                            </div>

                            <div className="logo">
                               <Link to="/"
                                 // onClick={() => {
                                 //    let elements = document.querySelectorAll("#active-non-active");
                                 //    elements.forEach((el) => {
                                 //       el.classList.remove("active")
                                 //    });
                                 //
                                 //    document.querySelector('a[data-home="home"]')
                                 //        .classList.add("active");
                                 // }}
                               >
                                  The Book Shelf
                               </Link>
                            </div>
                         </div>
                      </div>


                   </div>
                </div>
             </div>

          </header>
      );
   }
}

export default Header;