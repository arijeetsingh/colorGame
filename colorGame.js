var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll('.square');
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    // MODE BUTTONS EVENT LISTNERS
    setupModeButtons();
    // EVENT HANDLERS FOR SQUARES
    setupSquares();
    // RUNNING RESET FUNCTION
    reset();
}

function setupModeButtons(){
    for (var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            if(this.textContent === "Easy"){
                numSquares = 3;
            } else{
                numSquares = 6;
            }
            // figure out how many squares to show
            // pick new colors
            // pick a new pickedColor
            // update page to reflect changes
            reset();
        });
    }
}

function setupSquares(){
    for(var i = 0; i < squares.length; i++){
        // add click listners to squares
        squares[i].addEventListener('click', function(){
            // grab color to clicked square
            var clickedColor = this.style.backgroundColor;
            // compare color to pickedColor
            if(clickedColor === pickedColor){
                //alert("Correct");
                //console.log("correct color selected");
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again!";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else{
                //alert("Wrong");
                //console.log("wrong color selected");
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again!";
            }
        });
    }
}
function reset(){
    // generate all new colors
    colors = generateRandomColors(numSquares);
    // pick a new random color from array
    pickedColor = pickColor();
    // change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    // Should only display new colors
    resetButton.textContent = "New Colors"
    // messageDisplay should get empty
    messageDisplay.textContent = "";
    // change colors of squares
    for(var i = 0 ; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else{
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function() {
    reset();
})

function changeColors(color){
    // loop through all squares
    for(var i = 0; i < colors.length; i++){
        // change each color to match the given color
        squares[i].style.backgroundColor = color; 
    }
}

function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num){
    // make an array
    var arr = [];
    // add num random colors to array
    for(var i = 0; i < num; i++){
        // get random color and push into arr
        arr.push(randomColor());
    }
    // return array at end
    return arr;
}

function randomColor(){
    // pick red from 0-255
    var r = Math.floor(Math.random()*256);
    // pick green from 0-255
    var g = Math.floor(Math.random()*256);
    // pick blue from 0-255
    var b = Math.floor(Math.random()*256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}