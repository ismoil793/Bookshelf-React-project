import React from 'react';
import {withRouter, Link} from "react-router-dom";
import FontAwesome from "react-fontawesome";
import {connect} from "react-redux";

const SidenavItems = (props) => {


   const items = [
      {
         type: "navItem",
         icon: "home",
         text: "Home",
         link: "/",
         restricted: false
      },
      {
         type: "navItem",
         icon: "user-circle",
         text: "My Profile",
         link: "/user",
         restricted: true
      },
      {
         type: "navItem",
         icon: "user-plus",
         text: "Add Admins",
         link: "/user/register",
         restricted: true
      },
      {
         type: "navItem",
         icon: "sign-in",
         text: "Login",
         link: "/login",
         restricted: false,
         exclude: true
      },
      {
         type: "navItem",
         icon: "file-text-o",
         text: "My reviews",
         link: "/user/user-reviews",
         restricted: true
      },
      {
         type: "navItem",
         icon: "plus-square",
         text: "Add reviews",
         link: "/user/add",
         restricted: true
      },
      {
         type: "navItem",
         icon: "sign-out",
         text: "Logout",
         link: "/user/logout",
         restricted: true,
      }
   ];

   const element = (item, i) => {

      let active = "";

      if (props.location.pathname === item.link) {
         active = "active";
      }

      return (
          <div key={i} className={item.type}>
             <Link
                 // id="active-non-active"
                 // data-home={item.icon === "home" ? "home" : ""}
                 to={item.link}
                 className={active}
                 // onClick={(evt) => {
                 //
                 //    let elements = document.querySelectorAll("#active-non-active");
                 //    elements.forEach((el) => {
                 //       el.classList.remove("active")
                 //    });
                 //
                 //    evt.target.classList.add("active")
                 // }}
             >
                <FontAwesome name={item.icon}/>
                {item.text}
             </Link>
          </div>
      )
   };

   const showItems = () => {
      if (props.user.authLogin) {

         if (props.user.authLogin.isAuth)
            return items.map((item, i) => {
               if (!item.exclude)
                  return element(item, i)
            });
         else {
            return items.map((item, i) => {
               if (!item.restricted)
                  return element(item, i)
            })
         }

      } else
         return null
   };

   return (
       <div>
          {showItems()}
       </div>
   )
};

function mapStateToProps(state) {
   return {
      user: state.user
   }
}

export default connect(mapStateToProps)(withRouter(SidenavItems));