$(document).on("pagebeforeshow", "#viewAuthor", function(e){ 
    createAuthorView();
});

// View Book //
let aBookArray = window.bookArray;
let aAuthorId = window.authorId;
let alocStorBookArray = window.locStorBookArray

function createAuthorView(){
    let foundParm = false;
    let count = 0;
    let bookElement;
    // console.log("locStore book array", alocStorBookArray)
    console.log("book array", aBookArray) // got expected
    while(!foundParm){
        console.log("test", aBookArray[0].author) // got wrong author but returned
        console.log("test", aBookArray[0].author.id) // got but wrong author
        console.log("author id", aAuthorId) //undefined
        if(aBookArray[count].author.id === aAuthorId){
            bookElement = aBookArray[count];
            foundParm = true;
        }
        count++;
    };

    let authorInfo = document.getElementById("viewAuthorContent");
    authorInfo.innerHTML = `<h2>${bookElement.author.firstName} ${bookElement.author.lastName}</h2>
                            <div>
                                <p>Title</p>
                                <p><a href="#viewbook">${bookElement.title}</a></p>
                            </div>
                            <div>
                                <p>Alter Egos</p>
                                <p>${bookElement.author.alterEgos}</p>
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