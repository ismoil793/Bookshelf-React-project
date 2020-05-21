import React from 'react';
import SideNav from "react-simple-sidenav";
import SideNavItems from "./sidenavItems";

const Nav = (props) => {
   return (
       <SideNav
         showNav={props.showNav}
         onHideNav={props.onHideNav}
         navStyle={{
            background: "#242424",
            maxWidth: "60%"
         }}
       >
          <SideNavItems />
       </SideNav>
   );
};

export default Nav;