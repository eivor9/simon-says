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
    for (let i = 1; i <= level; i++){
        const [currentTile, currentIndex] = randomTile();
        currentTile.style.backgroundColor = colors[currentIndex].light;
        setTimeout(() => currentTile.style.backgroundColor = colors[currentIndex].dark, i*500);
        simonSequence.push( new Sequence(currentTile, currentIndex) );
    }
    level++;
}




function randomTile(){
    let randomIndex = Math.floor(Math.random() * circularTiles.length);
    return [circularTiles[randomIndex], randomIndex];
}
