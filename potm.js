let igBG;
let tmName;
let playersList;
let townBlue;
let ig;
let myTeamString = "S\u0162 HELENS TOWN A.F.C.";
let data = {};
let players = [];
let pT;

function preload() {

  let url = "data.json";
  data = loadJSON(url);

  igBG = loadImage('img/potm.png');
  f_Black = loadFont("01_font/HoghtonRoad.ttf");
}

function setup() {
  players = data.players;
  buildPage();
  createCanvas(1200, 350);
  ig = createGraphics(1200, 350);
}

function draw() {
}


function saveInsta() {
  let thisDate = day()+"_"+month()+"_"+year();
  saveCanvas(ig, pT+"_"+thisDate+"_PotM.png");
}

function makeImage(){
  //Draw BG
  ig.image(igBG, 0, -850);
  ig.textFont(f_Black);
  ig.fill(255);
  ig.textAlign(LEFT);


  var pN = document.getElementById("potmSelect").value;
  pT = players[pN].firstName + " " + players[pN].surName;
  
  if (players[pN].sponsor != ""){
    ig.textSize(40);
    ig.text("Sponsored by " + players[pN].sponsor, 520, 224);  
  }
  ig.textSize(70);
  ig.text(pT, 460, 170);

  
  

  image(ig, 0, 0, 600, 175);
  }

  function buildPage(){
    let sel = select('#potmSelect');
    for (i = 0; i < players.length; i++) {
      n = players[i].firstName + " " + players[i].surName; //USes the players array to combine the player's names
      sel.option(n, i); //Creates a new option in the Dropdown
    }
    }

