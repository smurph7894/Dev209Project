const express = require('express');
const router = express.Router();
var fs = require("fs");

let fileManager = {
  readBook: function() {
  var rawdata = fs.readFileSync('objectdatabook.json');
  let goodData = JSON.parse(rawdata);
  serverArray = goodData;
  },
  writeBook: function() {
  let data = JSON.stringify(serverArray);
  fs.writeFileSync('objectdatabook.json', data);
  },
  validDataBook: function() {
  var rawdata = fs.readFileSync('objectdatabook.json');
  console.log(rawdata.length);
  if(rawdata.length < 1) {
  return false;
  }
  else {
  return true;
  }
  },

  readAuthor: function() {
  var rawdata = fs.readFileSync('objectdataauthor.json');
  let goodData = JSON.parse(rawdata);
  serverAuthorArray = goodData;
  },
  writeAuthor: function() {
  let data = JSON.stringify(serverAuthorArray);
  fs.writeFileSync('objectdataauthor.json', data);
  },
  validDataAuthor: function() {
  var rawdata = fs.readFileSync('objectdataauthor.json');
  console.log(rawdata.length);
  if(rawdata.length < 1) {
  return false;
  }
  else {
  return true;
  }
  }
};

// *********** Book *********** //
let serverArray = [];

const Book = function (pTitle, pAuthor, pGenre, pSeries, pReadDate, pBookKeywords, pLocation){
  this.id = Math.random().toString(16).slice(5)
  this.title = pTitle;
  //Copying the Author object due to current dataset, if using a database like SQL or Mongo would connect 
  //through ID to avoid duplicate data and errors of separation.
  this.author = pAuthor;
  this.genre = pGenre;
  this.series = pSeries;
  this.readDate = pReadDate;
  this.bookKeywords = pBookKeywords;
  this.location = pLocation;
};

// *** Test inputs *** //
if(!fileManager.validDataBook()) {
  serverArray.push( new Book("Title 1", {id: '015421', AlterEgos: ["betsey"], authorKeywords: [""], authorWebsite: "url.com", firstName: "Bethany", lastName: "Henly" }, "Mystrey", "Series1", "2019-05-15", ["words", "words2"], "google.com"));
  serverArray.push( new Book("Title 3", {id: '2132458', AlterEgos: ["No Name"], authorKeywords: ["Washington", "best seller"], authorWebsite: "url.com", firstName: "Ralph", lastName: "Waldo" }, "Romance", "SeriesFancy", "2022-05-15", ["words", "words2"], "url.com"));
  fileManager.writeBook();
} else {
  fileManager.readBook();
}

// *** Routes *** //
router.get('/', function(req, res, next) {
  res.sendFile('index');
});

router.get('/GetAllBooks', function(req, res) {
  fileManager.readBook();
  res.status(200).json(serverArray);
});

router.post('/AddBook', function(req, res) {
  const newBook = req.body
  serverArray.push(newBook);
  fileManager.writeBook();
  res.status(200).json(newBook);
});

// *********** Author *********** //
let serverAuthorArray = [];

const Author = function(pFirstName, pLastName, pAlterEgos, pAuthorKeywords, pAuthorWebsite){
  this.id = Math.random().toString(16).slice(5)
  this.firstName = pFirstName;
  this.lastName = pLastName;
  this.alterEgos = pAlterEgos;
  this.authorKeywords = pAuthorKeywords;
  this.authorWebsite = pAuthorWebsite;
};



// *** Test inputs *** //
if(!fileManager.validDataAuthor()){
serverAuthorArray.push(new Author("AuthorFirst1", "AuthorLast1", ["Robert Frost"], ["Washington", "best seller"], "url.com"));
serverAuthorArray.push(new Author("AuthorFirst2", "AuthorLast2", [""], ["Washington"], "url.com"));
serverAuthorArray.push(new Author("AuthorFirst3", "AuthorLast3", ["Haily Robert"], ["Washington", "best seller"], "url.com"));
serverAuthorArray.push(new Author("Ralph", "Waldo", ["No Name"], ["Washington", "best seller"], "url.com"));
fileManager.writeAuthor();
} else {
  fileManager.readAuthor();
};

// *** Routes *** //
router.get('/GetAllAuthors', function(req, res) {
  fileManager.readAuthor();
  res.status(200).json(serverAuthorArray);
});

router.post('/AddAuthor', function(req, res) {
  const newAuthor = req.body
  serverAuthorArray.push(newAuthor);
  fileManager.writeAuthor();
  res.status(200).json(newAuthor);
});


module.exports = router;

// console.log("book", serverArray);
// console.log("author", serverAuthorArray);

// router.delete('/DeleteBook/:Id', function(req, res) {
//   const bookId = req.params.id;
//   let found = false;
//   let pointer = GetArrayPointer(bookId);
//   if(pointer == -1){
//     return res.status(500).json({
//       status: "error - no id match"
//     });
//   } else {
//     serverArray.splice(pointer, 1);
    // fileManager.writeBook();
//     res.send(`Book with id: ${bookId} was deleted.`)
//   }
// });

// router.delete('/DeleteAuthor/:Id', function(req, res) {
//   const authorId = req.params.id;
//   let found = false;
//   let serverPointer = GetArrayPointer(authorId);
//   let authorPointer = GetArrayPointer(authorId);
//   if(pointer == -1){
//     console.log("There is no author with this id.");
//     return res.status(500).json({
//       status: "error - no id match"
//     });
//   } else {
//     serverArray.splice(serverPointer, 1); // may need to go deeper to delete author from book obj
//     serverAuthorArray.splice(authorPointer, 1);
//     fileManager.writeBook();
//     fileManager.writeAuthor();
//     res.send(`Author with id: ${bookId} was deleted.`)
//   }
// });

// $.ajax({
//   url: `/UpdateBook/${bookId}`,
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
//   url: `/DeleteBook/${bookId}`,
//   type: "DELETE",
//   success: function(result){
//       alert(result);
//   },
//   error: function (xhr, textStatus, errorThrown){
//       alert($`Server could not delete book with Id: ${bookId}. ${textStatus}`);
//   }
// });


// function GetArrayPointer(localId, arr){
//   for(let i=o; i<arr.length; i++){
//     if(localId === arr[i].id){
//       return i;
//     }
//   }
//   return -1;
// };
