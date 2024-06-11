var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index');
});

router.get('/GetAllBooks', function(req, res, next) {
  res.sendFile('index');
});

router.get('/AddBook', function(req, res, next) {
  res.sendFile('index');
});

// view main page
// address - /books

//view book page
// address - /book/id

//view author page
// address - /book/:bookId/author

// $.ajax({
//   url: "/AddBook",
//   type: "POST",
//   data: JSON.stringify(newBook),
//   contentType: "application/json;charset=utf-8",
//   success: function(result){
//     console.log(result);
//     document.location.href = "index.html#ListAll";
//   },
//   error: function (xhr, textStatus, errorThrown){
//     alert($`Server could not add book ${newBook.Title}.`);
//     alert($`${textStatus} ${errorThrown}`)
//   }
// });

// $.ajax({
//   url: `/UpdateBook/${book.id}`,
//   type: "PUT",
//   data: JSON.stringify([book]),
//   contentType: "application/json;charset=utf-8",
//   success: function(result){
//     alert(result);
//   },
//   error: function (xhr, textStatus, errorThrown){
//     alert($`Update Failed. Status: ${textStatus}, Error: ${errorThrown}`);
//   }
// })

// $.ajax({
//   url: `/DeleteBook/${book.id}`,
//   type: "DELETE",
//   success: function(result){
//     alert(result);
//   },
//   error: function (xhr, textStatus, errorThrown){
//     alert($`Server could not delete book with Id: ${ID}.`);
//   }
// })


module.exports = router;
