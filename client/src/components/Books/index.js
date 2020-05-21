import React, {Component} from 'react';
import {connect} from "react-redux";
import {getBookWithReviewer, clearBookWithReviewer} from "../../actions";

class BookView extends Component {

   componentDidMount() {
      this.props.dispatch(getBookWithReviewer(this.props.match.params.id))
   }

   componentWillUnmount() {
      this.props.dispatch(clearBookWithReviewer())
   }

   renderBook = (prop) => (
       prop.book && prop.book.name ?
           <div className="br_container">

              <div className="br_header">
                 <h2 className="">{prop.book.name}</h2>
                 <h5>{prop.book.author}</h5>
                 <div className="br_reviewer">
                    <span>Review by: </span>{prop.reviewer.name} {prop.reviewer.lastname}
                 </div>
              </div>

              <div className="br_review">
                 {prop.book.review}
              </div>
              <div className="br_box">
                 <div className="left">
                    <div>
                       <span>Pages: </span>{prop.book.pages}
                    </div>
                    <div>
                       <span>Price: </span>{prop.book.price}
                    </div>
                 </div>
                 <div className="right">
                    <span>Rating</span>
                    <div>{prop.book.rating}/5</div>
                 </div>
              </div>

           </div>
           :
           null
   );

   render() {

      let prop = null;

      if (this.props.books)
         prop = this.props.books;

      return (
          <div className="container">
             <div className="raw">
                <div className="col-lg-12">
                   {this.renderBook(prop)}
                </div>
             </div>
          </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      books: state.books
   }
}

export default connect(mapStateToProps)(BookView);