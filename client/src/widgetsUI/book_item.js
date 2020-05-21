import React from 'react';
import {Link} from "react-router-dom";

const BookItem = (props) => {

   return (
       <Link to={`/books/${props._id}`} className="book_item">
          <div className="book_header">
             <h2>{props.name}</h2>
          </div>
          <div className="book_items">

             <div className="book_author"><span>Author: </span>{props.author}</div>

             <div className="book_bubble">
                <strong>Price </strong>${props.price}
             </div>

             <div className="book_bubble rating">
                <strong>Rating</strong> {props.rating}
             </div>

          </div>
       </Link>
   );
};

export default BookItem;