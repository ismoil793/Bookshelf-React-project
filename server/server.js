const express = require("express");
const bodyParser = require("body-parser");
const cookiesParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/config").get(process.env.NODE_ENV); // in heroku it will be production ENV
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {
   useUnifiedTopology: true,
   useNewUrlParser: true,
   useFindAndModify: false,
   useCreateIndex: true
});


const {User} = require("./models/user");
const {Book} = require("./models/book");
const {auth} = require("./middleware/auth");

app.use(bodyParser.json());
app.use(cookiesParser());

// app.use(express.static("client/build"));  // needed for production


//-------------------------------------------------------------------------- GET //

app.get("/api/auth", auth, (req, res) => {
   res.json({
      isAuth: true,
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname
   })
});

app.get("/api/getBook", (req, res) => {
   //www.com?id=""
   let id = req.query.id;

   Book.findById(id, (err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
   })
});


app.get("/api/books", (req, res) => {
   // localhost:3000/api/books?skip=3&limit=10&order=asc
   let skip = parseInt(req.query.skip);
   let limit = parseInt(req.query.limit);
   let order = req.query.order;


   // Book.count({}, function (err, count) {
   //    if (err) return res.sendStatus(400).send(err);
   //    // res.send(count);
   //    count_all = count;
   // });

   //order = asc || desc
   Book.find().skip(skip).limit(limit).sort({_id: order})
       .exec(
           (err, doc) => {
              if (err) return res.status(400).send(err);
              res.send(doc)

           })
});


app.get("/api/booksCount", (req, res) => {

   Book.countDocuments({}, function (err, count) {
      if (err) return res.sendStatus(400).send(err);
      res.json(count);
   });

});


app.get("/api/getReviewer", (req, res) => {
   let id = req.query.id;

   User.findById(id, (err, doc) => {
      if (err) return res.status(400).send(err);
      res.json({
         name: doc.name,
         lastname: doc.lastname
      })
   })
});


app.get("/api/users", (req, res) => {

   User.find({}, (err, users) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(users);
   })

});


app.get("/api/user_posts", (req, res) => {

   Book.find({ownerId: req.query.user}).exec((err, docs) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(docs)
   })

   // Book.find({ownerId: req.query.user.toString()}, (err, doc) => {
   //    if(err) return res.status(400).send(err);
   //    res.send(doc)
   // })
});


app.get("/api/logout", auth, (req, res) => {
   req.user.deleteToken(req.token, (err, user) => {
      if (err) return res.status(400).send(err);
      res.sendStatus(200);
   })
});

//-------------------------------------------------------------------------- POST //
app.post("/api/book", (req, res) => {
   const book = new Book(req.body);

   book.save((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
         post: true,
         bookId: doc._id
      })
   })
});

app.post("/api/register", (req, res) => {
   const user = new User(req.body);

   user.save((err, doc) => {
      if (err) return res.json({success: false});
      res.status(200).json({
         success: true,
         user: doc
      })
   })
});

app.post("/api/login", (req, res) => {

   User.findOne({"email": req.body.email}, (err, user) => {
      if (!user) return res.json({isAuth: false, message: "Auth failed email not found"});

      user.comparePassword(req.body.password, (err, isMatch) => {
         if (!isMatch) return res.json({
            isAuth: false,
            message: "Wrong password"
         });

         user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            res.cookie("auth", user.token).send({
               isAuth: true,
               id: user._id,
               email: user.email
            })
         })

      })
   })
});

//-------------------------------------------------------------------------- UPDATE //

app.post("/api/book_update", (req, res) => {
   Book.findByIdAndUpdate(
       req.body._id, req.body, {new: true}, (err, doc) => {
          if (err) return res.status(400).send(err);
          res.json({
             success: true,
             doc
          })
       })
});


//-------------------------------------------------------------------------- DELETE //

app.delete("/api/delete_book", (req, res) => {
   let id = req.query.id;

   Book.findByIdAndDelete(id, (err, doc) => {
      if (err) return res.status(400).send(err);
      res.json(true)
   })
});


// if (process.env.NODE_ENV === "production") {   // for production
//    const path = require("path");
//    app.get("/*", (req, res) => {
//       res.sendfile(path.resolve(__dirname), "../client", "build", "index.html")
//    });
// }

const port = process.env.PORT || 3001;
app.listen(port, () => {
   console.log("server is running")
});