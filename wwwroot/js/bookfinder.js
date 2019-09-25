$(document).ready(function(){
    $("#book-name").on('change paste', function() {
        var bookName = $("#book-name").val();
        if(bookName){
            $( "#init-msg" ).addClass("d-none");
            $( "#query-results" ).empty();
            bookSearchQuery(bookName);
        } else {
            $( "#init-msg" ).removeClass("d-none");
            $( "#query-results" ).empty();
        }
    });
    async function bookSearchQuery(query) {
        const response = await fetch('/api/' + query);
        if(response.status == 200)
        {
            const data = await response.json();
            if(data && data.length > 0){
                for (let i = 0 ; i < data.length; i++){
                    let item = data[i];
                    let smallThumbnail = item.imageLinks ? item.imageLinks.smallThumbnail : "";
                    let authors = item.authors ? item.authors.join() : "";
                    let title = item.title ? item.title : "";
                    let publisher = item.publisher ? item.publisher : "";
                    let publishedDate = item.publishedDate ? item.publishedDate : "";
                    let previewLink = item.previewLink ? item.previewLink : "";
                    let innerHtml = htmlBuilder(smallThumbnail, title, authors, publisher, publishedDate, previewLink);
                    document.getElementById("query-results").innerHTML += innerHtml;
                }
            }
            else{
                console.log("No results found for: " + query);
                document.getElementById("query-results").innerHTML = "<h4>No Results</h4>";
            }
        }
        else{
            console.log("No results found for: " + query);
            document.getElementById("query-results").innerHTML = "<h4>No Results</h4>";
        }
    }

    function htmlBuilder(smallThumbnail, title, authors, publisher, publishedDate, previewLink){
        var innerHtml = "<div class='col-sm-6 my-4'>"
        +"<div class='card mb-3 h-100' style='max-width: 540px;'>"
        +" <div class='row no-gutters'>"
        +"<div class='col-md-4'>"
        +"<img src='"+smallThumbnail+"' class='card-img' alt='"+title+"' Image>"
        +"</div>"
        +"<div class='col-md-8'>"
        +"<div class='card-body'>"
        +"<h5 class='card-title'>"+title+"</h5>"
        +"<p class='card-text'>By: "+authors+"<br/>Published By: "+publisher+"<br/>Published Date: "+publishedDate+"</p>"
        +"<a class='btn btn-success btn-lg mt-4' href='"+previewLink+"' target='_blank'>More Info</a>"
        +"</div>"
        +"</div>"
        +"</div>"
        +"</div>"
        +"</div>";
        return innerHtml;
    }
   
});