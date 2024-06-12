// HTML HELPER FUNCTIONS //
let authors = window.authorArray;
    
function pullAuthors(){
    let authorList = document.getElementById("iAuthor");
    authorList.innerHTML=""

    for(let i=0; i<authors.length; i++){
        const option = document.createElement("option");
        option.text = `${authors[i].firstName} ${authors[i].lastName}`;
        option.value = authors[i];
        authorList.add(option, authorList[i]);
    }
};

// ADD BOOK //
window.addEventListener("hashchange", function(e) {
    const hash = location.hash;
    if(hash === `#addBook`){
        pullAuthors();
    }
});


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

let bookArray = [];
let selectedGenre = "none selected";
let selectedAuthor = {};
let bookKeywordArray = [""];

//Test inputs
bookArray.push( new Book("Title 1", {id: '015421', AlterEgos: ["betsey"], authorKeywords: [""], authorWebsite: "url.com", firstName: "Bethany", lastName: "Henly" }, "Mystrey", "Series1", "2019-05-15", ["words", "words2"], "url.com"));
bookArray.push( new Book("Title 2", "AuthorId", "Fantasy", null, "2019-05-15", ["words", "words2"], "url.com"));
bookArray.push( new Book("Title 3", {id: '2132458', AlterEgos: ["No Name"], authorKeywords: ["Washington", "best seller"], authorWebsite: "url.com", firstName: "Ralph", lastName: "Waldo" }, "Romance", "SeriesFancy", "2019-05-15", ["words", "words2"], "url.com"));


//Add book #addBook
document.addEventListener("DOMContentLoaded", function(e){
    console.log("starting", authorArray)
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
        console.log(document.getElementById("iTitle").value, 
                selectedAuthor, 
                selectedGenre, 
                document.getElementById("iSeriesName").value, 
                document.getElementById("iDateRead").value,
                bookKeywordArray, 
                document.getElementById("iBookLocation").value)
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

//  VIEW MAIN //
function createBookList(){
    let bookList = document.getElementById("mainViewList");
    bookList.innerHTML = `<li>
                            <div class="ui-block-a">
                                <div class="ui-bar">Title</div>
                            </div>
                            <div class="ui-block-b">
                                <div class="ui-bar">Author</div>
                            </div>
                            <div class="ui-block-c">
                                <div class="ui-bar">Genre</div>
                            </div>
                            <div class="ui-block-d">
                                <div class="ui-bar">Series</div>
                            </div>
                            <div class="ui-block-e">
                                <div class="ui-bar">Read</div>
                            </div>
                        </li>`;
    
    bookArray.forEach(function(element,) {
        var bookLi = document.createElement('li');
        let isSeries = "";
        if( element.series != null && element.series.trim() != "" ){
            isSeries = "checked"
        };
        bookLi.innerHTML = `<li> 
                                <div class="ui-block-a">
                                    <div class="ui-bar">
                                        <p><a href="#viewBook" type="text">${element.title}</a></p>
                                    </div>
                                </div>
                                <div class="ui-block-b">
                                    <div class="ui-bar">
                                        <div class="ui-bar">
                                            <p><a href="#viewAuthor" type="text">${element.author.firstName} ${element.author.lastName}</a></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="ui-block-c">
                                <div class="ui-bar">${element.Genre}</div>
                                </div>
                                <div class="ui-block-d">
                                    <div class="ui-bar">
                                        <input type="checkbox" disabled="disabled" ${isSeries}>
                                    </div>
                                </div>
                                <div class="ui-block-e">
                                    <div class="ui-bar">${element.readDate}</div>
                                </div>    
                            </li> `;
        bookList.appendChild(bookLi);
    });
}
