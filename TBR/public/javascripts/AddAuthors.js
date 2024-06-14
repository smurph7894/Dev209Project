// ADD AUTHOR //
$(document).on("pagebeforeshow", "#add", function(e) {updateArray() })

const Author = function(pFirstName, pLastName, pAlterEgos, pAuthorKeywords, pAuthorWebsite){
    this.id = Math.random().toString(16).slice(5)
    this.firstName = pFirstName;
    this.lastName = pLastName;
    this.alterEgos = pAlterEgos;
    this.authorKeywords = pAuthorKeywords;
    this.authorWebsite = pAuthorWebsite;
};

let authorArray = [];

alterEgoArray = [""];
authorKeywordsArr = [""];

//Add Author #addAuthor
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("submitAuthor").addEventListener("click", function(){
        let newAuthor = new Author(
            document.getElementById("iFirstName").value, 
            document.getElementById("iLastName").value, 
            alterEgoArray, 
            authorKeywordsArr, 
            document.getElementById('iAuthorWebsite').value
        );

        $.ajax({
            url: "/AddAuthor",
            type: "POST",
            data: JSON.stringify(newAuthor),
            contentType: "application/json;charset=utf-8",
            success: function(result){
              document.location.href = "index.html#view";
            },
            error: function (xhr, textStatus, errorThrown){
              alert($`Server could not add book ${newAuthor.lastName}.`);
              alert($`${textStatus} ${errorThrown}`)
            }
        });

        document.location.href = "index.html#add";
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
});

function updateArray(){
    authorArray.sort();
};


