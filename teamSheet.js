let igBG, igSpons, whiteBG;
let tmName = "StHelensTown";
let playersList;
let townBlue;
let ig;
let myTeamString = "S\u0162 HELENS TOWN A.F.C.";

let data = {};
let players = [];

function preload() {

  let url = "data.json";
  data = loadJSON(url);

  igBG = loadImage('img/bg.png');
  sponsorsImage = loadImage("img/sponsors1.png");
  whiteBG = loadImage("img/white_screen.png");
    /* LOAD FONTS */
    f_Black = loadFont("01_font/HoghtonRoad.ttf");
    f_Light = loadFont("01_font/HoghtonRoad.ttf");
    f_Semi = loadFont("01_font/HoghtonRoad.ttf");
}

function setup() {
  players = data.players;
  buildPage();


  createCanvas(1200, 1200);
  ig = createGraphics(1200, 1200);
  ig.background(200);
  ig.textFont(f_Semi);
  ig.fill(255);
  ig.textAlign(CENTER);
  townBlue = color(26,60,147);


}

function draw() {
  // tmName = select('#teamName').value();
  // playerList = select('#firstTeam').value();
  // subsList = select('#subsList').value();
}


function saveInsta() {
  saveCanvas(ig, str(day())+"_"+str(month())+"_"+tmName+"_squad.png");
}

function makeImage(){
  //Draw BG
  ig.image(igBG, 0, 0);
  ig.blendMode(SCREEN);
  ig.image(whiteBG, 0, 400);
  ig.blendMode(BLEND);
  ig.image(sponsorsImage, 0, 0);
  ig.textAlign(CENTER);
  ig.textSize(140);
  ig.text(myTeamString, width/2, 180);
  //Draw Action
  ig.fill(255);
  ig.textFont(f_Black);
  ig.textSize(50);
  // ig.text("Starting Lineup", 150, 480);
  ig.textAlign(RIGHT);
  ig.text("1.\n2.\n3.\n4.\n5.\n6.\n7.\n8.\n9.\n10.\n11.", 150, 300);
  ig.textAlign(LEFT);

  playerList = getPlayers("#playerSelect");
  subsList = getPlayers("#subSelect");

  ig.text(playerList,190,300);
  // ig.text("Substitutes", 720, 680);
  ig.text(subsList,720,400);
  image(ig, 0, 0, 540,540);
  }

  function buildPage(){
    let teamDIV = document.getElementById("TEAMINPUT");
    for (i=1; i<=11; i++){
      // let tempDIVText = '<div class="dataRow"><p>'+i+'</p><select class="tsINPUT" name="playerSelect' + i + '" id="playerSelect' + i + '"></select><input type="button" class="xButton" onclick="resetPLAYERBOX(' + i + ')">';
      let tempDIVText = '<div class="dataRow"><input type="radio" id="cap'+i+'" name="captain"><label for="cap'+i+'" class="capLab">'+i+'</label><select class="tsINPUT" name="playerSelect' + i + '" id="playerSelect' + i + '"></select><input type="button" class="xButton" onclick="resetPLAYERBOX(' + i + ')">';
      teamDIV.innerHTML += tempDIVText;
    };

    let subsDIV = document.getElementById("SUBSINPUT");
    for (i=1; i<=11; i++){
      let subsDIVText = '<div class="dataRow"><p>Sub</p><select class="subINPUT" name="subSelect' + i + '" id="subSelect' + i + '"></select><input type="button" class="xButton" onclick="resetSUBBOX(' + i + ')">';
      subsDIV.innerHTML += subsDIVText;
    };


    for (j=1; j<=11; j++){
    let selString = "#playerSelect"+j;
    let sel = select(selString);

    for (i = 0; i < players.length; i++) {
      n = players[i].firstName + " " + players[i].surName; //USes the players array to combine the player's names
      sel.option(n, i); //Creates a new option in the Dropdown
    }
    }
    
    for (j=1; j<=11; j++){
      let selString = "#subSelect"+j;
      let sel = select(selString);
  
      for (i = 0; i < players.length; i++) {
        n = players[i].firstName + " " + players[i].surName; //USes the players array to combine the player's names
        sel.option(n, i); //Creates a new option in the Dropdown
      }
  }
}


  function getPlayers(OPTION){
    console.log(OPTION);
    let tempString = "";
    let c="";
    for (i=1; i<=11; i++){

      if (select('#cap'+i+':checked') && OPTION == "#playerSelect"){
        c = " (C)";
      } else { c = ""};

      let selString = OPTION+i;
      let sel = select(selString);
      let datN = sel.value();
      if (datN == 0) {
        // tempString += "\n";
      } else {
        tempString += players[datN].firstName+" "+players[datN].surName + c + "\n";
        
      }
    };
    
    console.log(tempString);
    return tempString;
  }

  // <div class="dataRow">
  //       <p>Player</p>
  //         <select name="playerSelect" id="playerSelect"></select>
  //         <input type="button" class="xButton" onclick="resetPLAYERBOX()">
  //     </div>
