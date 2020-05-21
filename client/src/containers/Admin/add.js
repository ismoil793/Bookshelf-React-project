import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {addBook, clearNewBook} from "../../actions";

class AddBook extends Component {
   state = {
      formData: {
         name: "",
         author: "",
         review: "",
         pages: "",
         rating: "1",
         price: ""
      }
   };

   handleInput = (event, name) => {
      const newFormdata = this.state.formData;

      newFormdata[name] = event.target.value;

      this.setState({
         formData: newFormdata
      })
   };

   submitForm = (e) => {
      e.preventDefault();
      this.props.dispatch(addBook({
         ...this.state.formData,
         ownerId: this.props.user.authLogin.id
      }))
   };

   showNewBook = (book) => {
      if (book.post)
         return (<div className="conf_link">
                <Link to={`/books/${book.bookId}`}>Click to see the post</Link>
             </div>
         );
      else return null
   };

   componentWillUnmount() {
      this.props.dispatch(clearNewBook());
   }

   render() {
      return (
          <div className="container">
             <div className="raw">
                <div className="col-lg-12">

                   <div className="rl_container article">
                      <form onSubmit={(e) => this.submitForm(e)}>
                         <h2>Add a review</h2>

                         <div className="form_element">
                            <input
                                type="text"
                                placeholder="Enter name"
                                value={this.state.formData.name}
                                onChange={(event) => this.handleInput(event, "name")}
                            />
                         </div>

                         <div className="form_element">
                            <input
                                type="text"
                                placeholder="Enter author"
                                value={this.state.formData.author}
                                onChange={(event) => this.handleInput(event, "author")}
                            />
                         </div>

                         <textarea
                             value={this.state.formData.review}
                             placeholder="Your review"
                             onChange={(event) => this.handleInput(event, "review")}
                         />

                         <div className="form_element">
                            <input
                                type="number"
                                minLength="1"
                                maxLength="7"
                                placeholder="Enter pages"
                                value={this.state.formData.pages}
                                onChange={(event) => this.handleInput(event, "pages")}
                            />
                         </div>

                         <div className="form_element special">
                            <label htmlFor="rate">Rating:</label>
                            <select
                                id="rate"
                                value={this.state.formData.rating}
                                onChange={(event) => this.handleInput(event, "rating")}
                            >
                               <option value="1" defaultChecked={true}>1</option>
                               <option value="2">2</option>
                               <option value="3">3</option>
                               <option value="4">4</option>
                               <option value="5">5</option>
                            </select>
                         </div>

                         <div className="form_element">
                            <input
                                type="number"
                                placeholder="Enter price"
                                value={this.state.formData.price}
                                onChange={(event) => this.handleInput(event, "price")}
                            />
                         </div>

                         <button type="submit">Add review</button>

                         {
                            this.props.books.newBook ?
                                this.showNewBook(this.props.books.newBook)
                                : null
                         }

                      </form>
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

export default connect(mapStateToProps)(AddBook);