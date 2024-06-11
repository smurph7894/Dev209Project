const Author = require ('../models');


let authorArray = [];
let iAlterEgo = [""];

//Test inputs
authorArray.push(new Author("AuthorFirst1", "AuthorLast1", ["Robert Frost"], ["Washington", "best seller"], "url.com"));
authorArray.push(new Author("AuthorFirst2", "AuthorLast2", "", ["Washington"], "url.com"));
authorArray.push(new Author("AuthorFirst3", "AuthorLast3", ["Haily Robert"], ["Washington", "best seller"], "url.com"));
authorArray.push(new Author("AuthorFirst4", "AuthorLast4", ["No Name"], ["Washington", "best seller"], "url.com"));

//Add Author #addAuthor
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("submitAuthor").addEventListener("click", function(){
// TODO - edit for alter ego to not be entered
//      - allow for keywords and alter ego to have array
        authorArray.push(new Author(document.getElementById("iFirstName").value, document.getElementById("iLastName").value, 
        iAlterEgo, document.getElementById("iAuthorKeywords").value))
        document.location.href = "index.html#view";
    })

    // //TODO unsure if correct
    // document.addEventListener("change", function(e){
    //     if(e.target.id === "iAlterEgoBool"){
    //         if(e.target.id === "iAlterego"){
    //             iAlterEgo = e.target.value;
    //         }
    //     }
    // })

})

// createList = () => {
//     let authorList = document.getElementById("AuthorList");
//     authorList.innerHTML = "";

    
// }