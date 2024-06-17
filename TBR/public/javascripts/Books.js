// Global Variables //
let bookArray = [];
let bookId;
let authorId;
let bookIdParmArray;
let locStorBookArray;
let authorIdParmArray;
let lsAuthorArray;

// PAGE BEFORE SHOW //
$(document).on("pagebeforeshow", "#home", function(e){ 
    createBookList() 
});
$(document).on("pagebeforeshow", "#add", function(e){ 
    updateArray();
    lsAuthorArray = JSON.parse(localStorage.getItem('authorArray'));;
});
$(document).on("pagebeforeshow", "#addAuthor", function(e){ });
$(document).on("pagebeforeshow", "#addBook", function(e){ 
    lsAuthorArray = JSON.parse(localStorage.getItem('authorArray'));
    pullAuthors();
});
$(document).on("pagebeforeshow", "#view", function(e){ 
    createBookList() 
});
$(document).on("pagebeforeshow", "#viewBook", function(e){ 
    bookId = localStorage.getItem('parm');
    authorId = localStorage.getItem("parm-author");
    bookArray = JSON.parse(localStorage.getItem('bookArray'));
    createBookView();
 });

// HTML HELPER FUNCTIONS //
function pullAuthors(){
    let authorList = document.getElementById("iAuthor");
    authorList.innerHTML=""
    for(let i=0; i<lsAuthorArray.length; i++){        
        const option = document.createElement("option");
        option.text = `${lsAuthorArray[i].firstName} ${lsAuthorArray[i].lastName}`;
        if(i===0){
            option.selected = "true";
            option.id = "defaultAuthor";
        };
        option.value = i;
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
function updateArray(){
    $.get("/GetAllAuthors", function(data, status){
        authorArray=data;
        authorArray.sort();
        stringAuthorArray = JSON.stringify(authorArray);
        localStorage.setItem("authorArray", stringAuthorArray);
        locStorAuthorArray = JSON.parse(localStorage.getItem('authorArray'));
    })
};

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("buttonAddBook").addEventListener("click", function() {
        document.location.href="index.html#addBook";
    });
    document.getElementById("buttonAddAuthor").addEventListener("click", function() {
        document.location.href="index.html#addAuthor";
    });
});

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

        document.getElementById("iTitle").value=""; 
        document.getElementById("iSeriesName").value="";  
        document.getElementById("iDateRead").value=""; 
        document.getElementById("iBookKeywords").value="";  
        document.getElementById("iBookLocation").value=""; 
    });
    
    document.addEventListener("change", function(e){
        if(e.target.id === "iGenre"){
            selectedGenre = e.target.value;
        }
        if(e.target.id === "iAuthor"){
            selectedAuthor = locStorAuthorArray[e.target.value];
        }
        if(e.target.id === "iBookKeywords"){
            bookKeywordArray = e.target.value.split(", ");
        }
    });
});

