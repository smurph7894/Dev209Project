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
    let searchList = document.getElementById("searchResults");
    searchList.innerHTML = `<li>
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
                                <div class="ui-bar">KeyWords</div>
                            </div>
                        </li>`;
    
    searchArray.forEach(function(element) {
        const resultLi = document.createElement('li');
        let keywords;
        let title;
        let author;
        if( element.type === "book"){
            keywords = element.bookKeywords;
            title = element.title;
            author = `${element.author.firstName} ${element.author.firstName}`
            resultLi.setAttribute("data-parm", element.id);
            resultLi.setAttribute("data-parm-author", element.author.id);
        } else {
            keywords = element.authorKeyWords;
            title = "";
            author = `${element.firstName} ${element.firstName}`
            resultLi.setAttribute("data-parm-author", element.id);
        };
        resultLi.classList.add('searchEntries')

        resultLi.innerHTML = `<li> 
                                <div class="ui-block-a">
                                    <div class="ui-bar">
                                        <p><a href="#viewBook" type="text">${title}</a></p>
                                    </div>
                                </div>
                                <div class="ui-block-b">
                                    <div class="ui-bar">
                                        <div class="ui-bar">
                                            <p><a href="#viewAuthor" type="text">${author}</a></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="ui-block-c">
                                <div class="ui-bar">${keywords}</div>
                                </div>
                            </li> `;


        searchList.appendChild(resultLi);
    });

    //Title Arrows
    document.getElementById("buttonSortTitleUp").addEventListener("click", function() {
        locStorBookArray.sort(dynamicSortUp("title"));
        viewSearch();
        document.location.href="index.html#search";
    });
    document.getElementById("buttonSortTitleDown").addEventListener("click", function() {
        locStorBookArray.sort(dynamicSortDown("title"));
        viewSearch();
        document.location.href="index.html#search";
    })
    //Author Arrows
    document.getElementById("buttonSortAuthorUp").addEventListener("click", function() {
        locStorBookArray.sort((a, b) => `${a.author.firstName} ${a.author.lastName}`.localeCompare(`${b.author.firstName} ${b.author.lastName}`));
        viewSearch();
        document.location.href="index.html#search";
    });
    document.getElementById("buttonSortAuthorDown").addEventListener("click", function() {
        locStorBookArray.sort((a, b) => `${b.author.firstName} ${b.author.lastName}`.localeCompare(`${a.author.firstName} ${a.author.lastName}`));
        viewSearch();
        document.location.href="index.html#search";
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

function dynamicSortUp(property){
    return function (a, b) {
        return a[property].localeCompare(b[property]);
    }
};

function dynamicSortDown(property){
    return function (a, b) {
        return b[property].localeCompare(a[property]);
}};

function findSearch(){
    let input = document.getElementById('iSearchWords').value;
    let regexes = input.split(',').map(regex => new RegExp(regex.trim(), "i"));
    console.log("reg", regexes)

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

    console.log(searchArray);
};
