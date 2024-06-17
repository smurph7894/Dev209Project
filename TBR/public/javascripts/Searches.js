$(document).on("pagebeforeshow", "#search", function(e){ });
$(document).on("pagebeforeshow", "#viewBook", function(e){ 
    bookId = localStorage.getItem('parm');
    authorId = localStorage.getItem("parm-author");
    createBookView();
 });

 $(document).on("pagebeforeshow", "#viewAuthor", function(e){ 
    bookId = localStorage.getItem('parm');
    authorId = localStorage.getItem("parm-author");
    locStorBookArray = JSON.parse(localStorage.getItem('bookArray'));
    createAuthorView();
});

// GLOBAL VARIABLES //
locStorBookArray = JSON.parse(localStorage.getItem('bookArray'));
let locStorAuthorArray;
let searchArray;

//  SEARCH //
document.addEventListener("DOMContentLoaded", function(e){
    $.get("/GetAllAuthors", function(data, status){
        authorArray=data;
        stringAuthorArray = JSON.stringify(authorArray);
        localStorage.setItem("authorArray", stringAuthorArray);
        locStorAuthorArray = JSON.parse(localStorage.getItem('authorArray'));

        document.getElementById("searchButton").addEventListener("click", function (){
            findSearch();
            viewSearch();
        })
    });
});
    
function viewSearch(){
    stringAuthorArray = JSON.stringify(locStorAuthorArray);
    localStorage.setItem("authorArray", stringAuthorArray);
    locStorAuthorArray = JSON.parse(localStorage.getItem('bookArray'));

    stringBookArray = JSON.stringify(locStorBookArray);
    localStorage.setItem("bookArray", stringBookArray);
    locStorBookArray = JSON.parse(localStorage.getItem('bookArray'));

    let searchList = document.getElementById("searchResults");
    searchList.innerHTML = `<thead class="tableBar">
                                <th>
                                    <div class="tableHeader">
                                        <div class="headerCol">Title</div>
                                    </div>
                                </th>
                                <th>
                                    <div class="tableHeader">
                                        <div class="headerCol">Author</div>
                                    </div>
                                </th>
                                <th>
                                    <div class="tableHeader">
                                        <div class="headerCol">KeyWords</div>
                                    </div>
                                </th>
                            </thead>`;
    
    searchArray.forEach(function(element) {
        const newRow = document.createElement('tr');
        let keywords;
        let title;
        let author;
        if( element.type === "book"){
            keywords = element.bookKeywords;
            title = element.title;
            author = `${element.author.firstName} ${element.author.lastName}`
            newRow.setAttribute("data-parm", element.id);
            newRow.setAttribute("data-parm-author", element.author.id);
        } else {
            keywords = element.authorKeywords;
            title = "";
            author = `${element.firstName} ${element.firstName}`
            newRow.setAttribute("data-parm-author", element.id);
        };
        newRow.classList.add('searchEntries')

        newRow.innerHTML = `<td class="tableData">
                                <a href="#viewBook" type="text">${title}</a>
                            </td>
                            <td class="tableData">
                                <a href="#viewAuthor" type="text">${author}</a>
                            </td>
                            <td class="tableData">
                                <div>${keywords}</div>
                            </td>`;
        searchList.appendChild(newRow);
    });

    let individualBooksList = document.getElementsByClassName("searchEntries");
    bookIdParmArray = Array.from(individualBooksList);

    bookIdParmArray.forEach(function (element, i) {
        element.addEventListener("click", function () {
            let parm = this.getAttribute("data-parm");
            localStorage.setItem('parm', parm);
        })
    });

    let individualAuthorsList = document.getElementsByClassName("searchEntries");
    authorIdParmArray = Array.from(individualAuthorsList);

    authorIdParmArray.forEach(function (element, i) {
        element.addEventListener("click", function () {
            let parm = this.getAttribute("data-parm-author");
            localStorage.setItem('parm-author', parm);
        })
    })
};

function findSearch(){
    let input = document.getElementById('iSearchWords').value;
    let regexes = input.split(',').map(regex => new RegExp(regex.trim(), "i"));

    let result = [];

    for (let regexSearch of regexes) {
        result.push(...locStorBookArray.filter(
            obj => regexSearch.test(obj.title) || 
            regexSearch.test(obj.author.firstName) ||  
            regexSearch.test(obj.author.lastName) || 
            obj.author.alterEgos?.some(e => regexSearch.test(e) ) ||
            obj.author.authorKeywords?.some(e => regexSearch.test(e) ) ||
            regexSearch.test(obj.genre) || 
            regexSearch.test(obj.series) || 
            obj.bookKeywords?.some(e => regexSearch.test(e) ) ||
            regexSearch.test(obj.location))
            .map( obj => ({...obj, type: "book"}) ));
        
        result.push(...locStorAuthorArray.filter(
            obj => regexSearch.test(obj.firstName) || 
            regexSearch.test(obj.lastName) ||
            obj.alterEgos?.some(e => regexSearch.test(e) ) || 
            obj.authorKeywords?.some(e => regexSearch.test(e) ) ||
            regexSearch.test(obj.authorWebsite))
            .map( obj => ({...obj, type: "author"}) ));
    }
    searchArray = result;
};
