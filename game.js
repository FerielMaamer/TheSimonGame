var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var result = true;

function nextSequence() {    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);
    $("h1").text("level"+level);
    level++;        
    var search = "#"+randomChosenColour;
    $(search).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);    
    playSound("./sounds/"+randomChosenColour+".mp3");   
    
}

$("div.btn").click(function(event) {
    var userChosenColour = event.target.id;
	userClickedPattern.push(userChosenColour);
    playSound("./sounds/"+userChosenColour+".mp3");
    animatePress("#"+event.target.id);
    if (userClickedPattern.length === gamePattern.length){
        checkAnswer(userClickedPattern);
        userClickedPattern =[];
    }    
})

$(document).keypress(function(){
	nextSequence();    
})

function checkAnswer(userClickedPattern){
    for (i=0; i<gamePattern.length; i++){
        if (!userClickedPattern[i] === gamePattern[i]){
            result = false;
            playSound("./sounds/wrong.mp3");
            $("body").addClass("game-over");
            setTimeout(function() {                 
                $("body").removeClass("game-over");
            },300); 
            $("h1").text("Game Over, Press Any Key to Restart");
            level = 0;
            gamePattern= [];
            userClickedPattern = [];
            break;           
        } 
    }
    if (result){
        userClickedPattern =[];
        setTimeout(function() { nextSequence() },1000);
        return true;
        
    }
}

function playSound(name){
    var audio = new Audio(name);
    audio.play();
}

function animatePress(currentColour){
    $(currentColour).addClass("pressed");
    setTimeout(function(){
        $(currentColour).removeClass("pressed");
    }, 100)
}