const express = require('express');
const router = express.Router();
const fs = require("fs");

let fileManager = {
  readBook: function() {
  let rawdata = fs.readFileSync('objectdatabook.json');
  let goodData = JSON.parse(rawdata);
  serverArray = goodData;
  },
  writeBook: function() {
  let data = JSON.stringify(serverArray);
  fs.writeFileSync('objectdatabook.json', data);
  },
  validDataBook: function() {
  let rawdata = fs.readFileSync('objectdatabook.json');
  console.log(rawdata.length);
  if(rawdata.length < 1) {
  return false;
  }
  else {
  return true;
  }
  },

  readAuthor: function() {
  let rawdata = fs.readFileSync('objectdataauthor.json');
  let goodData = JSON.parse(rawdata);
  serverAuthorArray = goodData;
  },
  writeAuthor: function() {
  let data = JSON.stringify(serverAuthorArray);
  fs.writeFileSync('objectdataauthor.json', data);
  },
  validDataAuthor: function() {
  let rawdata = fs.readFileSync('objectdataauthor.json');
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
  serverArray.push( new Book("Harry Potter and the Sorcerer's Stone", {id:"" , AlterEgos: [""], authorKeywords: [""], authorWebsite: "", firstName: "", lastName: "" }, "Adventure", "Harry Potter", "2021-05-15", ["Magic,Wizards,Orphan"], "https://www.amazon.com/Harry-Potter-Sorcerers-Stone-Rowling-ebook/dp/B0192CTMYG/ref=sr_1_2?crid=22S7L6MXFAM1H&dib=eyJ2IjoiMSJ9.jeL5AORfIvbSuiYJ1SgoMNTV-90ynW9QCbHwMNl6OEaZWy4R2pQFejAg2P7ckD5d7nnYkvew8TkZ7kEuBA1bczP2k56FafcmO9KWas3UR_eZ4ZBA-u060xtVa5x4UzYoxIMru15G_53eRDMZrK-rSL07uO8P2UjF9iOvpRMxroXHvMCorxm7oVVt999mIFTg0UInNnCvcXf-HXnfX2X114SnZoIdXUF2T9MJgcA0-ok.9ydu93_bbbpaQPeAWGXR4RPFIaBIWYkMIkm--T6wkZ0&dib_tag=se&keywords=harry+potter&qid=1718834078&s=books&sprefix=harry+potter%2Cstripbooks%2C162&sr=1-2"));
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
serverAuthorArray.push(new Author("Sarah J.", "Maas", [""], ["LA","MAAS Universe","Fantasy","Romance","YA","AC"], "https://sarahjmaas.com"));
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