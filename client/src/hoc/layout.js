import React from 'react';
import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";
import "./layout.css";

const Layout = (props) => {
   return (
       <div>

          <div className="layout-main-container">
             <div className="main">
                <Header/>
                {props.children}
             </div>
          </div>


          <Footer/>

       </div>
   );
};

export default Layout;