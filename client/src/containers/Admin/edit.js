import React, {Component, PureComponent} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getBook, updateBook, clearBook, deleteBook} from "../../actions";

class EditBook extends Component {
   state = {
      formData: {
         _id: "",
         name: "",
         author: "",
         review: "",
         pages: "",
         rating: "1",
         price: ""
      }
   };

   submitForm = (e) => {
      e.preventDefault();
      this.props.dispatch(updateBook(this.state.formData))
   };

   componentDidMount() {
      this.props.dispatch(getBook(this.props.match.params.id));
   }

   UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
      let book = nextProps.books.book;
      if (book)
         this.setState({
            formData: {
               _id: book._id,
               name: book.name,
               author: book.author,
               review: book.review,
               pages: book.pages,
               rating: book.rating,
               price: book.price
            }
         })
   }

   deletePost = () => {
      this.props.dispatch(deleteBook(this.props.match.params.id))
   };

   redirectUser = () => {
      setTimeout(() => {
         this.props.history.push('/user/user-reviews')
      }, 500)
   };

   componentWillUnmount() {
      this.props.dispatch(clearBook());
   }

   handleInput = (event, name) => {
      const newFormData = this.state.formData;

      newFormData[name] = event.target.value;

      this.setState({
         formData: newFormData
      })
   };

   render() {
      let books = this.props.books;
      return (
          <div className="container">
             <div className="raw">
                <div className="col-lg-12">

                   <div className="rl_container article">

                      {
                         books.updateBook && books.book ?
                             <div className="edit_confirm">
                                Post updated, <Link to={`/books/${books.book._id}`}>See new post</Link>
                             </div>
                             : null
                      }

                      {
                         books.postDeleted ?
                             <div className="red_tag">
                                Post deleted
                                {this.redirectUser()}
                             </div>
                             : null

                      }

                      <form onSubmit={(e) => this.submitForm(e)}>
                         <h2>Edit review</h2>

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

                         <button type="submit">Edit review</button>
                         <div className="delete_post">
                            <button className="button"
                                    onClick={this.deletePost}
                            >
                               Delete review
                            </button>
                         </div>
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

export default connect(mapStateToProps)(EditBook);