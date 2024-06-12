// HTML HELPER FUNCTIONS //


// ADD BOOK //
const Book = function (pTitle, pAuthorID, pGenre, pSeries, pReadDate, pBookKeywords, pLocation){
    this.id = Math.random().toString(16).slice(5)
    this.title = pTitle;
    this.authorId = pAuthorID;
    this.genre = pGenre;
    this.series = pSeries;
    this.readDate = pReadDate;
    this.bookKeywords = pBookKeywords;
    this.location = pLocation;
};

let bookArray = [];
let selectedGenre = "none selected";
let selectedAuthor = "none selected";
let bookKeywordArray = [""];


//Test inputs
bookArray.push( new Book("Title 1", "AuthorId", "Genre1", "Series1", "2019-05-15", ["words", "words2"], "url.com"));
bookArray.push( new Book("Title 2", "AuthorId", "Genre4", "Seriesasdf", "2019-05-15", ["words", "words2"], "url.com"));
bookArray.push( new Book("Title 3", "AuthorId", "Genre6", "SeriesFancy", "2019-05-15", ["words", "words2"], "url.com"));


//Add book #addBook
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("submitBook").addEventListener("click", function (){
        bookArray.push( 
            new Book(
                document.getElementById("iTitle").value, 
                selectedAuthor, 
                selectedGenre, 
                document.getElementById("iSeriesName").value, 
                document.getElementById("iDateRead").value,
                bookKeywordArray, 
                document.getElementById("iBookLocation").value
            )
        );
        document.location.href = "index.html#view";
    });
    
    document.addEventListener("change", function(e){
        if(e.target.id === "iGenre"){
            selectedGenre = e.target.value;
        }
        if(e.target.id === "iAuthor"){
            selectedAuthor = e.target.value;
        }
        if(e.target.id === "iBookKeywords"){
            bookKeywordArray = e.target.value.split(", ");
        }
    });

    $(document).on("pagebeforeshow", "#view", function(e){ createBookList() })
});

// TODO - work on selectAuthor

function createBookList(){
    //clear old data
    let bookList = document.getElementById("mainViewList");
    bookList.innerHTML = "";
    
    bookArray.forEach(function(element,) {
        var bookLi = document.createElement('li');
        bookLi.innerHTML = `${element.id}: ${element.title} ${element.authorId} ${element.genre}`;
        bookList.appendChild(bookLi);
    });
}