//  VIEW MAIN //
function createBookList(sortFn = dynamicSortUp("title")){ 
    $.get("/GetAllBooks", function(data, status){
        bookArray=data;
        bookArray.sort(sortFn);
        stringBookArray = JSON.stringify(bookArray);
        localStorage.setItem("bookArray", stringBookArray);
        locStorBookArray = JSON.parse(localStorage.getItem('bookArray'));

        let bookList = document.getElementById("mainViewTable");
        bookList.innerHTML =`<thead class="tableBar">
                                <th>
                                    <div class="tableHeader">
                                        <div class="headerCol">Title</div>
                                        <div class="arrows">
                                            <div class="up-arrow" id="buttonSortTitleUp"> &#9652; </div>
                                            <div class="down-arrow" id="buttonSortTitleDown"> &#9662;</div>
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    <div class="tableHeader">
                                        <div class="headerCol">Author</div>
                                        <div> 
                                            <div class="up-arrow" id="buttonSortAuthorUp"> &#9652; </div>
                                            <div class="down-arrow" id="buttonSortAuthorDown"> &#9662;</div>
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    <div class="tableHeader">
                                        <div class="headerCol">Genre</div>
                                        <div> 
                                            <div class="up-arrow" id="buttonSortGenreUp"> &#9652; </div>
                                            <div class="down-arrow" id="buttonSortGenreDown"> &#9662;</div>
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    <div class="tableHeader">
                                        <div class="headerCol">Series</div>
                                        <div> 
                                            <div class="up-arrow" id="buttonSortSeriesUp"> &#9652; </div>
                                            <div class="down-arrow" id="buttonSortSeriesDown"> &#9662;</div>
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    <div class="tableHeader">
                                        <div class="headerCol">Read</div>
                                        <div> 
                                            <div class="up-arrow" id="buttonSortReadUp"> &#9652; </div>
                                            <div class="down-arrow" id="buttonSortReadDown"> &#9662;</div>
                                        </div>
                                    </div>
                                </th>
                            </thead>`;
        
        bookArray.forEach(function(element,) {
            const newRow = document.createElement('tr');
            let isSeries = "";
            if( element.series != null && element.series.trim() != "" ){
                isSeries = "checked"
            };
            newRow.classList.add('bookMainView');
            newRow.innerHTML = `<td class="tableData">
                                    <a href="#viewBook" type="text">${element.title}</a>
                                </td>
                                <td class="tableData"> 
                                    <a href="#viewAuthor" type="text">${element.author.firstName} ${element.author.lastName}</a>
                                </td>
                                <td class="tableData">
                                    ${element.genre}
                                </td>
                                <td class="tableData">
                                    <input type="checkbox" disabled="disabled" ${isSeries}/>
                                </td>
                                <td class="tableData">
                                    ${element.readDate}
                                </td>`;
            newRow.setAttribute("data-parm", element.id);
            newRow.setAttribute("data-parm-author", element.author.id);
            bookList.appendChild(newRow);
        });

        //Genre
        document.getElementById("buttonSortGenreUp").addEventListener("click", function() {
            createBookList(dynamicSortUp("genre"));
            document.location.href="index.html#view";
        })

        document.getElementById("buttonSortGenreDown").addEventListener("click", function() {
            createBookList(dynamicSortDown("genre"));
            document.location.href="index.html#view";
        })
        //Title
        document.getElementById("buttonSortTitleUp").addEventListener("click", function() {
            createBookList(dynamicSortUp("title"));
            document.location.href="index.html#view";
        });

        document.getElementById("buttonSortTitleDown").addEventListener("click", function() {
            createBookList(dynamicSortDown("title"));
            document.location.href="index.html#view";
        })
        //Author
        document.getElementById("buttonSortAuthorUp").addEventListener("click", function() {
            createBookList((a, b) => `${a.author.firstName} ${a.author.lastName}`.localeCompare(`${b.author.firstName} ${b.author.lastName}`));
            document.location.href="index.html#view";
        });
        document.getElementById("buttonSortAuthorDown").addEventListener("click", function() {
            createBookList((a, b) => `${b.author.firstName} ${b.author.lastName}`.localeCompare(`${a.author.firstName} ${a.author.lastName}`));
            document.location.href="index.html#view";
        });
        //Series
        document.getElementById("buttonSortSeriesUp").addEventListener("click", function() {
            createBookList((a, b) => `${a.series}`.localeCompare(`${b.series}`));
            document.location.href="index.html#view";
        });

        document.getElementById("buttonSortSeriesDown").addEventListener("click", function() {
            createBookList((a, b) => `${b.series}`.localeCompare(`${a.series}`));
            document.location.href="index.html#view";
        });
        //Read
        document.getElementById("buttonSortReadUp").addEventListener("click", function() {
            createBookList((a, b) => `${a.readDate}`.localeCompare(`${b.readDate}`));
            document.location.href="index.html#view";
        });

        document.getElementById("buttonSortReadDown").addEventListener("click", function() {
            createBookList((a, b) => `${b.readDate}`.localeCompare(`${a.readDate}`));
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
    bookInfo.innerHTML=`<div class="subViewBook">
                            <h1>${bookElement.title}</h1>
                            <div class="subViewTable">
                                <div class="subViewInfo">
                                    <div class="subViewCol">Author: </div>
                                    <div class="subViewCol"><a href="#viewAuthor">${bookElement.author.firstName} ${bookElement.author.lastName}</a></div>
                                </div>
                                <div class="subViewInfo">
                                    <div class="subViewCol">Genre: </div>
                                    <div class="subViewCol">${bookElement.genre}</div>
                                </div>
                                <div class="subViewInfo">
                                    <div class="subViewCol">Series Title: </div>
                                    <div class="subViewCol">${bookElement.series}</div>
                                </div>
                                <div class="subViewInfo">
                                    <div class="subViewCol">Date Read: </div>  
                                    <div class="subViewCol">${bookElement.readDate}</div>
                                </div>
                                <div class="subViewInfo">
                                    <div class="subViewCol">Keywords: </div>
                                    <div class="subViewCol">${bookElement.bookKeywords}</div>
                                </div>
                                <div class="subViewInfo">
                                    <div class="subViewCol">Book Location: </div>
                                    <div class="subViewCol"><a id="bookLocation" href="${bookElement.location}" title="${bookElement.location}">Website</a></div>
                                </div>
                            </div>`;
};



