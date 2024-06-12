// ADD AUTHOR //
const Author = function(pFirstName, pLastName, pAlterEgos, pAuthorKeywords, pAuthorWebsite){
    this.id = Math.random().toString(16).slice(5)
    this.firstName = pFirstName;
    this.lastName = pLastName;
    this.alterEgos = pAlterEgos;
    this.authorKeywords = pAuthorKeywords;
    this.authorWebsite = pAuthorWebsite;
};

let authorArray = [];
window.authorArray = authorArray;

alterEgoArray = [""];
authorKeywordsArr = [""];

//Test inputs
authorArray.push(new Author("AuthorFirst1", "AuthorLast1", ["Robert Frost"], ["Washington", "best seller"], "url.com"));
authorArray.push(new Author("AuthorFirst2", "AuthorLast2", "", ["Washington"], "url.com"));
authorArray.push(new Author("AuthorFirst3", "AuthorLast3", ["Haily Robert"], ["Washington", "best seller"], "url.com"));
authorArray.push(new Author("Ralph", "Waldo", ["No Name"], ["Washington", "best seller"], "url.com"));

//Add Author #addAuthor
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("submitAuthor").addEventListener("click", function(){
        authorArray.push(
            new Author(
                document.getElementById("iFirstName").value, 
                document.getElementById("iLastName").value, 
                alterEgoArray, 
                authorKeywordsArr, 
                document.getElementById('iAuthorWebsite').value
            )
        );
        document.location.href = "index.html#view";
    });

    document.addEventListener("change", function(e){
        if(e.target.id === "iAlterego"){
           if(e.target.value != null){
            alterEgoArray = e.target.value.split(", ");
           } else { 
            alterEgoArray = [""];
            }
        }
        
        if(e.target.id === "iAuthorKeywords"){
            if(e.target.value != null){
                authorKeywordsArr = e.target.value.split(", ");
            } else {
                authorKeywordsArr = [""];
            }
        }
    });

    // $(document).on("pagebeforeshow", "#view", function(e) {createAuthorList() })
    console.log("authors", authorArray);
    $(document).on("pagebeforeshow", "#add", function(e) {updateArray() })
})

function updateArray(){
    authorArray.sort();
    console.log("authors", authorArray);
}


// createAuthorList = () => {
//     //clear old data 
//     let authorList = document.getElementById("AuthorList");
//     authorList.innerHTML = "";

//     authorArray.forEach(function(element,) {
//         var authorLi = document.createElement('li');
//         authorLi.innerHTML = `${element.id}: ${element.firstName} ${element.lastName} ${element.alterEgos}`;
//         authorList.appendChild(authorLi);
//     });
// }


// VIEW AUTHOR //


