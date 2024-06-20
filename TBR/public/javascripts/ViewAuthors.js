$(document).on("pagebeforeshow", "#viewAuthor", function(e){ 
    bookId = localStorage.getItem('parm');
    authorId = localStorage.getItem("parm-author");
    locStorBookArray = JSON.parse(localStorage.getItem('bookArray'));
    createAuthorView();
});

let website;

function createAuthorView(){
    let alterEgo;
    let kword;
    let foundParm = false;
    let count = 0;
    let bookElement;
    while(!foundParm){
        if(locStorBookArray[count].author.id === authorId){
            bookElement = locStorBookArray[count];
            foundParm = true;
        }
        count++;
    };

    if(bookElement.AlterEgos === undefined){
        alterEgo = "";
    } else {
        alterEgo = bookElement.author.AlterEgos;
    }
    if(bookElement.author.authorKeywords === undefined){
        kword = "";
    } else {
        kword = bookElement.author.authorKeywords;
    }
    website = bookElement.author.authorWebsite
    let authorInfo = document.getElementById("viewAuthorContent");
    authorInfo.innerHTML =`<div class="subViewBook">
                                <h1>${bookElement.author.firstName} ${bookElement.author.lastName}</h1>
                                <div class="subViewTable">
                                    <div class="subViewInfo">
                                        <div class="subViewCol">Title: </div>
                                        <div class="subViewCol"><a href="#viewBook">${bookElement.title}</a></div>
                                    </div>
                                    <div class="subViewInfo">
                                        <div class="subViewCol">Alter Egos: </div>
                                        <div class="subViewCol">${alterEgo}</div>
                                    </div>
                                    <div class="subViewInfo">
                                        <div class="subViewCol">Keywords: </div>
                                        <div class="subViewCol">${kword}</div>
                                    </div>
                                    <div class="subViewInfo">
                                        <div class="subViewCol">Author Website: </div>  
                                        <div class="subViewCol" onclick ="WebsiteClickHandler()" title="${bookElement.author.authorWebsite}"><a>Website</a></div>
                                    </div>
                                </div>
                            </div>`;
};


function WebsiteClickHandler(){
    window.open(website)
};

