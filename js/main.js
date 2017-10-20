//wait until DOM is loaded
window.addEventListener("load", init);

/**
 * Initialize the application (after DOM ready)
 */
function init() {
    // addElement();
    //getDataFromJSON();
}
var deckID = null;
var value = 'ACE';

document.getElementById("deck").addEventListener("click", generateDeck);

function generateDeck(){
$.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
.done(function(resultData){
    deckID = resultData.deck_id;
    console.log(resultData)
    drawCards();
})
.fail(function(){
    console.log("failed");
}); 
}

function drawCards(){
    $.getJSON("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=2")
    .done(function(resultData){
        console.log(resultData)
        displayCards(resultData.cards);

    })
    .fail(function(){
        console.log("failed");
    }
    ); 
}
function displayCards(cards){
  var j = cards.length;
  for( var i = 0; i<j; i++){
    var newCard = document.createElement("img"); 
    newCard.setAttribute("src", cards[i].image);
    document.getElementById("cards").appendChild(newCard);
  }
}


if  (value == 'KING'|| value == 'QUEEN'|| value == 'JACK'){
    value = 10;
    console.log(value);
} else  if (value == 'ACE'){
    document.getElementById("one").addEventListener("click", function one(value){
        value = 1;
        console.log(value);
    });
    document.getElementById("eleven").addEventListener("click", function eleven(value){
        value = 11;
        console.log(value);
    });
} else {
    value = value;
    console.log(value);
}
