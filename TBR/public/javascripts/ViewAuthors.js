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
    let keyWordsDiv;
    let alterEgo;
    while(!foundParm){
        if(locStorBookArray[count].author.id === authorId){
            bookElement = locStorBookArray[count];
            foundParm = true;
        }
        count++;
    };

    let authorInfo = document.getElementById("viewAuthorContent");
    authorInfo.innerHTML = `<h2>${bookElement.author.firstName} ${bookElement.author.lastName}</h2>
                            <div>
                                <p>Title</p>
                                <p><a href="#viewBook">${bookElement.title}</a></p>
                            </div>
                            <div>
                                <p>Alter Egos</p>
                                <p>${bookElement.author.AlterEgos}</p>
                            </div>
                            <div>
                                <p>Keywords</p>
                                <p>${bookElement.author.authorKeywords}</p>
                            </div>
                            <div>
                                <p>Author Website</p>
                                <p><a href="${bookElement.author.authorWebsite}">${bookElement.author.authorWebsite}</a></p>
                            </div>`
};

