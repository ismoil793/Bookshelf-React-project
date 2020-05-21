import React, {Component} from 'react';
import {connect} from "react-redux";
import {getBooks, getBooksCount} from "../actions";
import BookItem from "../widgetsUI/book_item";
import "./home_container.css";

class HomeContainer extends Component {

   count = 0;
   flag = false;

   componentDidMount() {
      // if (!this.props.books.list)
      // above statement had to be commented, since it caused bugs on home page
      this.props.dispatch(getBooks(4, 0, "desc"));
      this.props.dispatch(getBooksCount());
   }


   renderWarning = () => (
       this.flag ?
           <div className="alert alert-warning">
              No more Books
           </div>
           : null
   );

   loadMore = () => {
      let count = this.props.books.list.length;
      this.props.dispatch(getBooks(1, count, "desc", this.props.books.list));

      if (this.count) {
         if (count === this.count) {
            this.flag = true;
         }
      }

   };

   renderItems = (books) => {
      if (books.list)
         return (
             books.list.map(item => (
                 <BookItem {...item} key={item._id}/>
             ))
         );
   };


   render() {
      this.count = this.props.books.count;
      return (
          <div className="container">
             <div className="raw">

                <div className="col-lg-12">

                   <div className="books-wrapper">

                      {this.renderItems(this.props.books)}

                      {this.renderWarning()}

                      <div className="loadmore" onClick={this.loadMore}>
                         Load More
                      </div>

                   </div>

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

export default connect(mapStateToProps)(HomeContainer);