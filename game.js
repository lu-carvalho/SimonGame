// setting default values for variables.  
var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

// start the game: triggered by pressing key for the first time. 
$(document).keydown(function() {
    if (!started) {
        // modifies the head of the web site to display current level
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

// response for when user clicks on certain button
$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    //console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length);
});

// creation of new game sequence to be storred in the gamePattern array 
function nextSequence() {

    userClickedPattern = [];

    // increases level by one when a next sequence is created
    level++;

    // updates the head according to new level 
    $("#level-title").text(`Level ${level}`);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // display effect of button for user
    setTimeout(function() {
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
    }, 300);
}

// handles sound playing logic
function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

// handles animation by pressing logic
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {

    // since indexation starts at 0, adjut the currentLevel to correct index
    var index = currentLevel - 1;
    // check if the user clicked on the right button
    if (userClickedPattern[index] === gamePattern[index]) {
        // check if the user also clicked in the right order. If so, generate next sequence
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else {
        endGame();
        startOver();
    }
}

function endGame(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    
    $("h1").text("Game Over, press any key to restart!")
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}