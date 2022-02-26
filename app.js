import {
    dinoList
} from "./dino.js";

//global Variables
const button = document.getElementById("btn");
const grid = document.getElementById("grid");
const dinos = [];
const human = {};

// Create Dino Constructor
class Dino {
    constructor(species, weight, height, diet, where, fact1, fact2, fact3) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.fact1 = fact1;
        this.fact2 = fact2;
        this.fact3 = fact3;
    }
}

// Create Dino Objects
(function() {
    for (let dino of dinoList) {
        let dinoObj = new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.fact1, dino.fact2, dino.fact3);
        dinos.push(dinoObj);
    }
})();

// Create Human Object
// Event Listener on the Button to get input data into the Human Object
button.addEventListener("click", function(name, weight, height, diet) {
    human.name = document.getElementById("name").value;
    human.weight = document.getElementById("weight").value;
    human.height = document.getElementById("height").value;
    human.origin = document.getElementById("origin").value;
    human.diet = document.getElementById("diet").value;
    titleGeneration();
});

//Weight Comparison
let compareWeight = function() {
    let counter = 0;
    let message = "";
    for (let dino of dinos) {
        let dinoWeight = dino.weight;
        if (dinoWeight !== "Number") {
            if (human.weight > Math.floor(dino.weight)) {
                counter++;
            } else if (human.weight > dino.weight) {
                counter++;
            }
        }
    }
    message = `You weigh more than ${counter} dinos.`;
    return message;
};

//Height Comparison
let compareHeight = function() {
    let counter = 0;
    let message = "";
    for (let dino of dinos) {
        let dinoHeight = dino.height;
        if (dinoHeight !== "Number") {
            if (human.height > Math.floor(dino.height)) {
                counter++;
            } else if (human.height > dino.height) {
                counter++;
            }
        }
    }
    message = `You are taller than ${counter} dinos.`;
    return message;
};

//Origin Comparison
let compareOrigin = function() {
    let counter = 0;
    let message = "";
    let humanOrigin = human.origin;
    for (let dino of dinos) {
        if (dino.where.match(humanOrigin)) {
            counter++;
        } else if (dino.where === "World Wide") {
            counter++;
        }
    }
    if (human.origin === "Antarctica") {
        counter = 0;
    }
    message = `You share your origin with ${counter} dinos.`;
    return message;
};
//Diet Comparison
let compareDiet = function() {
    let counter = 0;
    let message = "";
    for (let dino of dinos) {
        if (human.diet.toLowerCase() == dino.diet) {
            counter++;
        }
    }
    message = `You share your diet with ${counter} dinos.`;
    return message;
};



// Generate Tiles for each Dino in Array
function titleGeneration() {
    const form = document.getElementById("dino-compare");
    for (let dino of dinos) {

        //creating dino elements
        const createDiv = document.createElement("div");
        const createTitle = document.createElement("h3");
        const appendImg = document.createElement("img");
        const createP = document.createElement("p");

        //adding text
        createDiv.classList.add("grid-item");
        createTitle.textContent = `Species: ${dino.species}`;
        appendImg.setAttribute("src", `./images/${dino.species.toLowerCase()}.png`);

        //Fact Randomizer
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                createP.textContent = dino.fact1;
                break;
            case 1:
                createP.textContent = dino.fact2;
                break;
            default:
                createP.textContent = dino.fact3;
        }
        //append Elements
        createDiv.appendChild(createTitle);
        createDiv.appendChild(appendImg);
        createDiv.appendChild(createP);
        grid.appendChild(createDiv);
    }

    //create Human Elements
    const createDiv = document.createElement("div");
    const createTitle = document.createElement("h3");
    const appendImg = document.createElement("img");
    const createP = document.createElement("p");

    //adding Text
    createDiv.classList.add("grid-item");
    createDiv.setAttribute("id", "human");
    createTitle.textContent = `Name: ${human.name}`;
    appendImg.setAttribute("src", `./images/human.png`);
    let humanText = "Weight: " + human.weight + "Height: " + human.height + "\nDiet: " +
        human.diet + "Origin: " + human.origin + "\nComparison: " + compareHeight() +
        "\n" + compareWeight() + "\n" + compareDiet() + "\n" + compareOrigin();
    createP.textContent = humanText;

    //append Elements
    createDiv.appendChild(createTitle);
    createDiv.appendChild(appendImg);
    createDiv.appendChild(createP);
    grid.appendChild(createDiv);

    //remove Form
    form.style.display = "none";
}
