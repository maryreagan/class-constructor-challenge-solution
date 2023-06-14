const readline = require("readline");
const readlineInterface = readline.createInterface(
    process.stdin,
    process.stdout
);
function ask(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, resolve);
    });
}

//Console log colors
let defaultText = "\x1b[39m";
let greenText = "\x1b[32m";
let yellowText = "\x1b[0;33m";
let redText = "\x1b[91m";
let blueText = "\x1b[94m";
let grayText = "\x1b[90m";


//Make a class constructor called Store that takes the name of a store, type of store (description), and an array of items in a store
//Make three stores with the information necessary
//Write a function with a console log that uses the name, description, and one item from the inventory in a sentence. Run this function for each store
//Make a class constructor for the items and use those in your function

//---------------------------------------------------Store constructor----------------------------------------------------------------------------
class Store {
    constructor(name, description, items) {
        this.name = name;
        this.description = description;
        this.items = items;
    }
}
//---------------------------------------------------Item constructor----------------------------------------------------------------------------
class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

//-------------------------------------------------------------Items----------------------------------------------------------------------------
let harvestBasket = new Item("Harvest Baskets", "$20");
let treats = new Item("treats", "$5");
let ethereum = new Item("ethereum", "$2,098.26");

//-------------------------------------------------------------Stores----------------------------------------------------------------------------

let market = new Store(
    "Mary's Market",
    "a small market offering home grown vegetables and fruit",
    [harvestBasket, "tomatoes"]
);

let dogStore = new Store(
    "River's Doggotorium",
    "a dog store owned by a dog, no cats allowed",
    [treats, "toys", "sticks"]
);

let moneyStore = new Store(
    "Carson's Crazy World of Crypto",
    "an online store owned by the money man himself, Carson",
    [ethereum]
);

let sidewalk = new Store(
    "sidewalk",
    "you are at the sidewalk, from here you can go to any of the stores",
    []
);
//-------------------------------------------------Function that console logs the sentence------------------------------------------------------
function storeSentence(store) {
    console.log(
        `Be sure to check out ${blueText}${store.name}${defaultText}, ${store.description}, and don't forget to get their most popular item, ${yellowText}${store.items[0].name}${defaultText} that sells for ${greenText}${store.items[0].price}${defaultText}`
    );
}

//---------------------------------------------------------Part 2---------------------------------------------------------------------------------
//Variable initizaling current state
let currentState = "sidewalk";
//TODO Make a state machine where you can go from the sidewalk to any store
//TODO Any store back to the sidewalk
//TODO Make an async start function so that you can move between the sidewalk and stores
//TODO After you move, print out the sentence you made
//TODO When they are on the sidewalk, only print out the description

//Solution
//State Machine
let state = {
    sidewalk: ["market", "dogStore", "moneyStore"],
    market: ["sidewalk"],
    dogStore: ["sidewalk"],
    moneyStore: ["sidewalk"]
}

//Lookup table for each store
let roomLookup = {
    sidewalk: sidewalk,
    market: market,
    dogStore: dogStore,
    moneyStore: moneyStore
}

let commands = {
    move : ["move", "m", "enter"],
    buy : ["buy", "b", "purchase"]
}
//moveState starts as an empty string so that the while loop can start 
let moveState = ""

//Start function that allows you to continually move state in a loop 
async function start(){
    while(moveState !== "exit"){
        let moveState = await ask("Where would you like to go: ")
        if(commands.move.includes(moveState)){
            console.log("moving state")
        }
        // let validTransitions = state[currentState]
        // if (validTransitions.includes(moveState) && moveState == "sidewalk"){//Meaning if I'm in a state that can move to the sidewalk and I want to go to the sidewalk
        //     currentState = moveState
        //     console.log(roomLookup[currentState].description) //Uses the lookup table to only print the description of the sidewalk
        // } else if(validTransitions.includes(moveState)){
        //     currentState = moveState
        //     storeSentence(roomLookup[currentState])//Uses the sentence function I made earlier
        // }else {
        //     console.log(`Invalid state transition from ${currentState} to ${moveState}`)
        // }
    }
    process.exit()
}
start()
