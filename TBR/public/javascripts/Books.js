// Global Variables //
let bookArray = [];
let bookId;
let authorId;
let bookIdParmArray;
let locStorBookArray;
let authorIdParmArray;

// PAGE BEFORE SHOW //
$(document).on("pagebeforeshow", "#home", function(e){ createBookList() });
$(document).on("pagebeforeshow", "#add", function(e){ });
$(document).on("pagebeforeshow", "#addBook", function(e){ });
$(document).on("pagebeforeshow", "#addAuthor", function(e){ });
$(document).on("pagebeforeshow", "#view", function(e){ createBookList() });
$(document).on("pagebeforeshow", "#viewBook", function(e){ 
    bookId = localStorage.getItem('parm');
    authorId = localStorage.getItem("parm-author");
    createBookView();
 });

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

// ADD BOOK //
window.addEventListener("hashchange", function(e) {
    const hash = location.hash;
    if(hash === `#addBook`){
        pullAuthors();
    }
});

//Add book #addBook
document.addEventListener("DOMContentLoaded", function(e){
    let selectedGenre = "none selected";
    let selectedAuthor = {};
    let bookKeywordArray = [""];
    document.getElementById("submitBook").addEventListener("click", function (){
        let newBook = new Book(
            document.getElementById("iTitle").value, 
            selectedAuthor, 
            selectedGenre, 
            document.getElementById("iSeriesName")?.value, 
            document.getElementById("iDateRead").value,
            bookKeywordArray, 
            document.getElementById("iBookLocation").value
        )
        $.ajax({
            url: "/AddBook",
            type: "POST",
            data: JSON.stringify(newBook),
            contentType: "application/json;charset=utf-8",
            success: function(result){
              document.location.href = "index.html#view";
            },
            error: function (xhr, textStatus, errorThrown){
              alert($`Server could not add book ${newBook.Title}.`);
              alert($`${textStatus} ${errorThrown}`)
            }
        });

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
});

//  VIEW MAIN //
function createBookList(){ 
    $.get("/GetAllBooks", function(data, status){
        bookArray=data;
        stringBookArray = JSON.stringify(bookArray);
        localStorage.setItem("bookArray", stringBookArray);
        locStorBookArray = JSON.parse(localStorage.getItem('bookArray'));

        let bookList = document.getElementById("mainViewList");
        bookList.innerHTML = `<li>
                                <div class="ui-block-a">
                                    <div class="ui-bar">Title</div>
                                    <div class="up-arrow" id="buttonSortTitleUp"> &#9650; </div>
                                    <div class="down-arrow" id="buttonSortTitleDown"> &#9660;</div>
                                </div>
                                <div class="ui-block-b">
                                    <div class="ui-bar">Author</div>
                                    <div class="up-arrow" id="buttonSortAuthorUp"> &#9650; </div>
                                    <div class="down-arrow" id="buttonSortAuthorDown"> &#9660;</div>
                                </div>
                                <div class="ui-block-c">
                                    <div class="ui-bar">Genre</div>
                                    <div class="up-arrow" id="buttonSortGenreUp"> &#9650; </div>
                                    <div class="down-arrow" id="buttonSortGenreDown"> &#9660;</div>
                                </div>
                                <div class="ui-block-d">
                                    <div class="ui-bar">Series</div>
                                    <div class="up-arrow" id="buttonSortSeriesUp"> &#9650; </div>
                                    <div class="down-arrow" id="buttonSortSeriesDown"> &#9660;</div>
                                </div>
                                <div class="ui-block-e">
                                    <div class="ui-bar">Read</div>
                                    <div class="up-arrow" id="buttonSortReadUp"> &#9650; </div>
                                    <div class="down-arrow" id="buttonSortReadDown"> &#9660;</div>
                                </div>
                            </li>`;
        
        bookArray.forEach(function(element,) {
            const bookLi = document.createElement('li');
            let isSeries = "";
            if( element.series != null && element.series.trim() != "" ){
                isSeries = "checked"
            };
            bookLi.classList.add('bookMainView');
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
                                    <div class="ui-bar">${element.genre}</div>
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
            bookLi.setAttribute("data-parm", element.id);
            bookLi.setAttribute("data-parm-author", element.author.id);
            bookList.appendChild(bookLi);
        });

        //Genre
        document.getElementById("buttonSortGenreUp").addEventListener("click", function() {
            bookArray.sort(dynamicSortUp("genre"));
            createBookList();
            document.location.href="index.html#view";
        })

        document.getElementById("buttonSortGenreDown").addEventListener("click", function() {
            bookArray.sort(dynamicSortDown("genre"));
            createBookList();
            document.location.href="index.html#view";
        })
        //Title
        document.getElementById("buttonSortTitleUp").addEventListener("click", function() {
            bookArray.sort(dynamicSortUp("title"));
            createBookList();
            document.location.href="index.html#view";
        });

        document.getElementById("buttonSortTitleDown").addEventListener("click", function() {
            bookArray.sort(dynamicSortDown("title"));
            createBookList();
            document.location.href="index.html#view";
        })
        //Author
        document.getElementById("buttonSortAuthorUp").addEventListener("click", function() {
            bookArray.sort((a, b) => `${a.author.firstName} ${a.author.lastName}`.localeCompare(`${b.author.firstName} ${b.author.lastName}`));
            createBookList();
            document.location.href="index.html#view";
        });
        document.getElementById("buttonSortAuthorDown").addEventListener("click", function() {
            bookArray.sort((a, b) => `${b.author.firstName} ${b.author.lastName}`.localeCompare(`${a.author.firstName} ${a.author.lastName}`));
            createBookList();
            document.location.href="index.html#view";
        });
        //Series
        document.getElementById("buttonSortSeriesUp").addEventListener("click", function() {
            bookArray.sort((a, b) => `${a.series}`.localeCompare(`${b.series}`));
            createBookList();
            document.location.href="index.html#view";
        });

        document.getElementById("buttonSortSeriesDown").addEventListener("click", function() {
            bookArray.sort((a, b) => `${b.series}`.localeCompare(`${a.series}`));
            createBookList();
            document.location.href="index.html#view";
        });
        //Read
        document.getElementById("buttonSortReadUp").addEventListener("click", function() {
            bookArray.sort((a, b) => `${a.readDate}`.localeCompare(`${b.readDate}`));
            createBookList();
            document.location.href="index.html#view";
        });

        document.getElementById("buttonSortReadDown").addEventListener("click", function() {
            bookArray.sort((a, b) => `${b.readDate}`.localeCompare(`${a.readDate}`));
            createBookList();
            document.location.href="index.html#view";
        });


        let individualBooksList = document.getElementsByClassName("bookMainView");
        bookIdParmArray = Array.from(individualBooksList);

        bookIdParmArray.forEach(function (element, i) {
            element.addEventListener("click", function () {
                let parm = this.getAttribute("data-parm");
                localStorage.setItem('parm', parm);


            })
        });

        let individualAuthorsList = document.getElementsByClassName("bookMainView");
        authorIdParmArray = Array.from(individualAuthorsList);

        authorIdParmArray.forEach(function (element) {
            element.addEventListener("click", function () {
                let parm = this.getAttribute("data-parm-author");
                localStorage.setItem('parm-author', parm);
            })
        });
    });
};

function dynamicSortUp(property){
    return function (a, b) {
        return a[property].localeCompare(b[property]);
    }
};

function dynamicSortDown(property){
    return function (a, b) {
        return b[property].localeCompare(a[property]);
}};

// View Book //
function createBookView(){
    let foundParm = false;
    let count = 0;
    let bookElement;
    while(!foundParm){
        if(bookArray[count].id === bookId){
            bookElement = bookArray[count];
            foundParm = true;
        }
        count++;
    };
    let bookInfo = document.getElementById("viewBookContent");
    bookInfo.innerHTML = `<h2>${bookElement.title}</h2>
                        <div>
                            <p>Author</p>
                            <p><a href="#viewAuthor">${bookElement.author.firstName} ${bookElement.author.lastName}</a></p>
                        </div>
                        <div>
                            <p>Genre</p>
                            <p>${bookElement.genre}</p>
                        </div>
                        <div>
                            <p>Series Title</p>
                            <p>${bookElement.series}</p>
                        </div>
                        <div>
                            <p>Date Read</p>
                            <p>${bookElement.readDate}</p>
                        </div>
                        <div>
                            <p>Keywords</p>
                            <p>${bookElement.bookKeywords}</p>
                        </div>
                        <div id="bookLocation">
                            <p>Book Location</p>
                            <p><a href="${bookElement.location}">${bookElement.location}</a></p>
                        </div>`;
};



