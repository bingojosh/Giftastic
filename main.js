var topics = ["spongebob", "drake", "two buttons", "batman", "patrick", "keanu reeves", "hasselhoff", "wrestler", "Weenie Hut Jr", "chum bucket", "goku", "santa clause"]
var response=new Object;

$(document).ready(function(){
    
    buttonPrint()

    var url = "https://api.giphy.com/v1/gifs/search";
        q=""

    $(document.body).on("click", ".topics-button", function(){

        q=$(this).attr("data-query");
        console.log(q)

        $("#memes").empty();

        url += '?' + $.param({
            'api_key': "P8LsoM3TmHKEAB4j59Mh9pCLy69IiqGy",
            'q': q,
            'limit': "50",
            'offset' : '0',
            // 'rating': 'G'
        });

        $.ajax({
            url: url,
            method: 'GET',
        }).done(function(result) {
            console.log(result);
            response=result;
            memePrinter(result, 0);
            var moreBtn = $("<button>").text("More Memes Please").addClass("moreBtn")
            moreBtn.attr("i-value", 10)
            moreBtn.appendTo($("#memes"))

        }).fail(function(err) {
            throw err;
        });
    })

    $("#meme-submit").on("click", function(event){
        event.preventDefault();
        var newMeme = $("#meme").val().trim();
        $("#meme").val("");
        console.log(newMeme)
        if(newMeme === ""){
            alert("Not falling for that one.")
        }
        else if(topics.indexOf(newMeme) === -1){
            topics.push(newMeme)
            buttonPrint();
            }
        else{     
            alert("That is already an available meme.")
        }
    })

    $(document.body).on("click", ".moreBtn", function(){
        var i=parseInt($(".moreBtn").attr("i-value"))
        if(i<40){
        memePrinter(response,i);
        $(".moreBtn").appendTo($("#memes"))
        i = i+10
        $(".moreBtn").attr("i-value", i)
        }
        else{
            $(".moreBtn").remove();
            alert("That is all of the memes.")
        }
    })
})

function buttonPrint(){
    $("#buttons").empty();
    for(i=0; i<topics.length; i++){
        var  button = $("<button>").addClass("topics-button")
        button.attr("data-query", `${topics[i]} meme`)
        button.text(topics[i])
        $("#buttons").append(button)
    }
}

function memePrinter(result, start){
    for(i=start;i<start+10;i++){
        var img = $("<img>").attr({
            "animated": "no",
            "data-anim": result.data[i].images.fixed_width.url,
            "data-still": result.data[i].images.fixed_width_still.url,
            "src": result.data[i].images.fixed_width_still.url,
            "id": i
        })

        img.on("click", function(){
            if($(this).attr("animated") === "no"){
                $(this).attr("animated", "yes")
                $(this).attr("src", $(this).attr("data-anim"))
            }
            else{
                $(this).attr("animated", "no")
                $(this).attr("src", $(this).attr("data-still"))
            }
        })

        var fig = $("<figure>").addClass("gif")
        fig.append(img);
        fig.append(`<figcaption> Rating: ${result.data[i].rating}`)
        $("#memes").append(fig)
    }
}

