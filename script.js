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

class Sequence {
    constructor (tile, index){
        this.tile = tile;
        this.index = index;
    }
}

let level = 1;
let simonSequence = [];
let buttonSequence = [];

for(let i = 0; i < circularTiles.length; i++){
    circularTiles[i].style.backgroundColor = colors[i].light;
}
for(let i = 1; i <= circularTiles.length; i++){
    setTimeout(() => circularTiles[i-1].style.backgroundColor = colors[i-1].dark, i * 125);
}

function game(){
    console.log(simonSequence);
    let counter = 0;
    let gameRunning = setInterval(() => {
        if (counter === level - 1){
            let [currentTile, currentIndex] = randomTile();
            flashTile(currentTile, currentIndex);
            simonSequence.push(new Sequence(currentTile, currentIndex));
            level++;
            clearInterval(gameRunning);
        } 
        else{
            let currentSequence = simonSequence[counter];
            flashTile(currentSequence.tile, currentSequence.index);
            counter++;
        }
    }, 500);
}


function flashTile(tile, index){
    tile.style.backgroundColor = colors[index].light;
    setTimeout(() => tile.style.backgroundColor = colors[index].dark, 500);
}

function randomTile(){
    let randomIndex = Math.floor(Math.random() * circularTiles.length);
    return [circularTiles[randomIndex], randomIndex];
}
