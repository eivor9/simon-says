const container = document.querySelector(".container");
const holes = document.querySelectorAll(".hole");
for(let i = 0; i < holes.length; i++){
    holes[i].addEventListener("click", (e) => {
        e.preventDefault();
        testing.push(e.target);
        console.log(testing);
    })
}

let level = 1;
let simonSequence = [];
let testing = [];

class Sequence {
    constructor (tile, color){
        this.tile = tile;
        this.color = color;
    }
}

function gameLoop(level){
    for(let i = 0; i < level; i++){

        let newButton = randomTile();
        let newColor = psuedoRandomColor();

        newButton.style.backgroundColor = newColor;
        setTimeout(() => newButton.style.backgroundColor = "", 1000);

        let newSequence = new Sequence(newButton, newColor);
        simonSequence.push(newSequence);
    }
}

function randomTile(){
    let randomIndex = Math.floor(Math.random() * 10);
    return holes[randomIndex];
}

function psuedoRandomColor(){
    const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
    let randomIndex = Math.floor(Math.random() * 10);
    return colors[randomIndex];
}

