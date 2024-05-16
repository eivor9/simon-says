const button = document.querySelector("button");
let levelHeader = document.querySelector("h1");
const container = document.querySelector(".container");
const tiles = document.querySelectorAll(".tile");
const circularTiles = [tiles[0], tiles[1], tiles[3], tiles[5], tiles[4], tiles[2]];
const colors = [
    {dark: "rgba(255, 0, 0, 0.5)", light: "rgba(255, 0, 0, 1)"},
    {dark: "rgba(255, 128, 0, 0.5)", light: "rgba(255, 128, 0, 1)"},
    {dark: "rgba(255, 255, 0, 0.5)", light: "rgba(255, 255, 0, 1)"},
    {dark: "rgba(0, 255, 0, 0.5)", light: "rgba(0, 255, 0, 1)"},
    {dark: "rgba(0, 0, 255, 0.5)", light: "rgba(0, 0, 255, 1)"},
    {dark: "rgba(255, 0, 255, 0.5)", light: "rgba(255, 0, 255, 1)"}
]

for (let i = 0; i < circularTiles.length; i++){
    circularTiles[i].addEventListener("mousedown", (e) => e.target.style.background = colors[i].light);
    circularTiles[i].addEventListener("touchstart", (e) => e.target.style.background = colors[i].light);
    circularTiles[i].addEventListener("mouseup", (e) => e.target.style.background = colors[i].dark);
    circularTiles[i].addEventListener("touchend", (e) => e.target.style.background = colors[i].dark);
    circularTiles[i].addEventListener("dblclick", (e) => e.preventDefault());
}

class Sequence {
    constructor (tile, index){
        this.tile = tile;
        this.index = index;
    }
}

let level = 1;
let simonSequence = [];
let buttonSequence = [];
button.addEventListener("click", game);

for(let i = 0; i < circularTiles.length; i++){
    circularTiles[i].style.backgroundColor = colors[i].light;
}

addClickListeners();

function checkAnswer(){
    removeClickListeners();
    for(let i = 0; i < simonSequence.length; i++){
        if(simonSequence[i].tile !== buttonSequence[i])
            return false;
    }
    return true;
}

function addButton(e){
    buttonSequence.push(e.target);
    if (buttonSequence.length === simonSequence.length){
        if(checkAnswer()){
            continueGame();
        }
        else{
            button.style.background = "linear-gradient(rgba(255, 0, 0, 1), rgba(255 ,0, 0, 0.5))";
            button.style.color = "white";
            button.innerText = "Game Over";
            level = 1;
            simonSequence = [];
            buttonSequence = [];
            button.addEventListener("click", game);
        }
    }
}

function game(){
    levelHeader.innerText = "Lvl " + level;
    button.style.background = "rgba(255, 255, 255, 0.5)";
    button.style.color = "black";
    button.innerHTML = "..."
    if(level === 1){
        for(let i = 1; i <= circularTiles.length; i++){
            setTimeout(() => circularTiles[i-1].style.backgroundColor = colors[i-1].dark, i * 125);
        }
        setTimeout(mainLoop, 1000);
    }
    else{
        mainLoop();
    }
    addClickListeners();
}

function flashTile(tile, index){
    tile.style.backgroundColor = colors[index].light;
    setTimeout(() => tile.style.backgroundColor = colors[index].dark, 500);
}

function randomTile(){
    let randomIndex = Math.floor(Math.random() * circularTiles.length);
    return [circularTiles[randomIndex], randomIndex];
}

function mainLoop(){
    let counter = 0;
    let gameRunning = setInterval(() => {
        if (counter === level - 1){
            let [currentTile, currentIndex] = randomTile();
            flashTile(currentTile, currentIndex);
            simonSequence.push(new Sequence(currentTile, currentIndex));
            setTimeout(disableButton, 1000);
            clearInterval(gameRunning);
        } 
        else{
            let currentSequence = simonSequence[counter];
            flashTile(currentSequence.tile, currentSequence.index);
            counter++;
        }
    }, 750);
}

function disableButton(){
    button.style.fontSize = "8vh";
    button.innerText = "Your turn...";
    button.removeEventListener("click", game);
    
}

function continueGame(){
    button.style.background = "linear-gradient(rgba(0, 255, 0, 1), rgba(0, 255, 0, 0.5))";
    button.style.color = "white";
    button.innerHTML = "Nice!";
    button.addEventListener("click", game);
    buttonSequence = [];
    level++;
}

function addClickListeners(){
    for(let i = 0; i < circularTiles.length; i++){
        circularTiles[i].addEventListener("click", addButton);
        circularTiles[i].addEventListener("touchstart", addButton);
    }
}
function removeClickListeners(){
    for(let i = 0; i < circularTiles.length; i++){
        circularTiles[i].removeEventListener("click", addButton);
        circularTiles[i].removeEventListener("touchstart", addButton);
    }
}