
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
var dealerCards = [];
var hitme = 0;
var dealme = 0;
var dealerScore = 0;
var playerScore = 0;
var scoreplayer = localStorage.getItem("scoreplayer");
if (scoreplayer == null){
    var scoreplayer = 1000;
} 


document.getElementById("score").innerHTML = "Your score is: " + scoreplayer;
//button interactions
document.getElementById("deck").addEventListener("click", generateDeck);
document.getElementById("hit").addEventListener("click", hitCard);
document.getElementById("uitslag").addEventListener("click", uitslag);

// AJAX functions
//initializing function for the deck of cards
function generateDeck() {
    $.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
        .done(function (resultData) {
            deckID = resultData.deck_id;
            console.log(resultData);
            drawDealer();
            drawCards();
        })
        .fail(function () {
            console.log("failed");
        });
}
// scripts for dealer interactions
// function to draw the dealer hand
function drawDealer() {
    $.getJSON("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=2")
        .done(function (resultData) {
            console.log(resultData);
            displayDealer(resultData.cards);
            checkValues(dealerCards);
            document.getElementById("dealer").style.visibility = "visible";
            console.log(dealerCards);
        })
        .fail(function () {
            console.log("failed");
        });
}
//function ot draw extra dealer card
function hitDealer() {
    $.getJSON("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1")
        .done(function (resultData) {
            console.log(resultData);
            displayDealer(resultData.cards);
            checkValues(dealerCards);
            console.log(dealerCards);
        })
        .fail(function () {
            console.log("failed");
        });
}
//scripts for player ineractions
//funciton to draw the player's hand
function drawCards() {
    $.getJSON("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=2")
        .done(function (resultData) {
            console.log(resultData);
            displayCards(resultData.cards);
            checkValues(playerCards);
            document.getElementById("cards").style.visibility = "visible";
            console.log(playerCards);

        })
        .fail(function () {
            console.log("failed");
        });
}
// function to add an extra card for the player
function hitCard() {
    $.getJSON("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1")
        .done(function (resultData) {
            console.log(resultData);
            displayCards(resultData.cards);
            checkValues(playerCards);
            console.log(playerCards);
            score();

        })
        .fail(function () {
            console.log("failed");
        });
}


//functions to display the cards on your screen using for loops and create element
//player cards
function displayCards(cards) {
    var j = cards.length;
    for (var i = 0; i < j; i++) {
        playerCards[hitme] = cards[i].value;
        var newCard = document.createElement("img");
        newCard.setAttribute("src", cards[i].image);
        newCard.setAttribute("height", "300px");
        document.getElementById("cards").appendChild(newCard);
        hitme++;
    }
}
//dealer cards
function displayDealer(cards) {
    var j = cards.length;
    for (var i = 0; i < j; i++) {
        dealerCards[dealme] = cards[i].value;
        if (dealme == 0) {
            var newCard = document.createElement("img");
            newCard.setAttribute("src", "../image/cardback.png");
            newCard.setAttribute("height", "250px");
            newCard.setAttribute("width", "200px");
            document.getElementById("dealer").appendChild(newCard);
            dealme++;
        } else {
            var newCard = document.createElement("img");
            newCard.setAttribute("src", cards[i].image);
            newCard.setAttribute("height", "250px");
            document.getElementById("dealer").appendChild(newCard);
            dealme++;
        }
    }
}
//funcitons that change the given values of jacks/queens/kings and aces
function checkValues(array) {
    var k = array.length;
    for (var i = 0; i < k; i++) {
        // jacks/queens/kings get a value of 10
        if (array[i] == 'KING' || array[i] == 'QUEEN' || array[i] == 'JACK') {
            array[i] = 10;
            console.log(array[i]);
        }
        //player has to choose the value of the ace to be 1 or 11 using 2 buttons
        else if (array[i] == 'ACE') {
            document.getElementById("aceButtons").style.visibility = "visible";
            document.getElementById("one").addEventListener("click", function one() {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == 'ACE')
                        array[i] = 1;
                }
                document.getElementById("aceButtons").style.visibility = "hidden";
                console.log(array[i]);
                console.log(array);
            });
            document.getElementById("eleven").addEventListener("click", function eleven() {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == 'ACE')
                        array[i] = 11;
                }
                document.getElementById("aceButtons").style.visibility = "hidden";
                console.log(array[i]);
                console.log(playerCards);
            });
        }
        //changing the dealers ace values
        else if (dealerCards[i] == 'ACE') {
            if (array.length = 2) {
                dealerCards[i] = 11;
            } else {
                dealerCards[i] = 1;
            }
        }
    }
}
//function to calcutale the score for the player and the dealer
function score() {
    var length = playerCards.length;
    for (var i = 0; i < length; i++) {
        playerScore = playerScore + parseInt(playerCards[i]);
    }
    var dealLength = dealerCards.length;
    for (var i = 0; i < dealLength; i++) {
        dealerScore = dealerScore + parseInt(dealerCards[i]);
    }
    if (dealerScore <= 16) {
        hitDealer();
    }
    console.log(playerScore);
    console.log(dealerScore);
}
// function for the result
function uitslag() {
    playerScore = 0;
    dealerScore = 0;


    score();
    console.log(playerScore);
    console.log(dealerScore);
    if((playerScore == 21 && playerScore != dealerScore)||(playerScore>dealerScore && playerScore<22)||(dealerScore>22 && playerScore<22)){
        window.alert("You won!");
        scoreplayer -= -100;
        console.log(scoreplayer);
        
    }
    else if (playerScore > 21 && dealerScore<22 || (playerScore < dealerScore)&& dealerScore < 22){
        window.alert("You lost!");
        scoreplayer -=100;
        console.log(scoreplayer);
        
    } 
    else if (playerScore==dealerScore || playerScore >21 && dealerScore >21){
        window.alert("Draw!");
        console.log(scoreplayer);
        
    }
    localStorage.setItem("scoreplayer",scoreplayer);

    endgame();

}
function endgame(){
    location.reload();
}
