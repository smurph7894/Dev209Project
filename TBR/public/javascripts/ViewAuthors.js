$(document).on("pagebeforeshow", "#viewAuthor", function(e){ 
    bookId = localStorage.getItem('parm');
    authorId = localStorage.getItem("parm-author");
    locStorBookArray = JSON.parse(localStorage.getItem('bookArray'));
    createAuthorView();
});

function createAuthorView(){
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
                                        <div class="subViewCol">${bookElement.author.AlterEgos}</div>
                                    </div>
                                    <div class="subViewInfo">
                                        <div class="subViewCol">Keywords: </div>
                                        <div class="subViewCol">${bookElement.author.authorKeywords}</div>
                                    </div>
                                    <div class="subViewInfo">
                                        <div class="subViewCol">Author Website: </div>  
                                        <div class="subViewCol"><a href="${bookElement.author.authorWebsite}" title="${bookElement.author.authorWebsite}">Website</a></div>
                                    </div>
                                </div>
                            </div>`;
};


