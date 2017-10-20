//wait until DOM is loaded
window.addEventListener("load", init);

/**
 * Initialize the application (after DOM ready)
 */
function init() {
    // addElement();
    getDataFromJSON();
}

function getDataFromJSON(){
$.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
.done(function(resultData){
    console.log(resultData)
    drawCards();
})
.fail(function(){
    console.log("failed");
}
); 
}

function drawCards(){
    $.getJSON("https://deckofcardsapi.com/api/deck/far2jvaoahuu/draw/?count=2")
    .done(function(resultData){
        console.log(resultData)
    })
    .fail(function(){
        console.log("failed");
    }
    ); 
}
