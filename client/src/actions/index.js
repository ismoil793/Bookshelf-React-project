import axios from "axios";


export function getBooks(
    limit = 10,
    start = 0,
    order = "asc",
    list = ""
) {

   const request = axios.get(`/api/books/?limit=${limit}&skip=${start}&order=${order}`)
       .then(response => {
          if (list) {
             return [...list, ...response.data]
          } else {
             return response.data
          }
       });

   return {
      type: "GET_BOOKS",
      payload: request
   }
}


export function getBooksCount() {
   const request = axios.get(`/api/booksCount`)
       .then(response => {
          return response.data
       });

   return {
      type: "GET_BOOKS_COUNT",
      payload: request
   }
}


export function getBookWithReviewer(bookId) {

   const request = axios.get(`/api/getBook?id=${bookId}`);


   return (dispatch) => {  // this one is usage of redux-thunk read below
      request.then(response => {
         let book = response.data;

         axios.get(`/api/getReviewer?id=${book.ownerId}`)
             .then(response => {

                let result = {
                   book,
                   reviewer: response.data
                };

                dispatch({
                   type: "GET_BOOK_W_REVIEWER",
                   payload: result
                })

             });
      })
   }
}

// On top redux-thunk is helping us to get data and return it whenever
// it is ready NOT when react calls it


export function clearBookWithReviewer() {
   return {
      type: "CLEAR_BOOK_W_REVIEWER",
      payload: {
         book: {},
         reviewer: {}
      }
   }
}


export function addBook(book) {

   const request = axios.post('/api/book', book)
       .then(response => response.data).catch(e => console.log(e.response));

   return {
      type: "ADD_BOOK",
      payload: request
   };
}

export function clearNewBook() {
   return {
      type: "CLEAR_NEWBOOK",
      payload: {}
   }
}

export function getUserPosts(userID) {
   const request = axios.get(`/api/user_posts?user=${userID}`)
       .then(response => response.data);

   return {
      type: "GET_USER_POSTS",
      payload: request
   }
}

export function getBook(bookId) {
   const request = axios.get(`/api/getBook?id=${bookId}`)
       .then(response => response.data);

   return {
      type: "GET_BOOK",
      payload: request
   }
}

export function updateBook(data) {
   const request = axios.post(`/api/book_update`, data)
       .then(response => response.data);

   return {
      type: "UPDATE_BOOK",
      payload: request
   }
}

export function deleteBook(id) {
   const request = axios.delete(`/api/delete_book?id=${id}`)
       .then(response => response.data);

   return {
      type: "DELETE_BOOK",
      payload: request
   }
}

export function clearBook() {
   return {
      type: "CLEAR_BOOK",
      payload:{
         book:null,
         updateBook: false,
         postDeleted: false
      }
   }
}

/*================= USER ===================*/

export function loginUser({email, password}) {

   const request = axios.post(`/api/login`, {email, password})
       .then(response => response.data);


   return {
      type: "USER_LOGIN",
      payload: request
   }
}


export function auth() {
   const request = axios.get(`/api/auth`)
       .then(response => response.data);

   return {
      type: "USER_AUTH",
      payload: request
   }
}

export function getUsers() {
   const request = axios.get(`/api/users`)
       .then(response => response.data);

   return {
      type: "GET_USERS",
      payload: request
   }
}

export function userRegister(user, userList) {
   const request = axios.post(`/api/register`,user);

   return(dispatch) => {
      request.then(({data}) => {
         let users = data.success ? [...userList, data.user] : userList;
         let response = {
            success: data.success,
            users
         };

         dispatch({
            type: "USER_REGISTER",
            payload: response
         })

      })
   }
}