$(document).ready(function(){
    $("#book-name").on('change paste', function() {
        var bookName = $("#book-name").val();
        if(bookName){
            $( "#init-msg" ).addClass("d-none");
            $( "#query-results" ).empty();
            bookSearch(bookName);
        } else {
            $( "#init-msg" ).removeClass("d-none");
            $( "#query-results" ).empty();
        }
    });
    $("#book-reset").on('click', clear());
    function bookSearch(query) {
        console.log("Finding results for: "+ query);
        fetch('/api/'+ query)
            .then((response) => response.json())
            .then(function(response) {
                if(response && response.length > 0)
                    for (let i = 0; i < response.length; i++) {
                        let item = response[i];
                        document.getElementById("search-results").innerHTML += ""
                            +"<div class='col-sm-6 my-4'>"
                            +"<div class='card mb-3 h-100' style='max-width: 540px;'>"
                            +" <div class='row no-gutters'>"
                            +"<div class='col-md-4'>"
                            +"<img src='"+item.imageLinks.smallThumbnail+"' class='card-img' alt='"+item.title+"' Image>"
                            +"</div>"
                            +"<div class='col-md-8'>"
                            +"<div class='card-body'>"
                            +"<h5 class='card-title'>"+item.title+"</h5>"
                            +"<p class='card-text'>By: "+item.authors.join()+"<br/>Published By: "+item.publisher+"<br/>Published Date: "+item.publishedDate+"</p>"
                            +"<a class='btn btn-success btn-lg mt-4' href='"+item.previewLink+"' target='_blank'>More Info</a>"
                            +"</div>"
                            +"</div>"
                            +"</div>"
                            +"</div>"
                            +"</div>";
                    }
            });
    }
});