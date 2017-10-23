
//wait until DOM is loaded
window.addEventListener("load", init);

/**
 * Initialize the application (after DOM ready)
 */
function init() {

}
var deckID = null;
var value = 'ACE';
var playerCards = [];
var hitme = 0;


document.getElementById("deck").addEventListener("click", generateDeck);
document.getElementById("hit").addEventListener("click", hitCard);
document.getElementById("uitslag").addEventListener("click", uitslag);

function generateDeck(){
    $.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
        .done(function(resultData){
            deckID = resultData.deck_id;
            console.log(resultData)
            drawCards();

        })
        .fail(function(){
            console.log("failed");
        }); 
}

function hitCard(){
    $.getJSON("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1")
        .done(function(resultData){
            console.log(resultData)
            displayCards(resultData.cards);
            checkValues();
            console.log(playerCards);

            
        })
        .fail(function(){
            console.log("failed");
        }); 
}

function drawCards(){
    $.getJSON("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=2")
        .done(function(resultData){
            console.log(resultData);
            displayCards(resultData.cards);
            checkValues();
            console.log(playerCards);
           
        })
        .fail(function(){
            console.log("failed");
        }); 
}

function displayCards(cards){
    var j = cards.length;
    for( var i = 0; i<j; i++){
        playerCards[hitme] = cards[i].value;
        var newCard = document.createElement("img"); 
        newCard.setAttribute("src", cards[i].image);
        document.getElementById("cards").appendChild(newCard);
        hitme++;
    }
}
function checkValues(){
    var k = playerCards.length;
    for(var i = 0; i<k; i++){
        if  (playerCards[i] == 'KING'|| playerCards[i] == 'QUEEN'|| playerCards[i] == 'JACK'){
            playerCards[i] = 10;
            console.log(playerCards[i]);
        } else  if (playerCards[i] == 'ACE'){
            document.getElementById("one").addEventListener("click", function one(){
            playerCards[i-1] = 1;
            console.log(playerCards[i]);
            console.log(playerCards);
            });
            document.getElementById("eleven").addEventListener("click", function eleven(){
            playerCards[i-1] = 11;
            console.log(playerCards[i]);
            console.log(playerCards);
            });
        } else {
            playerCards[i] = playerCards[i];
            console.log(playerCards[i]);
        }
    }
}

function uitslag(){
    var dealerScore = 0;
    var playerScore = 0;
    var lengte = playerCards.length;
        for(var i=0; i<lengte;i++){
            playerScore = playerScore + parseInt(playerCards[i]);
           
        } 
    console.log(playerScore);
    if((playerScore == 21 && playerScore != dealerScore)||(playerScore>dealerScore && playerScore<22)||(dealerScore>22 && playerScore<22)){
        window.alert("Je hebt gewonnen");
    }
    else if (playerScore > 21 || playerScore < dealerScore){
        window.alert("Je hebt verloren");
    } 
    else if (playerScore==dealerScore){
        window.alert("gelijkspel");
    }
    if (dealerScore<playerScore && dealerScore<21){
        
    }
}