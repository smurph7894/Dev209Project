const Book = function (pTitle, pAuthorID, pGenre, pSeries, pReadDate, pBookKeywords, pLocation){
    this.id = Math.random().toString(16).slice(5)
    this.title = pTitle;
    this.authorId = pAuthorID;
    this.genre = pGenre;
    this.series = pSeries;
    this.readDate = pReadDate;
    this.bookKeywords = pKeywords;
    this.location = pLocation;
};

const Author = function(pFirstName, pLastName, pAlterEgos, pAuthorKeywords, pAuthorWebsite){
    this.id = Math.random().toString(16).slice(5)
    this.firstName = pFirstName;
    this.lastName = pLastName;
    this.alterEgos = pAlterEgos;
    this.authorKeywords = pAuthorKeywords;
    this.authorWebsite = pAuthorWebsite;
};

//make up data to use for front end that matches api
//some things might changes once I build backend so check for discrepancies 



// view main page
// address - /books

//view book page
// address - /book/id

//view author page
// address - /book/:bookId/author